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

  border-bottom: 1px solid rgba(0,0,0,.1);

  & nav{
  left:0px;
  top:0px;
  z-index: 100;
  width: 100vw;
  position: fixed;
  padding: 13px;
  background: ${props => props.theme.colors.foreground};//switch on bg color

    & * {
      text-decoration: none;
    }

    & a {
      color: black;
      margin: auto 75px;
      margin-left: 0px;

      &::after{
        content: '';
        display: inline-block;
        position:relative;
        width: 5px;
        background: black;
        ${props => props.theme.transitions.third("all")};
      }

    &:hover{
      &::after{
        ${props => props.theme.transitions.third("all")};
        transform: scale(0,1);
        margin-left: -5px;
      }
    }
    }


    & .branding {

      & svg {
      fill: black;
        height: 50px;
        width: auto;

        & .path {
          animation: dash 1.5s ease-in-out;

          @keyframes dash {
            0%,
            50% {
              transform: translate(-33%,0%);
            }
            to {
              transform: translate(0%,0%);
            }
        }
      }
    }
    }


    & .site-links {
      display: flex;
      justify-content: flex-end;

        & .active {
      }


      & .theme-switch {
        margin: auto 75px;
        margin-left: 0px;
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
              <Col xl={1} lg={1} md={1} />
              <Col xl={6} lg={6} md={6} sm={3} xs={4} className="branding">
                <div
                  style={{ fill: theme.colors.secondary }}
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              </Col>

              <Col xl={4} lg={4} md={3} className="site-links">
                <Link className={selected === "/" ? "active" : ""} to="./">
                  Portfolio
                </Link>

                <Link
                  className={selected === "/blog" ? "active" : ""}
                  to="./blog"
                >
                  Blog
                </Link>

                <ThemeChanger
                  toggleTheme={toggleTheme}
                  className="theme-switch d-sm-none d-none d-lg-block"
                />
              </Col>

              <Col xl={1} lg={1} md={1} />
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
