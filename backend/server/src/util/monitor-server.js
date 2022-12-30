// const newrelic = require('newrelic');
// const morgan = require('morgan');

const monitorServer = (app, enable = {
    logging: true,
    monitoring: true,
}) => {

    if (enable.logging) {
        // app.use(morgan('combined'));
    }
    if (enable.monitoring) {
        // app.use(newrelic.middleware.express(process.env.NEW_RELIC_KEY));
    }
}

module.exports = monitorServer;
