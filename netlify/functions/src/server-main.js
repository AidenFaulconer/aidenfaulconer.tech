// ========================================================================== //
// Express base setup
// ========================================================================== //
const axios = require('axios');
const path = require('path');

const express = require('express');

const router = express.Router();
const app = express();

const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');
const fs = require('fs');

// use like: validator.validate(email)
const emailValidator = require('email-validator');

// configure environment variables
require('dotenv').config({ path: `${process.cwd()}\.env.${process.env.NODE_ENV}`, debug: process.env.NODE_ENV === 'development', encoding: 'utf8' });

// ========================================================================== //
// start Firebase and get database methods
// ========================================================================== //
const {
  create,
  update,
  getToken,
  checkAuth,
  deleteItem,
  revokeToken,
  getCollection,
  accountHelpers,
  getSessionCookie,
  getCollectionField,
  // eslint-disable-next-line import/order
  // https://console.firebase.google.com/u/0/project/absolute-hub-277608/firestore/data/~2Fbookings~2FGkqqbH6uSDXd7AuakuVF
} = require('./db/db-connect');

// ========================================================================== //
// Server security setup
// ========================================================================== //
// const contentSecurityPolicy = require('helmet-csp');
// const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const contentSecurityPolicy = require('helmet-csp');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1); // trust first proxy
app.use(helmet());
const corsOptions = {
  origin: process.env.CORS_WHITELIST,
  credentials: false,
  methods: 'GET,POST',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('*', cors(corsOptions));

// basic ddos protection
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: process.env.NODE_ENV === 'production' ? 40 : 1000, // limit each IP to 40 requests per windowMs (per hour)
  }),
); //  apply to all requests

// handle sessions on server
app.use(
  session({
    secret: 's3Cur3recoveryvr',
    saveUninitialized: false, // consult documentation
    name: 'sessionId',
  }),
);

// set content security policy, absolute killer for any attempt at XSS
if (process.env.NODE_ENV === 'production') app.use(contentSecurityPolicy.getDefaultDirectives());

// ========================================================================== //
// Sockets
// ========================================================================== //
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
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Aiden Faulconer!</h1>');
  res.end();
});

// allow localhost requests on this server
if (process.env.NODE_ENV === 'development') {
  router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ========================================================================== //
// API
// ========================================================================== //
// app.use('/', (req, res) => res.sendFile(path.join(process.cwd(), './public/index.html')));
app.use('/api/test', (req, res) => {
  const {
    body,
    headers,
    readable,
    rawTrailers,
    socket,
    secure,
    subdomains,
    statusMessage,
    complete,
    fresh,
    ip,
    method,
    originalUrl,
    params,
    protocol,
    query,
  } = req;
  res.write(
    JSON.stringify(
      {
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
      },
      null,
      2,
    ),
  );
});
app.use('/api/test2', (req, res) => {
  const {
    body,
    headers,
    readable,
    rawTrailers,
    socket,
    secure,
    subdomains,
    statusMessage,
    complete,
    fresh,
    ip,
    method,
    originalUrl,
    params,
    protocol,
    query,
  } = req;
  res.write(
    JSON.stringify(
      {
        message: 'hey, you said hi!',
      },
      null,
      2,
    ),
  );
});

// ========================================================================== //
//      Query user information
// ========================================================================== //
/* const queryUserIpInformation = function  ()  axios.get({
    url:{returnttps://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
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
  res
    .send(
      axios
        .get(
          `${process.env.NODE_ENV.APIURL}/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHERAPIKEY}`,
        )
        .then((data) => data),
    )
    .catch((err) => err);
});

// ========================================================================== //
//      Recatpcha
// ========================================================================== //
app.use('/api/recaptcha', (req, res) => {});

// ========================================================================== //
//      Google spreadsheet api
// ========================================================================== //
app.post('/api/spreadsheets', (req, res) => {
  const { body } = req;
  res
    .send(
      axios
        .post({
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
        .then((data) => data),
    )
    .catch((err) => err);
});

// ========================================================================== //
//      Google maps search
// ========================================================================== //
app.get('/api/spreadsheets', (req, res) => {
  const {
    body: { lat, lng },
  } = req;
  res
    .send(
      axios
        .get(
          `${process.env.GOOGLEMAPAPIURL}?latlng=${lat},${lng}&key=${process.env.GOOGLEAPIKEY}`,
        )
        .then((data) => data),
    )
    .catch((err) => err);
});

// ========================================================================== //
// Shoot an email
// ========================================================================== //

// ========================================================================== //
// Send emails *netlify background function*
// ========================================================================== //
const { jsPDF } = require('jspdf');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST || 'smtp.mail.yahoo.com',
  port: 465,
  secure: true,
  debug: true,
  logger: true,
  auth: {
    user: process.env.MAIL_SENDER || '',
    pass: process.env.MAIL_P || '',
  },
});
// ========================================================================== //
// makeContact
// ========================================================================== //
app.post('/api/makeContact', async (req, res) => {
  console.log(req);
  const { message, recipient } = req.body;

  if (!emailValidator.validate(recipient)) res.status(400).send('Invalid email');

  // method to parse string from body
  console.log(`Sending PDF report to ${recipient}`);

  const report = Buffer.from(
    new jsPDF()
      .text(JSON.stringify(message, null, 2), 10, 10)
      .output('arraybuffer'),
  );
  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments: [
        report && {
          filename: `report-${new Date().toDateString()}.pdf`,
          content: report,
          contentType: 'application/pdf',
        },
      ],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments: [
        report && {
          filename: `report-${new Date().toDateString()}.pdf`,
          content: report,
          contentType: 'application/pdf',
        },
      ],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`);

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
});
// ========================================================================== //
// makeBooking
// ========================================================================== //
const streamConfig = {
  // ./file-name.ext
  // {highWaterMark: 16}
};
// No more than 5mb total TODO: will upgrade host to AWs for more advanced use cases and larger files
const readImageFiles = (files) => {
  const images = [];
  files.forEach((file) => {
    const { createReadStream } = file;
    const stream = createReadStream(streamConfig);
    stream.on('data', (data) => images.push(data)); // transfer bye by byte in chunks
    stream.on('end', () => console.log('end :', Buffer.concat(file).toString()));
    stream.on('error', (err) => console.log('error :', err));
  });
  return images.map((file) => ({
    filename: `referencePhotos-${new Date().toDateString()}.jpg`,
    content: file,
    contentType: 'application/jpg',
  }));
};

app.post('/api/makeBooking', async (req, res) => {
  let { message, referencePhotos, recipient } = req.body;
  // console.log(req);

  if (!emailValidator.validate(recipient)) res.status(400).send('Invalid email');

  console.log(message);
  const report = Buffer.from(
    new jsPDF()
      .text(JSON.stringify(message, null, 2), 10, 10)
      .output('arraybuffer'),
  );

  referencePhotos = referencePhotos.length > 0 ? readImageFiles(referencePhotos) : [];
  const attachments = [
    ...referencePhotos,
    report && {
      filename: `report-${new Date().toDateString()}.pdf`,
      content: report,
      contentType: 'application/pdf',
    },
  ];

  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`);

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

// ========================================================================== //
//      Reverse geocode
// ========================================================================== //
app.get('/api/reversegeocode', (req, res) => {
  const {
    params: { location, language },
  } = req;
  res
    .send(
      axios(process.env.RGEOCODEURL, {
        method: 'get',
        headers: {
          'x-rapidapi-host': process.env.RGEOCODEHOST,
          'x-rapidapi-key': process.env.RGEOCODEKEY,
        },
        params: {
          location /** : `${lat},${lon}`, */,
          language,
        },
        body: {
          code: 'US',
        },
      }).then((data) => data),
    )
    .catch((err) => err);
});
module.exports = { app, router };
