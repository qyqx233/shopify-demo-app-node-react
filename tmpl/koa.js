const Koa = require('koa')
const Router = require('koa-router')


const koa = new Koa()
const router = new Router()

router.get('/hello', async(ctx) => {
  ctx.body = "hello"
})

router.get('/', async (ctx, next) => {
  ctx.redirect('/hello')
})
koa.use(router.routes())
koa.listen(2222)