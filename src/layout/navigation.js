

import React, { useContext, useEffect } from "react"

//ui
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
import {
  customMenuIcon,
  logoFull,
  logoMedium,
  logoSmall,
  menuIcon,
} from "../../static/hardcoded-svgs"
import { makeStyles } from "@material-ui/core/styles"


import logoPng from "../../static/svgs/logo.png"
import { GoldButton } from "../components/customButton"
import { NavigationBlob } from "../components/navigationBlob"


const useStyles = makeStyles(theme => ({
  drawer: {
    "& .MuiDrawer-paper": {
      background: "rgba(80,105,54,.6)",
    },
  },
  drawerList: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
  },
  pageLinks:{
    fontSize: '.75rem',
    marginLeft: '15px',
    marginRight: '15px',
    textDecoration: "none",
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
    fontFamily: "Cinzel Decorative",
  },
  appBar:{
      background: theme.palette.background.default,
      // background: `rgba(80, 105, 54, 1),rgba(145, 146, 175, 1)`,
      // theme.palette.background.secondary,//change to "rgba(80,105,54,.6)" when app bar scrolled past initial place
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      zIndex: 30,//hidhest
      boxShadow: "none",
  },
  logo:{
    maxWidth: '90px',
  }
}));

export default function Navigation({ theme, themeState, children, window }) {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false)
  const iOS = /iPad|iPhone|iPod/.test(navigator?.userAgent);

  const toggleDrawer = React.useCallback(event => setDrawerState(
    (drawerState) => !drawerState
  ), [])

  const menuIcon = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        className="mx-auto"
        dangerouslySetInnerHTML={{ __html: customMenuIcon }}
      />
    ), [])

  const logo = React.useCallback(
    color => ( 
      <>
        <img
          src={logoPng}
          loading="lazy"
          className={classes.logo}
           />
      </>
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
  
  const search = [
    { name: "search", url: "#search", icon: "search" },
  ]

  const boldCurrentPage = React.useCallback((name, i) => {
    if (pages[i].url === document.location.hash) return <b>{name}</b>
    else return name
  }, [])

  const navigateTo = page => {
    if (page[0] === "#") document.getElementById(page)?.scrollIntoView()
    // window.location.hash = page.url
  }

  const pageNav = React.useCallback(
    () => (
      <div className="justify-content-evenly d-none d-md-block" style={{zIndex: 30}}>
        {pages.map((page, i) => (
          <Link
            key={page.name}
            to={page.url}
            className={classes.pageLinks} 
            onClick={event => navigateTo(page.url)}
          >
          {page.name === 'BOOK ONLINE' && (
            <GoldButton>
            {boldCurrentPage(page.name.toUpperCase(), i)}
            </GoldButton>
          ) || (
            boldCurrentPage(page.name.toUpperCase(), i)
          )}
          </Link>
        ))}
      </div>
    ),[])

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
  })

  //contains drawer for the menu
  const drawerSwitch = React.useCallback(
    () => (
      <React.Fragment key="drawer">
        <Button className="p-0" onClick={e => toggleDrawer(e)}>
          {menuIcon()}
        </Button>
        <SwipeableDrawer
          // isableBackdropTransition={!iOS} 
          onOpen={() => setDrawerState(true)}
          onClose={() => setDrawerState(false)}
          disableDiscovery={iOS}
          anchor="right" open={drawerState}
          className={classes.drawer}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    ), [drawerState])

  const list = React.useCallback(
    () => (
      <div
        role="presentation"
        onClick={e => toggleDrawer(e)}
        onKeyDown={e => toggleDrawer(e)}
        className={classes.drawerList}
      >
        <List>
          {pages.map(
            (page, index) => (
              <ListItem button key={page.name} onClick={e => {
                navigateTo(page.url);
                toggleDrawer();
              }}>
                <Link
                  key={page.name} to={page.url} onClick={event => navigateTo(page.url)}
                  className={classes.pageLinks}
                >
                  {boldCurrentPage(page.name, index)}
                </Link>
              </ListItem>
            )
          )}
        </List>
      </div>
    ), [drawerState])

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      <AppBar
        elevation={!trigger ? 6 : 0}
        position="sticky"
        className={classes.appBar}
      >
      
        <Toolbar className="justify-content-between px-3">
          {logo("#3F310E")}

          {pageNav()}

          {/* {drawerSwitch()} */}
        </Toolbar>

        <NavigationBlob/>
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
