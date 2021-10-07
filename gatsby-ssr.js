require("prismjs/themes/prism-okaidia.css")
require("./src/styles/bootstrap.scss")
require("@fontsource/poppins") // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
const { valtioState } = require("./src/store/store-wrapper")

const MaterialUI = require("./src/layout/materialUI")
const Layout = require("./src/layout/layout")
const React = require("react")

const InternalProvider = require("gatsby-plugin-transition-link/context/InternalProvider")

// ========================================================================== //
// Page Preserve transitions
// ========================================================================== //
// module.exports.shouldUpdateScroll = function () {
//   return !window.__tl_inTransition
// }
// module.exports.wrapRootElement = function ({ element }) {
//     if (typeof window === "undefined") return;
//     return (
//             {element}
//     )
// }

// module.exports.wrapPageElement = function ({ element, props }, pluginOptions) {
//   console.log(element) //element empty!!! why!
//   typeof element === "object" && console.log(element.props.location.pathname)
//     if (typeof window === "undefined") return;
//     // {/* <Layout {...props}> */ }
//     // <InternalProvider>
//   return (
//       <MaterialUI>
//         {element}
//       </MaterialUI>
//   )
// }

// // wrap threejs here with higher order animation component
// // ...
