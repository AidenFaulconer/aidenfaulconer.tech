import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';
import footerGraphic from '../../static/assets/footer.png';

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

import { RegularButton, GoldButton, SecondaryButton } from '../components/custom/customButton';
import { Gridify } from '../components/custom/customCards';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    // minHeight: 400,
    padding: theme.spacing(9,3),
  },
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
    <footer className={classes.footer}>
      <Grid container spacing={3} xs={6} style={{margin:'auto'}} alignContent="center" justify="center" alignItems="center">
        <Grid container xs={6} style={{color: 'white'}} item justify="center">
          <div>
            <Typography gutterBottom color="textSecondary">Want to collaborate?</Typography>
            <SecondaryButton size="small">Make a booking</SecondaryButton>
            <SecondaryButton size="small">Send me an email</SecondaryButton>
          </div> 
      </Grid>
        <Grid container item justify="center" xs={6} style={{color: 'white'}} >
          <div>
            <Typography gutterBottom color="textSecondary">Lets Talk</Typography>
            <SecondaryButton size="small">Call me</SecondaryButton>
        </div>  
      </Grid>
      </Grid>
      <img src={footerGraphic} className={classes.footerBackground} />
    </footer>
  );
});
