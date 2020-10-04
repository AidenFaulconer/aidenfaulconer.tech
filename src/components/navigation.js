import React, { useState, useEffect, useCallback, useRef, useContext, useMemo } from "react";
import { Link } from "gatsby";
import {GlobalStore} from "./layout"
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
    width: 100%;
    position: fixed;
    padding: 12.5px;
    flex: 5 2 2;
    ${props=>props.theme.breakpoints.md(`padding: 20px 35px;`)};
    background: ${props=>props.colorSwap ?
    props.theme.colors.foreground :
    props.theme.colors.textSecondary};

     color: ${props=>props.colorSwap ?
      props.theme.colors.textSecondary :
    props.theme.colors.textPrimary};

    //switch on bg color
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    // justify-content: space-evenly;
    align-items: center;
    align-content: center

    & .navigation-item {
      flex: 1 1 auto;
      margin: 12.5px 25px;
    }

    & * {
      z-index: 5;
      text-decoration: none;
    }

    & .site-links {
      flex: 2;
      display: flex;
      justify-content: space-evenly;
      ${props => props.theme.breakpoints.md(`font-size: 1.15rem;`)}

      & .link {
          margin: 0px 25px;
          font-family: "poppins";
          font-weight: 300;
          color: ${props=>props.colorSwap ?
            props.theme.colors.textSecondary :
            props.theme.colors.textPrimary};
        }

      & .active-link {
        font-weight: 600;
        &::after {
          visibility: visible;
          width: 100%;
        }
      }
    }

    & .branding {
    flex: 5;
      ${props => props.theme.transitions.primary("all")};
      display: block;

      & .page-type {
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
        fill: ${props=>props.colorSwap ?
            props.theme.colors.textSecondary :
            props.theme.colors.textPrimary};
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
  const {colorSwap} = useContext(GlobalStore);

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
    if (Math.abs(thisScrollOffset) < 50) return;
    // alert(thisScrollOffset)

    const prevHide = hideRef.current;
    showNav(thisScrollOffset > 0); // if negative, we hide, if positive we show
    setScrollPos(currentScrollPos);
  },[]);

  const { isMobile } = useContext(GlobalStore); // consume and use method declared in layout to change theme


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
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      <NavigationWrapper colorSwap={colorSwap}>
        <CSSTransition in={hide} timeout={100}>
          <nav>
              <div className="branding navigation-item">
                <Link to="/">
                  <div
                    style={{ fill: theme.colors.secondary }}
                    dangerouslySetInnerHTML={{ __html: logo }}
                  />
                </Link>
              </div>

              <div className="site-links navigation-item">
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
              </div>

              <ThemeChanger colorSwap={colorSwap} toggleTheme={toggleTheme} className="navigation-item" />
          </nav>
        </CSSTransition>
      </NavigationWrapper>
    </header>
  );
};

// {(!hide && <Icon icon={menu} />) || <></>}
// <Icon icon={menuAlt3} className="d-lg-none d-md-block" />
// <ThemeChanger/>


// &::after {
//   content: "";
//   display: block;
//   margin-top: -9px;
//   visibility: hidden;
//   position: relative;
//   height: 1px;
//   width: 0%;
//   display: none;
//   ${props=>props.theme.breakpoints.md(`bottom:-38px;`)}
//   background: ${props => props.theme.colors.primary};
//   ${props => props.theme.transitions.secondary("all")};
// }

// &:hover {
//   &::after {
//     visibility: visible;
//     width: 100%;
//     ${props => props.theme.transitions.third("width")};
//   }
// }