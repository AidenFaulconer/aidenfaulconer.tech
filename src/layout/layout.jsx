import React, {
  useEffect,
} from 'react';

import { styled } from '@mui/material/styles';

import {
  useStaticQuery, graphql,
} from 'gatsby';

import { Helmet } from 'react-helmet';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Fab,
  useScrollTrigger,
  Zoom,
  useTheme,
} from '@mui/material';
import {
  Brightness2, Brightness5,
} from '@mui/icons-material';
import {
  a, useSpring, config,
} from '@react-spring/web';
import { useProgress } from '@react-three/drei';
import Navigation from './navigation';
import Footer from './footer';
import { HeroHeader } from './heroHeader';
import { useStore } from '../store/store';
import { hexToAlpha } from '../store/theme';

import MaterialUI from './materialUI';


// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.

const Layout = (props) => {
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
  const animatedOpacity = useStore((state) => state.threejsContext.context.animatedOpacity);

  // we cant ssr the entire app because gatsby-plugin-material-ui does not deal with window undefined, really stupid on the plugin creators behalf, it is a problem with gatsby-plugin-material-ui
  // use
  // if (typeof window === 'undefined') return null;
  const fabStyles = {
    borderRadius: '100%',
    background: (theme) => `${hexToAlpha(theme.palette.text.primary, 0.6)} !important`,
    backdropFilter: 'blur(35px)',
    transform: 'scale(.75)',
  };

  if (process.env.NODE_ENV === 'development') console.log('layout: time elapsed now', performance.now());
  return (
    <div
      style={{
        overflowX: 'hidden',
        maxWidth: '100vw',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: type === 'light' ? '#E6EBFA' : '#000064',
        color: 'rgba(1,1,100,.1)',
      }}
      id="#root"
      className="pattern-horizontal-lines-md"
    >
      <PageTransitionOverlay />
      <MaterialUI>
        <Navigation />

        <HeroHeader id="projects" />
        <div style={{ opacity: animatedOpacity }}>
          {children}
        </div>

        <Footer />
        <Zoom in={trigger} role="presentation">
          <Fab
            sx={{
              ...fabStyles,
            }}
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
          sx={{
            ...fabStyles,
          }}
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
};

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
    if (process.env.NODE_ENV === 'production') {
      alert(`
    Hello visitor!

    You are viewing a preview of my new site,
    come back in a few days to see a completed version...
    and see everything I have to offer!

    Best Regards - Aiden Faulconer
    `);
    }
    // }
  }, []);
  return (<div />);
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
    from: { left: '-215vw', background: 'white', transform: 'skew(0deg)' },
    // delay: 2000,
    immediate: true,
    // loop: true,
    config: { ...config.molasses, duration: 600, delay: 0 },
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
  const theme = useTheme();
  const pageChangeStyles = { background: theme.palette.text.secondary };
  return (
    <>
      <a.div
        style={{
          background,
          left,
          transform,
          position: 'fixed',
          display: 'initial',
          width: '200vw',
          height: '100vh',
          // transform: 'skew(10deg)',
          overflow: 'hidden',
          top: '0px',
          // left: '-115vw',
          opacity: 1,
          zIndex: 30,
          visibility: 'visible',
          pointerEvents: 'all',
        }}
      />
    </>
  );
};

export default Layout;
