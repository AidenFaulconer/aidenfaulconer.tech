require( "prismjs/themes/prism-okaidia.css")
require( "./src/styles/bootstrap.scss")
require( "@fontsource/poppins")// https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
const { valtioState } = require("./src/store/store-wrapper")

const MaterialUI = require("./src/layout/materialUI")
const Layout = require("./src/layout/layout")
const React = require("react")
const { navigate } = require("gatsby")
const useStateWithCallbackInstant = require("./src/components/util/customHooks")
//if it has been created, then we can render the ThreeWrapper
//if it has not been created, then we can render a loading screen
//this is done by hooking into gatsbys wrapRootElement
// //https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement

// ========================================================================== //
// Preserve context across multiple wrappers
// ========================================================================== //

const ContextPreserve = ({ children }) => {
  const [state, setState] = useStateWithCallbackInstant(valtioState, () => {
    const prefersReducedMotionSetting =
      typeof window !== `undefined` &&
      window.matchMedia("(prefers-reduced-motion: reduce)")

    const prefersReducedMotion = prefersReducedMotionSetting

    if (
      prefersReducedMotionSetting.matches &&
      process.env.NODE_ENV === `development`
    ) {
      console.warn(
        `[gatsby-plugin-transition-link] Warning! prefers-reduced-motion is activated via your OS settings. This means TransitionLink animations will not run.`
      )
    }
    //page transtion state added to global state management **valtio**
      valtioState.transitionContext = {
        inTransition: false,
        disableAnimation: prefersReducedMotion.matches,
        // event
        e: false,
        // exit
        exitDelay: 0,
        exitLength: 0,
        exitState: {},
        exitProps: {},
        exitTrigger: false,
        // entry
        entryDelay: 0,
        entryLength: 0,
        entryState: {},
        entryProps: {},
        entryTrigger: false,
        // state updates
        updateContext: obj => setState(obj),
      }

    if (
      prefersReducedMotion &&
      typeof prefersReducedMotion.addEventListener === `function`
    ) {
      prefersReducedMotion.addEventListener("change", () => {
        setState({
          disableAnimation: prefersReducedMotion.matches,
        })
      })
    } else if (
      prefersReducedMotion &&
      typeof prefersReducedMotion.addListener === `function`
    ) {
      prefersReducedMotion.addListener(() => {
        setState({
          disableAnimation: prefersReducedMotion.matches,
        })
      })
    }
  })

  // Did mount
  useEffect(() => {
    this.state.updateContext(getPagesPromises())
  }, [])

  return { children }
}

// ========================================================================== //
// NOTE: This code is repeated in ssr
// ========================================================================== //

// ========================================================================== //
// Root Preserve MUI and Threejs context
// ========================================================================== //
module.exports.wrapRootElement = ({ element }) => {
  if (typeof window !== `undefined`) {
    window.addEventListener("popstate", function (event) {
      // prevent the back button during transitions as it breaks pages
      if (window.__tl_inTransition) {
        window.__tl_back_button_pressed = true
        navigate(window.__tl_desiredPathname)
      }
    })
  }

  return (
    typeof window !== "undefined" &&
    React && (
      <Layout>
        <MaterialUI>{element}</MaterialUI>
      </Layout>
    )
  )
}

// const InternalProvider = require('./context/InternalProvider').default

// module.exports = ({ element }) => {
//   return <InternalProvider>{element}</InternalProvider>
// }

// ========================================================================== //
// Page Preserve transitions
// ========================================================================== //
module.exports.shouldUpdateScroll = () => !window.__tl_inTransition
module.exports.wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <TransitionHandler {...props} {...pluginOptions}>
        {element}
      </TransitionHandler>
    </Layout>
  )
}

// wrap threejs here with higher order animation component
// ...
