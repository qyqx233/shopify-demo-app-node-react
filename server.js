require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: false });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;

const vf = verifyRequest()

function pass() {
  let a = 1 + 2
  let b = 3
  console.log(`>>>>>>>>>>>>>> ${a + b}`)
}

function fx() {
  const vf = verifyRequest()
  return async (ctx, next) => {
    pass()
    await vf(ctx, next)
  }
}

async function mappingUrl(ctx, next) {
  console.log("aaaa:" + ctx.path);
  if (ctx.path.indexOf("/auth/callback") >= 0) {
    ctx.path == "/"
  }
  await next()
}

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(async (ctx, next) => {
    const { session, path, request, response } = ctx
    console.log(`path=${path} querystring=[${request.querystring}]`)

    for (const k in ctx.session) {
      if (typeof k == 'string' && k[0] != '_') {
        console.log(`${k} ${session[k]}`)
      }
    }
    console.log(request.headers)
    // if (path === '/auth/callback') {
    //   ctx.path = "/"
    // }
    await next()
    console.log(`${response.res.statusCode}`)
    console.log(response.headers)
    let body = response.body
    if (body !== undefined && body !== null
      && typeof body === 'string' && body.length < 200) {
      console.log(`[[${ctx.response.body}]]`)
    }
    console.log("\n\n")
  })
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        const registration = await registerWebhook({
          address: `${HOST}/webhooks/products/create`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20
        });

        if (registration.success) {
          console.log('Successfully registered webhook!');
        } else {
          console.log('Failed to register webhook', registration.result);
        }
        await getSubscriptionUrl(ctx, accessToken, shop);
      }
    })
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post('/webhooks/products/create', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook);
  });

  server.use(graphQLProxy({ version: ApiVersion.July20 }));




  router.get('(.*)', fx(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
