import React, {
  Component, useEffect, useState, useCallback, useMemo,
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
import {
  AudiotrackOutlined, AudiotrackRounded, Brightness2, Brightness5,
} from '@material-ui/icons';
import {
  a, Transition, useSpring, config,
} from '@react-spring/web';
import { useProgress } from '@react-three/drei';
import Navigation from './navigation';
import Footer from './footer';
import { useGyro, useToggle } from '../components/util/customHooks';
import EndOfPage from '../components/endOfPage';
import { HeroHeader } from '../templates/heroHeader';
import { useStore } from '../store/store';
import { hexToAlpha } from '../store/theme';
import ambianceSound from '../../static/assets/portfolio/ambiance.mp3';

// Platform knowledge is in here ...

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
  pageEnter: {
    position: 'absolute',
    zIndex: 20,
    background: theme.palette.text.primary,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    top: '0px',
    left: '0px',
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'all',
  },
  pageChange: {
    position: 'absolute',
    display: 'initial',
    background: theme.palette.text.secondary,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    top: '0px',
    left: '-100vw',
    opacity: 1,
    zIndex: 30,
    visibility: 'visible',
    pointerEvents: 'all',
  },
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

  // const ambiance = useMemo(() => {
  //   const ambiance = new Audio(ambianceSound);
  //   ambiance.volume = 0.25;
  //   ambiance.loop = true;
  //   return ambiance;
  // }, []);
  // const [ambianceState, toggleAudio] = useToggle(false);
  // useEffect(() => {
  //   if (ambianceState) ambiance.play();
  //   else ambiance.pause();
  // }, [toggleAudio]);

  return (
    <>
      <Navigation />
      <HeroHeader id="projects" />
      <PageTransitionOverlay />
      {children}
      {/* <TableOfContents /> */}
      {/* <EndOfPage /> */}
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
      {/* <Fab
        className={classes.fab}
        onClick={() => { toggleAudio(); }}
        size="small"
        color="primary"
        style={{ bottom: '117px', right: '13px', position: 'fixed' }}
        aria-label="scroll back to top"
      >
        {(ambianceState && <AudiotrackRounded />) || <AudiotrackOutlined />}
      </Fab> */}

    </>
  );
};

const PageTransitionOverlay = React.forwardRef(({ x }, ref) => {
  const classes = useStyles();

  // ========================================================================== //
  //         Trigger and animate page transitions
  // ========================================================================== //
  const [animatedStyles, triggerTransition] = useSpring(() => ({
    to: [
      { opacity: 0.1, visibility: 'visible' },
      { opacity: 0, visibility: 'hidden' },
    ],
    from: { opacity: 1, visibility: 'visible' },
    // delay: 2000,
    immediate: true,
    // loop: true,
    config: { ...config.molasses, duration: 3500 },
  }));

  // ========================================================================== //
  //   Wrap a loading cover
  // ========================================================================== //
  const {
    active, progress, errors, item, loaded, total,
  } = useProgress();

  // ========================================================================== //
  //   page change spring
  // ========================================================================== //
  const [{ left, background }, triggerPageChange] = useSpring(() => ({
    // to: [
    //   // { left: '-200vw', background: 'black' },
    //   // { left: '200vw' /* background: 'white' */ },
    // ],
    from: { left: '-100vw', background: 'white' },
    // delay: 2000,
    immediate: true,
    // loop: true,
    config: { ...config.molasses, duration: 600 },
  }));

  // const [{ x }, set] = useSpring(() => ({
  //   // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
  //   to: { x: theme.palette.text.primary },
  //   // tells spring what the values mean, and what they should start with
  //   from: { color: theme.palette.text.primary },
  //   // tell spring how the transition should be smoothed between values
  //   delay: '100',
  //   config: {
  //     mass: 5,
  //     tension: 500,
  //     friction: 50,
  //     precision: 0.0001,
  //   },
  // }));

  // ========================================================================== //
  //   Listeners to store for location changes
  // ========================================================================== //
  const location = useStore((state) => state.appContext.location);
  useEffect(() => {
    // triggerTransition();
  }, [location]);

  // useStaticMethods([triggerPageChange], ref);

  // ========================================================================== //
  //   Store transition trigger in global store
  // ========================================================================== //
  // add triggerPageChange to zustand store
  useStore.setState((state) => ({
    ...state,
    threejsContext: {
      ...state.threejsContext,
      methods: {
        ...state.threejsContext.methods,
        triggerPageChange,
      },
    },
  }));
  // console.log(useStore((state) => state));

  return (
    <>
      {/* page enter fade */}
      {/* <a.div className={classes.pageEnter} style={animatedStyles} /> */}
      {/* page change */}
      <a.div
        className={classes.pageChange}
        style={{
          background,
          left,
        }}
      />
    </>
  );
});

export default Layout;
