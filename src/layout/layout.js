
import React, { Component, useEffect, useState, useCallback } from "react"

import { useCookies } from "react-cookie"

import { Link, useStaticQuery, graphql, StaticQuery } from "gatsby"

import Footer from "./footer"

import { Helmet } from "react-helmet"
import Navigation from "./navigation"
import { logo } from "../../static/hardcoded-svgs"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import { StylesProvider } from "@material-ui/core/styles"
import {
  ThemeProvider,
  Container,
  Fab,
  useScrollTrigger,
  Zoom,
  Backdrop,
  makeStyles
} from "@material-ui/core"
import { theme } from "./theme"

const useStyles = makeStyles(theme => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
  post: {}
}))

export default function Layout({ children, window }) {
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




  const Head = () =>
	<Helmet>
		<meta name="viewpoint" content="minimum-scale=1, initial-scale=1, width=device-width" />
		<link href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:300,400|Noto+Serif+TC:300,400|Noto+Serif|Source+Sans+Pro:400,400i,700,700i|Merriweather&display=swap" rel="stylesheet" />
	</Helmet>;

const mySerif = `"Noto Serif TC", "Noto Serif SC", "Noto Serif", serif`;

const mySans = `"Merriweather", "Source Sans Pro", sans-serif`;




  return (
    <React.StrictMode>
      {/* Provide our custom theme to components */}
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Helmet>
            {/* <title>{title}</title> */}
            {/* <meta name="description" content={description} /> */}
          </Helmet>
          <Navigation />

              {children}
              {/* <TableOfContents /> */}

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
        </StylesProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
} 