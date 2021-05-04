import React, { useContext, useEffect } from "react";

//ui
import styled from "@emotion/styled";
import { logoCircular } from "../static/assets/svg/hardcoded-svgs";
import {
  AppBar,
  Slide,
  Toolbar,
  Drawer,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@material-ui/core";
import { Link } from "gatsby";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { red } from "@material-ui/core/colors";
import { useTheme } from "emotion-theming";

//theme switcher
import { InlineIcon } from "@iconify/react";
import nightIcon from "@iconify/icons-ic/baseline-bedtime";
import dayIcon from "@iconify/icons-ic/baseline-wb-sunny";
import { themeSwitchSvg } from "../static/assets/svg/hardcoded-svgs";

const _Navigation = styled.div`
  //css transition styling
  & .enter {
    //hiding nav
    margin-top: -125px;
    ${(props) => props.theme.transitions.primary("margin-top")}
  }

  & .enter-done {
    //showing nav
    margin-top: 0px;
    ${(props) => props.theme.transitions.primary("margin-top")}
  }

  //retract navbar
  & .exit {
    //hiding nav
    margin-top: 0px;
    ${(props) => props.theme.transitions.primary("margin-top")}
  }

  & .exit-done {
    //showing nav
    margin-top: -125px;
    ${(props) => props.theme.transitions.primary("margin-top")}
  }
  //css transition styling

  & .top {
    background: transparent;
    padding: 35px 10vw;
    ${(props) => props.theme.transitions.primary("padding")};
  }

  & nav {
    left: 0px;
    top: 0px;
    z-index: 100;
    width: 100%;
    position: fixed;
    padding: 12.5px;
    background: ${(props) => props.theme.colors.foreground};
    ${(props) => props.theme.transitions.primary("padding")};
    color: ${(props) =>
      props.colorSwap
        ? props.theme.colors.textPrimary
        : props.theme.colors.textSecondary};

    //switch on bg color
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center & .navigation-item {
      margin: 12.5px 25px;
    }

    & * {
      z-index: 5;
      text-decoration: none;
    }

    & .site-links {
      display: flex;
      justify-content: space-evenly;
      ${(props) => props.theme.breakpoints.md(`font-size: 1.15rem;`)}

      & .link {
        margin: 0px 25px;
        font-family: "poppins";
        font-weight: 300;
        color: ${(props) => props.theme.colors.textSecondary};
      }

      & .active-link {
        font-weight: 600;
        color: ${(props) => props.theme.colors.primary};
        &::after {
          visibility: visible;
          width: 100%;
        }
      }
    }

    & .branding {
      ${(props) => props.theme.transitions.primary("all")};
      display: block;

      & .page-type {
        left: 18%;
        top: -0%;
        display: inline-block;
        font-family: "poppins-light";
        font-size: ${(props) => props.theme.text.sizes.extraSmall};
        color: ${(props) => props.theme.colors.textSecondary};
      }

      & svg {
        display: inline-block;
        height: 40px;
        width: auto;
        transform: skew(0deg);
        fill: ${(props) => props.theme.colors.textSecondary};
        ${(props) => props.theme.transitions.primary("all")};
        ${(props) => props.theme.breakpoints.md(`height: 45px;`)}

        &:hover {
          transform: skew(-12.5deg);
          ${(props) => props.theme.transitions.primary("all")};
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

const _ThemeSwitch = styled.div`
  & #switch {
    margin: auto;
    top: 0px;
    background: white;
    border-radius: 100%;
    color: black;
    padding: 5px;
    width: 22.5px;
    height: 22.5px;
    z-index: 500;
  }
  & #switch-cube {
    position: absolute;
    top: 0px;
    right: 6px;
    margin: auto;
  }

  & label {
    width: 100%;
    position: relative;
    height: 100%;
    background: transparent;
    margin: auto;

    & .active {
    }
    & .inactive {
    }
  }

  & input {
    opacity: 0;
  }
`;

export const Navigation = ({
  theme,
  themeState,
  boundActions,
  children,
  window,
}) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = React.useCallback(
    (anchor) => (
      <div
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className="p-5 m-5"
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    ),
    []
  );

  const drawerSwitch = React.useCallback(
    () =>
      ["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      )),
    []
  );

  //prettier-ignore
  const logo = React.useCallback(() => <div dangerouslySetInnerHTML={{ __html: logoCircular }} />,[]);

  const pages = [
    { name: "portfolio", url: "/" },
    { name: "blog", url: "/blog" },
    { name: "booking", url: "/booking" },
  ];
  const pageNav = React.useCallback(
    () => (
      <div className="flex-nowrap justify-content-center">
        {pages.map((page) => (
          <Link key={page.name} className="m-1" to={page.url}>
            {page.name.toUpperCase()}
          </Link>
        ))}
      </div>
    ),
    []
  );

  const themeSwitch = React.useCallback(() => {
    return (
      <_ThemeSwitch>
        <div
          id="switch-cube"
          dangerouslySetInnerHTML={{ __html: themeSwitchSvg }}
        />
        <label>
          <input
            type="checkbox"
            checked={themeState === "dark"}
            onChange={(e) => {
              boundActions.SET_THEME_STATE(e.target.checked ? "dark" : "light");
            }}
          />
          <InlineIcon
            id="switch"
            className={themeState !== "dark" ? "active" : "inactive"}
            icon={themeState !== "dark" ? dayIcon : nightIcon}
          />
        </label>
      </_ThemeSwitch>
    );
  }, []);

  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        style={{
          background: "transparent",
          padding: "25px",
          boxShadow: "none",
        }}
      >
        <Toolbar className="flex justify-content-between">
          {logo()}
          {pageNav()}
          {themeSwitch()}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

import { boundActions } from "../state/actions";
import { connect } from "react-redux";
export default connect(
  ({ theme, themeState }) => ({ theme, themeState }),
  boundActions
)(Navigation);
