import React, {
  Component, useEffect, useState, useCallback, useMemo, Suspense, lazy,
} from 'react';

import { styled } from '@mui/material/styles';

import { useCookies } from 'react-cookie';

import {
  Link, useStaticQuery, graphql, StaticQuery,
} from 'gatsby';

import { Helmet } from 'react-helmet';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StylesProvider from '@mui/styles/StylesProvider';
import {
  ThemeProvider,
  StyledEngineProvider,
  Container,
  Fab,
  useScrollTrigger,
  Zoom,
  Backdrop,
  useTheme,
} from '@mui/material';
// import { logo } from '../../../static/svgs/hardcoded-svgs';
import PropTypes from 'prop-types';
import {
  AudiotrackOutlined, AudiotrackRounded, Brightness2, Brightness5,
} from '@mui/icons-material';
import {
  a, Transition, useSpring, config,
} from '@react-spring/web';
import { useProgress } from '@react-three/drei';
import Navigation from './navigation';
import Footer from './footer';
import { useGyro, useToggle } from '../components/util/customHooks';
import EndOfPage from '../components/endOfPage';
import { HeroHeader } from './heroHeader';
import { useStore } from '../store/store';
import { hexToAlpha } from '../store/theme';
import ambianceSound from '../../static/assets/portfolio/ambiance.mp3';

import MaterialUI from './materialUI';

const PREFIX = 'Layout';

const classes = {
  threeWrapper: `${PREFIX}-threeWrapper`,
  fab: `${PREFIX}-fab`,
  post: `${PREFIX}-post`,
  pageEnter: `${PREFIX}-pageEnter`,
  pageChange: `${PREFIX}-pageChange`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme,
  },
) => ({
  [`& .${classes.threeWrapper}`]: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },

  [`& .${classes.fab}`]: {
    borderRadius: '100%',
    background: `${hexToAlpha(theme.palette.text.primary, 0.6)} !important`,
    backdropFilter: 'blur(35px)',
    transform: 'scale(.75)',
  },

  [`& .${classes.post}`]: {},

  [`& .${classes.pageEnter}`]: {
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

  [`& .${classes.pageChange}`]: {
    position: 'absolute',
    display: 'initial',
    background: theme.palette.text.secondary,
    width: '100vw',
    height: '100vh',
    transform: 'skew(10deg)',
    overflow: 'hidden',
    top: '0px',
    left: '-115vw',
    opacity: 1,
    zIndex: 30,
    visibility: 'visible',
    pointerEvents: 'all',
  },
}));

const Layout = React.memo((props) => {
  //   //prettier-ignore
  const { site: { siteMetadata: { seoTitle, seoDescription } } } = useStaticQuery(
    graphql`
    query layoutQuery {
      site {
        siteMetadata {
          seoTitle: title
          seoDescription: description
        }
      }
    }
  `,
  );
  const theme = useTheme();

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
    <Helmet
      title={seoTitle}
      meta={[
        { name: 'description', content: seoDescription },
        // { name: 'keywords', content: 'sample, something' },
      ]}
    >
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

  const toggleTheme = useStore((state) => state.appContext.toggleTheme);
  const type = useStore((state) => state.appContext.type);
  const selectedIndex = useStore((state) => state.threejsContext.context.selectedIndex);

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
  // if (typeof window === 'undefined') return null;
  // const [pageChanged, setPageChanged] = useState(false);
  // useEffect(() => {
  //   setPageChanged(true);

  //   setPageChanged(false);
  // }, [selectedIndex]);

  // we cant ssr the entire app because gatsby-plugin-material-ui does not deal with window undefined, really stupid on the plugin creators behalf, it is a problem with gatsby-plugin-material-ui
  // use
  // if (typeof window === 'undefined') return null;

  return (
    <div
      style={{
        overflowX: 'hidden',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#E6EBFA',
        color: 'rgba(1,1,100,.1)',
      }}
      id="#root"
      className="pattern-horizontal-lines-md"
    >
      <MaterialUI>
        <Navigation />

        <HeroHeader id="projects" />

        {/* <PageTransitionOverlay /> */}
        {/* {children} */}

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

        <Consolelogs />

      </MaterialUI>
    </div>
  );
}, (pre, post) => pre !== post);

// {/* <Fab
// className={classes.fab}
// onClick={() => { toggleAudio(); }}
// size="small"
// color="primary"
// style={{ bottom: '117px', right: '13px', position: 'fixed' }}
// aria-label="scroll back to top"
// >
// {(ambianceState && <AudiotrackRounded />) || <AudiotrackOutlined />}
// </Fab> */}
const Consolelogs = () => {
  // prettier-ignore
  // eslint-ignore
  useEffect(() => {
    // eslint-disable-next-line quotes
    console.log(`
                     :-=++*##%%%%###**+=-:.            .:-=+**##%%%%%##*++=-.
                :=*%%%%%%%%%%%%%%%%%%%%%%%%%*=:    :+#%%%%%%%%%%%%%%%%%%%%%%%%%*=:
            .=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=+%%%%%%%%%%%%%*+=--:... ...:--+*#%*=.
          -*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#+-.                     :=**-
        :#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=.                            .=#=
       +%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=.                                 -#:
      *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#.                                    .#-
     =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#.                                      .%.
    .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%:                  ..:::..               =+
    +%%%%%%%%%%%%%%*=::...:-=*%%%%%%%%%%%%%%%%%%%%*               .=*%%%%%%%%#*-            -#
    #%%%%%%%%%%%%*.           .-#%%%%%%%%%%%%%%%%%=             .+%%%%%%%%%%%%%%#.          :#
    %%%%%%%%%%%%%                *%%%%%%%%%%%%%%%%:            .#%%%%%%%%%%%%%%%%=          :#
    %%%%%%%%%%%%#                :%%%%%%%%%%%%%%%%:            =%%%%%%%%%%%%%%%%%+          :#
    %%%%%%%%%%%%#                .%%%%%%%%%%%%%%%%:            +%%%%%%%%%%%%%%%%%+   .:-=+++*+
    %%%%%%%%%%%%#                .%%%%%%%%%%%%%%%%:            +*::---==++***##%%*+++=-:.
    %%%%%%%%%%%%#                .%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%#                .%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%#                .%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%#            .:--+%%%%%%%%%%%%%%%%:            +#-::.
    %%%%%%%%%%%%# .::-=++++++==-:-%%%%%%%%%%%%%%%%:            +%%%%%%%##*++=-::.
    %%%%%%%%%%%%%%*=-::.         :%%%%%%%%%%%%%%%%:            +%%%%%%%%%%%%%%%%%%%%#*++-
    %%%%%%%%%%%%%%%%#*+=-:.      :%%%%%%%%%%%%%%%%:            +%%%%%%%%%%%%%##**++==--+#
    %%%%%%%%%%%%%%%%%%%%%%%%%#*+==%%%%%%%%%%%%%%%%:            =*++==--::..            =#
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%:                                    =#
    %%%%%%%%%%%%%%%%#**##%%%%%%%%%%%%%%%%%%%%%%%%%:                   .:=++++=-.       =#
    %%%%%%%%%%%%%%#.      :=*%%%%%%%%%%%%%%%%%%%%%:                :+#%%%%%%%%%%+      =#
    %%%%%%%%%%%%%%#          .=%%%%%%%%%%%%%%%%%%%:              -#%%%%%%%%%%%%%%:     =#
    %%%%%%%%%%%%%%#            .*%%%%%%%%%%%%%%%%%:             +%%%%%%%%%%%%%%%%:     =#
    %%%%%%%%%%%%%%#             .%%%%%%%%%%%%%%%%%:            -%:-=+#%%%%%%%%%%%:  .:=**
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*       .:-=+*#%%*++=-.
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#              #%%%%%%%%%%%%%%%%:            +*
    %%%%%%%%%%%%%%#             .#%%%%%%%%%%%%%%%%:            +*
    :-+*%%%%%%%%%%#     .:-=+*++=#%%%%%%%%%%%%%%%%:            +*
         .:=+#%%%%#-=++++=:.     *%%%%%%%%%%%%%%%%:            +*
               .-=-:.            *%%%%%%%%%%%%%%%%:            +*
                                 *%%%%%%%%%%%%%%%%:            +*
                                 *%%%%%%%%%%%%%%%%:            +*
                                 =*%%%%%%%%%%%%%%%:         :-=#+
                                    .:=+#%%%%%%%%%:   .-=+*+=:.
                                          :-+*%%%%++*+=-.

                               AIDEN FAULCONER DIGITAL                                  
               SOFTWARE | INTERFACE DESIGN | VR | BUSINESS CONSULTATION                 
     aidenfaulconer.tech | linkedin.com/in/aidenfaulconer | github.com/aidenfaulconer   

        `);
    // if (process.env === 'development') {
    // eslint-disable-next-line quotes
    alert(`
    Hello visitor!

    You are viewing a preview of my new site,
    come back in a few days to see a completed version...
    and see everything I have to offer!

    Best Regards - Aiden Faulconer
    `);
    // }
  }, []);
  return (<Root />);
};

const PageTransitionOverlay = (props) => {
  // ========================================================================== //
  //         Trigger and animate page transitions
  // ========================================================================== //
  const [animatedStyles, triggerTransition, stopTransition] = useSpring(() => ({
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
  const [{ left, background, transform }, triggerPageChange, stopPageChangeTransition] = useSpring(() => ({
    // to: [
    //   // { left: '-200vw', background: 'black' },
    //   // { left: '200vw' /* background: 'white' */ },
    // ],
    from: { left: '-115vw', background: 'white', transform: 'skew(0deg)' },
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
      <a.div
        className={classes.pageChange}
        style={{
          background,
          left,
          transform,
        }}
      />
    </>
  );
};

export default Layout;
