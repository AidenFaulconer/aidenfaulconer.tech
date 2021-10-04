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

import { useSpring, interpolate } from '@react-spring/core';
// Platform knowledge is in here ...
import { a } from '@react-spring/web';
// import './styles.css';
// import theme from './theme.js';
// Canvas contents are loaded through an async split bundle
// const Canvas = lazy(() => import("./Canvas"));
// import { Html, useProgress } from "drei";
import { makeStyles } from '@material-ui/core';
import Canvas from './three-portfolio';

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
    minHeight: 400,
    maxHeight: 200,
    borderRadius: theme.custom.borders.brandBorderRadius,
    overflow: 'hidden',
    height: '100%',
    
    [theme.breakpoints.down('sm')]: {
      maxHeight: 50,
    },
    boxShadow: theme.custom.shadows.brand,
    '& canvas': {
      [theme.breakpoints.down('sm')]: {
        maxHeight: 50,
      },
      boxShadow: theme.custom.shadows.brandInset,
      minHeight: 400,
      maxHeight: 200,
      height: '100% !important',
      display: 'block',
      position: 'relative',
    },
  },
}));

const ThreeWrapper = React.memo((props) => {
  const { threeContext } = props;
  const classes = useStyles();

  // ========================================================================== //
  //   Initial react-spring
  // ========================================================================== //
  const [{ x }, set] = useSpring(() => ({
    // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
    to: { x: '#2E00FF' },
    // tells spring what the values mean, and what they should start with
    from: { color: '#2E00FF' },
    // tell spring how the transition should be smoothed between values
    delay: '100',
    config: {
      mass: 5, tension: 500, friction: 50, precision: 0.0001,
    },
  }));

  return (
    <a.div className={classes.threeWrapper} style={{ background: x }}>
      <Suspense fallback={null}>
        <Canvas x={x} set={set} />
      </Suspense>
    </a.div>
  );
}, (pre, post) => {
  return pre?.threeContext !== post?.tension;
});

export default ThreeWrapper;
// ReactDOM.render(<App />, document.getElementById('root'));

// old stuff
// loading indication
// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }
