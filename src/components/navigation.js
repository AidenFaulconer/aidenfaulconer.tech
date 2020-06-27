import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "gatsby";
import { Container, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";

import menuAlt3 from "@iconify/icons-dashicons/menu-alt3";
import { Icon, inlineIcon } from "@iconify/react";

import github from "@iconify/icons-ion/logo-github";
import menu from "@iconify/icons-mdi/menu";
import linkedin from "@iconify/icons-ion/logo-linkedin";
import { CSSTransition } from "react-transition-group";
import ThemeChanger from "./themeChanger";
import { logo } from "../../static/assets/svg/hardcoded-svgs";

import GoogleAds from "./apis/google-ads.js";
import GoogleAnalytics from "./apis/google-analytics";

// TODO: breakpoint disables middle content and removes social links
const NavigationWrapper = styled.div`
  & nav{
    left: 0px;
    width: 100vw;
    padding: 25px;
    position: fixed;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    box-shadow: ${props => props.theme.shadows.secondary};
    font-size: ${props => props.theme.text.sizes.small};
    background: ${props => props.theme.colors.primary};
    text-align: center;
    z-index: 105;
    top: 0px;

    & * {
      color: ${props => props.theme.colors.textColor};
      text-decoration: none;
      fill: ${props => props.theme.colors.secondary};
    }

    & a {
      height: 20px;
      margin: auto 6.25px;
      text-transform: capitalcase;

      &:hover {
        color: ${props => props.theme.colors.secondary};
        ${props => props.theme.transitions.primary("color")};
        // ${props => props.theme.animations.lineanimation}
      }
    }


    & .branding {
      display: flex;
      flex-direction: row;

      & svg {
        margin-right: 0px;
        height: 35px;
        width: auto;
      }
    }

    & .site-links {

      & .active::after {
        position: relative;
        content: "";
        left: -12.5px;
        width: 200%;
        height: 200%;
        max-height: 50px;
        max-width: 50px;
        top: -5px;
        display: block;
        background-image: url("./assets/svg/selected page.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transform: translate(-50%, -50%);
      }

      & .active {
        height: 20px;
        margin-left: 38px;
        color: ${props => props.theme.colors.secondary};
        font-weight: bolder;
        font-family: "brown-regular";
      }
      display: flex;
      justify-content: center;
    }

    & .social-links {
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      display: flex;
      margin: auto 0;
    }

    & .theme-switch {
      margin: auto 12.5px;
    }
  }


  //css transition animation

  //bring in navbar
  & .enter{//hiding nav
  margin-top: -125px;
  ${props => props.theme.transitions.primary("margin-top")}
  }

  & .enter-done{//showing nav
  margin-top: 0px;
  ${props => props.theme.transitions.primary("margin-top")}
  }

  //retract navbar
  & .exit{//hiding nav
  margin-top: 0px;
  ${props => props.theme.transitions.primary("margin-top")}

  }
  & .exit-done{//showing nav
  margin-top: -125px;
  ${props => props.theme.transitions.secondary("margin-top")}
  }
`;

// TODO:
// scrolltop > 55vh then background: ${props=>props.theme.colors.contentColor};
export default ({ toggleTheme, theme }) => {
  const [selected, selectedPage] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );
  const [scrollPos, setScrollPos] = useState(
    document.body.getBoundingClientRect().y
  );
  const [hide, showNav] = useState(true); // triggers css animation to hide or hide navbar

  const positionRef = useRef(); // allow usecallbacks to access the current state when they fire
  positionRef.current = scrollPos;

  const hideRef = useRef(); // allow usecallbacks to access the current state when they fire
  hideRef.current = hide;

  const watchScroll = useCallback(() => {
    const currentScrollPos = document.body.getBoundingClientRect().y; // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    const prevScrollPos = positionRef.current; // state refs
    const prevHide = hideRef.current;
    showNav(currentScrollPos - prevScrollPos > 0); // if negative, we hide, if positive we show
    setScrollPos(currentScrollPos);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", watchScroll);
    }
  }, []);

  return (
    <header>
      <GoogleAds />
      {/**
      <GoogleAnalytics/>
       */}
      <NavigationWrapper>
        <CSSTransition in={hide} timeout={15}>
          <nav>
            <Row>
              <Col xl={2} lg={2} md={3} sm={3} xs={4} className="branding">
                <div
                  style={{ fill: theme.colors.secondary }}
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              </Col>

              <Col xl lg md sm xs className="site-links">
                <Link className={selected === "/" ? "active" : ""} to="./">
                  Portfolio
                </Link>
                <Link
                  className={selected === "/visualisations" ? "active" : ""}
                  to="/visualisations"
                >
                  Visualisations
                </Link>
                <Link
                  className={selected === "/blog" ? "active" : ""}
                  to="./blog"
                >
                  Blog
                </Link>
                <Link
                  className={selected === "/blog" ? "active" : ""}
                  to="./blog"
                >
                  Services
                </Link>
              </Col>

              <Col
                xl={1}
                lg={1}
                className="social-links d-md-none d-sm-none d-none d-lg-block"
              >
                <a href="">Github</a>
                <a href="">Linkedin</a>
              </Col>

              <Col
                xl={1}
                lg={2}
                md={1}
                className="theme-switch d-sm-none d-none d-lg-block"
              >
                <ThemeChanger toggleTheme={toggleTheme} />
              </Col>
            </Row>
          </nav>
        </CSSTransition>
      </NavigationWrapper>
    </header>
  );
};

// {(!hide && <Icon icon={menu} />) || <></>}
// <Icon icon={menuAlt3} className="d-lg-none d-md-block" />
// <ThemeChanger/>
