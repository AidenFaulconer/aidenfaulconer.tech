/*  */ import React, {
  Suspense,
  lazy,
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
} from 'react';
import ReactDOM from 'react-dom';
import { Color } from 'three';
// All hooks are cross platform now

// ========================================================================== //
// page transition
// ========================================================================== //

// Platform knowledge is in here ...
import {
  a, Transition, useSpring, config,
} from '@react-spring/web';
// Canvas contents are loaded through an async split bundle
// const Canvas = lazy(() => import("./Canvas"));
// import { Html, useProgress } from "drei";
import { Backdrop, makeStyles, useTheme } from '@material-ui/core';
import { useProgress } from '@react-three/drei';
import Canvas from './three-portfolio';
import { forceUpdate, useStaticMethods } from '../util/customHooks';
import { useStore } from '../../store/store';

// reference for the data passed into this 3d experience
export const textureRefs = [
  './assets/graphic.png',
  './assets/frame-95.png',
  './assets/hero.png',
  './assets/tank-driver.png',
];
export const colors = ['#823B3B', '#76EFA6', '#F4D1A4', '#666666'];

const useStyles = makeStyles((theme) => ({
  threeWrapper: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 21,
    boxShadow: theme.custom.shadows.brand,
    '& canvas': {
      zIndex: 21,
      boxShadow: theme.custom.shadows.brandInset,
      minHeight: '100%',
      minWidth: '100%',
      maxHeight: 200,
      height: '100% !important',
      display: 'block',
      position: 'relative',
    },
  },

  transitionWrapper: {
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
}));

const ThreeWrapper = React.memo(
  (props) => {
    const classes = useStyles();
    const theme = useTheme();

    // ========================================================================== //
    //   Initial react-spring
    // ========================================================================== //
    const [{ x }, set] = useSpring(() => ({
      // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
      to: { x: theme.palette.text.primary },
      // tells spring what the values mean, and what they should start with
      from: { color: theme.palette.text.primary },
      // tell spring how the transition should be smoothed between values
      delay: '100',
      config: {
        mass: 5,
        tension: 500,
        friction: 50,
        precision: 0.0001,
      },
    }));
    // useEffect(() => {
    // }, [x])
    const threeContext = useStore((state) => state.threeContext);

    return (
      <>
        <a.div className={classes.threeWrapper}>
          <Suspense fallback={null}>
            <Canvas x={x} setColor={set} />
          </Suspense>
        </a.div>
        <PageTransitionOverlay />
      </>
    );
  },
  // (pre, post) => {
  //   // console.log(pre, post)
  //   return pre.threeContext !== post.threeContext && pre.props !== post.props
  // }
);

const PageTransitionOverlay = () => {
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
    config: { ...config.molasses, duration: 500 },
  }));

  // ========================================================================== //
  //   Listen to store for location changes
  // ========================================================================== //
  const location = useStore((state) => state.appContext.location);
  useEffect(() => {
    triggerTransition();
  }, [location]);

  // ========================================================================== //
  //   Wrap a loading cover
  // ========================================================================== //
  const {
    active, progress, errors, item, loaded, total,
  } = useProgress();

  return (
    <>
      {/* page transitions */}
      <a.div className={classes.transitionWrapper} style={animatedStyles} />
    </>
  );
};

export default ThreeWrapper;
