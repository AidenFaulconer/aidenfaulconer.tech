// ========================================================================== //
// Express base setup
// ========================================================================== //
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
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
  res.write('<h1>Hello from Aiden Faulconer!</h1>');
  res.end();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
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

// https://docs.textbelt.com/
app.post('/api/sms2', (req, res) => {
  const { body: { phone, message } } = req;
  const opts = {
    fromAddr: 'some@email.com', // "from" address in received text
    fromName: 'joe smith', // "from" name in received text
    region: 'us', // region the receiving number is in: 'us', 'canada', 'intl'
    subject: 'something', // subject of the message
  };
  res.send(
    text.sendText(phone, message, {}, () => 'success')
      .then((data) => data)
      .catch((err) => err),
  );
});

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

app.post('/api/sms', (req, res) => {
  const { body: { recipient, message } } = req;
  console.log(recipient, message);
  res.send(
    axios.request({
      method: 'POST',
      url: `${process.env.SERVERADDRESS}sms`,
      headers: {
        ...commonHeaders,
        'x-rapidapi-host': process.env.SMSHOST,
        'x-rapidapi-key': process.env.RAPIDAPIKEY,
      },
      data: {
        username: process.env.CLICKSENDUSERNAME,
        key: process.env.CLICKSENDAPIKEY,
        return: './',
        schedule: '1377959755',
        senderid: 'AidenFaucloner.tech',
        // message,
        message,
        sms: `+${recipient}`,
      },
    }).then((data) => data).catch((err) => err),
  );
});

/**
rapidapi
fetch('https://inteltech.p.rapidapi.com/send.php', {
  headers: {
    accept: 'application/json, text/plain, *//* ',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    expires: '0',
    pragma: 'no-cache',
    'sec-ch-ua': '"Microsoft Edge";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    usequerystring: 'true',
    'x-rapidapi-host': 'inteltech.p.rapidapi.com',
    'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsna9c5b4a50f76',
    'x-rapidapi-ua': 'RapidAPI-Playground',
  },
  referrer: 'https://rapidapi.com/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&return=http%3A%2F%2Fyourwebsite.com&schedule=1377959755&senderid=MyCompany&message=tesgasdfasdfasdf&sms=%2B61475565709',
  method: 'POST',
  mode: 'cors',
  credentials: 'omit',
});

ours
"access-control-allow-credentials": "true",
"access-control-allow-headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
fetch('https://inteltech.p.rapidapi.com/send.php', {
  headers: {
    accept: 'application/json, text/plain, *//* ',
    'accept-language': 'en-US,en;q=0.9',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'access-control-allow-methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'access-control-allow-origin': '*',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    pragma: 'no-cache',
    'sec-ch-ua': '"Microsoft Edge";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    usequerystring: 'true',
    'x-rapidapi-host': 'https://inteltech.p.rapidapi.com',
    'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsnaa9c5b4a50f76',
  },
  referrer: 'http://localhost:8000/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  // body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&schedule=1377959755&senderid=AJ+Garden+Care&message=%0A++++++-------------------------%0A++++++0+has+booked+a+Mulching+service+for+undefined.%0A++++++-------------------------%0A++++++working+space+is+0+metres+squared.%0A++++++-------------------------%0A++++++at+location%3A+0%2C+zip%3A+0%2C+state%3A+0%0A++++++-------------------------%0A++++++they+can+be+contacted+via%0A++++++name%3A+0%0A++++++phone%3A+0%0A++++++email%3A+0%0A++++++-------------------------%0A++++++availible+on%3A+0%0A++++++-------------------------%0A++++++timestamp%3A+9%2F16%2F2021+11%3A08%3A33+PM%0A++++++&sms=%2B61475565709',
  body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&return=http%3A%2F%2Fyourwebsite.com&schedule=1377959755&senderid=MyCompany&message=tesgasdfasdfasdf&sms=%2B61475565709',
  method: 'POST',
  mode: 'cors',
  credentials: 'omit',
});
*/

// ========================================================================== //
// Send emails *netlify background function*
// ========================================================================== //
const { jsPDF } = require('jspdf');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport(
  mg({
    auth: {
      // api_key: process.env.MAILGUN_API_KEY,
      apiKey: process.env.MAILGUN_API_KEY || '394b1cc46202ded744e9437fd5f658cd-45f7aa85-719a1d13',
      domain: process.env.MAILGUN_DOMAIN || 'sandbox44a24e3174d54769aeab5887bd0badd6.mailgun.org',
    },
  }),
);

app.post('/api/send-email', async (req, res) => {
  const { message, recipient } = req.body;
  console.log(`Sending PDF report to ${recipient}`);

  const report = Buffer.from(
    new jsPDF().text(message, 10, 10).output('arraybuffer'),
  );
  const invoice = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',
    to: recipient,
    subject: 'Your booking with Aiden Faulconer',
    text: 'See attached booking PDF',
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      },
    ],
    message,
  });
  const notify = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',,
    to: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',,
    subject: 'Your booking with Aiden Faulconer',
    text: 'See attached booking PDF',
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      },
    ],
    message,
  });
  console.log(`PDF report sent: ${invoice.messageId}`);
  res.send(invoice, notify);
  // res.send(notify);
});

// ========================================================================== //
//      Test server and requests
// ========================================================================== //
app.use('/api/test', (req, res) => {
  const {
    body, headers, readable, rawTrailers, socket, secure, subdomains, statusMessage, complete, fresh, ip, method, originalUrl, params, protocol, query,
  } = req;
  res.write(JSON.stringify({
    message: 'you sent this information',
    body,
    headers,
    complete,
    fresh,
    ip,
    method,
    originalUrl,
    params,
    protocol,
    query,
    rawTrailers,
    readable,
    secure,
    // socket,
    subdomains,
    statusMessage,
  }, null, 2));
});
app.use('/api/test2', (req, res) => {
  const {
    body, headers, readable, rawTrailers, socket, secure, subdomains, statusMessage, complete, fresh, ip, method, originalUrl, params, protocol, query,
  } = req;
  res.write(JSON.stringify({
    message: 'hey, you said hi!',
  }, null, 2));
});

// ========================================================================== //
//      Query user information
// ========================================================================== //
/* const queryUserIpInformation = async () => axios.get({
    url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.GATSBY_NODE_ENV.RAPIDAPIKEY}`,
    },
});
  */

// ========================================================================== //
//      Search Weather
// ========================================================================== //
app.get('/api/weather', (req, res) => {
  const { query } = req;
  res.send(axios.get(
    `${process.env.NODE_ENV.APIURL}/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHERAPIKEY}`,
  )
    .then((data) => data))
    .catch((err) => err);
});

// ========================================================================== //
//      Recatpcha
// ========================================================================== //
app.use('/api/recaptcha', (req, res) => {

});

// ========================================================================== //
//      Google spreadsheet api
// ========================================================================== //
app.post('/api/spreadsheets', (req, res) => {
  const { body } = req;
  res.send(axios.post({
    url: `${process.env.GOOGLESPREADSHEETSURL}/${process.env.GOOGLESPREADSHEETID}/values/A57:append`,
    headers: {
      accept: '*/*',
      userAgent: '*',
    },
    query: {
      valueInputOption: 'RAW',
      includeGridData: true,
      key: '',
      insertDataOption: 'RAW',
      responseDAteTimeRenderOption: 'SERIAL_NUMBER',
    },
    // range: 'A57:A59',
    // majorDimension: 'COLUMN', // READ MORE AT https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values#dimension
    // values: ['james is a nicesmellingbutthead', 'ASDFASDFASDF', 'asdfasdfasdf'],
    body,
  })
    .then((data) => data))
    .catch((err) => err);
});

// ========================================================================== //
//      Google maps search
// ========================================================================== //
app.get('/api/spreadsheets', (req, res) => {
  const { body: { lat, lng } } = req;
  res.send(axios.get(
    `${process.env.GOOGLEMAPAPIURL}?latlng=${lat},${lng}&key=${process.env.GOOGLEAPIKEY}`,
  )
    .then((data) => data))
    .catch((err) => err);
});

// ========================================================================== //
//      Reverse geocode
// ========================================================================== //
app.get('/api/reversegeocode', (req, res) => {
  const { params: { location, language } } = req;
  res.send(axios(process.env.RGEOCODEURL, {
    method: 'get',
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': process.env.RGEOCODEHOST,
      'x-rapidapi-key': process.env.RGEOCODEKEY,
    },
    params: {
      location, /** : `${lat},${lon}`, */
      language,
    },
    body: {
      code: 'US',
    },
  })
    .then((data) => data))
    .catch((err) => err);
});

// ========================================================================== //
// Unused
// ========================================================================== //
/*
const searchForecast = async (loc) => axios.get(
  `${process.env.GATSBY_NODE_ENV.APIURL}/data/2.5/forecast?q=${loc}&appid=${process.env.GATSBY_OPENWEATHERAPIKEY}`,
);
const getLocationByLatyLng = async (lat, lng) => axios.get(
  `${process.env.GATSBY_GOOGLEMAPAPIURL}?latlng=${lat},${lng}&key=${process.env.GATSBY_GOOGLEAPIKEY}`,
);
*/

// ========================================================================== //
// Authorize google apis (OAuth || JWT)
// ========================================================================== //

const google = require('googleapis');
//   use in auth param in request
//   use as headers: {Authorization: 'Bearer JWT'}
const authorizeAppWithGoogle = async () => `Bearer ${new google.auth.JWT({
  email: process.env.GOOGLESERVICEACCOUNTAIDEN,
  key: process.env.GOOGLESERVICEACCOUNTAIDENPRIVATEKEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
}).authorize()}`;

// ========================================================================== //
// Server Side Rendering **ref: https://github.com/netlify-labs/netlify-functions-express**
// ========================================================================== //
/**
 // const functionName = 'react-express-ssr'
 // import { renderToString } from "react-dom/server"
 // const Html = ({ body, styles, title }) => {
   //   const stylesheet = (styles) ? `<style>${styles}</style>` : ''
   //   return `
   //     <!DOCTYPE html>
   //     <html>
   //       <head>
   //         <title>${title}</title>
   //         ${stylesheet}
   //       </head>
   //       <body style="margin:0">
   //         <div id="root">${body}</div>
   //         <script src="/dev/bundle.js"></script>
   //       </body>
   //     </html>
   //   `
// }

// const routerBasePath = (process.env.NODE_ENV === 'dev') ? `/${functionName}` : `/.netlify/functions/${functionName}/`

// app.get(routerBasePath, (req, res) => {
  //   Data().then(users => {
    //     const reactAppHtml = renderToString(<App data={users} />)
    //     const html = Html({
      //       title: 'React SSR!',
      //       body: reactAppHtml
      //     })
      //     res.send(html)
      //   })
      // })
*/

module.exports = app;
module.exports.handler = serverless(app/* {debug: true} */);
