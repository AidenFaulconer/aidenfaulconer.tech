/* eslint-disable no-restricted-properties */
/* eslint-disable no-multi-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
// This is where I define elements of my theme. 

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createSpacing from '@material-ui/core/styles/createSpacing';
import createTypography from '@material-ui/core/styles/createTypography';
import transitions from '@material-ui/core/styles/transitions';

import * as React from 'react';

// ========================================================================== //
// Noise generation
// ========================================================================== //
import SimplexNoise from 'simplex-noise';

// ========================================================================== //
// Base Theme
// ========================================================================== //

// theme = { ...theme, ...baseTheme };
// responsiveFontSizes(createMuiTheme(), {
// breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
// disableAlign: false,
// factor: 0.5,
// variants: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
// });

const defaultSpacing = [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
const defaultPadding = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
const defaultMargin = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
const defaultLayout = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];

const defaultBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

const customizeGridSystem = (theme, breakpoints) => {
  const {
    spacing,
    gutters,
    widthCap,
    gutter,
    widthCap: widthCap2,
    gutter: gutter2,
  } = theme.layout;
};

const layoutGrid = {
  spacing: defaultSpacing,
  gutters: 20,
  breakpoints: defaultBreakpoints,
  widthCap: {
    xs: 600,
    sm: 960,
  },
};

// ========================================================================== //
// Create default values
// ========================================================================== //

const spacing = createSpacing(4);
const breakpoints = createBreakpoints({});
// createTypography()

// ========================================================================== //
// Sizing
// ========================================================================== //
const inputToGoldenRatio = (input) => {
  const goldenRatio = 1.61803398875;
  return input * goldenRatio;
};
const parentSizeToChildSizeGoldenRatio = (parentSize) => {
  const goldenRatio = 1.61803398875;
  return parentSize / goldenRatio;
};

// convert object to a string, inject paramater input into the string object, then convert it back to an object
export const objectTokenizer = (object, parameter) => JSON.stringify(object, null, 2).replace(
  /"([a-zA-Z]+)"/g,
  (match, p1) => `"${parameter[p1]}`,
);

// function generateNoisePng(
//   width,
//   height,
//   seed,
//   octaves,
//   persistence,
//   lacunarity,
//   scale,
// ) {
//   const noise = new SimplexNoise(seed);
//   const size = width * height * 4;
//   const data = new Uint8Array(size);
//   for (let i = 0; i < size; i += 4) {
//     const x = (i / 4) % width;
//     const y = ~~(i / 4 / width);
//     let value = 0;
//     for (let j = 0; j < octaves; j++) {
//       const frequency = Math.pow(2, j);
//       const amplitude = Math.pow(persistence, j);
//       value
//         += noise.noise2D(x * scale * frequency, y * scale * frequency) * amplitude;
//     }
//     value = value * 128 + 128;
//     data[i] = data[i + 1] = data[i + 2] = value;
//     data[i + 3] = 255;
//   }
//   // color the noise
//   // const canvas = document.createElement('canvas');
//   // canvas.width = width;
//   // canvas.height = height;
//   // const context = canvas.getContext('2d');
//   // const imageData = context.createImageData(width, height);
//   // imageData.data.set(data);
//   // context.putImageData(imageData, 0, 0);
//   // return canvas.toDataURL();

//   return `url(data:image/png;base64,${typeof window !== 'undefined' && btoa(data)})`;
// }

// ========================================================================== //
// Font scaling
// ========================================================================== //
const fontSize = 14; // px
// Tell Material-UI what's the font-size on the html element.
// 16px is the default font-size used by browsers.
const htmlFontSize = 16;
const coef = fontSize / 14;
export const pxToRem = (px) => `${(px / htmlFontSize) * coef}rem !important`;

// ========================================================================== //
//   Typography
// ========================================================================== //
const TYPOGRAPHY = {
  // spacingFromHeader: spacing(6),
  typography: {
    // body1.textOverflow = 'ellipsis';
    // body2.textOverflow = 'ellipsis';
    // body2.overflow = 'hidden';
    // body2.maxHeight = '200px';
    fontFamily: 'Poppins',

    h1: {
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: pxToRem(38),
      lineHeight: '105%',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontFeatureSettings: "'ss03' on",
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(23),
      },
    },
    h2: {
      textTransform: 'uppercase',
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: pxToRem(35),
      lineHeight: '96%',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(20),
      },
    },
    h3: {
      textTransform: 'capitalize',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: pxToRem(28),
      lineHeight: '120%',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(20),
      },
    },
    h4: {
      fontWeight: 'bold',
      fontSize: pxToRem(14),
      lineHeight: '110%',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(14),
      },
    },
    h5: {
      fontSize: pxToRem(12),
      fontWeight: 400,
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    body1: {
      lineHeight: '150%',
      fontStyle: 'normal',
      fontWeight: 200,
      fontSize: pxToRem(17),
      background: 'inherit',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    button: {
      fontSize: pxToRem(12),
      fontWeight: 300,
      fontStyle: 'italic',
      background: 'inherit',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    // extras
    title: {
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    selection: {
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    small: {
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },
    extraSmall: {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: pxToRem(14),
      lineHeight: '105%',
      [breakpoints.down('sm')]: {
        fontSize: pxToRem(12),
      },
    },

  },
};

// generated wi

// ========================================================================== //
// THEMES
// ========================================================================== //
const CUSTOM_THEME_PROPS = {
  custom: {
    contrast: {
      black: '#00004D',
    },
    borders: {
      brandBorderRadius: '3px',
      brandBorderRadius2: '13px',
      brandBorderRadius3: '22px',
      // brandBorder: '1px solid rgba(255,255,255,.2)',
      // brandBorder: '1px double #313183',
      // brandBorder: '1px double #313183',
      brandBorder: '1px double #635AB2',
      brandBorderSecondary: '1px double #979ac9',
      // brandBorderSecondary: '1px solid rgba(0, 0, 100, 0.3)',
    },
    shadows: {
      brand: '-20px 34px 55px rgba(0, 0, 100, 0.15);',
      filterShadow: '0px 0px 20px rgba(51, 68, 9,.6)',
      brandBig:
        '-46px 31px 75px rgba(0, 0, 0, 0.4)',
    },
  },
};

const THEME_TYPE = { DARK: 'DARK', LIGHT: 'LIGHT' };
const LIGHT_THEME = {
  ...TYPOGRAPHY,
  ...CUSTOM_THEME_PROPS,
  palette: {
    type: 'light',
    primary: {
      main: '#000064',
    },
    secondary: {
      main: '#E6EBFA',
    },
    text: {
      primary: '#000064',
      secondary: '#E6EBFA',
    },
    background: {
      button: '#2E00FF',
      soft: '#20188D',
      default: '#E6EBFA',
      special: '#B466FF',
      specialTwo: '#1AE6C7',
      pipes: `linear-gradient(180deg, rgba(180, 102, 255, 0) 0%, rgba(180, 102, 255, 0) 0%, #B466FF 0.01%, rgba(58, 195, 223, 0) 55.73%, #1AE6C7 55.73%, #34CFD1 55.74%, rgba(135, 139, 239, 0) 99.26%, #6496FF 99.27%, rgba(180, 102, 255, 0) 99.28%)
      `,
      pipesTwo: `
      linear-gradient(180deg, #6496FF 0%, rgba(100, 150, 255, 0) 12.04%, rgba(180, 102, 255, 0) 30.72%, #B466FF 43.61%, rgba(180, 102, 255, 0) 43.67%, rgba(58, 195, 223, 0) 55.45%, #1AE6C7 55.73%, #34CFD1 55.74%, rgba(52, 207, 209, 0) 68.05%, rgba(100, 150, 255, 0) 87.03%, #6496FF 99.28%)
      `,
    },
  },
};
const DARK_THEME = {
  ...TYPOGRAPHY,
  ...CUSTOM_THEME_PROPS,
  palette: {
    type: 'light',
    secondary: {
      main: '#000064',
    },
    primary: {
      main: '#E6EBFA',
    },
    text: {
      secondary: '#000064',
      primary: '#E6EBFA',
    },
    background: {
      button: '#2E00FF',
      soft: '#20188D',
      default: '#E6EBFA',
      special: '#B466FF',
      specialTwo: '#1AE6C7',
      pipes: 'radial-gradient(121.02% 50% at 50% 50%, rgba(180, 102, 255, 0) 0%, rgba(180, 102, 255, 0) 0%, #B466FF 0.01%, rgba(58, 195, 223, 0) 55.73%, #1AE6C7 55.73%, #34CFD1 55.74%, rgba(135, 139, 239, 0) 99.26%, #6496FF 99.27%, rgba(180, 102, 255, 0) 99.28%)',
      pipesTwo: `
        linear-gradient(180deg, 
          rgba(180, 102, 255, 0) 15.57%, 
        rgba(180, 102, 255, 0) 30.21%, 
        #B466FF 43.73%, 
        #6496FF 43.74%, 
        rgba(58, 195, 223, 0) 55.73%, 
        #1AE6C7 55.73%, 
        #34CFD1 55.74%,
        rgba(135, 139, 239, 0) 69.53%, 
        rgba(180, 102, 255, 0) 99.28%)
      `,
    },
  },
};
// linear-gradient(180deg, #6496FF 0%,
// rgba(100, 150, 255, 0) 12.04%,
// rgba(180, 102, 255, 0) 30.72%,
// #B466FF 43.61%,
// rgba(180, 102, 255, 0) 43.67%,
// rgba(58, 195, 223, 0) 55.45%,
// #1AE6C7 55.73%,
// #34CFD1 55.74%,
// rgba(52, 207, 209, 0) 68.05%,
// rgba(100, 150, 255, 0) 87.03%,
// #6496FF 99.28%)
// ========================================================================== //
// Special Patterns
// ========================================================================== //
const _theme = LIGHT_THEME;

export const transition = transitions.create(
  ['color', 'box-shadow', 'background', 'margin', 'border'],
  { duration: '0.3s', easing: 'ease-in-out' },
);
// ========================================================================== //
//     css style functions and special effects
// ========================================================================== //
// use width 52 and height 26 for these type of special svgs
// string to base64 client side function
export const stringToBase64 = (str) => (typeof window !== 'undefined'
    && btoa(
      new Uint8Array(
        str.match(/\w{2}/g).map((item) => parseInt(item, 16)),
      ).reduce((acc, curr) => acc + String.fromCharCode(curr), ''),
    ))
  || '';
// const btoa = (str) => Buffer.from(str).toString('base64');

// const function that calculates alpha value from hex color
export const hexToAlpha = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const svgEncode = (svg) => `url(data:image/svg+xml,${encodeURIComponent(svg)})`;
export const svgEncodeBaseSixtyFour = (svg) => `url(data:image/svg+xml;base64,${typeof window !== 'undefined' && btoa(svg)})`;
// ========================================================================== //
// animations in material-ui need to be pre-pended a $ before the name of animation
// ========================================================================== //

// ========================================================================== //
//    Social media popup https://codepen.io/Mahmood_bagheri/pen/YzqNqEb
// ========================================================================== //

export const socialMediaPopupKeyframes = {};

export const socialMediaPopup = {
  // button {
  // all: unset;
  // background: var(--white);
  // border: 2px solid var(--gray);
  // color: var(--gray);
  // padding: 15px 30px;
  // border-radius: var(--max);
  // cursor: pointer;
  // transition: 500ms all ease-in-out;
  // height: 40px;
  // position: relative;
  // overflow: hidden;
  // text-align: center;
  // width: 200px;
  //   &:hover {
  //     background: var(--blue);
  //     border-color: var(--blue);
  //     color: var(--blue);
  //   }
  //   &:hover .icons {
  //     &__icon {
  //       transform: translateY(-75%);
  //       transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55); /* easeInOutBack */
  //       &:nth-child(1) {
  //         transition-delay: 30ms;
  //       }
  //       &:nth-child(2) {
  //         transition-delay: 60ms;
  //       }
  //       &:nth-child(3) {
  //         transition-delay: 90ms;
  //       }
  //       &:nth-child(4) {
  //         transition-delay: 120ms;
  //       }
  //       &:nth-child(5) {
  //         transition-delay: 150ms;
  //       }
  //     }
  //   }
  // }
  // .icons {
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   display: flex;
  //   width: 100%;
  //   justify-content: space-around;
  //   &__icon {
  //     background: var(--white);
  //     height: 25px;
  //     width: 25px;
  //     border-radius: var(--max);
  //     background: var(--white);
  //     padding: 6px;
  //     transform: translateY(60%);
  //     transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55); /* easeInOutBack */
  //     &:nth-child(1) {
  //       transition-delay: 20ms;
  //     }
  //     &:nth-child(2) {
  //       transition-delay: 40ms;
  //     }
  //     &:nth-child(3) {
  //       transition-delay: 60ms;
  //     }
  //     &:nth-child(4) {
  //       transition-delay: 80ms;
  //     }
  //     &:nth-child(5) {
  //       transition-delay: 100ms;
  //     }
  //     svg {
  //       stroke: var(--blue);
  //     }
  //   }
  // }
};

// ========================================================================== //
//    3d hover
// ========================================================================== //
export const threeDHoverKeyframes = {
  '@keyframes rotateAngle': {
    '0%': {
      transform: 'rotateY(0deg) rotateX(10deg) rotateZ(0deg)',
      animationTimingFunction: 'cubic-bezier(0.61, 1, 0.88, 1)',
    },
    '25%': {
      transform: 'rotateY(20deg) rotateX(10deg) rotateZ(20deg)',
    },
    '50%': {
      transform: 'rotateY(0deg) rotateX(10deg) rotateZ(60deg)',
      animationTimingFunction: 'cubic-bezier(0.61, 1, 0.88, 1)',
    },
    '75%': {
      transform: 'rotateY(180deg) rotateX(10deg) rotateZ(160deg)',
    },
    '100%': {
      transform: 'rotateY(360deg) rotateX(10deg) rotateZ(360deg)',
    },
  },
};
export const threeDHover = {
  transform: 'rotatex(10deg)',
  animation: '$rotateAngle 6s linear infinite',
  '&:hover': {
    color: _theme.palette.primary.main,
    perspective: 500,
    transformStyle: 'preserve-3d',
  },
};
// $makestyle/css name **allow reference to other css**

// ========================================================================== //
//   Pattern hover
// ========================================================================== //
export const patternHoverKeyframes = {
  '@keyframes animatedBackground': {
    from: {
      backgroundPosition: '0 0',
    },
    to: {
      backgroundPosition: '100% 0',
    },
  },
};
export const patternHover = {
  animation: '$animatedBackground 5s linear infinite alternate',
  '&:hover': {
    boxShadow: `${_theme.custom.shadows.brand} !important`,
    borderRadius: _theme.custom.borders.brandBorderRadius,
    color: `${_theme.palette.background.default} !important`,

    backgroundColor: _theme.palette.background.button,
    backgroundImage: svgEncodeBaseSixtyFour(`
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
      <path opacity="0.5" d="M30.6361 5.31863C30.7362 5.37622 30.7364 5.52057 30.6365 5.57845L23.0582 9.96764C23.0119 9.9945 22.9547 9.99458 22.9083 9.96786L15.3123 5.59815C15.2122 5.54057 15.212 5.39621 15.3119 5.33833L22.8902 0.949144C22.9365 0.92229 22.9937 0.922207 23.0401 0.948924L30.6361 5.31863Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M22.9424 -7.94271C22.9421 -8.05828 23.0671 -8.13074 23.1672 -8.07305L30.759 -3.69993C30.8054 -3.67323 30.834 -3.62387 30.8341 -3.57038L30.8592 5.18872C30.8595 5.30428 30.7346 5.37679 30.6344 5.31917L23.0387 0.949597C22.9922 0.922897 22.9636 0.873481 22.9635 0.819937L22.9424 -7.94271Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M22.7903 -8.13821C22.8902 -8.19613 23.0153 -8.12426 23.0156 -8.00882L23.0367 0.754202C23.0368 0.807847 23.0083 0.857478 22.9619 0.884364L15.3835 5.27362C15.2836 5.33147 15.1586 5.25954 15.1583 5.14411L15.1408 -3.61495C15.1407 -3.66854 15.1692 -3.71812 15.2156 -3.745L22.7903 -8.13821Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M38.682 19.1085C38.7821 19.1661 38.7823 19.3105 38.6824 19.3684L31.1041 23.7576C31.0578 23.7844 31.0006 23.7845 30.9542 23.7578L23.3582 19.3881C23.2581 19.3305 23.2579 19.1861 23.3578 19.1283L30.9361 14.7391C30.9824 14.7122 31.0396 14.7121 31.086 14.7388L38.682 19.1085Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M30.9853 5.84769C30.9851 5.73213 31.1101 5.65967 31.2102 5.71735L38.802 10.0905C38.8483 10.1172 38.877 10.1665 38.8771 10.22L38.9022 18.9791C38.9025 19.0947 38.7775 19.1672 38.6774 19.1096L31.0816 14.74C31.0352 14.7133 31.0066 14.6639 31.0064 14.6103L30.9853 5.84769Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M30.8372 5.65085C30.9371 5.59293 31.0622 5.6648 31.0625 5.78024L31.0836 14.5433C31.0837 14.5969 31.0552 14.6465 31.0087 14.6734L23.4304 19.0627C23.3305 19.1205 23.2055 19.0486 23.2052 18.9332L23.1877 10.1741C23.1876 10.1205 23.2161 10.0709 23.2624 10.0441L30.8372 5.65085Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M38.6203 19.6416C38.716 19.5899 38.8332 19.6541 38.8411 19.7626L39.51 28.8953C39.5143 28.9543 39.4836 29.0103 39.4316 29.0383L32.0028 33.0405C31.9071 33.0921 31.79 33.0278 31.7821 32.9194L31.1171 23.791C31.1128 23.7321 31.1435 23.6762 31.1955 23.6481L38.6203 19.6416Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M14.7377 5.46536C14.8378 5.52295 14.838 5.6673 14.738 5.72518L7.1598 10.1144C7.11344 10.1412 7.05627 10.1413 7.00983 10.1146L-0.586135 5.74488C-0.686236 5.6873 -0.686448 5.54294 -0.586517 5.48506L6.99173 1.09587C7.03809 1.06902 7.09526 1.06894 7.1417 1.09565L14.7377 5.46536Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M7.05174 -7.79989C7.05146 -7.91546 7.17647 -7.98791 7.27661 -7.93023L14.8684 -3.55711C14.9147 -3.53041 14.9434 -3.48105 14.9435 -3.42756L14.9686 5.33154C14.9689 5.4471 14.8439 5.51961 14.7438 5.46199L7.14803 1.09242C7.10162 1.06572 7.07296 1.0163 7.07283 0.962759L7.05174 -7.79989Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M6.89582 -7.99344C6.99568 -8.05136 7.12079 -7.97948 7.12107 -7.86404L7.14216 0.898978C7.14229 0.952623 7.11376 1.00225 7.06734 1.02914L-0.511007 5.41839C-0.610892 5.47624 -0.735954 5.40432 -0.736185 5.28889L-0.75372 -3.47017C-0.753828 -3.52376 -0.725335 -3.57334 -0.678976 -3.60023L6.89582 -7.99344Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M22.7787 19.2555C22.8788 19.3131 22.879 19.4575 22.7791 19.5153L15.2008 23.9045C15.1545 23.9314 15.0973 23.9315 15.0508 23.9048L7.45488 19.535C7.35478 19.4775 7.35457 19.3331 7.4545 19.2752L15.0327 14.886C15.0791 14.8592 15.1363 14.8591 15.1827 14.8858L22.7787 19.2555Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M15.0898 5.99222C15.0895 5.87666 15.2146 5.8042 15.3147 5.86188L22.9065 10.235C22.9528 10.2617 22.9814 10.3111 22.9816 10.3646L23.0066 19.1237C23.007 19.2392 22.882 19.3117 22.7818 19.2541L15.1861 14.8845C15.1397 14.8578 15.111 14.8084 15.1109 14.7549L15.0898 5.99222Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M14.9378 5.79697C15.0377 5.73905 15.1628 5.81092 15.1631 5.92636L15.1842 14.6894C15.1843 14.743 15.1558 14.7927 15.1093 14.8195L7.53098 19.2088C7.4311 19.2666 7.30604 19.1947 7.30581 19.0793L7.28827 10.3202C7.28816 10.2666 7.31666 10.2171 7.36302 10.1902L14.9378 5.79697Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M30.8285 33.0425C30.9286 33.1001 30.9288 33.2445 30.8289 33.3023L23.2506 37.6915C23.2043 37.7184 23.1471 37.7185 23.1006 37.6917L15.5047 33.322C15.4046 33.2644 15.4044 33.1201 15.5043 33.0622L23.0825 28.673C23.1289 28.6462 23.1861 28.6461 23.2325 28.6728L30.8285 33.0425Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M23.1377 19.7808C23.1374 19.6652 23.2624 19.5928 23.3625 19.6505L30.9543 24.0236C31.0007 24.0503 31.0293 24.0996 31.0295 24.1531L31.0545 32.9122C31.0548 33.0278 30.9299 33.1003 30.8297 33.0427L23.234 28.6731C23.1876 28.6464 23.1589 28.597 23.1588 28.5434L23.1377 19.7808Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M22.9827 19.5862C23.0826 19.5282 23.2077 19.6001 23.208 19.7155L23.2291 28.4786C23.2292 28.5322 23.2007 28.5818 23.1543 28.6087L15.5759 32.998C15.476 33.0558 15.351 32.9839 15.3507 32.8685L15.3332 24.1094C15.3331 24.0558 15.3616 24.0062 15.4079 23.9794L22.9827 19.5862Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M-8.84475 -7.65524C-8.84502 -7.7708 -8.72001 -7.84326 -8.61987 -7.78558L-1.0281 -3.41246C-0.98175 -3.38576 -0.953125 -3.3364 -0.952972 -3.28291L-0.927928 5.47619C-0.927597 5.59175 -1.05256 5.66427 -1.15272 5.60664L-8.74845 1.23707C-8.79487 1.21037 -8.82353 1.16096 -8.82366 1.10741L-8.84475 -7.65524Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M6.89098 19.3975C6.99109 19.4551 6.9913 19.5994 6.89137 19.6573L-0.686877 24.0465C-0.733241 24.0734 -0.790408 24.0734 -0.836852 24.0467L-8.43281 19.677C-8.53292 19.6194 -8.53313 19.4751 -8.4332 19.4172L-0.854954 15.028C-0.808589 15.0011 -0.751422 15.0011 -0.704979 15.0278L6.89098 19.3975Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M-0.8008 6.13627C-0.801078 6.0207 -0.676068 5.94824 -0.575929 6.00593L7.01585 10.379C7.0622 10.4057 7.09082 10.4551 7.09097 10.5086L7.11602 19.2677C7.11635 19.3833 6.99139 19.4558 6.89122 19.3981L-0.704508 15.0286C-0.750921 15.0019 -0.779582 14.9525 -0.779711 14.8989L-0.8008 6.13627Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M-0.952815 5.94101C-0.852955 5.88309 -0.727839 5.95496 -0.727561 6.0704L-0.70647 14.8334C-0.706341 14.8871 -0.73487 14.9367 -0.781291 14.9636L-8.35964 19.3528C-8.45952 19.4107 -8.58459 19.3388 -8.58482 19.2233L-8.60235 10.4643C-8.60246 10.4107 -8.57397 10.3611 -8.52761 10.3342L-0.952815 5.94101Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.5" d="M14.9418 33.1848C15.0419 33.2424 15.0421 33.3868 14.9421 33.4447L7.3639 37.8339C7.31754 37.8607 7.26037 37.8608 7.21393 37.8341L-0.382034 33.4644C-0.482135 33.4068 -0.482347 33.2624 -0.382415 33.2045L7.19583 28.8154C7.24219 28.7885 7.29936 28.7884 7.3458 28.8151L14.9418 33.1848Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M7.24803 19.9235C7.24775 19.8079 7.37276 19.7355 7.4729 19.7932L15.0647 24.1663C15.111 24.193 15.1396 24.2423 15.1398 24.2958L15.1648 33.0549C15.1652 33.1705 15.0402 33.243 14.94 33.1854L7.34432 28.8158C7.29791 28.7891 7.26925 28.7397 7.26912 28.6861L7.24803 19.9235Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.7" d="M7.09601 19.7285C7.19587 19.6706 7.32099 19.7424 7.32127 19.8579L7.34236 28.6209C7.34249 28.6745 7.31396 28.7242 7.26754 28.7511L-0.310812 33.1403C-0.410697 33.1982 -0.535759 33.1262 -0.53599 33.0108L-0.553525 24.2518C-0.553632 24.1982 -0.52514 24.1486 -0.478781 24.1217L7.09601 19.7285Z" fill="white" fill-opacity="0.5"/>
      <path opacity="0.6" d="M-8.6465 20.0688C-8.64678 19.9532 -8.52177 19.8807 -8.42163 19.9384L-0.829857 24.3115C-0.783508 24.3382 -0.754883 24.3876 -0.75473 24.4411L-0.729685 33.2002C-0.729355 33.3157 -0.854317 33.3883 -0.954482 33.3306L-8.55021 28.9611C-8.59662 28.9344 -8.62529 28.885 -8.62541 28.8314L-8.6465 20.0688Z" fill="white" fill-opacity="0.5"/>
      </g>
      <defs>
      <clipPath id="clip0">
      <rect width="31" height="30" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      `),
  },
};

// ========================================================================== //
// Theme patterns
// ========================================================================== //
// export const sideBorders = {
//   '&::before': {
//     background: _theme.palette.text.primary,
//     content: '""',
//     left: 0,
//     top: -1,
//     position: 'absolute',
//     height: '100%',
//     width: '86.5%',
//     margin: _theme.spacing('auto', 6),
//     borderLeft: _theme.custom.borders.brandBorder,
//     borderRight: _theme.custom.borders.brandBorder,
//   },
// };
const commonButton = {
  root: {
    transition,
    // boxShadow: `${_theme.custom.shadows.brand} !important`,
    color: _theme.palette.background.default,
    borderRadius: `${_theme.custom.borders.brandBorderRadius} !important`,
    border: _theme.custom.borders.brandBorder,
    whiteSpace: 'nowrap',
    // display: 'inline',
    minWidth: 'fit-content',
    textOverflow: 'ellipsis',
    boxShadow: 'none !important',
    textAlign: 'center',
    textTransform: 'capitalize',
    alignContent: 'center',
    // background: `${_theme.palette.primary.main} !important`,//already handled by primary and secondary colors
  },
  containedPrimary: {
    // backgroundColor: _theme.palette.primary.main,
    // color: _theme.palette.primary.main,
    // color: 'inherit',
  },
  containedSizeLarge: {
    padding: `${8}, ${12} !important`,
    boxShadow: 'none',
  },
};

const commonCard = {
  background: _theme.palette.primary.main,
  borderRadius: _theme.custom.borders.brandBorderRadius,
  color: _theme.palette.background.default,
  padding: spacing(2),
  textOverflow: 'ellipsis',
  textAlign: 'center',
  alignContent: 'center',
};

// ========================================================================== //
// OVERRIDES
// ========================================================================== //
const OVERRIDES = {
  overrides: {
    // ========================================================================== //
    //   Global
    // ========================================================================== //
    MuiCssBaseline: {
      '@global': {
        html: {
          border: `1px solid ${_theme.palette.text.primary}`,
        },
        'strong, b': {},
        body: {
          margin: 0,
          overflowX: 'hidden',
          // background: generateNoisePng(1000, 1000, 12343412, 4, 3, 2, 29),
          background: `url(${require('./noise.js').noise})`,
          // ========================================================================== //
          //           Customize scrollbar
          // ========================================================================== //
          // scrollbarColor: '#6b6b6b #2b2b2b',
          //   scrollbarColor: 'none',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            // backgroundColor: _theme.palette.text.primary,
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            // borderRadius: _theme.custom.borders.brandBorderRadius,
            display: 'none',
            // backgroundColor: _theme.palette.text.secondary,
            // minHeight: 24,
            // border: '3px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            // backgroundColor: 'none',
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            // backgroundColor: 'none',
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            // backgroundColor: 'none',
            display: 'none',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            // backgroundColor: '#2b2b2b',
            display: 'none',
          },

        },
        '@font-face': ['Poppins'],
      },
    },
    // ========================================================================== //
    // MUI ovverrides
    // ========================================================================== //
    MuiBackdrop: {
      root: {},
    },

    // ========================================================================== //
    //   Cards
    // ========================================================================== //
    MuiCard: {
      root: {
        ...commonCard,
      },
    },
    // ========================================================================== //
    //    Inputs
    // ========================================================================== //

    // if styles are not applying try !important, but use sparingly
    MuiSlider: {
      root: {
        ...commonButton,
      },
      thumb: {
        zIndex: 100,
        transform: 'rotate(180deg)',
        '&:hover > *': {
          color: `${_theme.palette.text.primary} !important`,
        },
      },
    },
    MuiInputBase: {
      root: {
        color: `${_theme.palette.text.secondary} !important`,
      },
      formControl: {
        color: `${_theme.palette.text.secondary} !important`,
      },
    },
    MuiInput: {
      formControl: {
        color: _theme.palette.text.secondary,
      },
      root: {
        // ...common,
      },
    },
    MuiButtonBase: {
      // disableRipple: true//no performance costly ripple effect
    },
    MuiButton: {
      // disableRipple: true,//no performance costly ripple effect
      // hover keyframes declared locally not on the theme object
      ...commonButton,
    },
    MuiCollapse: {
      hidden: {
        display: 'none',
      },
    },
    MuiTextField: {
      ...commonButton,
    },
    KeyboardDatePicker: {
      root: {},
    },
    // ========================================================================== //
    //    Nav
    // ========================================================================== //
    MuiDrawer: {
      paper: {
        background: _theme.palette.background.default,
      },
    },
    MuiToolbar: {
      root: {
        background: 'none !important',
        // padding: 0,
        // padding: spacing(1, 0),
        justifyContent: 'space-between',
        // padding: spacing(3),
        color: _theme.palette.text.secondary,
      },
    },
    MuiAppBar: {
      colorPrimary: {
        // background: `${_theme.palette.background.default}!important`,
        // background: 'none !important',
      },
      root: {
        // background: `${hexToAlpha(_theme.palette.text.primary, 0.6)} !important`,
        backdropFilter: 'blur(35px)',
        // background: _theme.palette.background.default,
        boxShadow: _theme.custom.shadows.brand,
        color: _theme.palette.text.secondary,
      },
    },
    MuiContainer: {
      root: {
        // padding: '8.333333% !important',
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: 'inherit',
      },
    },
  },
};

// clear from memory
// delete breakpoints;
// delete spacing;

const SCROLL_PROPS = {
  // 'data-sal="slide-up"',
  // 'data-sal-duration="2000"',
  // 'data-sal-delay="300"',
  // 'data-sal-easing="ease"',
  'data-sal': 'zoom-out',
  'data-sal-duration': '750',
  'data-sal-delay': '0',
  'data-sal-easing': 'ease-in-out',
};

export {
  TYPOGRAPHY,
  LIGHT_THEME,
  DARK_THEME,
  OVERRIDES,
  CUSTOM_THEME_PROPS,
  SCROLL_PROPS,
};

// bubble gradient
// background: `radial-gradient(50% 50% at 50% 50%, ${hexToAlpha(
//   theme.palette.text.primary,
//   1,
// )} 41.66%, rgba(255, 255, 255, 0) 100%),
// radial-gradient(21.07% 10.97% at 60.57% 12.66%, rgba(255, 255, 255, 0.6) 54.48%, rgba(255, 255, 255, 0) 100%),
// radial-gradient(99.61% 99.61% at 87.86% 22.85%, rgba(0, 0, 100, 0) 22.71%, ${hexToAlpha(
// theme.palette.text.primary,
// 0.6,
// )} 78.96%)`,
// objectFit: 'contain',
// zIndex: 1,
// // "&:before": {
// //     content: "",
// //     position: 'absolute',
// //     top: '1%',
// //     left: '5%',
// //     width: '90%',
// //     height: '90%',
// //     borderRadius: '50%',
// //     background: `radial-gradient(circle at bottom,white, ${theme.palette.text.secondary},${theme.palette.text.primary} 58%)`,
// //     filter: 'blur(5px)',
// //     zIndex: 2,
// //   },
// transition: theme.transitions.create(
//   ['transform', 'box-shadow', 'background', 'margin', 'border'],
//   { duration: '0.3s', easing: 'ease-in-out' },
// ),
// '&:hover': {
//   transform: 'skew(-5deg, 2deg) !important',
//   transition: theme.transitions.create(
//     ['transform', 'box-shadow', 'background', 'margin', 'border'],
//     { duration: '0.3s', easing: 'ease-in-out' },
//   ),
// },
// },
