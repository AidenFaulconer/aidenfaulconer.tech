import React, { Component, useEffect, useState, useCallback } from "react"

import { useCookies } from "react-cookie"

import { Link, useStaticQuery, graphql, StaticQuery } from "gatsby"

import { Helmet } from "react-helmet"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import { StylesProvider } from "@material-ui/core/styles"
import {
  ThemeProvider,
  Container,
  Fab,
  useScrollTrigger,
  Zoom,
  Backdrop,
  makeStyles,
} from "@material-ui/core"
import MaterialUI from "./materialUI"
// import { logo } from '../../../static/svgs/hardcoded-svgs';
import Navigation from "./navigation"
import Footer from "./footer"
import { useGyro, useStore } from "../components/util/customHooks"
import EndOfPage from "../components/endOfPage"
import {HeroHeader} from "../templates/heroHeader"

import PropTypes from "prop-types"

const useStyles = makeStyles(theme => ({
  threeWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    top: "0px",
    zIndex: 1,
  },
  post: {},
}))

const Layout = React.memo(
  ({ children, window }) => {
    //   //prettier-ignore
    //   const { site: { siteMetadata: { title, description } } } = useStaticQuery(
    //     graphql`
    //   query layoutQuery {
    //     site {
    //       siteMetadata {
    //         title
    //         description
    //       }
    //     }
    //   }
    // `);

    const scrollToTop = event => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#home"
      )

      if (anchor) {
        anchor.scrollIntoView({
          disableHysteresis: true,
          threshold: 150,
          behavior: "smooth",
          block: "center",
        })
      }
    }

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    })

    const Head = () => (
      <Helmet>
        <meta
          name="viewpoint"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:300,400|Noto+Serif+TC:300,400|Noto+Serif|Source+Sans+Pro:400,400i,700,700i|Merriweather&display=swap"
          rel="stylesheet"
        />
        <script id="mcjs">
          {
            !(function (c, h, i, m, p) {
              ;(m = c.createElement(h)),
                (p = c.getElementsByTagName(h)[0]),
                (m.async = 1),
                (m.src = i),
                p.parentNode.insertBefore(m, p)
            })(
              document,
              "script",
              "https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js"
            )
          }
        </script>
      </Helmet>
    )

    const mySerif = '"Noto Serif TC", "Noto Serif SC", "Noto Serif", "serif"'

    const mySans = '"Merriweather", "Source Sans Pro", "sans-serif"'

    // const { gyroValues } = useStore({ gyroValues: [0, 0, 0] });

    // function gyroListener(r, t, s) {
    //   console.log(r, t, s);
    //   // gyroValues.set(r, t, s);
    // }
    // useGyro(gyroListener);

    return (
      <>
        <Navigation />
        <HeroHeader id="projects" />
        {children}
        {/* <TableOfContents /> */}
        <EndOfPage />
        <Footer />
        <Zoom in={trigger} role="presentation">
          <Fab
            onClick={scrollToTop}
            size="small"
            style={{ bottom: "25px", right: "25px", position: "fixed" }}
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
          </Zoom>
      </>
    )
  },
  (pre, post) => {
    //stops stupid bugs in gatsby-transition-link **very broken plugin :| **
    // return typeof post.children !== "undefined" && pre.props !== post.props
  }
)
//prop types for Layout
Layout.propTypes = {
  children: PropTypes.node,//.isRequired,
  window: PropTypes.func,
}

export default Layout

// //https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement

// import "prismjs/themes/prism-okaidia.css"
// import "./src/styles/bootstrap.scss"
// import "@fontsource/poppins" // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// // wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
// import { valtioState } from "./src/store/store-wrapper"

// import MaterialUI from "./src/layout/materialUI"
// import Layout from "./src/layout/layout"
// import React from "react"
// import { navigate } from "gatsby"
// import { useStateWithCallbackInstant } from "./src/components/util/customHooks"

// // ========================================================================== //
// // Preserve context across multiple wrappers
// // ========================================================================== //

// // const ContextPreserve = ({ children }) => {
// //   const [state, setState] = useStateWithCallbackInstant(valtioState, () => {
// //     const prefersReducedMotionSetting =
// //       typeof window !== `undefined` &&
// //       window.matchMedia("(prefers-reduced-motion: reduce)")

// //     const prefersReducedMotion = prefersReducedMotionSetting

// //     if (
// //       prefersReducedMotionSetting.matches &&
// //       process.env.NODE_ENV === `development`
// //     ) {
// //       console.warn(
// //         `[gatsby-plugin-transition-link] Warning! prefers-reduced-motion is activated via your OS settings. This means TransitionLink animations will not run.`
// //       )
// //     }
// //     //page transtion state added to global state management **valtio**
// //     valtioState.transitionContext = {
// //       inTransition: false,
// //       disableAnimation: prefersReducedMotion.matches,
// //       // event
// //       e: false,
// //       // exit
// //       exitDelay: 0,
// //       exitLength: 0,
// //       exitState: {},
// //       exitProps: {},
// //       exitTrigger: false,
// //       // entry
// //       entryDelay: 0,
// //       entryLength: 0,
// //       entryState: {},
// //       entryProps: {},
// //       entryTrigger: false,
// //       // state updates
// //       updateContext: obj => setState(obj),
// //     }

// //     if (
// //       prefersReducedMotion &&
// //       typeof prefersReducedMotion.addEventListener === `function`
// //     ) {
// //       prefersReducedMotion.addEventListener("change", () => {
// //         setState({
// //           disableAnimation: prefersReducedMotion.matches,
// //         })
// //       })
// //     } else if (
// //       prefersReducedMotion &&
// //       typeof prefersReducedMotion.addListener === `function`
// //     ) {
// //       prefersReducedMotion.addListener(() => {
// //         setState({
// //           disableAnimation: prefersReducedMotion.matches,
// //         })
// //       })
// //     }
// //   })

// //   // Did mount
// //   useEffect(() => {
// //     this.state.updateContext(getPagesPromises())
// //   }, [])

// //   return { children }
// // }

// // ========================================================================== //
// // NOTE: This code is repeated in ssr
// // ========================================================================== //

// // ========================================================================== //
// // Root Preserve MUI and Threejs context
// // ========================================================================== //
// export const wrapRootElement = ({ element }) => {
//   //   if (typeof window !== `undefined`) {
//   //     window.addEventListener("popstate", function (event) {
//   //       // prevent the back button during transitions as it breaks pages
//   //       if (window.__tl_inTransition) {
//   //         window.__tl_back_button_pressed = true
//   //         navigate(window.__tl_desiredPathname)
//   //       }
//   //     })
//   //   }

//   return (
//     typeof window !== "undefined" &&
//     React && (
//       <MaterialUI>
//         <Layout>{element}</Layout>
//       </MaterialUI>
//     )
//   )
// }

// // const InternalProvider = require('./context/InternalProvider').default

// // module.exports = ({ element }) => {
// //   return <InternalProvider>{element}</InternalProvider>
// // }

// // ========================================================================== //
// // Page Preserve transitions
// // ========================================================================== //
// export const shouldUpdateScroll = () => !window.__tl_inTransition
// export const wrapPageElement = ({ element, props }) => {
//   return (
//     typeof window !== "undefined" &&
//     React && (
//       <Layout /*{...props}*/>
//         {/* <TransitionHandler {...props} {...pluginOptions}> */}
//         {element}
//         {/* </TransitionHandler> */}
//       </Layout>
//     )
//   )
// }
