import React, { Component, createContext } from "react";

import { Link, useStaticQuery, graphql } from "gatsby";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Toast } from "react-bootstrap";

import { ThemeProvider, useTheme } from "emotion-theming";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import "prismjs/themes/prism-okaidia.css";

import { InlineIcon } from "@iconify/react";
import chevronRight from "@iconify/icons-mdi/chevron-right";
import githubLogo from "@iconify/icons-mdi/github";
import linkedinLogo from "@iconify/icons-mdi/linkedin";
import instagramLogo from "@iconify/icons-mdi/instagram";
import Navigation from "./navigation";
import { logo } from "../../static/assets/svg/hardcoded-svgs";
import IndexBuilder from "./index-builder";
import { Btn, BtnPrimary } from "./buttons";

const { Provider, Consumer } = createContext();
export { Provider, Consumer };
// styles that remain fixed for the entire site, injected into the dynamic site stylings
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
  // order matters a lot when using these, from top to bottom we MUST go from SMALLEST to LARGEST or else they will not respond properly
  // DEFAULT STYLING WILL BE FOR MOBILE, THEN BREAKPOINTS DICTACE TABLETS AND DESKTOP STYLING
  breakpoints: {
    xl: styling => `@media (min-width: 1200px) {${styling}}`,
    lg: styling => `@media (min-width: 992px) {${styling}}`,
    md: styling => `@media (min-width: 786px) {${styling}}`,
    sm: styling => `@media (min-width: 575px) {${styling}}`,
    xs: styling => `@media (max-width: 575px) {${styling}}`
  },
  corners: {
    borderRadius1: "5px",
    borderRadius2: "10px",
    borderRadius3: "20px",
    borderRadius4: "50px",
    borderRadius100: "100%"
  },
  externalStyleAdjustments: `
  & *[class*="container-fluid"] {
    padding:0px;
  }
  img {
  object-fit: cover;
  }
    `,
  fonts: `
    @font-face {
      font-family: "brown-regular";
      src: url("./fonts/brown/Brown-Regular.ttf");
    }
    @font-face {
      font-family: "brown-bold";
      src: url("./fonts/brown/Brown-BoldAlt.ttf");
    }
    @font-face {
      font-family: "brown-light";
      src: url("./fonts/brown/Brown-Light.ttf");
    }

    @font-face {
    font-family: "poppins-extrabold";
    src: url("./fonts/poppins/Poppins-ExtraBold.ttf");
    }
    @font-face {
    font-family: "poppins-bold";
    src: url("./fonts/poppins/Poppins-Bold.ttf");
    }
    @font-face {
    font-family: "poppins-regular";
    src: url("./fonts/poppins/Poppins-Regular.ttf");
    }
    @font-face {
    font-family: "poppins";
    src: url("./fonts/poppins/Poppins.ttf");
    }

    & h1 { font-size:74.24px;font-weight: bolder;font-family:"poppins-extrabold"};
    & h2 { font-size:2.618em;font-family: 'brown-bold';font-family:"poppins-bold"};
    & h3 { font-size:1.61em;};
    & p { font-size:1em; font-family:"poppins-regular"; font-weight: 100;};
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
      p: "1em",
      h3: "1em",
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
    brandoverlay: `
      background: #8EF2D2;
      mix-blend-mode: lighten;
  `,
    boldFont: `
      font-family: 'brown-bold';
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
            }
            `
  },
  test: `& *{
      border:2px solid red;
      background-image:
      linear-gradient(to bottom,
        rgba(240, 255, 40, 1) 0%,
        rgba(240, 255, 40, 1) 100%),
      linear-gradient(to bottom,
        rgba(240, 40, 40, 1) 0%,
        rgba(240, 40, 40, 1) 100%);
      background-clip: content-box, padding-box;
    }
    `,
  test2: `& *{border:1 px solid red;};
    `
};

const theme = {
  dark: {
    name: "dark",
    colors: {
      black: "#111111",
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
      primary: "-5px 0px 30px rgba(255,255,255,.05)",
      secondary: "2.5px 0px 12.5px rgba(25,0,74,0.75)"
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
      box-sizing: content-box;
      min-height: 100vh;
      margin: 0px;
      padding: 0px;
      scroll-behaviour: smooth;
      background: #F0F3FC;
      overflow-x: hidden;
      font-size: 12px;

      ${staticStlying.breakpoints.sm(`
      font-size: 16px;
      `)}
      ${staticStlying.breakpoints.md(`
      font-size: 17px;
      `)}
      ${staticStlying.breakpoints.lg(`
      font-size: 20px;
      `)}
      ${staticStlying.breakpoints.xl(`
      font-size: 21px;
      `)}

    }
    .col-xl-1 {
      // border: 1px solid red;
    }
    .row {
      // border: 1px solid yellow;
    }

    ${staticStlying.fonts}
    ${staticStlying.externalStyleAdjustments}
  `
    // #endregion mixins
  },
  light: {
    name: "light",
    colors: {
      black: "#111111",
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
      secondary: "2.5px 0px 12.5px rgba(25,0,74,0.75)"
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
      font-size: 21px;
    }

    ${staticStlying.fonts};
    ${staticStlying.externalStyleAdjustments};
  `
    // #endregion mixins
  }
};

// eslint-disable-next-line import/no-mutable-exports
export let globalThemeState = "dark"; // fixed global state to persist across pages

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: theme[globalThemeState],
      scrollPos: 0
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  toggleTheme(checked) {
    globalThemeState = checked ? "dark" : "light";
    this.setState({ theme: theme[checked ? "dark" : "light"] });
  }

  handleScroll() {
    const { scrollPos } = this.state;
    const { top } = document.body.getBoundingClientRect(); // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    this.setState({ scrollPos: top, showNav: top > scrollPos });
  }

  componentDidMountj() {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  render() {
    const { theme, showNav } = this.state;
    const { children } = this.props;
    return (
      <Container fluid>
        <ThemeProvider theme={theme}>
          <Global styles={theme.global} />

          <Navigation
            showNav={showNav}
            theme={theme}
            toggleTheme={this.toggleTheme}
          />

          <Provider value={this.state}>{children}</Provider>

          <Footer>
            <Row>
              <Col xl={2} lg={2} md={1} sm={1} xs={1} />

              <Col xl lg md={10} sm={10} xs={10}>
                <Row>
                  <Col xl={5} className="footer-section">
                    <h3>want to collaborate?</h3>
                    <br />
                    <p>aidenf09@yahoo.com</p>
                  </Col>

                  <Col xl={5} className="footer-section">
                    <h3>lets talk</h3>
                    <br />
                    <p>0475565709</p>
                  </Col>

                  <Col
                    xl={5}
                    className="footer-section"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <h3>useful links</h3>
                    <Link>
                      <Btn
                        color="white"
                        text="Portfolio"
                        padding="12.5px 0px"
                      />
                    </Link>
                    <Link>
                      <Btn color="white" text="Blog" padding="12.5px 0px" />
                    </Link>
                  </Col>

                  <Col xl={5} className="footer-section">
                    <h3>social</h3>
                    <br />
                    <InlineIcon className="social-link" icon={githubLogo} />
                    <InlineIcon className="social-link" icon={linkedinLogo} />
                    <InlineIcon className="social-link" icon={instagramLogo} />
                    <img
                      lazyLoad
                      src="./assets/svg/footer-graphic.png"
                      alt="footer-graphic"
                    />
                  </Col>
                </Row>
              </Col>

              <Col xl={1} lg={2} md={1} sm={1} xs={1} />
            </Row>
          </Footer>
        </ThemeProvider>
      </Container>
    );
  }
}

//  <p
//       dangerouslySetInnerHTML={{
//         __html: `&copy; ${new Date().getFullYear()} AidenFaulconer, Crafted with ❤️`
//       }}/>

// <Toast>
//   <Toast.Header>
//     <strong>This site uses cookies</strong>
//     <small>aiden faulconer</small>
//   </Toast.Header>
//   <Toast.Body>This site uses cookies</Toast.Body>
// </Toast>

const Footer = styled.footer`
  padding-top: 50px;
  min-height: 25vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textColor};
  z-index: 1;
  font-size: ${props => props.theme.text.sizes.small};

  & h3 {
    color: ${props => props.theme.colors.secondary};
    margin: 0px;
  }

  & p {
    margin-top: -12.5px;
  }

  & br {
    margin-bottom: 6.25px;
  }
  & *[class*="footer-section"] {
    border-top: 1px solid ${props => props.theme.colors.secondary};
    margin-right: 50px;
    padding: 0px;
    padding-top: 6.25px;
    padding-bottom: 100px;

    & .social-link {
      ${props => props.theme.animations.blob};
      width: 38px;
      margin-right: 12.5px;
      margin-top: 6.25px;
      height: 38px;
      position: relative;
    }
  }
  & img {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 65%;
    top: 12.5px;
    right: -200px;
  }
`;
