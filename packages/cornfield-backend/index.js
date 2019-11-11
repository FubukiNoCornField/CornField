const fs = require('fs')
const path = require('path')
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

process.on('uncaughtException', (err) => {
  console.log('ERR unc expt')
  console.log(err)
})
;(() => {
  app.use(
    ratelimit({
      db: new Redis(
        6379,
        process.env.NODE_ENV === 'development'
          ? '127.0.0.1'
          : process.env.REDIS_IP
      ),
      duration: 3600000,
      errorMessage: 'RATE LIMIT',
      id: (ctx) => ctx.ip,
      headers: {
        // remaining: 'Rate-Limit-Remaining',
        // reset: 'Rate-Limit-Reset',
        // total: 'Rate-Limit-Total'
      },
      max: 2500,
      disableHeader: true
    })
  )
  app.use(
    bodyParser({
      formLimit: '10mb',
      jsonLimit: '10mb',
      textLimit: '10mb'
    })
  )
  app.use(
    cors({
      origin: (ctx) => '*',
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
  )

  const api = fs.readdirSync(path.join(__dirname, '/api'))
  api.forEach((element) => {
    const module = require(path.join(__dirname, '/api/', element))
    router.use(
      '/' + element.replace('.js', ''),
      module.routes(),
      module.allowedMethods()
    )
  })
  app.use(router.routes())

  app.listen(2171)
})()
