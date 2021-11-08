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
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
// import { navigate } from "gatsby-link"
// ========================================================================== //
// Page transitions
// ========================================================================== //
import { Link } from 'gatsby';

// ========================================================================== //
// Styles
// ========================================================================== //
import { makeStyles } from '@material-ui/core/styles';
import {
  customMenuIcon,
  logoFull,
  logoMedium,
  logoSmall,
  menuIcon,
} from '../../static/svgs/hardcoded-svgs';

import logoPng from '../../static/svgs/logo.png';
import {
  RegularButton,
  SecondaryButton,
} from '../components/custom/customButton';
import { NavigationBlob } from '../components/custom/navigationBlob';
import { dt, lt } from './materialUI';
import { useStore } from '../store/store';
import { SCROLL_PROPS } from '../store/theme';

const useStyles = makeStyles((theme) => ({
  drawer: {},
  drawerList: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
  },
  pageNav: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('md')]: {
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
    // padding: theme.spacing(0, 14, 0, 14),
    padding: `${theme.spacing(0)}px calc(8.33333% + ${theme.spacing(0)}px)`,
    justifyContent: 'space-evenly',
    color: theme.palette.text.secondary,
    borderBottom: theme.custom.borders.brandBorder,
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(0, 3),
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
    maxHeight: 50,
    height: '100%',
    cursor: 'pointer',
    '& svg': {
      transform: 'scale(.5)',
      position: 'relative',
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
        transform: 'rotate(340deg) !important',
        fill: theme.palette.primary.main,
        '& #switch-primary': {
          fill: theme.palette.primary.main,
          stopColor: theme.palette.primary.main,
        },
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

    const menuIcon = React.useCallback(
      (color) => (
        <div
          className={classes.menuIcon}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            <svg width="133" height="144" viewBox="0 0 133 144" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.8515 122.374L89.3249 85.8964L43.7908 58.1714L2.35653 94.6746L47.8515 122.374Z" fill="#000064" stroke="white"/>
            <path d="M1.40864 94.0984L10.6285 37.9842L56.1645 65.7058L46.9037 121.797L1.40864 94.0984Z" fill="white" stroke="white"/>
            <path d="M99.0269 28.9016L89.8071 85.0158L44.271 57.2942L53.5319 1.20275L99.0269 28.9016Z" fill="white" stroke="white"/>
            <path d="M52.584 0.6265L11.1106 37.1036L56.6448 64.8286L98.079 28.3254L52.584 0.6265Z" fill="#000064" stroke="white"/>
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
            {...SCROLL_PROPS}
            style={{
              fill: 'white',
            }}
            dangerouslySetInnerHTML={{
              __html: `
              <svg width="133" height="144" viewBox="0 0 133 144" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.2405 0C60.3591 0 66.1187 7.67947 66.1187 7.67947V34.5593L31.561 19.2004L0.998047 31C0.998047 0.279963 39.2405 0 39.2405 0Z" fill="white"/>
              <path d="M92.8781 0C71.7596 0 66 7.67947 66 7.67947V34.5593L100.558 19.2004L131.121 31C131.121 0.279963 92.8781 0 92.8781 0Z" fill="white"/>
              <path d="M87.498 41L112.036 43.5L114.998 42.5V17H87.498V41Z" fill="white"/>
              <path d="M44.5638 55.5979V119.616L20.5361 126.056V59.9181L44.5638 55.5979Z" fill="#000064" stroke="white"/>
              <path d="M87.5 81.5L111.5 87.5L115.498 85V68.5L88 69L87.5 81.5Z" fill="white"/>
              <path d="M20.0365 126.707L0.5 119.894V33.5C0.5 2.78256 31.5557 3.83514 31.5557 3.83514C66.1133 5.75517 66.1133 26.8737 66.1133 38.3929V143.985L43.0749 135.5V84.9953C43.0749 73.4761 20.0365 66.1183 20.0365 78.1231L20.0365 126.707Z" fill="white"/>
              <path d="M86.998 53.5L122.5 59.5L86.998 67.5V53.5Z" fill="white"/>
              <path d="M20.0361 34.5555C20.0361 23.0363 43.0745 26.876 43.0745 38.3966V65.2734L20.0361 59.5138V34.5555Z" fill="#000064" stroke="#000064"/>
              <path d="M43.2152 65.364L20.0366 59.5132V34.5549C20.0366 23.3119 43.2152 25.81 43.2152 37.4681V65.364Z" fill="#000064" stroke="#000064"/>
              <path d="M43.8811 66.4856L44.5 66.6372V66V55.5V54.8998L43.9097 55.0082L19.4097 59.5082L19.3811 60.4856L43.8811 66.4856Z" fill="#000064" stroke="white"/>
              <path d="M88.6512 64V64.5793L89.2243 64.4946L106.142 61.9956L122 60.0646V83.6344L111.998 86.8163V77.0001C111.998 75.8722 111.6 74.9286 110.9 74.1919C110.21 73.4644 109.247 72.9608 108.141 72.6514C105.933 72.034 103.043 72.1581 100.19 72.9561C94.5052 74.546 88.6512 78.9234 88.6512 86.0001L88.6512 135.944L66.6128 143.291L66.6128 142.925L66.6129 139.92L66.6131 129.105L66.6135 95.508C66.6137 70.55 66.6137 44.1521 66.6128 38.393C66.6119 32.6167 66.6229 24.5998 70.8573 17.7779C75.0638 11.0011 83.5207 5.29055 100.683 4.33333L100.689 4.33338L100.753 4.33415C100.811 4.335 100.897 4.33668 101.01 4.33994C101.237 4.34647 101.57 4.35934 101.996 4.38474C102.848 4.43554 104.067 4.53637 105.53 4.73642C108.459 5.13689 112.353 5.93321 116.233 7.51369C120.113 9.09455 123.957 11.4505 126.814 14.9573C129.664 18.4553 131.557 23.126 131.5 29.3884V29.3929V39.0901L112.498 42.8902V34C112.498 31.3888 110.917 29.4312 108.666 28.2136C106.422 27.0001 103.465 26.4865 100.532 26.7361C97.5974 26.9858 94.6349 28.0044 92.3964 29.916C90.1447 31.8388 88.6512 34.6452 88.6512 38.393L88.6512 64Z" fill="#000064" stroke="white"/>
              </svg>
          `,
            }}
          />
        </Link>
      ),
      [],
    );

    const pages = [
      { name: 'Projects', url: '#projects' },
      { name: 'Services', url: '#services' },
      { name: 'Skills', url: '#skills' },
      { name: 'Blog', url: '#blog' },
      { name: 'Book Online', url: '/booking' },
    ];

    const contactEmbedded = [
      { name: 'phone', url: '#phone', icon: 'phone' },
      { name: 'mail', url: '#mail', icon: 'mail' },
    ];

    const search = [{ name: 'search', url: '#search', icon: 'search' }];

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

    const pageNavigation = React.useCallback(() => {
      const classes = useStyles();
      return (
        <div className={classes.pageNav} style={{ zIndex: 30 }}>
          {processPages(pages)}
        </div>
      );
    }, []);

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      threshold: 6000,
      disableHysteresis: true,
    });

    // contains drawer for the menu

    const list = React.useCallback(
      () => (
        <div
          role="presentation"
          onClick={(e) => toggleDrawer(e)}
          onKeyDown={(e) => toggleDrawer(e)}
          className={classes.drawerList}
        >
          <List>
            {pages.map((page, index) => (
              <ListItem
                button
                key={page.name}
                onClick={(e) => {
                  navigateTo(page.url);
                  toggleDrawer();
                }}
              >
                <Link
                  key={page.name}
                  to={page.url}
                  onClick={(event) => navigateTo(page.url)}
                  className={classes.pageLinks}
                >
                  {boldCurrentPage(page.name, index)}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      ),
      [drawerState],
    );

    // ========================================================================== //
    //     Drawer
    // ========================================================================== //
    const drawerSwitch = React.useCallback(
      () => (
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
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
      ),
      [drawerState],
    );

    return (
      <>
        <Slide appear direction="down" in={!trigger}>
          <AppBar
            elevation={!trigger ? 6 : 0}
            position="sticky"
            className={classes.appBar}
          >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

              {logo('inherit')}

              {pageNavigation()}

              {drawerSwitch()}
            </Toolbar>
            {/* <NavigationBlob /> */}
          </AppBar>
        </Slide>
      </>
    );
  },
  (pre, post) => pre.props !== post.props,
);

export default Navigation;
