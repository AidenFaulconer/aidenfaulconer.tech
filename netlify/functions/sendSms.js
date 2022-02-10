// ========================================================================== //
// Express base setup
// ========================================================================== //
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const bodyParser = require('body-parser');
const text = require('textbelt');
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

// read and apply variables that are sensitive based on the context .env
const dotenv = require('dotenv').config({
  path: `${process.cwd()}/.${process.env}.env`,
});

// ========================================================================== //
// Server security setup
// ========================================================================== //
const cors = require('cors');
const contentSecurityPolicy = require('helmet-csp');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

// basic ddos protection
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: process.env.NODE_ENV === 'production' ? 40 : 10000, // limit each IP to 40 requests per windowMs (per hour)
});

/* app.use(
  session({
    secret: 'ajgardencare#$#^#@#$2342',
    saveUninitialized: false, // consult documentation
    name: 'sessionId',
  }),
);
*/
/* app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "example.com",
      path: "foo/bar",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour,
    },
  })
); */

/**
 *  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 81600 * 365,
        httpOnly: true,
        sameSite: "lax",
        secure: false, // TODO change to true when prod
      },
      secret: "HARDCODED-SECRET", // TODO
      resave: false,
      saveUninitialized: false,
    })
  )
 */

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1); // trust first proxy
app.use(helmet());
const corsOptions = {
  // origin: 'http://localhost:8000',
  origin: '*',
  credentials: false,
  methods: 'GET,POST',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.options('*', cors());

// if (process.env.NODE_ENV === "production")
// app.use(contentSecurityPolicy.getDefaultDirectives());

app.use(limiter); //  apply to all requests
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
io.on('connection', (socket) => {
  console.log('A client connected', socket.id);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandled promise rejection detected');
  console.error(err);
  process.exit(1);
});

// ========================================================================== //
// Middleware
// ========================================================================== //

// const functionName = 'standalone-aws-serverless-express-example'
// const basePath = `/.netlify/functions/${functionName}/`

// app.use(morgan({ format: 'dev', immediate: true }));
// router.use(compression());
// router.use(awsServerlessExpressMiddleware.eventContext())
/* We need to set our base path for express to match on our function route */

// ========================================================================== //
// API setup
// ========================================================================== //
const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from AJ Garden Care!</h1>');
  res.end();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // take netlify functions path and point to router
// app.use('/', (req, res) => res.sendFile(path.join(process.cwd(), './public/index.html')));

// ========================================================================== //
// AJ GardenCare apis
// ========================================================================== //
const parseJson = (json) => Object.keys(json).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`).join('&').replace('\\"', '');
const commonHeaders = {
  // 'Content-Type': 'application/json',
  // 'content-type': 'application/x-www-form-urlencoded',//default
  // Accept: 'application/json, text/plain, */*',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'cache-control': 'no-cache',
  // 'sec-fetch-dest': 'empty',
  // 'sec-fetch-mode': 'cors',
  // 'sec-fetch-site': 'same-site',
  pragma: 'no-cache',
  usequerystring: 'true',

};
const serialize = (obj) => {
  const str = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
};

// ========================================================================== //
//      Textbelt api
// ========================================================================== //
exports.handler = async function ({
  path, httpMethod, headers, queryStringParameters, body, isBase64Encoded,
}, context) {

  const { phone, message } = body;
  const opts = {
    fromAddr: 'some@email.com', // "from" address in received text
    fromName: 'joe smith', // "from" name in received text
    region: 'us', // region the receiving number is in: 'us', 'canada', 'intl'
    subject: 'something', // subject of the message
  };
  return(
    text.sendText(phone, message, {}, () => 'success')
      .then((data) => data)
      .catch((err) => err),
  );
};

 
if (process.env.NODE_ENV === 'development') text.debug(true);


// ========================================================================== //
//      Click send api
// ========================================================================== //

/* CLICK SEND API BODY FORMAT
body: 'username=aidenf09%40gmail.com
&key=005A2016-EB97-7526-81BF-BD78DA52CA22
&return=http%3A%2F%2Fyourwebsite.com
&schedule=1377959755
&senderid=MyCompany
&message=tesgasdfasdfasdf
&sms=%2B61475565709',
*/

// app.post('/api/sms', (req, res) => {
//   const { body: { recipient, message } } = req;
//   console.log(recipient, message);
//   res.send(
//     axios.request({
//       method: 'POST',
//       url: `${process.env.SERVERADDRESS}sms`,
//       headers: {
//         ...commonHeaders,
//         'x-rapidapi-host': process.env.SMSHOST,
//         'x-rapidapi-key': process.env.RAPIDAPIKEY,
//       },
//       data: {
//         username: process.env.CLICKSENDUSERNAME,
//         key: process.env.CLICKSENDAPIKEY,
//         return: './',
//         schedule: '1377959755',
//         senderid: 'AJ Garden Care',
//         // message,
//         message,
//         sms: `+${recipient}`,
//       },
//     }).then((data) => data).catch((err) => err),
//   );
// });
