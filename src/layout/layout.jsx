import React, {
  useEffect,
} from 'react'; 
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
import { saveStore, useStore } from '../store/store';
import { hexToAlpha } from '../store/theme';

import MaterialUI from './materialUI';
import { useEventListener } from '../components/util/customHooks';

import Seo from './seo'

const Layout = (props) => {
  useEventListener('close', saveStore);
  
  const theme = useTheme();
  const { children, window } = props;

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

  const toggleTheme = useStore((state) => state.appContext.methods.toggleTheme);
  const type = useStore((state) => state.appContext.type);

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
      // className="pattern-horizontal-lines-md"
    >
      <Seo />
      {/* <PageTransitionOverlay /> */}
      <MaterialUI>
        <Navigation />

        <HeroHeader id="projects" />
        {/* <div style={{ opacity: animatedOpacity }}> */}
        {children}
        {/* </div> */}

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

const Consolelogs = () => {
  useEffect(() => {
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
    if (process.env.NODE_ENV === 'production') {
      alert(`
    Hello visitor!

    You are viewing a preview of my new site,
    come back in a few days to see a completed version...
    and see everything I have to offer!

    Best Regards - Aiden Faulconer
    `);
    }
  }, []);
  return (<div />);
};

const PageTransitionOverlay = (props) => {
  const {
    active, progress, errors, item, loaded, total,
  } = useProgress();

  const [{ left, background, transform }, triggerPageChange, stopPageChangeTransition] = useSpring(() => ({
    from: { left: '-215vw', background: 'white', transform: 'skew(0deg)' },
    immediate: true,
    config: { ...config.molasses, duration: 600, delay: 0 },
  }));

  const location = useStore((state) => state.appContext.location);
  useEffect(() => {
    // triggerTransition();
  }, [location]);

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
