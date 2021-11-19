const https = require('https');
const path = require('path');
const fs = require('fs');
const app = require('./src/server');

// ========================================================================== //
// Main server *redirects to https*
// ========================================================================== //
app.all('*', (req, res) => res.redirect(3000, 'https://localhost'));
app.listen(3000, () => console.log('HTTP server listening: http://localhost:3000!'));

// ========================================================================== //
// HTTPS
// ========================================================================== //

// HTTPS server
const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.key')),
  cert: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.cert')),
}, app);
httpsServer.listen(443, () => console.log('HTTPS server listening: https://localhost:443'));
