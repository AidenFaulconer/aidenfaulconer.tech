require("prismjs/themes/prism-okaidia.css")
require("./src/styles/bootstrap.scss")
require("@fontsource/poppins") // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement

const MaterialUI = require("./src/layout/materialUI")
const Layout = require("./src/layout/layout")
const React = require("react")

// module.exports.wrapPageElement = function ({ element, props }) {
//   if (typeof window === "undefined") return
//   return
//   {
//     element
//   }
// }
// module.exports.wrapRootElement = function ({ element, props }) {
//   if (typeof window === "undefined") return
//   return <MaterialUI>{element}</MaterialUI>
// }

// // wrap threejs here with higher order animation component
// // ...
