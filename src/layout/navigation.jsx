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
    padding: theme.spacing(0,1),
    justifyContent: "space-evenly",
  },
  logo: {
    maxWidth: "90px",
  },
  menuIcon: {
    maxHeight: 55,
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

  // <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7247 43.5716C34.7292 43.5716 44 33.8178 44 21.7858C44 9.75383 33.7404 0 21.736 0C9.73153 0 0 9.75383 0 21.7858C0 33.8178 10.7203 43.5716 22.7247 43.5716ZM19.5992 32.0274H15.3659L23.9882 17.7002L21.6002 13.9167L11.6172 32.0274H7.34646L20.3282 8.57474L22.8347 8.56805C22.8347 8.56805 26.4419 14.8111 27.0751 15.8551C27.8618 17.8226 26.6143 20.7809 26.6143 20.7809L19.5992 32.0274ZM27.419 32.0274H23.446L27.9122 24.7041L27.353 23.5852C26.4978 22.1523 28.7998 18.8252 28.7998 18.8252C28.7998 18.8252 36.1776 31.9259 36.2685 32.0557C35.6037 32.0535 31.9193 32.0274 31.9193 32.0274L29.6898 28.1316L27.419 32.0274Z" fill="${color}"/>
  // </svg>
  const logo = React.useCallback(
    color => (
      <div
        className={(classes.logo, classes.menuIcon)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          <svg width="134" height="45" viewBox="0 0 134 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.0704 44.2343C35.2575 44.2343 44.6693 34.3322 44.6693 22.1172C44.6693 9.9022 34.2537 0 22.0666 0C9.87956 0 0 9.9022 0 22.1172C0 34.3322 10.8834 44.2343 23.0704 44.2343ZM19.8973 32.5145H15.5996L24.353 17.9694L21.9287 14.1284L11.7939 32.5145H7.4582L20.6374 8.70517L23.182 8.69838C23.182 8.69838 26.8441 15.0364 27.4869 16.0962C28.2856 18.0937 27.0191 21.097 27.0191 21.097L19.8973 32.5145ZM27.836 32.5145H23.8026L28.3367 25.0798L27.769 23.9439C26.9008 22.4892 29.2379 19.1115 29.2379 19.1115C29.2379 19.1115 36.7279 32.4115 36.8202 32.5433C36.1453 32.541 32.4048 32.5145 32.4048 32.5145L30.1414 28.5595L27.836 32.5145Z" fill="#000064"/>
<path d="M61.3507 29.0841H53.5663L52.3184 32.7627H47L54.5467 11.937H60.4296L67.9764 32.7627H62.5986L61.3507 29.0841ZM60.0434 25.1681L57.4585 17.5439L54.9033 25.1681H60.0434Z" fill="#000064"/>
<path d="M72.8284 14.4883C71.9371 14.4883 71.2042 14.2311 70.6298 13.7169C70.0752 13.1829 69.7979 12.5303 69.7979 11.759C69.7979 10.9679 70.0752 10.3152 70.6298 9.80099C71.2042 9.267 71.9371 9 72.8284 9C73.7 9 74.4131 9.267 74.9677 9.80099C75.5421 10.3152 75.8293 10.9679 75.8293 11.759C75.8293 12.5303 75.5421 13.1829 74.9677 13.7169C74.4131 14.2311 73.7 14.4883 72.8284 14.4883ZM75.3539 16.2089V32.7627H70.2732V16.2089H75.3539Z" fill="#000064"/>
<path d="M78.0256 24.4561C78.0256 22.7553 78.3426 21.2621 78.9764 19.9765C79.6301 18.691 80.5115 17.7021 81.6208 17.0099C82.73 16.3177 83.968 15.9716 85.3347 15.9716C86.4241 15.9716 87.4145 16.199 88.3059 16.6539C89.217 17.1088 89.9301 17.7219 90.4451 18.4932V10.8096H95.5258V32.7627H90.4451V30.3894C89.9697 31.1805 89.2863 31.8133 88.395 32.288C87.5235 32.7627 86.5034 33 85.3347 33C83.968 33 82.73 32.6539 81.6208 31.9617C80.5115 31.2497 79.6301 30.2509 78.9764 28.9654C78.3426 27.6601 78.0256 26.157 78.0256 24.4561ZM90.4451 24.4858C90.4451 23.22 90.0886 22.2213 89.3755 21.4895C88.6822 20.7577 87.8305 20.3918 86.8203 20.3918C85.8101 20.3918 84.9485 20.7577 84.2354 21.4895C83.5421 22.2015 83.1955 23.1904 83.1955 24.4561C83.1955 25.7219 83.5421 26.7305 84.2354 27.4821C84.9485 28.2138 85.8101 28.5797 86.8203 28.5797C87.8305 28.5797 88.6822 28.2138 89.3755 27.4821C90.0886 26.7503 90.4451 25.7515 90.4451 24.4858Z" fill="#000064"/>
<path d="M114.83 24.2188C114.83 24.6934 114.8 25.1879 114.741 25.7021H103.242C103.321 26.7305 103.648 27.5216 104.223 28.0754C104.817 28.6094 105.54 28.8764 106.392 28.8764C107.659 28.8764 108.541 28.3424 109.036 27.2744H114.443C114.166 28.3622 113.661 29.3412 112.928 30.2114C112.215 31.0816 111.314 31.7639 110.224 32.2583C109.135 32.7528 107.917 33 106.57 33C104.946 33 103.5 32.6539 102.232 31.9617C100.964 31.2695 99.9739 30.2806 99.2609 28.9951C98.5478 27.7095 98.1912 26.2064 98.1912 24.4858C98.1912 22.7651 98.5379 21.2621 99.2311 19.9765C99.9442 18.691 100.935 17.7021 102.202 17.0099C103.47 16.3177 104.926 15.9716 106.57 15.9716C108.174 15.9716 109.6 16.3078 110.848 16.9802C112.096 17.6527 113.067 18.6119 113.76 19.8578C114.473 21.1038 114.83 22.5575 114.83 24.2188ZM109.63 22.8838C109.63 22.0136 109.333 21.3214 108.739 20.8072C108.145 20.293 107.402 20.0358 106.51 20.0358C105.659 20.0358 104.936 20.2831 104.342 20.7775C103.767 21.2719 103.411 21.974 103.272 22.8838H109.63Z" fill="#000064"/>
<path d="M127.612 16.0309C129.553 16.0309 131.098 16.6638 132.247 17.9295C133.416 19.1755 134 20.8962 134 23.0915V32.7627H128.949V23.7738C128.949 22.6663 128.662 21.8059 128.087 21.1928C127.513 20.5797 126.74 20.2732 125.77 20.2732C124.799 20.2732 124.027 20.5797 123.452 21.1928C122.878 21.8059 122.591 22.6663 122.591 23.7738V32.7627H117.51V16.2089H122.591V18.4042C123.106 17.6724 123.799 17.0989 124.671 16.6836C125.542 16.2485 126.523 16.0309 127.612 16.0309Z" fill="#000064"/>
</svg>
`,
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
