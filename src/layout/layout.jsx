import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { useCookies } from 'react-cookie';

import {
  Link, useStaticQuery, graphql, StaticQuery,
} from 'gatsby';

import { Helmet } from 'react-helmet';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { StylesProvider } from '@material-ui/core/styles';
import {
  ThemeProvider,
  Container,
  Fab,
  useScrollTrigger,
  Zoom,
  Backdrop,
  makeStyles,
} from '@material-ui/core';
import MaterialUI from './materialUI';
// import { logo } from '../../../static/svgs/hardcoded-svgs';
import Navigation from './navigation';
import Footer from './footer';
import { useGyro, useStore } from '../components/util/customHooks';
import EndOfPage from '../components/endOfPage';
import { HeroHeader } from '../components/heroHeader';

const useStyles = makeStyles((theme) => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
  post: {},
}));

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

  const scrollToTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#home',
    );

    if (anchor) {
      anchor.scrollIntoView({
        disableHysteresis: true,
        threshold: 150,
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

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
        {!(function (c, h, i, m, p) { m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore(m, p); }(document, 'script', 'https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js'))}
      </script>

    </Helmet>
  );

  const mySerif = '"Noto Serif TC", "Noto Serif SC", "Noto Serif", "serif"';

  const mySans = '"Merriweather", "Source Sans Pro", "sans-serif"';

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
        <EndOfPage/>
        <Footer />
        <Zoom in={trigger} role="presentation">
          <Fab
            onClick={scrollToTop}
            size="small"
            style={{ bottom: '25px', right: '25px', position: 'fixed' }}
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom> 
    </>
  );
}
