import React, { useContext, useEffect } from "react"

// ui
import {
  List,
  Slide,
  Drawer,
  AppBar,
  Button,
  Divider,
  Toolbar,
  ListItem,
  ListItemText,
  useScrollTrigger,
  SwipeableDrawer,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"

import { Link } from "gatsby"
import { red } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { proxy, subscribe, useSnapshot } from "valtio"
import { derive } from "valtio/utils"
import {
  customMenuIcon,
  logoFull,
  logoMedium,
  logoSmall,
  menuIcon,
} from "../../static/svgs/hardcoded-svgs"

import logoPng from "../../static/svgs/logo.png"
import { SecondaryButton } from "../components/custom/customButton"
import { NavigationBlob } from "../components/custom/navigationBlob"
import { valtioState } from "../store/store-wrapper"
import { dt, lt } from "./materialUI"

const useStyles = makeStyles(theme => ({
  drawer: {},
  drawerList: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
  },
  pageNav: {
    display: "flex",
    display: "block",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  pageLinks: {
    fontSize: ".75rem",
    marginLeft: "15px",
    marginRight: "15px",
    fontFamily: "Poppins",
    textDecoration: "none",
    fontWeight: "bolder",
    color: theme.palette.text.primary,
  },
  appBar: {
    // background: `rgba(80, 105, 54, 1),rgba(145, 146, 175, 1)`,
    // theme.palette.background.secondary,//change to "rgba(80,105,54,.6)" when app bar scrolled past initial place
    boxShadow: theme.custom.shadows.brand,
    zIndex: 30, // hidhest
    height: 105,
    justifyContent: "space-evenly",
  },
  logo: {
    maxWidth: "90px",
  },
  menuIcon: {
    maxHeight: 50,
    "& svg": {
      transition: theme.transitions.create(
        ["transform", "box-shadow", "background", "margin", "border"],
        { duration: "0.3s", easing: "ease-in-out" }
      ),
    },
    "&:hover": {
      "& svg": {
        transform: "rotate(340deg) !important",
        fill: theme.palette.primary.main,
        "& #switch-primary": {
          fill: theme.palette.primary.main,
          stopColor: theme.palette.primary.main,
        },
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background", "margin", "border"],
          { duration: "0.3s", easing: "ease-in-out" }
        ),
      },
    },
  },
}))

export default function Navigation({ theme, themeState, children, window }) {
  const classes = useStyles()
  const [drawerState, setDrawerState] = React.useState(false)
  const iOS =
    (typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator?.userAgent)) ||
    false

  const toggleDrawer = React.useCallback(
    event => setDrawerState(drawerState => !drawerState),
    []
  )

  const menuIcon = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        className={classes.menuIcon}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.6269 15.2276L43.7096 35.5102L25.3035 24.9719L25.2252 3.67054L42.7474 13.7166C43.2892 14.0272 43.6244 14.6031 43.6269 15.2276ZM24.7252 3.67406L24.8035 24.9743L6.48447 35.7252L6.41902 15.4387C6.41701 14.8163 6.74576 14.2396 7.28238 13.9243L24.7252 3.67406ZM24.2613 46.1933L6.73436 36.1583L25.0556 25.4061L43.4629 35.9451L26.0166 46.1839C25.4755 46.5014 24.8058 46.505 24.2613 46.1933Z" fill="#000064" stroke="white" stroke-width="0.5"/>
          </svg>
          `,
        }}
      />
    ),
    []
  )

  const logo = React.useCallback(
    color => (
      <div
        className={(classes.logo, classes.menuIcon)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7247 43.5716C34.7292 43.5716 44 33.8178 44 21.7858C44 9.75383 33.7404 0 21.736 0C9.73153 0 0 9.75383 0 21.7858C0 33.8178 10.7203 43.5716 22.7247 43.5716ZM19.5992 32.0274H15.3659L23.9882 17.7002L21.6002 13.9167L11.6172 32.0274H7.34646L20.3282 8.57474L22.8347 8.56805C22.8347 8.56805 26.4419 14.8111 27.0751 15.8551C27.8618 17.8226 26.6143 20.7809 26.6143 20.7809L19.5992 32.0274ZM27.419 32.0274H23.446L27.9122 24.7041L27.353 23.5852C26.4978 22.1523 28.7998 18.8252 28.7998 18.8252C28.7998 18.8252 36.1776 31.9259 36.2685 32.0557C35.6037 32.0535 31.9193 32.0274 31.9193 32.0274L29.6898 28.1316L27.419 32.0274Z" fill="${color}"/>
             </svg>`,
        }}
      />
    ),
    []
  )

  const pages = [
    // { name: "Contact Us", url: "#contact" },
    { name: "BOOK ONLINE", url: "#getaquote" },
    { name: "SERVICES", url: "#servies" },
    { name: "TESTIMONIES", url: "#ratings" },
    { name: "PROJECTS", url: "#projects" },
    { name: "BLOG", url: "#blogPosts" },
  ]

  const contactEmbedded = [
    { name: "phone", url: "#phone", icon: "phone" },
    { name: "mail", url: "#mail", icon: "mail" },
  ]

  const search = [{ name: "search", url: "#search", icon: "search" }]

  const boldCurrentPage = React.useCallback((name, i) => {
    if (typeof window !== "undefined")
      if (pages[i].url === document.location.hash) return <b>{name}</b>
    return name
  }, [])

  const navigateTo = page => {
    if (typeof window !== "undefined")
      if (page[0] === "#") document.getElementById(page)?.scrollIntoView()
    // window.location.hash = page.url
  }

  const pageNavigation = React.useCallback(() => {
    const classes = useStyles()
    return (
      <div className={classes.pageNav} style={{ zIndex: 30 }}>
        {pages.map((page, i) => (
          <Link
            key={page.name}
            to={page.url}
            className={classes.pageLinks}
            onClick={event => navigateTo(page.url)}
          >
            {(page.name === "BOOK ONLINE" && (
              <SecondaryButton size="small">
                {boldCurrentPage(page.name.toUpperCase(), i)}
              </SecondaryButton>
            )) ||
              boldCurrentPage(page.name.toUpperCase(), i)}
          </Link>
        ))}
      </div>
    )
  }, [])

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 6000,
    disableHysteresis: true,
  })

  // contains drawer for the menu

  const list = React.useCallback(
    () => (
      <div
        role="presentation"
        onClick={e => toggleDrawer(e)}
        onKeyDown={e => toggleDrawer(e)}
        className={classes.drawerList}
      >
        <List>
          {pages.map((page, index) => (
            <ListItem
              button
              key={page.name}
              onClick={e => {
                navigateTo(page.url)
                toggleDrawer()
              }}
            >
              <Link
                key={page.name}
                to={page.url}
                onClick={event => navigateTo(page.url)}
                className={classes.pageLinks}
              >
                {boldCurrentPage(page.name, index)}
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    ),
    [drawerState]
  )

  // const { appContext: toggleTheme } = derive(valtioState);
  // toggleTheme();

  const drawerSwitch = React.useCallback(() => {
    return (
      <React.Fragment key="drawer">
        <Button
          className="p-0"
          onClick={e => {
            toggleDrawer(e)
            valtioState.appContext.toggleTheme()
          }}
        >
          {menuIcon()}
        </Button>
        <SwipeableDrawer
          // isableBackdropTransition={!iOS}
          onOpen={() => setDrawerState(true)}
          onClose={() => setDrawerState(false)}
          disableDiscovery={iOS}
          anchor="right"
          open={drawerState}
          className={classes.drawer}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    )
  }, [drawerState])

  return (
    <Slide appear direction="down" in={!trigger}>
      <AppBar
        elevation={!trigger ? 6 : 0}
        position="sticky"
        className={classes.appBar}
      >
        <Toolbar className="justify-content-evenly px-3">
          {logo("#000064")}

          {pageNavigation()}

          {drawerSwitch()}
        </Toolbar>

        {/* <NavigationBlob /> */}
      </AppBar>
    </Slide>
  )
}

// );

// import { boundActions } from "../store/actions";
// import { connect } from "react-redux";
// import { render } from "@react-three/fiber";
// export default connect()(Navigation);
// // ({ theme, themeState }) => ({ theme, themeState }),
// // boundActions
