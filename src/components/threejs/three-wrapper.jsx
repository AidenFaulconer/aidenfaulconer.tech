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
    minHeight: 500,
    minWidth: 400,
    borderRadius: theme.shape.brandBorderRadius,
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    boxShadow: theme.brandShadows.brand,
    '& canvas': {
      boxShadow: theme.brandShadows.brandInset,
      // background: theme.palette.background.default,
      height: '100% !important',
      minHeight: 500,
      minWidth: 400,
      position: 'relative',
    },
  },
}));

const ThreeWrapper = (props) => {
  // useEffect(() => alert(JSON.stringify(currentTheme)), [currentTheme]);
  const { } = props;
  const classes = useStyles();
  // spring works on one property at a time
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
      {/* <a.img
        src={"./assets/graphic.png"}
        alt="carousel-img"
        style={{
          postion: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          zIndex: "100"
        }}
      /> */}
      <Suspense fallback={null}>
        <Canvas x={x} set={set} />
      </Suspense>
    </a.div>
  );
};

export default ThreeWrapper;
// ReactDOM.render(<App />, document.getElementById('root'));

// old stuff
// loading indication
// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }
