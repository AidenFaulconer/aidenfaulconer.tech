import React, {
  Component,
  createContext,
  useEffect,
  useState,
  useCallback
} from "react";

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
import IndexBuilder from "./page-builders/index-builder";
import { Btn, BtnPrimary } from "./buttons";
import THEME from "./state/theme";

const { Provider, Consumer } = createContext();
export { Provider, Consumer };

// eslint-disable-next-line import/no-mutable-exports

// #region global context implementation
const initGlobalState = {
  themeState: "",
  theme: {},
  scrollPos: 0
}; // state must be mimicked with exact key names when modifying from nested position
export const GlobalStore = createContext(initGlobalState); // referenced frequently by child components
// #endregion global context implementation

export default ({ children, pageType }) => {
  // used in global context
  const [themeState, setThemeState] = useState("light");
  const [theme, setTheme] = useState(THEME[themeState]);
  const [scrollPos, setScrollPos] = useState(0);
  // used in global context

  // used local and passed as props
  const [showNav, toggleNav] = useState(true);
  // used local and passed as props

  const handleScroll = useCallback(() => {
    const _scrollPos = scrollPos;
    const { top } = document.body.getBoundingClientRect(); // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    toggleNav(top > _scrollPos);
    setScrollPos(top);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("scroll", handleScroll);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // update theme in accordance with themeState
  useEffect(() => {
    setTheme(THEME[themeState]);
  }, [themeState]);

  return (
    <Container fluid>
      <ThemeProvider theme={theme}>
        <Global styles={theme.global} />

        <GlobalStore.Provider
          value={{
            themeState,
            setThemeState,
            theme,
            scrollPos
          }} /** use state from here and modify the global context to match it */
        >
          <Navigation
            pageType={pageType}
            showNav={showNav}
            theme={theme}
            themeState={themeState} // used by theme switch
          />

          {children}

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
                    {/**
                    <img
                      lazyLoad
                      src="./assets/svg/footer-graphic.png"
                      alt="footer-graphic"
                    />
                     */}
                  </Col>
                </Row>
              </Col>

              <Col xl={1} lg={2} md={1} sm={1} xs={1} />
            </Row>
          </Footer>
        </GlobalStore.Provider>
      </ThemeProvider>
    </Container>
  );
};

const Footer = styled.footer`
  padding-top: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 25vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textPrimary};
  z-index: 1;
  font-size: ${props => props.theme.text.sizes.small};

  & h3 {
    margin: 0px;
  }

  & p {
    margin-top: -12.5px;
  }

  & br {
    margin-bottom: 6.25px;
  }
  & *[class*="footer-section"] {
    border-top: 1px solid ${props => props.theme.colors.textPrimary};
    margin-right: 50px;
    padding: 0px;
    padding-top: 6.25px;
    padding-bottom: 100px;

    & .social-link {
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
