// styles that remain fixed for the entire site, injected into the dynamic site stylings
const fontFace = (fontFamily, src) =>
  `@font-face {
    font-family: ${fontFamily};
    src: url(${src});
  };
  `;
const fonts = [
  // brown
  ["brown-regular", "./fonts/brown/Brown-Regular.ttf"],
  ["brown-light", "./fonts/brown/Brown-Regular.ttf"],
  ["brown-bold", "./fonts/brown/Brown-Regular.ttf"],
  // poppins
  ["poppins-bold", "./fonts/poppins/Poppins-Bold.ttf"],
  ["poppins-semibold", "./fonts/poppins/Poppins-SemiBold.ttf"],
  ["poppins-light", "./fonts/poppins/Poppins-Light.ttf"],
  ["poppins", "./fonts/poppins/Poppins-Regular.ttf"],
  ["popins-extrabold", "./fonts/poppins/Poppins-ExtraBold.ttf"]
];

const staticStlying = {
  transitions: {
    long: property => `transition: ${property} 3.25s`,
    primary: property => `transition: ${property} .25s`,
    secondary: property => `transition: ${property} .5s`,
    third: property => `
        transition-delay: 0s;
        transition-duration: .6s;
        transition-timing-function: cubic-bezier(.19,1,.22,1) .5s;`
  },
  // order matters a lot when referencing them, from top to bottom we MUST go from SMALLEST to LARGEST or else they will not respond properly
  breakpoints: {
    xl: styling => `@media (min-width: 1200px) {${styling}}`,
    lg: styling => `@media (min-width: 992px)  {${styling}}`,
    md: styling => `@media (min-width: 786px)  {${styling}}`,
    sm: styling => `@media (min-width: 575px)  {${styling}}`,
    xs: styling => `@media (max-width: 575px)  {${styling}}`
  },
  corners: {
    borderRadius1: "2px",
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
  fonts: `
   ${fonts.reduce(
     (allFonts, currentFont, index) =>
       allFonts + fontFace(currentFont[0], currentFont[1]),
     ""
   )}

    & h1 { font-size:74.24px;font-weight: bolder;font-family:"poppins-semibold"};
    & h2 { font-size:2.618em;font-family: 'brown-bold';font-family:"poppins-bold"};
    & h3 { font-size:17.42px;font-family: 'poppins-bold';};
    & p { font-size:18px; font-family:"brown-regular"; font-weight: 100;};
    & a { font-size:1em; font-family:"poppins-regular"; font-weight: bolder; text-decoration: none;};

    & * {
      font-family:'brown-regular';
      letter-spacing: 15%;
      line-height: 100%;
    };
    `,
  text: {
    sizes: {
      extraSmall: ".618em", // was .618em
      small: ".818em", // was .618em
      p: ".9em",
      h3: "1.451em", // 17px
      h2: "2.618em",
      h1: "4.236em",
      title: "4.8em"
    },
    details: {
      lineheight1: "125%",
      lineheight2: "115%",
      lineheight3: "150%"
    }
  },
  spacing: {
    s1: "5px",
    s2: "15px",
    s3: "10px",
    s4: "20px",
    m1: "25px",
    m2: "50px",
    l1: "100px",
    l2: "125px",
    l3: "180px",
    xl1: "250px"
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
      mix-blend-mode: lighten;
  `,
    boldFont: `
      font-family: 'poppins-semibold';
      font-weight:bolder;`,
    contentFont: `
      font-family: 'brown-regular';
      font-weight:bolder;`
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
      primary: "-5px 0px 50px rgba(0,0,0,.25)",
      secondary: "2.5px 0px 12.5px rgba(0,0,0,0.75)"
    },
    // #region static styling
    corners: staticStlying.corners,
    transitions: staticStlying.transitions,
    text: staticStlying.text,
    spacing: staticStlying.spacing,
    test: staticStlying.test,
    test2: staticStlying.test2,
    breakpoints: staticStlying.breakpoints,
    animations: staticStlying.animations,
    mixins: staticStlying.mixins,
    // #endregion static styling

    // #region mixins
    animation1: ``,
    global: `
    & body {
      box-sizing: border-box;
      background: #0D0D0D;
      overflow-x: hidden;
      margin: 0px;
      padding: 0px;
      font-size: 20px;

      ${staticStlying.breakpoints.sm(`
      font-size: 12px;
      `)}
      ${staticStlying.breakpoints.md(`
      font-size: 15px;
      `)}
      ${staticStlying.breakpoints.lg(`
      font-size: 20px;
      `)}
      ${staticStlying.breakpoints.xl(`
      font-size: 21px;
      `)}
    }

    ${staticStlying.fonts};
    ${staticStlying.externalStyleAdjustments};
  `
    // #endregion mixins
  },
  // #endregion DARK THEME

  // #region LIGHT THEME
  light: {
    name: "light",
    colors: {
      black: "#0D0D0D",
      foreground: "#F0F3FC",
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
    spacing: staticStlying.spacing,
    test: staticStlying.test,
    test2: staticStlying.test2,
    breakpoints: staticStlying.breakpoints,
    animations: staticStlying.animations,
    mixins: staticStlying.mixins,
    // #endregion static styling
    // #region mixins
    animation1: ``,

    global: `
    & body {
      box-sizing: border-box;
      background: #F0F3FC;
      overflow-x: hidden;
      min-height: 100vh;
      margin: 0px;
      padding: 0px;
      font-size: 20px;

       ${staticStlying.breakpoints.sm(`
      font-size: 12px;
      `)}
      ${staticStlying.breakpoints.md(`
      font-size: 15px;
      `)}
      ${staticStlying.breakpoints.lg(`
      font-size: 20px;
      `)}
      ${staticStlying.breakpoints.xl(`
      font-size: 21px;
      `)}
    }
    }

    ${staticStlying.fonts};
    ${staticStlying.externalStyleAdjustments};
  `
    // #endregion mixins
  }
  // #endregion LIGHT THEME
};
