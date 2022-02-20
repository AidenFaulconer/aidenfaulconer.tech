import React, { useContext, useEffect } from 'react';

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
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  Brightness2, Brightness5, Close, ClosedCaptionOutlined, Menu,
} from '@material-ui/icons';
// import { navigate } from "gatsby-link"
// ========================================================================== //
// Page transitions
// ========================================================================== //
import { Link } from 'gatsby';

// ========================================================================== //
// Styles
// ========================================================================== //
import { makeStyles } from '@material-ui/core/styles';
// import {
//   customMenuIcon,
//   logoFull,
//   logoMedium,
//   logoSmall,
//   menuIcon,
// } from '../../static/svgs/hardcoded-svgs';

import logoPng from '../../static/svgs/logo.png';
import {
  RegularButton,
  SecondaryButton,
} from '../components/custom/buttons';
import { NavigationBlob } from '../components/custom/navigationBlob';
import { useStore } from '../store/store';
import { SCROLL_PROPS } from '../store/theme';
import { Illustration } from '../components/custom/illustrations';

const useStyles = makeStyles((theme) => ({
  drawer: {},
  drawerList: {
    width: '100vw',
    height: '100vh',
  },
  pageNav: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  pageLinks: {
    fontSize: '.65rem',
    marginLeft: '15px',
    marginRight: '15px',
    fontFamily: 'Poppins',
    textDecoration: 'none',
    fontWeight: 500,
    color: 'inherit',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  appBar: {
    // background: `linear-gradient(-90deg, ${theme.custom.contrast.black} 23.52%, ${theme.palette.text.primary} 23.52%, ${theme.palette.text.primary}) 61.89%`,
    // background: `rgba(80, 105, 54, 1),rgba(145, 146, 175, 1)`,
    // theme.palette.background.secondary,//change to "rgba(80,105,54,.6)" when app bar scrolled past initial place
    boxShadow: theme.custom.shadows.brand,
    zIndex: 30, // hidhest
    minHeight: 85,
    height: '7vh',
    display: 'flex',
    flexDirection: 'row',
    // padding: `${theme.spacing(0)}px calc(8.33333% + ${theme.spacing(0)}px)`,
    justifyContent: 'space-evenly',
    color: theme.palette.text.secondary,
    borderBottom: theme.custom.borders.brandBorder,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4),
    },
  },
  logo: {
    color: 'inherit',
    cursor: 'pointer',
    maxWidth: '90px',
  },
  menuIcon: {
    color: 'inherit',
    border: 'none !important',
    width: 54,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      // transform: 'scale(.5)',
      left: 0,
      top: '-12mm',
      display: 'inline-block',
      transition: theme.transitions.create(
        ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),
    },
    '&:hover': {
      '& svg': {
        top: '0mm',
        transform: 'rotate(340deg) scale(1.5) !important',
        fill: theme.palette.primary.main,
        transition: theme.transitions.create(
          ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
          { duration: '0.3s', easing: 'ease-in-out' },
        ),
      },
    },
  },
}));

const Navigation = React.memo(
  ({ children, window }) => {
    const classes = useStyles();
    const [drawerState, setDrawerState] = React.useState(false);
    const iOS = (typeof window !== 'undefined'
        && /iPad|iPhone|iPod/.test(navigator?.userAgent))
      || false;

    const toggleDrawer = React.useCallback(
      (event) => setDrawerState((drawerState) => !drawerState),
      [],
    );

    const pages = [
      { name: 'Projects', url: '#projects' },
      { name: 'Services', url: '#services' },
      { name: 'Skills', url: '#skills' },
      { name: 'Blog', url: '#blog' },
    ];

    const contactEmbedded = [
      { name: 'phone', url: '#phone', icon: 'phone' },
      { name: 'mail', url: '#mail', icon: 'mail' },
    ];

    const search = [{ name: 'search', url: '#search', icon: 'search' }];

    const menuIcon = React.useCallback(
      (color) => (
        <div
          className={classes.menuIcon}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="61" fill="none" viewBox="0 0 54 61">
              <defs/>
              <g clip-path="url(#clip0_913_38226)">
                <path fill="#000064" stroke="#E6EBFA" stroke-width=".769" d="M2.57 46.656L24.338 59.91l19.854-17.463-21.786-13.265L2.57 46.656z"/>
                <path fill="#E6EBFA" stroke="#E6EBFA" stroke-width=".769" d="M23.792 59.577L2.025 46.324l4.413-26.863 21.787 13.263-4.433 26.853zM27.21 1.653l21.766 13.253-4.413 26.864-21.787-13.264 4.433-26.853z"/>
                <path fill="#000064" stroke="#E6EBFA" stroke-width=".769" d="M48.43 14.574L26.664 1.322 6.81 18.784 28.595 32.05 48.43 14.574z"/>
              </g>
              <defs>
                <clipPath id="clip0_913_38226">
                  <path fill="#fff" d="M0 0h54v61H0z"/>
                </clipPath>
              </defs>
            </svg>
          `,
          }}
        />
      ),
      [],
    );

    const boldCurrentPage = React.useCallback((name, i) => {
      if (typeof window !== 'undefined') { if (pages[i].url === document.location.hash) return <b>{name}</b>; }
      return <>{name}</>;
    }, []);

    const scrollToSmoothly = (pos, time) => {
      if (typeof window === 'undefined') return;
      const currentPos = window.pageYOffset;
      let start = null;
      if (time == null) time = 500;
      (pos = +pos), (time = +time);
      window.requestAnimationFrame((currentTime) /* step */ => {
        start = !start ? currentTime : start;
        const progress = currentTime - start;
        if (currentPos < pos) {
          window.scrollTo(
            0,
            ((pos - currentPos) * progress) / time + currentPos,
          );
        } else {
          window.scrollTo(
            0,
            currentPos - ((currentPos - pos) * progress) / time,
          );
        }
        if (progress < time) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, pos);
        }
      });
    };

    const navigateTo = React.useCallback((page) => {
      if (typeof window === 'undefined') return;
      console.log(page);
      if (page[0] === '#' && typeof document !== 'undefined') {
        // navigatePage(page)
        scrollToSmoothly(
          document.getElementById(page.slice(1, page.length)).offsetTop,
          2000,
        );
      } else {
        // navigatePage(page)
      }
      // window.location.hash = page.url
    }, []);

    // ========================================================================== //
    //   Logo
    // ========================================================================== //

    const logo = React.useCallback(
      (color) => (
        <Link to="/">
          <div
            className={(classes.menuIcon)}
            // {...SCROLL_PROPS}
            style={{
              fill: 'white',
            }}
            dangerouslySetInnerHTML={{
              __html: `
              <svg xmlns="http://www.w3.org/2000/svg" width="54" height="61" fill="none" viewBox="0 0 56 61">
                <defs/>
                <path fill="#000064" stroke="#E6EBFA" stroke-width=".769" d="M18.662 50.518l-9.626 2.588V25.924l9.626-1.737v26.331z"/>
                <path fill="#E6EBFA" d="M16.627.808c8.771 0 11.163 3.2 11.163 3.2V15.21l-14.352-6.4L.744 13.726C.744.925 16.627.808 16.627.808z"/>
                <path fill="#E6EBFA" d="M38.905.808c-8.771 0-11.163 3.2-11.163 3.2V15.21l14.352-6.4 12.694 4.917C54.788.925 38.905.808 38.905.808z"/>
                <path fill="#E6EBFA" d="M36.67 17.893l10.191 1.042 1.23-.417V7.892H36.67v10.001zM36.671 34.77l9.968 2.5 1.66-1.042v-6.875l-11.42.208-.208 5.209zM8.652 53.608L.538 50.769v-36c0-12.801 12.898-12.362 12.898-12.362 14.353.8 14.353 9.6 14.353 14.4v44.001l-9.569-3.536V36.227c0-4.8-9.568-7.867-9.568-2.864v20.245zM36.462 23.102l15.576 2.5-15.576 3.334v-5.834z"/>
                <path fill="#000064" stroke="#000064" stroke-width=".769" d="M8.651 15.208c0-4.8 9.569-3.2 9.569 1.6v11.2l-9.569-2.4v-10.4z"/>
                <path fill="#000064" stroke="#000064" stroke-width=".769" d="M18.278 28.046L8.65 25.608v-10.4c0-4.685 9.627-3.645 9.627 1.214v11.624z"/>
                <path fill="#000064" stroke="#E6EBFA" stroke-width=".769" d="M8.359 25.433l-.022.751 10.175 2.5.477.117v-5.327l-.455.083L8.36 25.433zM36.972 27.477v.437l.434-.055 14.247-1.82v9.478l-4.63 1.25v-3.872a1.83 1.83 0 00-.504-1.291c-.315-.333-.747-.556-1.227-.691-.957-.269-2.192-.212-3.398.127-2.397.672-4.922 2.542-4.922 5.605V57.33l-8.799 2.943V40.607v-23.8c0-2.413.008-5.704 1.737-8.498 1.707-2.76 5.154-5.121 12.24-5.519h.023l.104.003c.093.003.23.008.404.018.35.021.852.063 1.454.145 1.208.166 2.81.495 4.402 1.146 1.594.652 3.162 1.618 4.325 3.05 1.157 1.424 1.93 3.33 1.906 5.9h0v3.901l-7.538 1.512v-3.489c0-1.17-.71-2.037-1.683-2.566-.969-.525-2.233-.743-3.478-.636-1.248.106-2.516.54-3.48 1.367-.974.834-1.617 2.052-1.617 3.666v10.67z"/>
              </svg>
            `,
            }}
          />
        </Link>
      ),
      [],
    );

    const processPages = React.useCallback(
      (name, url) => pages.map((page, i) => {
        switch (page.url[0]) {
          case '/':
            return (
              <Link key={page.name} to={page.url}>
                <RegularButton
                  size="small"
                  style={{ fontSize: '.5rem !important' }}
                >
                  {boldCurrentPage(page.name.toUpperCase(), i)}
                </RegularButton>
              </Link>
            );
          case '#':
            return (
              <Link
                key={page.name}
                to={page.url}
                className={classes.pageLinks}
              >
                {boldCurrentPage(page.name.toUpperCase(), i)}
              </Link>
            );
          default:
            return null;
        }
      }),
      [],
    );
    // ========================================================================== //
    //       Pages
    // ========================================================================== //
    const pageNavigation = React.useCallback(() => {
      const classes = useStyles();
      return (
        <div className={classes.pageNav} style={{ zIndex: 30 }}>
          {processPages(pages)}
          <RegularButton style={{ marginLeft: 30 }} onClick={() => navigateTo('./booking')}>Start Project</RegularButton>
        </div>
      );
    }, []);

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      threshold: 6000,
      disableHysteresis: true,
    });

    // contains drawer for the menu
    // ========================================================================== //
    // Popup drawer Menu
    // ========================================================================== //
    const toggleTheme = useStore((state) => state.appContext.toggleTheme);
    const theme = useTheme();
    const type = useStore((state) => state.appContext.type);

    const drawerMenu = React.useCallback(() => (
      <div role="presentation" onClick={(e) => toggleDrawer(e)} onKeyDown={(e) => toggleDrawer(e)} className={classes.drawerList}>

        <div
          id="menu-header"
          style={{
            display: 'inline-flex', padding: 30, justifyContent: 'center', width: '100%', maxHeight: '23.5%',
          }}
        >
          <button
            type="button"
            className={classes.fab}
            onClick={() => setDrawerState(true)}
            style={{
              width: 50, height: 50, color: 'white', borderRadius: '100%', background: theme.palette.text.primary/** themeprimary */ }}
            aria-label="change theme"
          >
            <Close />
          </button>
        </div>

        <List style={{
          height: '61.72%', width: '100%', background: theme.palette.text.primary, alignItems: 'center', display: 'inline-flex',
        }}
        >
          {pages.map((page, index) => (
            <ListItem
              button
              style={{ justifyContent: 'center', maxWidth: 300 }}
              key={page.name}
              onClick={(e) => {
                navigateTo(page.url);
                toggleDrawer();
              }}
            >
              <Link
                style={{
                  color: 'white', fontSize: '2rem', textTransform: 'capitalize', display: 'inline-flex', justifyContent: 'center',
                }}
                className={classes.pageLinks}
                key={page.name}
                to={page.url}
                onClick={(event) => navigateTo(page.url)}
              >
                {boldCurrentPage(page.name, index)}
              </Link>
            </ListItem>
          ))}
          <Illustration flip maxWidth={240} type="moustache" margin="60px,0px,0px,0px" />
        </List>

        <div
          id="menu-footer"
          style={{
            height: '27.1%', width: '100%', gap: 60, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 30,
          }}
        >

          <div
            id="theme-switch"
            style={{
              display: 'inline-flex', height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10,
            }}
          >
            <Typography gutterBottom variant="body1" color="primary" align="center">{`${type} theme`}</Typography>
            <div
              id="social-media"
              style={{
                display: 'inline-flex', width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10,
              }}
            >
              <button
                type="button"
                className={classes.fab}
              // onClick={() => toggleTheme()}
                style={{
                  background: theme.palette.text.primary, color: theme.palette.text.secondary, width: 50, height: 50, position: 'relative', border: '1px solid black', borderRadius: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', border: theme.custom.borders.brandBorder,
                }}
                aria-label="change theme"
              >
                {(type === 'light' && <Brightness5 />) || <Brightness2 />}
              </button>
            </div>
          </div>

          <div
            id="social-media-container"
            style={{
              display: 'inline-flex', width: '100%', height: 100, flexDirection: 'column', maxWidth: 250, alignItems: 'center', gap: 10,
            }}
          >
            <Typography gutterBottom variant="body1" color="primary" align="center">Follow me</Typography>
            <div
              id="social-media"
              style={{
                display: 'inline-flex', width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10,
              }}
            >
              <button
                type="button"
                onClick={navigateTo('./instagram')}
                style={{
                  background: theme.palette.text.primary, color: theme.palette.text.secondary, width: 50, height: 50, position: 'relative', border: '1px solid black', borderRadius: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', border: theme.custom.borders.brandBorder,
                }}
              />
              <button
                type="button"
                onClick={navigateTo('./linkedin')}
                style={{
                  background: theme.palette.text.primary, color: theme.palette.text.secondary, width: 50, height: 50, position: 'relative', border: '1px solid black', borderRadius: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', border: theme.custom.borders.brandBorder,
                }}
              />
              <button
                type="button"
                onClick={navigateTo('./github')}
                style={{
                  background: theme.palette.text.primary, color: theme.palette.text.secondary, width: 50, height: 50, position: 'relative', border: '1px solid black', borderRadius: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', border: theme.custom.borders.brandBorder,
                }}
              />
              <button
                type="button"
                onClick={navigateTo('./facebook')}
                style={{
                  background: theme.palette.text.primary, color: theme.palette.text.secondary, width: 50, height: 50, position: 'relative', border: '1px solid black', borderRadius: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', border: theme.custom.borders.brandBorder,
                }}
              />
              <div />
            </div>

          </div>

        </div>
      </div>
    ), [drawerState]);
    // ========================================================================== //
    //     Drawer
    // ========================================================================== //
    const drawerSwitch = React.useCallback(() => (
      <React.Fragment key="drawer">
        <Button
          onClick={(e) => {
            toggleDrawer(e);
          }}
          style={{ border: 'none', padding: 0 }}
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
          {drawerMenu()}
        </SwipeableDrawer>
      </React.Fragment>
    ),
    [drawerState]);

    // ========================================================================== //
    //     app bar
    // ========================================================================== //
    return (
      <>
        <Slide appear direction="down" in={!trigger}>
          <AppBar
            elevation={!trigger ? 6 : 0}
            position="sticky"
            className={classes.appBar}
          >

            <Grid item sm={false} md={10} style={{ width: '100%' }}>
              <Toolbar disableGutters style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                {logo('inherit')}

                {pageNavigation()}

                {drawerSwitch()}
              </Toolbar>
            </Grid>

            {/* <NavigationBlob /> */}
          </AppBar>
        </Slide>
      </>
    );
  },
  (pre, post) => pre.props !== post.props,
);

export default Navigation;
