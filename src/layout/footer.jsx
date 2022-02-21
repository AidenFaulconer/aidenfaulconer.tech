import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';
import { navigate } from 'gatsby-link';

import { InlineIcon } from '@iconify/react';
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import {
  Box, Container, Typography, Grid, makeStyles,
} from '@material-ui/core';
import footerGraphic from '../../static/assets/footer.png';
import {
  logoCircular,
  boxAndPyrimid,
  dataBoxAndCodeBox,

} from '../../static/assets/svg/hardcoded-svgs';
import {
  RegularButton,
  SecondaryButton,
} from '../components/custom/buttons';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    minHeight: 200,
    padding: theme.spacing(3, 6),
    color: theme.palette.text.secondary,
    border: theme.custom.borders.brandBorder,
    background: theme.palette.text.primary,
    '& *  > .MuiGrid-root': {
      transition: 'all .3s ease-in-out',
      textAlign: 'center',
      padding: theme.spacing(1),
      // display: 'grid',
      // padding: theme.spacing(2),
    },
  },
  menuIcon: {
    color: 'inherit',
    border: 'none !important',
    // maxHeight: 50,
    height: '100%',
    cursor: 'pointer',
    '& svg': {
      position: 'relative',
      // transform: 'scale(.75)',
      // top: '-12mm',
      margin: 'auto',
      display: 'inline-block',
      transition: theme.transitions.create(
        ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),
    },
  },
}));

export default React.memo(({ children }) => {
  // const theme = useTheme();
  const classes = useStyles();
  const pages = [
    { name: 'portfolio', url: './' },
    { name: 'services', url: './services' },
    { name: 'blog', url: './blog' },
  ];
  // function that sends an email
  const sendEmail = useCallback(
    () => typeof window !== 'undefined'
      && window.open(
        'mailto:aidenf09@yahoo.com?subject=Lets%20Get%20In%20Touch&body=Hi%20there%20I%20saw%20your%20website%20and%20want%20to%20work%20together%20on%20something%20great.',
      ),
    [],
  );

  // ========================================================================== //
  //   Logo
  // ========================================================================== //

  const logo = React.useCallback(
    (color) => (
      <Link to="/">
        <div
          className={(classes.menuIcon)}
          style={{
            fill: color,
            transform: 'translate(33%, 0%)',
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

  const makeCall = useCallback(
    () => typeof window !== 'undefined' && window.open('tel:+61-475-565-709'),
    [],
  );
  // table footer?
  return (
    <footer className={classes.footer}>
      <Grid
        container
        spacing={6}
        alignContent="stretch"
        // alignItems="center"
        style={{ margin: 'auto' }}
      >

        <Grid item container alignContent="stretch" xs={3}>
          {logo('inherit')}
        </Grid>

        <Grid item xs={4}>

          <Grid item container justify="space-between">
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Want to collaborate?
              </Typography>
              <SecondaryButton
                size="small"
                onClick={() => navigate('/booking')}
              >
                Make a booking
              </SecondaryButton>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Send me an email
              </Typography>
              <SecondaryButton size="small" onClick={() => sendEmail()}>
                aidenf09@yahoo.com
              </SecondaryButton>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={4}>

          <Grid item container justify="space-between">
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Lets Talk
              </Typography>
              <SecondaryButton size="small" onClick={() => makeCall()}>
                0475565709
              </SecondaryButton>

            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                color="inherit"
                style={{ marginTop: 40, fontWeight: 100 }}
                variant="body2"
              >
                Copyright © 2020 @ Aiden Faulconer
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </footer>
  );
});
// {/* <SecondaryButton size="small">Call me</SecondaryButton> */}
