const Router = require('koa-router')
const user = new Router()
const log = process.env.NODE_ENV == 'development' ? console.log : () => {}

// /user
user.get('/', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = '404 Not Found'
  await next()
})

// /user/login
user.get('/login', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = '404 Not Found'
  await next()
})

// /user/register
user.get('/register', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = '404 Not Found'
  await next()
})
