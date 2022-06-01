import React, { useContext, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { navigate } from 'gatsby-link';
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
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Brightness2, Brightness5, Close, ClosedCaptionOutlined, Menu,
} from '@mui/icons-material';
// import { navigate } from "gatsby-link"
// ========================================================================== //
// Page transitions
// ========================================================================== //
import { Link } from 'gatsby';

import logoPng from '../../static/svgs/logo.png';
import {
  RegularButton,
} from '../components/custom/buttons';
import { useStore } from '../store/store';
import { SCROLL_PROPS } from '../store/theme';
import { Illustration } from '../components/custom/illustrations';
import { useScrollProgress } from '../components/util/customHooks';

const Navigation = ({ window }) => {
  const [drawerState, setDrawerState] = React.useState(false);
  const iOS = (typeof window !== 'undefined'
      && /iPad|iPhone|iPod/.test(navigator?.userAgent))
      || false;

  const toggleDrawer = React.useCallback(() => setDrawerState((drawerState) => !drawerState), []);
  const theme = useTheme();
  const toggleTheme = useStore((state) => state.appContext.methods.toggleTheme);
  const triggerPageChange = useStore((state) => state.threejsContext.methods.triggerPageChange);
  const changePage = useStore((state) => state.threejsContext.methods.changePage);
  const setCurrent = useStore((state) => state.appContext.methods.setCurrent);
  const setColor = useStore((state) => state.threejsContext.methods.setColor);
  const type = useStore((state) => state.appContext.type);

  const scrollToElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const navigateToPage = React.useCallback((pageLink, pageIndex) => {
    // if (typeof window === 'undefined') return;
    if (pageLink[0] === '#') {
      if (document.location.pathname !== '/') changePage({ selectedIndex: -1, pageLink: '/' });// go to index page
      setCurrent(pageIndex);
      scrollToElementById('carousel-container-0');
      return;
    }

    setColor({ x: theme.palette.text.primary, y: 1 });
    triggerPageChange({ background: theme.palette.text.special, transform: 'skew(-10deg)', left: '215vw' });
    changePage({
      selectedIndex: pageIndex || -1, // -1 is index page
      pageLink,
    });
  }, [setCurrent]);

  const pages = [
    { name: 'Projects', url: '#projects', slideIndex: 5 },
    { name: 'Services', url: '#services', slideIndex: 0 },
    { name: 'Skills', url: '#skills', slideIndex: 2 },
    { name: 'Blog', url: '#blog', slideIndex: 4 },
  ];

  // ========================================================================== //
  //   Navigation styles
  // ========================================================================== //
  const menuIconStyles = {
    color: 'inherit',
    border: 'none !important',
    width: 54,
    height: 64,
    zIndex: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      // transform: 'scale(.5)',
      left: 0,
      top: '-12mm',
      display: 'inline-block',
      transition: (theme) => theme.transitions.create(
        ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),
    },
    '&:hover': {
      '& svg': {
        top: '0mm',
        transform: 'rotate(340deg) scale(1.5) !important',
        fill: 'text.primary.main',
        transition: (theme) => theme.transitions.create(
          ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
          { duration: '0.3s', easing: 'ease-in-out' },
        ),
      },
    },
  };
  const pageLinkStyles = {
    fontSize: '.75rem',
    pl: { xs: 1, md: 3 },
    pr: { xs: 1, md: 3 },
    textDecoration: 'none',
    fontWeight: 500,
    color: 'text.secondary',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    display: { sm: 'inline', xs: 'none' },
  };
  const pageNavigationStyles = {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    display: {
      sm: 'inline-flex',
      // xs: 'none',
    },
  };

  const menuIcon = React.useCallback(
    () => (
      <Box
        sx={{ ...menuIconStyles }}
          // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="61" fill="none" viewBox="0 0 54 61">
              <defs/>
              <g clip-path="url(#clip0_913_38226)">
                <path fill="${theme.palette.text.primary}" stroke="${theme.palette.text.secondary}" stroke-width=".769" d="M2.57 46.656L24.338 59.91l19.854-17.463-21.786-13.265L2.57 46.656z"/>
                <path fill="${theme.palette.text.secondary}" stroke="${theme.palette.text.secondary}" stroke-width=".769" d="M23.792 59.577L2.025 46.324l4.413-26.863 21.787 13.263-4.433 26.853zM27.21 1.653l21.766 13.253-4.413 26.864-21.787-13.264 4.433-26.853z"/>
                <path fill="${theme.palette.text.primary}" stroke="${theme.palette.text.secondary}" stroke-width=".769" d="M48.43 14.574L26.664 1.322 6.81 18.784 28.595 32.05 48.43 14.574z"/>
              </g>
              <defs>
                <clipPath id="clip0_913_38226">
                  <path fill="${theme.palette.text.secondary}" d="M0 0h54v61H0z"/>
                </clipPath>
              </defs>
            </svg>
          `,
        }}
      />
    ),
    [type],
  );

  const boldCurrentPage = React.useCallback((name, i) => {
    if (typeof window !== 'undefined') { if (pages[i].url === document.location.hash) return <b>{name}</b>; }
    return <>{name}</>;
  }, []);

  const scrollProgress = useScrollProgress();
  const logo = React.useCallback(
    () => {
      const primaryColor = theme.palette.text.primary;
      const secondaryColor = theme.palette.text.secondary;

      return (
        <>
          {/* progress svg bar */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: '-6.25px',
              left: '-12.5px',
              strokeDasharray: 250,
              strokeDashoffset: 250 - ((250 * scrollProgress) / 100),
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="39.5"
              strokeWidth={0.5}
              stroke={theme.palette.text.secondary}
            />
          </svg>

          <Box
            onClick={() => navigateToPage('/', 0)}
            sx={{
              ...menuIconStyles,
            }}
          // {...SCROLL_PROPS}
            style={{
              fill: 'currentColor',
            }}
            dangerouslySetInnerHTML={{
              __html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="61" fill="none" viewBox="0 0 56 61">
              <defs/>
              <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width=".769" d="M18.662 50.518l-9.626 2.588V25.924l9.626-1.737v26.331z"/>
              <path fill="${secondaryColor}" d="M16.627.808c8.771 0 11.163 3.2 11.163 3.2V15.21l-14.352-6.4L.744 13.726C.744.925 16.627.808 16.627.808z"/>
              <path fill="${secondaryColor}" d="M38.905.808c-8.771 0-11.163 3.2-11.163 3.2V15.21l14.352-6.4 12.694 4.917C54.788.925 38.905.808 38.905.808z"/>
              <path fill="${secondaryColor}" d="M36.67 17.893l10.191 1.042 1.23-.417V7.892H36.67v10.001zM36.671 34.77l9.968 2.5 1.66-1.042v-6.875l-11.42.208-.208 5.209zM8.652 53.608L.538 50.769v-36c0-12.801 12.898-12.362 12.898-12.362 14.353.8 14.353 9.6 14.353 14.4v44.001l-9.569-3.536V36.227c0-4.8-9.568-7.867-9.568-2.864v20.245zM36.462 23.102l15.576 2.5-15.576 3.334v-5.834z"/>
              <path fill="${primaryColor}" stroke="#0${primaryColor}064" stroke-width=".769" d="M8.651 15.208c0-4.8 9.569-3.2 9.569 1.6v11.2l-9.569-2.4v-10.4z"/>
              <path fill="${primaryColor}" stroke="${primaryColor}" stroke-width=".769" d="M18.278 28.046L8.65 25.608v-10.4c0-4.685 9.627-3.645 9.627 1.214v11.624z"/>
              <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width=".769" d="M8.359 25.433l-.022.751 10.175 2.5.477.117v-5.327l-.455.083L8.36 25.433zM36.972 27.477v.437l.434-.055 14.247-1.82v9.478l-4.63 1.25v-3.872a1.83 1.83 0 00-.504-1.291c-.315-.333-.747-.556-1.227-.691-.957-.269-2.192-.212-3.398.127-2.397.672-4.922 2.542-4.922 5.605V57.33l-8.799 2.943V40.607v-23.8c0-2.413.008-5.704 1.737-8.498 1.707-2.76 5.154-5.121 12.24-5.519h.023l.104.003c.093.003.23.008.404.018.35.021.852.063 1.454.145 1.208.166 2.81.495 4.402 1.146 1.594.652 3.162 1.618 4.325 3.05 1.157 1.424 1.93 3.33 1.906 5.9h0v3.901l-7.538 1.512v-3.489c0-1.17-.71-2.037-1.683-2.566-.969-.525-2.233-.743-3.478-.636-1.248.106-2.516.54-3.48 1.367-.974.834-1.617 2.052-1.617 3.666v10.67z"/>
            </svg>
          `,
            }}
          />
        </>
      );
    },
    [type, scrollProgress],
  );

  const processPages = React.useCallback(
    () => pages.map(({ url, name, slideIndex }, i) => {
      switch (url[0]) {
        case '/':// for page navs use buttons
          return (
            <Box
              key={name}
              onClick={() => navigateToPage(url, slideIndex)}
              sx={{
                transform: { xs: 'scale(.75)' },
                pointer: 'cursor',
              }}
            >
              <RegularButton
                size="small"
                style={{ fontSize: '.5rem !important' }}
              >
                {boldCurrentPage(name.toUpperCase(), i)}
              </RegularButton>
            </Box>
          );
        case '#':// for internal links use anchors
          return (
            <Box
              key={name}
              onClick={() => navigateToPage(url, slideIndex)}
              sx={{ ...pageLinkStyles }}
            >
              {boldCurrentPage(name.toUpperCase(), i)}
            </Box>
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
  const pageNavigation = React.useCallback(() => (
    <Box sx={{ ...pageNavigationStyles }} style={{ zIndex: 30 }}>
      {processPages(pages)}
      <RegularButton
        onClick={() => navigateToPage('/booking', -2)}
        style={{ marginLeft: 30 }}
      >
        Start Project

      </RegularButton>
    </Box>
  ), []);

  // contains drawer for the menu
  // ========================================================================== //
  // Popup drawer Menu
  // ========================================================================== //
  const drawerMenu = React.useCallback(() => (
    <Box
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
      sx={{
        height: '100vh',
        width: { sm: '100vw', xs: '100vw' },
        display: 'inline-flex',
        flexDirection: 'column',
      }}
    >

      <div
        id="menu-header"
        style={{
          display: 'inline-flex',
          padding: 30,
          justifyContent: 'center',
          width: '100%',
          height: '23.5%',
        }}
      >
        <RegularButton
          type="icon"
          icon={{ type: 'close', enabled: true }}
          onClick={() => setDrawerState(true)}
        />
      </div>

      <List
        sx={{
          flexDirection: { sm: 'row', xs: 'column' },
          overflow: 'hidden',
          height: '61.72%',
          width: '100%',
          border: theme.custom.borders.brandBorder,
          color: theme.palette.text.secondary,
          background: theme.palette.text.primary,
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        {pages.map(({ name, url, slideIndex }, index) => (
          <ListItem
            button
            style={{ justifyContent: 'center', maxWidth: '300' }}
            key={name}
            onClick={() => {
              navigateToPage(url);
              toggleDrawer();
            }}
          >
            <Typography
              variant="h2"
              sx={{
                ...pageLinkStyles,
                color: 'currentColor',
                // fontSize: '2rem',
                textTransform: 'capitalize',
                display: 'inline-flex',
                justifyContent: 'center',
              }}
              onClick={() => navigateToPage(url, slideIndex)}
            >
              {boldCurrentPage(name, index)}
            </Typography>
          </ListItem>
        ))}
        <Illustration
          maxWidth={50}
          type="moustache"
        />
      </List>

      <div
        id="menu-footer"
        style={{
          height: '27.1%',
          width: '100%',
          gap: 60,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
          color: theme.palette.text.primary,
        }}
      >

        <div
          id="theme-switch"
          style={{
            display: 'inline-flex',
            height: 100,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            color: theme.palette.text.primary,
          }}
        >
          <Typography width="100%" gutterBottom variant="body1" color="currentColor" align="center">{`${type} theme`}</Typography>
          <div
            id="social-media"
            style={{
              display: 'inline-flex', width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10,
            }}
          >
            <button
              type="button"
              onClick={() => toggleTheme()}
              style={{
                background: theme.palette.text.primary,
                width: 50,
                height: 50,
                position: 'relative',
                border: '1px solid black',
                borderRadius: '100%',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                border: theme.custom.borders.brandBorder,
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
            display: 'inline-flex',
            width: '100%',
            height: 100,
            flexDirection: 'column',
            maxWidth: 250,
            alignItems: 'center',
            gap: 10,
            color: theme.palette.text.primary,
          }}
        >
          <Typography width="100%" gutterBottom variant="body1" color="currentColor" align="center">Follow me</Typography>
          <div
            id="social-media"
            style={{
              display: 'inline-flex', width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10,
            }}
          >
            <RegularButton
              type="icon"
              icon={{ enabled: true, type: 'instagram' }}
              onClick={() => navigateToPage('./instagram')}
            />
            <RegularButton
              type="icon"
              icon={{ enabled: true, type: 'linkedin' }}
              onClick={() => navigateToPage('./linkedin')}
            />
            <RegularButton
              type="icon"
              icon={{ enabled: true, type: 'github' }}
              onClick={() => navigateToPage('./github')}
            />
            <RegularButton
              type="icon"
              icon={{ enabled: true, type: 'facebook' }}
              onClick={() => navigateToPage('./facebook')}
            />
            <div />
          </div>

        </div>

      </div>
    </Box>
  ), [drawerState]);

  // ========================================================================== //
  //     Drawer
  // ========================================================================== //
  const drawerSwitch = React.useCallback(() => (
    <React.Fragment key="drawer">
      <Button
        sx={{ ...menuIconStyles }}
        onClick={(e) => { toggleDrawer(e); }}
      >
        {menuIcon()}
      </Button>
      <SwipeableDrawer
          // isableBackdropTransition={!iOS}
        onOpen={() => setDrawerState(true)}
        onClose={() => setDrawerState(false)}
        disableDiscovery={iOS}
        anchor="bottom"
        open={drawerState}
        sx={{}}
      >
        {drawerMenu()}
      </SwipeableDrawer>
    </React.Fragment>
  ),
  [drawerState]);

  const hexToAlpha = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 6000,
    disableHysteresis: true,

  });

  // ========================================================================== //
  //     app bar
  // ========================================================================== //
  return (
    <>
      <Slide appear direction="down" in={!trigger}>
        <AppBar
          elevation={!trigger ? 6 : 0}
          position="fixed"
          sx={{
            boxShadow: (theme) => theme.custom.shadows.brand,
            zIndex: 30, // hidhest
            minHeight: 85,
            height: 100,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // background: (theme) => `linear-gradient(180deg, ${theme.palette.text.primary} 20%, ${hexToAlpha(theme.palette.text.primary, 0)} 100%)`,
            background: (theme) => hexToAlpha(theme.palette.text.primary, 0.6),
            backdropFilter: 'blur(10px)',
            color: 'text.secondary',
            padding: {
              xs: 2,
              sm: 2,
              md: [2, 0],
            },
          }}
        >

          <Grid item sm={false} md={10} style={{ width: '100%' }}>
            <Toolbar disableGutters style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
              {logo('inherit')}

              {pageNavigation()}

              {drawerSwitch()}
            </Toolbar>
          </Grid>

        </AppBar>
      </Slide>
    </>
  );
};

export default Navigation;
