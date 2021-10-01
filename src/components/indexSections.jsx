import { makeStyles, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { RegularButton } from './custom/customButton';
import { CardCarousel } from './custom/customCards';

// ========================================================================== //
// Typography
// ========================================================================== //
import aboutImage from '../../static/assets/portfolio/about.png';
import languagesImage from '../../static/assets/portfolio/languages.png';
// import {} from './custom/customInputs';
// import {} from "./custom/customBlog"

const staticFolderPath = '../../static/assets/portfolio/';
const contentHeight = 550;
const useStyles = makeStyles((theme) => ({
  section: {
    display: 'block',
    position: 'relative',
    minHeight: contentHeight,
    margin: `${theme.spacing(0)}, ${theme.spacing(0)}`,
    // boxShadow: theme.brandShadows.brand,
    // borderRadius: theme.shape.brandBorderRadius2,
    overflow: 'hidden',
  },
  graphic: {
    minHeight: contentHeight,
    height: '100%',
    width: '100%',
    // background: theme.palette.primary.main,
    position: 'relative',
    display: 'block',
    '& img': {
      display: 'inline-block',
      height: '100%',
      width: '100%',
      position: 'relative',
      objectFit: 'contain',
      minWidth: 300,
      minHeight: 300,
      padding: theme.spacing(4),
    },
  },
  descriptor: {
    minHeight: contentHeight,
    background: theme.palette.background.default,
    padding: theme.spacing(4),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Descriptor = (props) => {
  const classes = useStyles();
  const { title, description, ctas } = props;
  return (
    <Grid container item md={6} xs={6} justify="space-evenly" alignContent="center" alignItems="center" className={classes.descriptor}>
      <Grid item xs={8} style={{ marginBottom: 20 }}>
        <Typography align="left" gutterBottom variant="h2">{title}</Typography>
        <Typography component="body" gutterBottom align="left">{description}</Typography>
      </Grid>
      <Grid item justify="space-around" xs={8} style={{ margin: 'auto', display: 'flex' }}>
        <RegularButton size="small">{ctas[0]}</RegularButton>
        <RegularButton size="small">{ctas[1]}</RegularButton>
      </Grid>
    </Grid>
  );
};
const Graphic = (props) => {
  const classes = useStyles();
  const { src, alt } = props;
  return (
    <Grid item xs={6} className={classes.graphic}>
      <img alt={alt} src={src} />
    </Grid>
  );
};

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();
  const description = 'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs';
  const title = 'Creative, adaptive, diversified';

  return (
    <section ref={ref} className={classes.section}>
      <Grid container justify="space-between">
        <Graphic src={aboutImage} alt="About Graphic" />
        <Descriptor title={title} description={description} ctas={['', '']} />
      </Grid>
    </section>
  );
}));
// ========================================================================== //
// Projects
// ========================================================================== //
const Projects = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <section ref={ref} className={classes.section}>
      <Grid container justify="space-between">
        {/* <CardCarousel
            title="Projects"
            key="projects"
            //carouselData,
            // title,
            // id,
            // cardWidth = cardDimensions.width,
            // cardHeight = cardDimensions.height,
            // color,
            // subtitle,
        /> */}
      </Grid>
    </section>
  );
}));
// ========================================================================== //
// Languages
// ========================================================================== //
const Languages = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();

  const title = 'Any Language, Any Framework';
  const description = 'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs';
  return (
    <section ref={ref} className={classes.section}>
      <Grid container spacing={3}>
        <Descriptor title={title} description={description} ctas={['', '']} />
        <Graphic src={languagesImage} alt="Language Graphic" />
      </Grid>
    </section>
  );
}));
// ========================================================================== //
// Contact
// ========================================================================== //
const Contact = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <section ref={ref} className={classes.section}>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={6} />
        <Grid item xs={5} sm={6} />
      </Grid>
    </section>
  );
}));
// ========================================================================== //
// Experience
// ========================================================================== //
const Experience = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <section ref={ref} className={classes.section}>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={6} />
        <Grid item xs={5} sm={6} />
      </Grid>
    </section>
  );
}));

// ========================================================================== //
// WhatDoYouNeed
// ========================================================================== //
const WhatDoYouNeed = React.memo(React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <section ref={ref} className={classes.section}>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={6} />
        <Grid item xs={5} sm={6} />
      </Grid>
    </section>
  );
}));

export {
  About, Projects, Languages, Contact, Descriptor, Experience, WhatDoYouNeed,
};
