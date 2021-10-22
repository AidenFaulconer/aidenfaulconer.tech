import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  Grid,
  Icon,
  Box,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ThreeWrapper from '../components/threejs/three-wrapper';
import { RegularButton, SecondaryButton } from '../components/custom/customButton';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
const useStyles = makeStyles((theme) => ({
  heroContainer: {
    minHeight: '94vh',
    width: '100vw',
    position: 'relative',
    // marginBottom: theme.spacing(3),
    // marginBottom: theme.spacing(0),
    // background: theme.palette.text.primary,
    background: `linear-gradient(-90deg, ${theme.palette.text.primary} 61.89%, ${theme.palette.text.primary} 61.89%, ${theme.palette.text.primary}) 23.52%`,

    '&::before': {
      content: '""',
      top: -85,
      // border: `1px solid ${theme.palette.background.button}`,
      background: 'inherit',
      position: 'absolute',
      display: 'inline',
      height: 85,
      width: '100vw',
    },
  },
  borderL: {
    borderLeft: theme.custom.borders.brandBorder,
  },
  borderR: {
    borderRight: theme.custom.borders.brandBorder,
  },
  cubesOffset: {
    top: '75%',
    left: '48%',
    opacity: 0.6,
    zIndex: -1,
    position: 'absolute',
    maxWidth: 860,
  },
  headline: {
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 0,
    color: theme.palette.text.primary,
    '&:after': {
      color: theme.palette.text.primary,
      mixBlendMode: 'difference',
    },
  },
  cta: {
    pointerEvents: 'all',
    zIndex: 2,
    position: 'relative',
    paddingBottom: theme.spacing(2),
    marginLeft: 20,
    // borderTop: `1px solid ${theme.palette.text.secondary}`,
  },
  cubesPosition: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    display: 'block',
    minHeight: '100%',
    marginTop: -theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginTop: -theme.spacing(12),
    },
  },
}));

// headline dynamic on threejs interaction, button to go back plug action in threejs, go to blog in the headline project selection?

export const HeroHeader = (props) => {
  const classes = useStyles();
  const {
    id,
    data,
    title = () => (
      <>
        The Building
        <br />
        Block for your
        <br />
        organisation
      </>
    ),
    description = "I design and code experiences for online businesses like you, so you can focus on getting your user's needs fulfilled. ",
  } = props;

  return (
    <section id={id}>
      <Grid container className={classes.heroContainer}>
        <Grid item xs={1} className={classes.borderR} />
        {/* ThreeJS */}
        <Box className={classes.cubesPosition}>
          <ThreeWrapper />
          <h1 style={{
            position: 'absolute',
            width: '100%',
            top: '50%',
            zIndex: 0,
            height: 0,
            color: 'white',
            opacity: 0.3,
            borderTop: '1px solid white',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transform: 'rotateY(-6deg) rotateZ(-65deg)',
            textAlign: 'center',
          }}
          />

        </Box>

        {/* Headline */}
        <Grid
          // container
          item
          justify="flex-start"
          xs={10}
          className={classes.headline}
        >
          {/* Typography */}
          <Grid
            item
            style={{
              padding: 20,
              // borderTop: '1px solid rgba(255,255,255,.3)',
            }}
          >
            <Grid item xs={12}>
              <Typography
                align="left"
                color="secondary"
                gutterBottom
                variant="h1"
                style={{ zIndex: -1, textTransform: 'uppercase' }}
              >
                {title()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ maxWidth: 325, zIndex: 1 }}
                color="secondary"
                align="left"
              >
                {description}
              </Typography>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Grid item container justify="flex-start" className={classes.cta}>
            <Grid item style={{ marginRight: 10, paddingBottom: 5 }}>
              <SecondaryButton size="small">Lets get in touch</SecondaryButton>
            </Grid>
            <Grid item>
              <SecondaryButton size="small">See my work</SecondaryButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1} className={classes.borderL} />

      </Grid>
      {/* // create a svg circle in html */}

    </section>

  );
};

export default React.memo(HeroHeader);
