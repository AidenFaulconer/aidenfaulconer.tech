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
  //css transition styling
  & .enter {
    //hiding nav
    margin-top: -125px;
    ${props => props.theme.transitions.primary("margin-top")}
  }

  & .enter-done {
    //showing nav
    margin-top: 0px;
    ${props => props.theme.transitions.primary("margin-top")}
  }

  //retract navbar
  & .exit {
    //hiding nav
    margin-top: 0px;
    ${props => props.theme.transitions.primary("margin-top")}
  }

  & .exit-done {
    //showing nav
    margin-top: -125px;
    ${props => props.theme.transitions.primary("margin-top")}
  }
  //css transition styling

  & nav {
    left: 0px;
    top: 0px;
    z-index: 100;
    width: 100vw;
    position: fixed;
    padding: 12.5px;
    border-bottom: 1.75px solid
      ${props =>
        props.theme.name === "dark"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(0, 0, 0, 0.25)"};

    ${props=>props.theme.breakpoints.md(`padding: 25px 0px;`)}
    background: ${props => props.theme.colors.foreground}; //switch on bg color

    & * {
    z-index: 5;
      text-decoration: none;
    }

    & .site-links {
      display: flex;
      justify-content: flex-end;
      ${props => props.theme.breakpoints.md(`font-size: 1.25rem;`)}
      padding-right: 25px;

      & .link {
          margin: auto;
          margin-right: 0px;
          margin-left: 12.5px;
          padding-left: 0px;
          font-family: "brown";
          color: ${props => props.theme.colors.textSecondary};

          &::after {
            content: "";
            display: block;
            visibility: hidden;
            position: relative;
            bottom: -23.5px;
            height: 1.75px;
            width: 0%;
            background: ${props => props.theme.colors.primary};
            ${props => props.theme.transitions.secondary("all")};
            ${props=>props.theme.breakpoints.md(`bottom:-38px;`)}
          }
          &:hover {
            &::after {
              visibility: visible;
              width: 100%;
              ${props => props.theme.transitions.third("width")};
            }
          }
        }

      & .active-link {
        color: ${props => props.theme.colors.primary};

        &::after {
          visibility: visible;
          width: 100%;
        }
      }
    }

    & .branding {
      ${props => props.theme.transitions.primary("all")};

      & .page-type {
        position: absolute;
        left: 18%;
        top: -0%;
        display: inline-block;
        font-family: "poppins-light";
        font-size: ${props => props.theme.text.sizes.extraSmall};
        color: ${props => props.theme.colors.textSecondary};
      }

      & svg {
        display: inline-block;
        height: 40px;
        width: auto;
        transform: skew(0deg);
        fill: ${props => props.theme.colors.textSecondary};
        ${props => props.theme.transitions.primary("all")};
        ${props=>props.theme.breakpoints.md(`height: 45px;`)}

        &:hover {
          transform: skew(-12.5deg);
          ${props => props.theme.transitions.primary("all")};
        }
      }

      & .path {
        animation: dash 1s ease-in-out;
        @keyframes dash {
          0%,
          50% {
            transform: translate(-39%, 0%) skew(12deg);
          }
          to {
            transform: translate(0%, 0%) skew(0deg);
          }
        }
      }
    }
  }
`;

// TODO:
// scrolltop > 55vh then background: ${props=>props.theme.colors.contentColor};
export default ({ toggleTheme, theme, pageType }) => {
  const [selected, selectedPage] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );
  const [scrollPos, setScrollPos] = useState(
  typeof document !== "undefined" ? document.body.getBoundingClientRect().y : 0
  );
  const [hide, showNav] = useState(true); // triggers css animation to hide or hide navbar

  const positionRef = useRef(); // allow usecallbacks to access the current state when they fire
  positionRef.current = scrollPos;

  const hideRef = useRef(); // allow usecallbacks to access the current state when they fire
  hideRef.current = hide;

  const watchScroll = useCallback(() => {
    const currentScrollPos = typeof document !== "undefined" ? document.body.getBoundingClientRect().y : 0;// return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    const prevScrollPos = positionRef.current; // state refs

    //for performance only update state when needed, otherwise drop out before we call showNav
    //only update state every 100px scrolled by user
    const thisScrollOffset = currentScrollPos - prevScrollPos;
    if (Math.abs(thisScrollOffset) < 30) return;
    // alert(thisScrollOffset)

    const prevHide = hideRef.current;
    showNav(thisScrollOffset > 0); // if negative, we hide, if positive we show
    setScrollPos(currentScrollPos);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return//we do not hide and unhide navbar on mobile devices
      window.addEventListener("scroll", watchScroll);
      return ()=>window.removeEventListener("scroll",watchScroll);
    }
  }, []);

  return (
    <header>
      {/**
      <GoogleAds />
      <GoogleAnalytics/>
       */}
      <NavigationWrapper>
        <CSSTransition in={hide} timeout={15}>
          <nav>
            <Row>
              <Col
                xl={1}
                lg={1}
                md={1}
                sm={1}
                className="d-lg-block d-md-block"
              />

              <Col xl={6} lg={6} md={5} sm={1} xs={8} className="branding">
                <Link to="/">
                  <div
                    style={{ fill: theme.colors.secondary }}
                    dangerouslySetInnerHTML={{ __html: logo }}
                  />
                </Link>
              </Col>

              <Col xl={4} lg={4} md sm={10} xs={3} style={{display: "flex",justifyContent: "space-evenly"}}className="site-links">
                <Link
                  className={`link ${selected === "/" ? "active-link" : ""}`}
                  to="/"
                >
                  {"Portfolio"}
                </Link>

                <Link
                  className={`link ${
                    selected.match(`(^/blog/*\w*)|(^/projects/*\w*)`)
                      ? "active-link"
                      : ""
                  }`}
                  to="/blog"
                >
                  {"Blog"}
                </Link>

                <ThemeChanger toggleTheme={toggleTheme} />
              </Col>

              <Col xl={1} lg={1} md={1} className="d-md-block d-lg-block" />
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
