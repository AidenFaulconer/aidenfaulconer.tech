const path = require('path');
const express = require('express');

const serviceWorker = express();

const packageReader = require('./utils/package-reader');

const version = packageReader.getVersion();
const viewPath = path.join(__dirname, '..', '..', 'client');
const helpersPath = path.join(__dirname, '..', 'helpers');

module.exports = serviceWorker;
