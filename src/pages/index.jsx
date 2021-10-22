import * as React from 'react';
import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import Layout from '../layout/layout';
import {
  About,
  BlogPosts,
  Languages,
  Contact,
  Experience,
  WhatDoYouNeed,
} from '../components/indexSections';

import { SecondaryButton } from '../components/custom/customButton';

import cubesOffset from '../../static/assets/portfolio/cubesOffset.png';

const useStyles = makeStyles((theme) => ({
  underlay: {
    position: 'relative',
    // top: '-400px',
    content: '',
    margin: theme.spacing(3),
    padding: theme.spacing(12),
    paddingTop: 'unset',
    pointerEvents: 'all',
    overflow: 'hidden',
    // boxShadow: theme.custom.shadows.brandBig,
    background:
      'linear-gradient(180deg, #324308 15.49%, #8BAD6B 68.98%, #AAC882 103.74%)',
    borderRadius: theme.custom.borders.brandBorderRadius3,
  },
  contentContainer: {
    padding: theme.spacing(12, 0),
  },
  sectionCurve: {
    borderRadius: '100%',
    margin: 'auto',
    width: '100%',
    left: '0px',
    fill: '#324308',
    // marginTop: '-43px',
    // fill: theme.palette.background.default,
  },
  outline: {
    // border: theme.custom.borders.brandBorder,
    border: '1px solid rgba(255,255,255,.3)',
  },
}));

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>
const IndexPage = React.memo(
  ({
    // returned from pageQuery as props
    // data: {
    //   allMarkdownRemark: { edges },
    // },
    location,
  }) => {
    const marginAmount = '175px';
    const classes = useStyles();

    return (
      <>
        <Grid container maxWidth="xl" className={classes.contentContainer}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <About id="services" />
            <Experience id="skills" />
            <Languages id="languages" />
          </Grid>
          {/* <Experience id="experience" /> */}
          <Grid item xs={1} />
        </Grid>
        <WhatDoYouNeed id="contact" />

        <Grid
          item
          xs={12}
          md={5}
          style={{ paddingBottom: 20, margin: 'auto' }}
        >
          <Typography
            align="center"
            
            gutterBottom
            style={{ marginBottom: 25, marginTop: 80 }}
            variant="h2"
          >
            Read on!
          </Typography>
          <Typography gutterBottom align="center">
            Its an exciting time to be a software developer. Read some of the
            latest news and articles below about design, business, and the
            future of software development.
          </Typography>
        </Grid>
        <BlogPosts id="blog" />
      </>
    );
  },
);

export default IndexPage;

// autorun at gatsby rebuild-cycle
// export const pageQuery = graphql`
//   query indexPageQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail_
//           }
//         }
//       }
//     }
//   }
// `;
