import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';

import { InlineIcon } from '@iconify/react';
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import {
  Box, Container, Typography, Grid, makeStyles,
} from '@material-ui/core';
import { render } from 'react-three-fiber';
import {
  logoCircular,
  boxAndPyrimid,
  dataBoxAndCodeBox,
} from '../../static/assets/svg/hardcoded-svgs';

import { RegularButton, GoldButton } from '../components/custom/customButton';
import { Gridify } from '../components/custom/customCards';

const useStyles = makeStyles((theme) => ({
  footerBackground: {
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
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
  // table footer?
  return (
    <footer className="footer row p-5 align-items-center">
      <div className={classes.footerBackground} />
      <Grid container spacing={3}>
        <Gridify breakpointSizes={[12, 12, 12, 12]}>
          <div>
            <Typography>Want to collaborate?</Typography>
            <RegularButton>Make a booking</RegularButton>
            <RegularButton>Send me an email</RegularButton>
          </div>
          <div>
            <Typography>Lets Talk</Typography>
            <RegularButton>Call me</RegularButton>
          </div>
        </Gridify>
        <Gridify breakpointSizes={[12, 12, 12, 12]}>
          <div>
            <Typography>Lets Talk</Typography>
            <RegularButton>Call me</RegularButton>
          </div>
          <div />

        </Gridify>
      </Grid>
    </footer>
  );
});
