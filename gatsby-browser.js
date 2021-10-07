//https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement

import "prismjs/themes/prism-okaidia.css"
import "./src/styles/bootstrap.scss"
import "@fontsource/poppins" // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
import { valtioState } from "./src/store/store-wrapper"

import MaterialUI from "./src/layout/materialUI"
import Layout from "./src/layout/layout"
import React from "react"
import { navigate } from "gatsby"
import { useStateWithCallbackInstant } from "./src/components/util/customHooks"

import InternalProvider from "gatsby-plugin-transition-link/context/InternalProvider"

// ========================================================================== //
// Page Preserve transitions
// ========================================================================== //
export function wrapPageElement({ element, props }, pluginOptions) {
  console.log(element) //element empty!!! why!
  if (typeof window === "undefined") return
  // <Layout {...props}>{element}</Layout>

  //transition-link renders many underlaying components, so we need to wrap them in a div
  return (
    <MaterialUI>
      <InternalProvider /*children={[element]}*/ >
        <Layout {...props}>{[element]}</Layout>
      </InternalProvider>
    </MaterialUI>
  )
}
