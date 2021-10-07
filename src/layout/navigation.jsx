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
import { navigate } from "gatsby-link"
import Link from "gatsby-plugin-transition-link"
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

// import { useTriggerTransition } from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
    fontWeight: 500,
    color: "inherit",
    textTransform: "capitalize",
  },
  appBar: {
    // background: `rgba(80, 105, 54, 1),rgba(145, 146, 175, 1)`,
    // theme.palette.background.secondary,//change to "rgba(80,105,54,.6)" when app bar scrolled past initial place
    boxShadow: theme.custom.shadows.brand,
    zIndex: 30, // hidhest
    height: 115,
    padding: theme.spacing(0, 1),
    justifyContent: "space-evenly",
    color: theme.palette.text.secondary,
  },
  logo: {
    color: "inherit",
    cursor: "pointer",
    maxWidth: "90px",
  },
  menuIcon: {
    color: "inherit",
    maxHeight: 50,
    cursor: "pointer",
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

  const menuIcon = React.useCallback(color => {
    return (
      <div
        className={classes.menuIcon}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          <svg width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.8191 14.9633L40.8147 34.1971L23.717 24.2584L23.7297 4.00901L39.9495 13.4505C40.4881 13.764 40.8193 14.3402 40.8191 14.9633ZM23.2297 4.01698L23.217 24.2608L6.11503 34.5489L6.13552 15.3008C6.13617 14.6878 6.45748 14.1199 6.98255 13.8036L23.2297 4.01698ZM22.5652 44.4101L6.35567 34.9876L23.4691 24.6927L40.5735 34.6352L24.3468 44.3967C23.7998 44.7257 23.1171 44.7309 22.5652 44.4101Z" fill="#000064" stroke="white" stroke-width="0.5"/>
          </svg>
          `,
        }}
      />
    )
  }, [])

  // ========================================================================== //
  //   Page Navigation
  // ========================================================================== //
  // const changePage = useTriggerTransition()
  // const navigatePage = React.useCallback((page, event) => {
  //   changePage({
  //     pathname: page,
  //     to: page,
  //     // trigger: async pages => {
  //     //   // wait until we have access to both pages
  //     //   const exit = await pages.exit
  //     //   const entry = await pages.entry
  //     //   // here we can access both pages

  //     //   // You could measure the entry element here

  //     //   // start exit animation based on measurements if you want
  //     //   // wait for the entering page to become visible
  //     //   await entry.visible
  //     //   // the entering page is visible here.
  //     //   // if you want you can animate it now!
  //     // },
  //     exit: {
  //       trigger: ({ exit, node }) => {
  //         const transitionStyle = {
  //           opacity: 0,
  //           transform: "translateY(100%)",
  //           background: "black",
  //         }
  //         node.style = transitionStyle
  //         console.log("exit", exit, "node", node)
  //       },
  //       zIndex: 10,
  //       delay: 0.5,
  //     },
  //     entry: {
  //       trigger: ({ entry, node }) => {
  //         const transitionStyle = {
  //           opacity: 1,
  //           transform: "translateX(0%)",
  //           background: "black",
  //         }
  //         node.style = transitionStyle

  //         console.log("entry", entry, "node", node)
  //       },
  //       zIndex: 10,
  //       delay: 0.5,
  //     },
  //     // enter: {
  //     //   trigger: ({ enter, node }) => {
  //     //     node.style.opacity = "1"
  //     //     node.style.transform = "translateX(0)"
  //     //     console.log("enter", enter, "node", node)
  //     //   },
  //     //   zIndex: 10,
  //     //   delay: 0.5,
  //     // },
  //   })
  // }, [])

  const boldCurrentPage = React.useCallback((name, i) => {
    if (typeof window !== "undefined")
      if (pages[i].url === document.location.hash) return <b>{name}</b>
    return <>{name}</>
  }, [])

  const scrollToSmoothly = (pos, time) => {
    if (typeof window == "undefined") return
    var currentPos = window.pageYOffset
    var start = null
    if (time == null) time = 500
    ;(pos = +pos), (time = +time)
    window.requestAnimationFrame((currentTime) /*step*/ => {
      start = !start ? currentTime : start
      var progress = currentTime - start
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos)
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time)
      }
      if (progress < time) {
        window.requestAnimationFrame(step)
      } else {
        window.scrollTo(0, pos)
      }
    })
  }

  const navigateTo = React.useCallback(page => {
    if (typeof window == "undefined") return
    console.log(page)
    if (page[0] === "#" && typeof document != "undefined") {
      // navigatePage(page)
      scrollToSmoothly(
        document.getElementById(page.slice(1, page.length)).offsetTop,
        2000
      )
    } else {
      // navigatePage(page)
    }
    // window.location.hash = page.url
  }, [])

  // ========================================================================== //
  //   Logo
  // ========================================================================== //

  const logo = React.useCallback(color => {
    return (
      <AniLink
        hex={"#2E00FF"}
        duration={1.2}
        paintDrip
        cover
        direction={"top"}
        // zindex={20}
        to="/"
      >
        <div
          className={(classes.logo, classes.menuIcon)}
          style={{ fill: "white" }}
          dangerouslySetInnerHTML={{
            __html: `
          <svg width="125" height="40" viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6864 40C31.6141 40 40.0534 31.0457 40.0534 20C40.0534 8.9543 30.7141 0 19.7864 0C8.85865 0 0 8.9543 0 20C0 31.0457 9.75873 40 20.6864 40ZM17.8412 29.4021H13.9876L21.8365 16.2493L19.6627 12.7759L10.5752 29.4021H6.68751L18.5048 7.87186L20.7865 7.86572C20.7865 7.86572 24.0702 13.597 24.6465 14.5554C25.3627 16.3617 24.2271 19.0775 24.2271 19.0775L17.8412 29.4021ZM24.9596 29.4021H21.3429L25.4086 22.6791L24.8995 21.6519C24.121 20.3365 26.2166 17.2821 26.2166 17.2821C26.2166 17.2821 32.9326 29.3089 33.0154 29.4281C32.4102 29.426 29.0562 29.4021 29.0562 29.4021L27.0268 25.8256L24.9596 29.4021Z" fill="white"/>
          <path d="M69.324 7.81064V29.2307H65.8058V7.81064H69.324Z" fill="white"/>
          <path d="M79.4055 7.81064C81.6893 7.81064 83.685 8.2524 85.3926 9.13591C87.1209 9.99888 88.4479 11.2522 89.3737 12.896C90.3202 14.5192 90.7934 16.4197 90.7934 18.5977C90.7934 20.7757 90.3202 22.666 89.3737 24.2686C88.4479 25.8713 87.1209 27.1041 85.3926 27.967C83.685 28.8095 81.6893 29.2307 79.4055 29.2307H72.4V7.81064H79.4055ZM79.4055 26.3644C81.9156 26.3644 83.8393 25.6864 85.1766 24.3303C86.5139 22.9742 87.1826 21.0633 87.1826 18.5977C87.1826 16.1115 86.5139 14.1699 85.1766 12.7727C83.8393 11.3755 81.9156 10.6769 79.4055 10.6769H75.9182V26.3644H79.4055Z" fill="white"/>
          <path d="M96.2553 10.6461V16.9334H103.662V19.7997H96.2553V26.3644H104.588V29.2307H92.7371V7.77982H104.588V10.6461H96.2553Z" fill="white"/>
          <path d="M125 29.2307H121.482L110.896 13.235V29.2307H107.378V7.77982H110.896L121.482 23.7447V7.77982H125V29.2307Z" fill="white"/>
          <path d="M57.3411 24.8157H48.2811L46.7244 29.2308H43.0195L50.7718 7.59052H54.8815L62.6338 29.2308H58.8977L57.3411 24.8157ZM56.3448 21.9241L52.8267 11.8813L49.2774 21.9241H56.3448Z" fill="white"/>
          </svg>
          `,
          }}
        />
      </AniLink>
    )
  }, [])
 

  const pages = [
    { name: "Book Online", url: "/booking" },
    { name: "Projects", url: "#projects" },
    { name: "Services", url: "#services" },
    { name: "Skills", url: "#skills" },
    { name: "Blog", url: "#blog" },
  ]

  const contactEmbedded = [
    { name: "phone", url: "#phone", icon: "phone" },
    { name: "mail", url: "#mail", icon: "mail" },
  ]

  const search = [{ name: "search", url: "#search", icon: "search" }]

  const processPages = React.useCallback((name, url) => {
    return pages.map((page, i) => {
      switch (page.url[0]) {
        case "/":
          return (
            <AniLink
              hex={"#2E00FF"}
              duration={1.2}
              paintDrip
              cover
              direction={"top"}
              // zindex={20}
              key={page.name}
              to={page.url}
            >
              {boldCurrentPage(page.name.toUpperCase(), i)}
            </AniLink>
          )
        case "#":
          return (
            <Link key={page.name} to={page.url} className={classes.pageLinks}>
              {boldCurrentPage(page.name.toUpperCase(), i)}
            </Link>
          )
        default:
          return null
      }
    })
  }, [])

  const pageNavigation = React.useCallback(() => {
    const classes = useStyles()
    return (
      <div className={classes.pageNav} style={{ zIndex: 30 }}>
        {processPages(pages)}
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
          {logo("inherit")}

          {pageNavigation()}

          {drawerSwitch()}
        </Toolbar>

        {/* <NavigationBlob /> */}
      </AppBar>
    </Slide>
  )
}
