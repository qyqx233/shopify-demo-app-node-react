
// import * as fs from 'fs'
import * as fs from 'fs'
import * as http from 'http'
import Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { Context, Next } from 'koa'
import * as Session from 'koa-session'
// @ts-ignore：
import compose from 'koa-compose';


const session_config = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 40000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
}

function server() {
    const app = new Koa()
    app.keys = ["SignedKey"];
    const session = Session(session_config, app)
    app.use(session)
    // app.use(async (ctx, next) => {
    //     console.log(`path=${ctx.path} querystring=[${ctx.request.querystring}]`)
    //     console.log(ctx.query)
    //     console.log(Object.keys(ctx.session))
    //     console.log(ctx.request.headers)
    //     if (ctx.path === '/hello') {
    //         ctx.path = "/"
    //     }
    //     await next()
    //     console.log(ctx.response.headers)
    //     let body = ctx.response.body
    //     if (body !== undefined && body !== null
    //         && typeof body === 'string' && body.length < 200) {
    //         console.log(`[[${ctx.response.body}]]`)
    //     }
    //     console.log("\n\n")
    // })


    // app.use(async (ctx, next) => {
    //     await next()
    //     if (ctx.query !== undefined && ctx.query.name === 'admin') {
    //         console.log('set cookie')
    //         ctx.session.logged = true
    //     }
    // })
    const router = new Router()

    router.get('/hello', async (ctx, next) => {
        ctx.set("content-type", "text/html; charset=UTF-8")
        ctx.response.body = fs.readFileSync('tmpl/hello.html')
        // ctx.redirect('https://www.baidu.com')
    })
    router.get("/iframe", async(ctx, next) => {
        ctx.set("content-type", "text/html; charset=UTF-8")
        ctx.response.body = fs.readFileSync('tmpl/iframe.html')
    })
    router.get("/", async (ctx, next) => {
        // @ts-ignore：
        console.log(`userinfo=${ctx.session['userinfo']}`)
        ctx.response.body = "this is /"
    })
    router.get("/login", async (ctx, next) => {
        // @ts-ignore：
        ctx.session['userinfo'] = 'root'
        ctx.response.body = "login";
    })
    
    app.use(bodyParser())
    // app.use( async (ctx, next) => {
    //     // ctx.body =  ctx.request.body 

    //     // debug("<<<<<<<<<<<<<<<\n")
    // })
    // app.use(dumpMiddle)

    app.use(router.routes())
    app.listen(3002)
    // http.createServer(app.callback()).listen(3003)
    http.createServer(app.callback()).listen(3003)
}

server()
