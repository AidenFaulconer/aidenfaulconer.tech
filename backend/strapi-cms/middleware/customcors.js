// Custom middleware to allow requests from specific domains
module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const whitelist = console.log(whitelist)

        const origin = ctx.get('origin')

        if (whitelist.includes(origin)) {
          ctx.set('Access-Control-Allow-Origin', origin)
          ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
          ctx.set('Access-Control-Allow-Headers', 'Content-Type')
          ctx.set('Access-Control-Allow-Credentials', true)
        }

        await next()
      })
    },
  }
}
