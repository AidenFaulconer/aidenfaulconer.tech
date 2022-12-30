const https = require('https');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http');

const { app, router } = require('./src/index');

require('dotenv').config({ path: `${__dirname}/../../../.env.${process.env.NODE_ENV}`});

// ========================================================================== //
// add our api into the express app for serverless to use
app.use('/.netlify/functions/server', router);// route to the main lambda function netlify uses

// ========================================================================== //
// The listender for the lambda function
module.exports.handler = serverless(app, { debug: process.env.NODE_ENV === 'development' });

// ========================================================================== //
// Main server *redirects to https*
// ========================================================================== //
// app.all('*', (req, res) => res.redirect(3001, 'https://localhost'));
// app.listen(3001, () => console.log('HTTP server listening: http://localhost:3000!'));

// ========================================================================== //
// HTTPS
// ========================================================================== //

// HTTPS server
// const httpsServer = https.createServer({
//   key: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.key')),
//   cert: fs.readFileSync(path.join(process.cwd(), 'netlify/functions/src/', 'server.cert')),
// }, app);
// httpsServer.listen(443, () => console.log('HTTPS server listening: https://localhost:443'));

//#region routes
//#endregion

//#region mongodb init
// const app = express();
// app.use(express.json());
// app.use(morgan("dev"));
// require("dotenv").config();

// const db = require("./config/keys").mongoURI;
// mongoose.connect(db, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open",() =>{
//     console.log("mongodb connection success!");
// })

//#endregion

//#region graphql

//#endregion