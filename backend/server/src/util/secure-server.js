const https = require('https')
const fs = require('fs')
const helmet = require('helmet')
const sanitizeHtml = require('sanitize-html')
const rateLimit = require('express-rate-limit')
const csrf = require('csurf')
const csp = require('helmet-csp')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cacheController = require('express-cache-controller')
const {
  sanitizationMiddleware,
  validationMiddleware,
  validateAllMiddleware,
} = require('./validation')
// const validator = require('validator')
// const bcrypt = require('bcrypt')
// const mongoSanitize = require('mongo-sanitize')
// const session = require('express-session');

const secureServer = (
  app,
  enable = {
    cors: true,
    https: true,
    ratelimit: true,
    helmet: true,
    xss: true,
    csrf: true,
    csp: true,
    tokens: true,
    allValidation: true,
    validation: true,
  },
) => {
  require('dotenv').config({
    path: `${__dirname}../../../../../.env.${process.env.NODE_ENV}`,
  })

  if (process.env.NODE_ENV !== 'development') {
    console.log(
      `enabled the following security options: ${JSON.stringify(
        enable,
        null,
        2,
      )}`,
    )
  }

  // Enable Cors
  if (enable.cors) {
    const whitelist = JSON.parse(process.env.CORS_WHITELIST).whitelist
    const corsOptions = {
      //   origin: function (origin, callback) {
      //     console.info(origin)
      //     if (whitelist.indexOf(origin) !== -1) callback(null, true)
      //     else callback(new Error('Not allowed by CORS'))
      //   },
      origin: whitelist,
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.options('*', cors(corsOptions))
    app.use(cors(corsOptions))

    //manual testing of cors below
    // app.use(function (req, res, next) {
    //   res.header('Access-Control-Allow-Origin', whitelist.join(', '))
    //   res.header('Access-Control-Allow-Credentials', 'true')
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept, My-Custom-Header',
    //   )
    //   next()
    // })
  }
  // Enable HTTPS
  if (enable.https) {
    const httpsOptions = {
      key: fs.readFileSync('../certs/key.pem'),
      cert: fs.readFileSync('../certs/cert.pem'),
    }
    https.createServer(httpsOptions, app).listen(443)
  }

  // Implement rate limiting to prevent brute force attacks and other types of abuse
  if (enable.ratelimit) {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    )
  }

  // Enable security headers with helmet
  if (enable.helmet) {
    app.use(helmet())
  }

  // Sanitize user input to prevent XSS attacks
  if (enable.xss) {
    app.use((req, res, next) => {
      req.body = sanitizeHtml(req.body)
      next()
    })
  }

  // Protect app from CSRF attacks
  if (enable.csrf) {
    const csurfOptions = {
      cookie: true,
      // cookie: {
      //     key: '',
      //     path: '',
      //     signed: false,
      //     secure: false,
      //     maxAge: '',
      //     httpOnly: false,
      //     sameSite: 'strict',
      //     domain: process.env.DOMAIN_NAME
      // },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
      sessionKey: '',
      value: () => {},
    }
    app.use(csrf(csurfOptions))
  }

  // Implement a content security policy to define which resources the app is allowed to load
  if (enable.csp) {
    app.use(
      csp({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'cdn.example.com'],
          styleSrc: ["'self'", 'cdn.example.com'],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'", 'cdn.example.com'],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: true,
        },
      }),
    )
  }

  // Protect routes that require authentication
  if (enable.tokens) {
    app.use((req, res, next) => {
      // Extract the token from the request header
      const token = req.headers['authorization']
      if (!token) {
        return res.status(401).send('Access denied')
      }
      // Verify the token
      try {
        const decoded = jwt.verify(token, 'secret')
        req.userId = decoded.userId
        next()
      } catch (error) {
        res.status(400).send('Invalid token')
      }
    })
  }

  //validate common inputs like email, password, username, fullname, age, phone,street,country,zip, etc
  if (enable.allValidation) {
    app.use(validateAllMiddleware())
  }

  //do basic validation
  if (enable.validation) {
    app.use(validateRequest())
  }

  //enable sessions
  if (enable.sessions) {
  }

  //enable cache
  if (enable.cache) {
    app.use(
      cacheController({
        maxAge: 86400, // 1 day
      }),
    )
  }
}

module.exports = secureServer

//examples to secure and use tokens in controllers/routes/whatever yall wana call them
// Hash user passwords before storing them in the database
// router.post('/signup', (req, res) => {
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             return res.status(500).send('Error hashing password');
//         }
//         // Store the hashed password in the database
//         User.create({
//             email: req.body.email,
//             password: hash,
//         })
//             .then((user) =>
//                 res.send('User created successfully');
//     })
//         .catch((error) => {
//             res.status(500).send('Error creating user');
//         });
// });

// // Use JSON web tokens to authenticate users and protect routes that require authentication
// router.post('/login', (req, res) => {
//     User.findOne({ email: req.body.email }).then((user) => {
//         if (!user) {
//             return res.status(401).send('Invalid email or password');
//         }
//         bcrypt.compare(req.body.password, user.password, (err, result) => {
//             if (err || !result) {
//                 return res.status(401).send('Invalid email or password');
//             }
//             // Generate a JWT for the authenticated user
//             const token = jwt.sign({ userId: user._id }, 'secret', {
//                 expiresIn: '1h',
//             });
//             res.send({ token });
//         });
//     });
// });

// // Sanitize input when querying the database to prevent MongoDB injection attacks
// router.get('/users', (req, res) => {
//     User.find({ _id: mongoSanitize(req.query.id) }).then((users) => {
//         res.send(users);
//     });
// });

// Validate user input to ensure it meets the required format and constraints
// router.use((req, res, next) => {
//     if (!validator.isEmail(req.body.email)) {
//         return res.status(400).send('Invalid email address');
//     }
//     next();
// });
