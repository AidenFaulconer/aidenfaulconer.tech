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
import { makeStyles, useTheme } from '@material-ui/core';
import Canvas from './three-portfolio';
import { valtioState } from '../../store/store-wrapper';
import { useSnapshot } from 'valtio';

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
    zIndex: 0,
    boxShadow: theme.custom.shadows.brand,
    '& canvas': { 
      zIndex: 0,
      boxShadow: theme.custom.shadows.brandInset,
      minHeight: '100%',
      minWidth: '100%',
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
      mass: 5, tension: 500, friction: 50, precision: 0.0001,
    },
  }));
  // useEffect(() => {
  // }, [x])

  return (
    <a.div className={classes.threeWrapper}>
      <Suspense fallback={null}>
        <Canvas x={x} setColor={set} />
      </Suspense>
    </a.div>
  );
}, (pre, post) => {
  // return pre?.threeContext !== post?.tension;
  console.log(pre,post)
  return pre.threeContext !== post.threeContext;
}
);

export default ThreeWrapper;
// ReactDOM.render(<App />, document.getElementById('root'));

// old stuff
// loading indication
// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }
