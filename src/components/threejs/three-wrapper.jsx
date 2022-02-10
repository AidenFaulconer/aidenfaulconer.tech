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
import Canvas from './three-portfolio';
import { forceUpdate, useStaticMethods, reRenderOnVariables } from '../util/customHooks';
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
  },
}));

const ThreeWrapper = React.memo(
  (props) => {
    const classes = useStyles();
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
    // useEffect(() => {
      // }, [x])
    const threeContext = useStore((state) => state.threeContext);
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

    // {
    //   ...state,
    //   threejsContext: {
    //     ...state.threejsContext,
    //     selected: {
    //       ...state.threejsContext.selected,
    //       selectedIndex: state.threejsContext.selected.selectedIndex + 1,
    //     },
    //   },

    return (
      <>
        <a.div className={classes.threeWrapper}>
          <Suspense fallback={null}>
            <Canvas x={x} setColor={set} />
          </Suspense>
        </a.div>
      </>
    );
  },
  // (pre, post) => {
  //   // console.log(pre, post)
  //   return pre.threeContext !== post.threeContext && pre.props !== post.props
  // }
);

export default ThreeWrapper;
