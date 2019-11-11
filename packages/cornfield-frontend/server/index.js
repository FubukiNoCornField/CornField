const Koa = require('koa')
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 2170
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(
    ratelimit({
      db: new Redis(
        6379,
        process.env.NODE_ENV == 'development'
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

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
