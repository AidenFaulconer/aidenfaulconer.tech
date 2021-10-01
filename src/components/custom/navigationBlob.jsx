import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useMouse from '@react-hook/mouse-position';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size';

const useStyles = makeStyles((theme) => ({
  svgBlob: {
    position: 'absolute',
    top: '94px', // offset from navigation size
    zIndex: 'inherit',
    transition: 'all 0.3s ease-out',
    fill: theme.palette.background.default,
  },
}));

// do later
// get mouse position thats intersecting this element, then trasnform svg to move out of nowhere
export const NavigationBlob = ({ flipped = false }) => {
  const classes = useStyles({ flipped });

  // refs
  const hitboxRef = React.useRef(null);
  const svgRef = React.useRef(null);

  const onlyWidth = typeof window !== 'undefined' && useWindowWidth(); // responsive width of window

  const [mouseState, setMouseState] = React.useState(0);
  const [mouseHitboxOffset, setMouseHitboxOffset] = React.useState(0);
  const svgOffset = 960;

  const mouse = typeof window !== 'undefined'
    && useMouse(hitboxRef, {
      enterDelay: 100,
      leaveDelay: 100,
    });

  React.useEffect(() => {
    // amount we shift by is mouse.x - the svg offset, add an offset thats a percent different between the svg offset and the window
    const pos = mouse.x - svgOffset + (svgOffset / onlyWidth) * 525;
    // console.log(pos)
    // now set the mouse pos to move the curve so its remembered
    setMouseState(pos);
    // ${19.9998+((svgOffset/onlyWidth)*10)}C583.938
    // check the mouse position, NOT the mouseState (mouse state is offset to be centered with svg)
    if (svgRef.current) svgRef.current.style.transform = `translateX(${mouseState}px)`;
  }, [mouse, onlyWidth]);

  return (
    // div is our hitbox
    <div
      style={{
        // zIndex: 29,
        left: '0px',
        position: 'absolute',
        width: '100%',
        height: '90px',
        background: 'none',
      }}
      ref={hitboxRef}
    >
      {(flipped && (
        <svg
          viewBox="-435.086 0 1920 283.291"
          viewBox="0 0 1920 30"
          className={classes.svgBlob}
          ref={svgRef}
        >
          <path d="M -435.086 283.291 L 1484.914 283.291 C 1484.914 283.291 900.424 253.584 524.462 253.602 C 148.852 253.619 -435.086 283.291 -435.086 283.291 Z" />
        </svg>
      )) || (
        <svg viewBox="0 0 1920 30" className={classes.svgBlob} ref={svgRef}>
          <path d="M841.094 29.1602C882.14 29.6983 921.891 29.9981 959.548 29.9998C962.023 29.9999 964.507 29.9987 967 29.9963V26.552H1087V21.336H1227V17.1632H1397V12.9904H1487V9.86085H1577.32V7.77447H1717.32V3.60169H1851.92C1865.62 2.9594 1877.49 2.39263 1887.32 1.91837V0.311035H0C0 0.311035 16.9517 1.1724 46.9365 2.60169H90.7765V4.65616C104.975 5.31078 120.601 6.02122 137.48 6.77447H230.776V8.86085H321.094V11.9904H411.094V16.1632H581.094V20.336H721.094V25.552H841.094V29.1602Z" fill="" />
        </svg>
      )}
    </div>
  );
};

export default NavigationBlob;
