/*  */ import React, {
  Suspense,
  lazy,
  useEffect,
} from 'react';
// All hooks are cross platform now

// ========================================================================== //
// page transition
// ========================================================================== //

// Platform knowledge is in here ...
import {
  a, useSpring,
} from '@react-spring/web';
// Canvas contents are loaded through an async split bundle
// const Canvas = lazy(() => import("./Canvas"));
// import { Html, useProgress } from "drei";
import {
  Box, LinearProgress, Typography, useTheme,
} from '@mui/material';
import { useProgress } from '@react-three/drei';
import Loadable from 'react-loadable';
import { useStore } from '../../store/store';
import { DesignWorld } from '../custom/illustrations';

// const Canvas = lazy(() => import('./three-portfolio'));// prevents request is not defined in build-time/ssr rendering from loading gltf models, three.js simply isnt buddies with server-side-rendering it seems
// import Canvas from './three-portfolio';

// The heftiest boy of the codebase, deffinitely also should be code-split
const LoadableCanvas = Loadable({
  loader: () => import('./three-portfolio'),
  loading: () => <p>Loading</p>,
});
// LoadableCanvas.preload();

export const textureRefs = [
  './assets/graphic.png',
  './assets/frame-95.png',
  './assets/hero.png',
  './assets/tank-driver.png',
];
export const colors = ['#823B3B', '#76EFA6', '#F4D1A4', '#666666'];

// must be code-split, as its a hefty component to load
const ThreeWrapper = React.memo(
  (props) => {
    const theme = useTheme();
    // ========================================================================== //
    //   color change spring
    // ========================================================================== //
    const [{ x, y }, set] = useSpring(() => ({
      // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
      to: { x: theme.palette.text.primary, y: 1 },
      // tells spring what the values mean, and what they should start with
      // from: { x: theme.palette.text.primary, y: 1 },
      // tell spring how the transition should be smoothed between values
      // delay: '100',
      config: {
        mass: 15,
        duration: 550,
        tension: 1500,
        friction: 150,
        precision: 0.01,
      },
    }));
      // ========================================================================== //
      //     Add color change spring to global state
      // ========================================================================== //
    useStore.setState((state) => ({
      ...state,
      threejsContext: {
        ...state.threejsContext,
        context: {
          ...state.threejsContext.context,
          aniamtedeColor: x,
          animatedOpacity: y,
        },
        methods: {
          ...state.threejsContext.methods,
          setColor: set,
        },
      },
    }));

    // ========================================================================== //
    //     Handle three.js loading progress
    // ========================================================================== //
    const { progress } = useProgress();
    useEffect(() => {
      console.log(progress);
    }, [progress]);

    // yet another gatsby fix, my god gatsby, your the worst framework ever
    const ref = React.useRef(null);
    useEffect(() => {
      // swap div instance for the canvas, this prevents ssr from trying to compile this **threejs uses window internally** or some shit that breaks it

      // if (ref.current.innerHTML === undefined) {
      //   ref.current.appendChild(
      //     new LoadableCanvas({ x: { x }, setColor: { set } }),
      //   );
      // }
      // console.log(ref.current);
    }, []);

    const loadingScreen = React.useCallback(() => (progress < 99 && (
      <Box sx={{
        width: '100%', height: '100%', zIndex: 10000, top: 0, margin: 'auto',
      }}
      >
        <div style={{
          position: 'absolute', margin: 'auto', width: '100%', height: '100%', top: '30%', zIndex: 30,
        }}
        >
          <Typography variant="h2" color="secondary" align="center">
            Loading projects
          </Typography>
          <LinearProgressWithLabel value={progress} />
        </div>
        {/* <DesignWorld /> */}
      </Box>
    )
    ), [progress]);

    const isSSR = typeof window === 'undefined';// threejs canvas is CLIENT-SIDE only
    return (
      <a.div styles={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 31,
      }}
      >
        {loadingScreen()}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 31,
            '& canvas': {
              zIndex: 31,
              minHeight: '100%',
              minWidth: '100%',
              maxHeight: 200,
              height: ' 100% !important',
              display: 'block',
              position: 'relative',
            },
          }}
        >
          {/* {!isSSR && (<LoadableCanvas x={x} setColor={set} />)} */}
        </Box>
      </a.div>
    );
  },
  // (pre, post) => {
  //   // console.log(pre, post)
  //   return pre.threeContext !== post.threeContext && pre.props !== post.props
  // }
);

export default ThreeWrapper;

// ========================================================================== //
// progress bar
// ========================================================================== //
function LinearProgressWithLabel(props) {
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', width: '100%', alignItems: 'center',
    }}
    >
      <div style={{ width: '50%' }}>
        <LinearProgress color="primary" style={{ border: '1px solid rgba(255,255,255,.3)', height: 15, marginTop: 15 }} variant="determinate" {...props} />
      </div>
      <div style={{ minWidth: 35, marginTop: 15 }}>
        <Typography variant="body2" color="secondary">
          {`${Math.round(
            props.value,
          )}%`}

        </Typography>
      </div>
    </div>
  );
}
function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={_progress} />
    </Box>
  );
}
