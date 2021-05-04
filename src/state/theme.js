// // import fontFiles from "../../styles/fonts";

// // styles that remain fixed for the entire site, injected into the dynamic site stylings
// const fontFace = (fontFamily, format) =>
//   `@font-face {
//    font-family: ${fontFamily};
//    src: url(${fontFiles[fontFamily]}) format('${format}');
//   };
//   `;
// //map any used fonts with the css name and the resource url woff2 is the chosen format
// const fonts = [
//   // poppins
//   ["poppinsbold", "opentype"],
//   ["poppinslight", "opentype"],
//   ["poppinsregular", "opentype"],
//   ["poppinsextrabold", "opentype"],
//   // brown
//   ["brownregular", "woff2"],
//   ["brownlight", "woff2"],
//   ["brownbold", "woff2"],
// ];

// ${fonts.reduce(
//       (allFonts, currentFont, index) =>
//         allFonts + fontFace(currentFont[0], currentFont[1], currentFont[2]),
//       ""
//     )}

const staticStlying = {
  //webpack wont compile fonts properly unless each font imported with js
  fonts: `
    & h1 { font-size:80.24px;font-family:"poppins";font-weight: bolder;};
    & h2 { font-size:2.618em;font-family: "poppins": font-weight: 500;};
    & h3 { font-size:1.1em;font-family: "poppins"; font-weight: bolder;};
    & p { font-size:1em; font-family:"poppins"; font-weight: 200;};
    & a { font-size:1em; font-family:"poppins"; font-weight: bolder; text-decoration: none;};

    //default font
    & * {
      letter-spacing: 15%;
      line-height: 100%;
    };
    `,
  // order matters a lot when referencing them, from top to bottom we MUST go from SMALLEST to LARGEST or else they will not respond properly
  pointerInputs: {
    mouse: styling =>
      `@media (pointer: coarse) and (any-pointer: fine){${styling}}`,
    touchscreen: styling =>
      `@media (pointer: fine) and (any-pointer: coarse){${styling}}`,
    other: styling => `@media (hover:none) and (any-hover: hover) {${styling}}`
  },
  breakpoints: {
    xl: styling => `@media (min-width: 1200px) {${styling}}`,
    lg: styling => `@media (min-width: 992px)  {${styling}}`,
    md: styling => `@media (min-width: 786px)  {${styling}}`,
    sm: styling => `@media (min-width: 575px)  {${styling}}`,
    xs: styling => `@media (max-width: 575px)  {${styling}}`
  },
  transitions: {
    long: property => `transition: ${property} 3.25s`,
    primary: property => `transition: ${property} .25s`,
    secondary: property => `transition: ${property} .5s`,
    third: property => `
      transition-delay: 0s;
      transition-duration: .6s;
      transition-timing-function: cubic-bezier(.19,1,.22,1) .5s;`
  },
  corners: {
    borderRadius1: "5px",
    borderRadius2: "10px",
    borderRadius3: "20px",
    borderRadius4: "50px",
    borderRadius100: "100%"
  },
  // injected into global css style space
  externalStyleAdjustments: `
  & *[class*="container-fluid"] {
    padding:0px;
  }
  img {
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;
   height: 100%;
   object-fit: cover;
   &::hover{transform: scale(.5);}
  }`,
  text: {
    sizeScalings: {
      xl: "15px",
      lg: "20px",
      md: "15px",
      sm: "9px",
      xs: "9px"
    },
    sizes: {
      //main
      extraSmall: ".618em", // was .618em
      small: ".818em", // was .618em
      p: "15px",
      h3: "1.451em", // 17px
      h2: "2.618em",
      h1: "3em",
      title: "4.8em"
    },
    details: {
      lineheight1: "125%",
      lineheight2: "115%",
      lineheight3: "150%"
    }
  },
  mixins: {
    transform3dPrimary: `
      transform: rotateX(2deg) rotateY(4deg) rotateZ(3deg) translateX(-3px) translateY(4px);
    `,
    transform3dSecondary: `
      transform: rotateX(-12deg) rotateY(-3deg) rotateZ(2deg) translateX(23px) translateY(-8px);
    `,
    brandoverlay: `
      background: #8EF2D2;
      mix-blend-mode: light;
  `
  },
  animations: {
    underline: `
      &:after {
         content: '';
         position: relative;
         left: 0;
         color: currentColor;
         display: inline;
         height: 1em;
         width: 100%;
         border-bottom: 1px solid;
         margin-top: 10px;
         opacity: 0;
         -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
         transition: opacity 0.35s, transform 0.35s;
         -webkit-transform: scale(0,1);
         transform: scale(0,1);
      }

      &:hover:after {
         opacity: 1;
         -webkit-transform: scale(1);
         transform: scale(1);
      }`,
    blob: `
      animation-name: blob;
      animation-duration 5s;
      animation-iteration-count: infinite;

      @keyframes blob {
         0% {border-radius: 80% 60%;}
         50% {border-radius: 60% 80%;}
         100% {border-radius: 80% 60%;}
      }`
  },
  test: `
     & *{
      border:2px solid red;
      background-image:
      linear-gradient(to bottom,
        rgba(240, 255, 40, 1) 0%,
        rgba(240, 255, 40, 1) 100%),
      linear-gradient(to bottom,
        rgba(240, 40, 40, 1) 0%,
        rgba(240, 40, 40, 1) 100%);
      background-clip: content-box, padding-box;
    }`,
  test2: `& *{
  border: 1px solid red;
  }`
};

export default {
  // #region DARK THEME
  dark: {
    name: "dark",
    colors: {
      foreground: "#0D0D0D",
      black: "#F0F3FC",
      secondary: "#000064",
      primary: "#9ECAFA",
      textSecondary: "#FFFFFF",
      textPrimary: "#0D0D0D",
      textThird: "#B2B2B2"
    },
    borders: {
      primary: "1px solid #5A00DB",
      secondary: "1px solid #8EF2D2",
      third: "1px solid #5A00DB"
    },
    shadows: {
      primary: "-5px 0px 50px rgba(255,255,255,.25)",
      secondary: "2.5px 0px 12.5px rgba(255,255,255,0.75)"
    },
    // #region static styling
    corners: staticStlying.corners,
    transitions: staticStlying.transitions,
    text: staticStlying.text,
    test: staticStlying.test,
    test2: staticStlying.test2,
    breakpoints: staticStlying.breakpoints,
    animations: staticStlying.animations,
    mixins: staticStlying.mixins,
    // #endregion static styling

    global: `
    & body {
      ${staticStlying.fonts};
      box-sizing: border-box;
      background: #0D0D0D;
      overflow-x: hidden;
      margin: 0px;
      padding: 0px;

      & h1 {font-size:2.5em;}
      ${staticStlying.breakpoints.sm(`
        ${staticStlying.text.sizeScalings.sm};
      `)}
      ${staticStlying.breakpoints.md(`
        ${staticStlying.text.sizeScalings.md};
        & h1 {font-size:74.24px;}
      `)}
      ${staticStlying.breakpoints.lg(`
        ${staticStlying.text.sizeScalings.lg};
      `)}
      ${staticStlying.breakpoints.xl(`
        ${staticStlying.text.sizeScalings.xl};
      `)}
    }
    ${staticStlying.externalStyleAdjustments};
  `
  },
  // #endregion DARK THEME

  // #region LIGHT THEME
  light: {
    name: "light",
    colors: {
      black: "#0D0D0D",
      foreground: "#FFFFFF", //F0F3FC
      primary: "#000064",
      secondary: "#BAF7E4",
      textPrimary: "#FFFFFF",
      textSecondary: "#111111",
      textThird: "#B2B2B2"
    },
    borders: {
      primary: "1px solid #5A00DB",
      secondary: "1px solid #8EF2D2",
      third: "1px solid #5A00DB"
    },
    shadows: {
      primary: "-5px 0px 50px rgba(0,0,0,.25)",
      secondary: "2.5px 0px 12.5px rgba(0,0,0,0.75)"
    },
    // #region static styling
    corners: staticStlying.corners,
    transitions: staticStlying.transitions,
    text: staticStlying.text,
    test: staticStlying.test,
    test2: staticStlying.test2,
    breakpoints: staticStlying.breakpoints,
    animations: staticStlying.animations,
    mixins: staticStlying.mixins,
    // #endregion static styling
    global: `
    & body {
      ${staticStlying.fonts};
      box-sizing: border-box;
      background: #FFFFFF;
      overflow-x: hidden;
      margin: 0px;
      padding: 0px;

      & h1 {font-size:2em;}
      ${staticStlying.breakpoints.sm(`
        ${staticStlying.text.sizeScalings.sm};
      `)}
      ${staticStlying.breakpoints.md(`
        ${staticStlying.text.sizeScalings.md};
        & h1 {font-size:74.24px;}
      `)}
      ${staticStlying.breakpoints.lg(`
        ${staticStlying.text.sizeScalings.lg};
      `)}
      ${staticStlying.breakpoints.xl(`
        ${staticStlying.text.sizeScalings.xl};
      `)}
    }
    ${staticStlying.externalStyleAdjustments};
  `
  }
  // #endregion LIGHT THEME
};
