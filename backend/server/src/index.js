// ========================================================================== //
// Express base setup
// ========================================================================== //
const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')
const buildControllers = require('./util/build-controllers')
const secureServer = require('./util/secure-server')
const monitorServer = require('./util/monitor-server')
const generateSwaggerApi = require('./util/build-services')
const compression = require('compression')
if (process.env.NODE_ENV === 'development') require('debug')('app:server')

// const buildGraphqlSchemas = require('./util/build-graphql-schemas');
// const buildMongodbSchemas = require('./util/build-mongodb-schemas');
// const buildPostgresSchemas = require('./util/build-postgres-schemas');
// const buildSqlSchemas = require('./util/build-sql-schemas');
// const morgan = require('morgan');
// const contentSecurityPolicy = require('helmet-csp');
// console.log(JSON.stringify(process.env, null, 2))

// Secure server
secureServer(app, {
  cors: true,
  https: false,
  ratelimit: true,
  helmet: true,
  xss: true,
  csrf: false,
  csp: false,
  tokens: false,
  allValidation: false,
  validation: false,
  cache: true,
})

// Base Middleware
// router.use(awsServerlessExpressMiddleware.eventContext())
// app.use(morgan({ format: 'dev', immediate: true }));
router.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json())

//build schema/models
// buildGraphqlSchemas(app);
// buildMongodbSchemas(app);
// buildPostgresSchemas(app);
// buildSqlSchemas(app);

//build controllers/routes
buildControllers(app)

//monitor server
monitorServer(app, {
  logging: false,
  monitoring: false,
})

//add swagger
generateSwaggerApi(app)

// export server app and routes for the main server script to run
module.exports = { app, router }
