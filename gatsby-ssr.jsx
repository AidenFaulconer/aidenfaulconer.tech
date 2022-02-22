require('prismjs/themes/prism-okaidia.css');
require('./src/styles/bootstrap.scss');
require('@fontsource/poppins'); // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement

const React = require('react');
const MaterialUI = require('./src/layout/materialUI');
const Layout = require('./src/layout/layout');

//layout
module.exports.wrapPageElement = function ({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
};
module.exports.wrapRootElement = function ({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
};
 