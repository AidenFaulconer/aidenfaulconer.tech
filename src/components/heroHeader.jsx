import React from 'react';
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
} from '@material-ui/core';

import { alpha, makeStyles } from '@material-ui/core/styles';
import ThreeWrapper from './threejs/three-wrapper';
import { RegularButton } from './custom/customButton';

const useStyles = makeStyles((theme) => ({

  heroContainer: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const HeroHeader = (props) => {
  const classes = useStyles();
  const { title = 'Beautiful Scalable Software', description = 'I design and code experiences for online businesses like you, so you can focus on getting your user\'s needs fulfilled. ' } = props;
  return (
    <section id="#hero">
      <Grid container className={classes.heroContainer} justify="space-between" alignContent="center" alignItems="center" spacing={6}>
        <Grid container item md={6} xs={12}>
          <Grid item xs={9} style={{ margin: 'auto', paddingBottom: 20 }}>
            <Typography align="left" gutterBottom variant="h1">{title}</Typography>
            <Typography component="body" gutterBottom align="left">{description}</Typography>
          </Grid>
          <Grid item justify="flex-start" xs={8} style={{ margin: 'auto', display: 'flex' }}>
            <RegularButton size="large">Lets get in touch</RegularButton>
            <RegularButton size="large">See my work</RegularButton>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <ThreeWrapper />
        </Grid>
      </Grid>
    </section>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default React.memo(HeroHeader);
// export default connect(mapStateToProps, mapDispatchToProps)(HeroHeader);
