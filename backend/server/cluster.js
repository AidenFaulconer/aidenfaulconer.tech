const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

const serverless = require('serverless-http')
const { app, router } = require('./src/index')

require('dotenv').config({
  path: `${__dirname}/../../.env.${process.env.NODE_ENV}`,
})

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(process.env.SERVER_PORT, () =>
    console.log(`
    HTTP server listening: http://${process.env.SERVER_URL}!\n
    SWAGGER: http://${process.env.SERVER_URL}/api-docs!\n
`),
  )

  console.log(`Worker ${process.pid} started`)
}

const serverless = require('serverless-http')
const { app, router } = require('./src/index')

require('dotenv').config({
  path: `${__dirname}/../../.env.${process.env.NODE_ENV}`,
})

// ========================================================================== //
// add our api into the express app for serverless to use
app.use('/.backend/server', router) // route to the main lambda function netlify uses

// ========================================================================== //
// The listender for the lambda function
module.exports.handler = serverless(app, {
  debug: process.env.NODE_ENV === 'development',
})

// ========================================================================== //
// Main server *redirects to https*
// ========================================================================== //
// app.all('*', (req, res) => res.redirect(`http://${process.env.SERVER_URL}`, 200));
app.listen(process.env.SERVER_PORT, () =>
  console.log(`
    HTTP server listening: http://${process.env.SERVER_URL}!\n
    SWAGGER: http://${process.env.SERVER_URL}/api-docs!\n
`),
)

// ========================================================================== //
// HTTPS
// ========================================================================== //

// HTTPS server
// const httpsServer = https.createServer({
//   key: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.key')),
//   cert: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.cert')),
// }, app);
// app.all('*', (req, res) => res.redirect(`https://${process.env.SERVER_URL}`, 200));
// httpsServer.listen(443, () => console.log('HTTPS server listening: https://localhost:443'));
