const serverless = require('serverless-http')
const { app, router } = require('./src/index')

require('dotenv').config({
  path: `${__dirname}/../../.env.${process.env.NODE_ENV}`,
})

// ========================================================================== //
// Main server *redirects to https*
// ========================================================================== //
app.listen(process.env.SERVER_PORT, () =>
  console.log(`
    HTTP server listening: http://${process.env.SERVER_URL}!\n
    SWAGGER: http://${process.env.SERVER_URL}/api-docs!\n
    PORT: ${process.env.SERVER_PORT}\n
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
