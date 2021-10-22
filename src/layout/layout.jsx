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
// import { logo } from '../../../static/svgs/hardcoded-svgs';
import PropTypes from 'prop-types';
import { Brightness2, Brightness5 } from '@material-ui/icons';
import Navigation from './navigation';
import Footer from './footer';
import { useGyro, useToggle } from '../components/util/customHooks';
import EndOfPage from '../components/endOfPage';
import { HeroHeader } from '../templates/heroHeader';
import { useStore } from '../store/store';
import { hexToAlpha } from '../store/theme';

const useStyles = makeStyles((theme) => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
  fab: {
    borderRadius: '100%',
    background: `${hexToAlpha(theme.palette.text.primary, 0.6)} !important`,
    backdropFilter: 'blur(35px)',
    transform: 'scale(.75)',
  },
  post: {},
}));

const Layout = (props) => {
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
  const { children, window } = props;
  // if (typeof window === "undefined") return

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
        {
          !(function (c, h, i, m, p) {
            (m = c.createElement(h)),
            (p = c.getElementsByTagName(h)[0]),
            (m.async = 1),
            (m.src = i),
            p.parentNode.insertBefore(m, p);
          }(
            document,
            'script',
            'https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js',
          ))
        }
      </script>
    </Helmet>
  );

  const mySerif = '"Noto Serif TC", "Noto Serif SC", "Noto Serif", "serif"';

  const mySans = '"Merriweather", "Source Sans Pro", "sans-serif"';

  const classes = useStyles();
  const toggleTheme = useStore((state) => state.appContext.toggleTheme);
  const type = useStore((state) => state.appContext.type);
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
          className={classes.fab}
          color="primary"
          onClick={scrollToTop}
          size="small"
          style={{ bottom: '65px', right: '13px', position: 'fixed' }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
      <Fab
        className={classes.fab}
        onClick={() => toggleTheme()}
        size="small"
        color="primary"
        style={{ bottom: '13px', right: '13px', position: 'fixed' }}
        aria-label="scroll back to top"
      >
        {(type === 'light' && <Brightness5 />) || <Brightness2 />}
      </Fab>
    </>
  );
};
// prop types for Layout
Layout.propTypes = {
  children: PropTypes.node, // .isRequired,
  window: PropTypes.func,
};

export default Layout;
