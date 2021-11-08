import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { SecondaryButton } from './custom/customButton';

import letsStartSomething from '../../static/assets/portfolio/lets start something together.png';

const useStyles = makeStyles((theme) => ({
  endOfPage: {
    background: theme.palette.text.primary,
    // minHeight: '70vh',
    color: theme.palette.text.secondary,
    padding: theme.spacing(18, 6),
    marginTop: theme.spacing(18),
  },

  letsStartSomething: {
    width: '100%',
    objectFit: 'contain',
  },
}));

const EndOfPage = () => {
  const classes = useStyles();
  return (
    <section className={classes.endOfPage}>
      <Grid container justify="center" alignItems="center">
        {/* Typography */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Typography
              align="left"
              sm={12}
              color="inherit"
              gutterBottom
              variant="h1"
              style={{ zIndex: -1 }}
            >
              Lets start something together.
            </Typography>
            <Typography
              style={{ maxWidth: 325, zIndex: 1 }}
              color="inherit"
              gutterBottom
              align="left"
            >
              I’m a software developer with a passion for creating, if you would
              like to start a personal project with me, please get in touch. I’m
              available for hire and would love to talk about your project.
            </Typography>

            {/* Buttons */}
            <Grid
              item
              container
              justify="flex-start"
              style={{ paddingBottom: 5, marginTop: 20 }}
            >
              <Grid item style={{ marginRight: 10, paddingBottom: 5 }}>
                <SecondaryButton>Lets get in touch</SecondaryButton>
              </Grid>
              <Grid item>
                <SecondaryButton>Make a booking</SecondaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} xs={12}>
          <img
            src={letsStartSomething}
            className={classes.letsStartSomething}
            alt="lets start something together"
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default EndOfPage;
