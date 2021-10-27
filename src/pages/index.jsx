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
  Skills,
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
    // padding: theme.spacing(12, 0),
    scrollSnapType: 'x  proximity',
    overflowX: 'scroll',
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

const handler = (
  entries = [],
  observer = null,
) => {
  for (const entry of entries) {
    if (entry.intersectionRatio >= 1) {
      console.log('i Am visible', entry.target);
    }
  }
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const getObserver = (ref) => {
  const observer = ref.current;
  if (observer !== null) {
    return observer;
  }
  const newObserver = new IntersectionObserver(handler, options);
  ref.current = newObserver;
  return newObserver;
};

const IndexPage = React.memo(
  ({
    // returned from pageQuery as props
    // data: {
    //   allMarkdownRemark: { edges },
    // },
    location,
  }) => {
    const marginAmount = '175px';

    // ========================================================================== //
    //     Scroll snapping
    // ========================================================================== //
    const [count, setCount] = React.useState(0);
    const refs = React.useRef([]);
    const observer = React.useRef(null);
    const addNode = React.useCallback((node) => refs.current.push(node), []);
    // ref callback is called twice: once when the DOM
    // node is created, and once (with null) when the DOM
    // node is removed.
    // TRY IT OUT => Comment the other addNode and uncomment this one
    // const addNode = (node: HTMLDivElement) => refs.current.push(node);

    React.useEffect(() => {
      if (observer.current) observer.current.disconnect();
      const newObserver = getObserver(observer);
      for (const node of refs.current) {
        newObserver.observe(node);
      }
      console.log(refs.current);
      return () => newObserver.disconnect();
    }, []);

    const classes = useStyles();

    return (
      <>
        <Grid container maxWidth="xl" className={classes.contentContainer}>
          {/* section 1 */}
          <Grid item md={1} xs={0} />
          <Grid item md={4} xs={5}>
            <About id="services" ref={addNode} />
          </Grid>
          <Grid item md={6} xs={7}>
            <Experience id="skills" ref={addNode} />
          </Grid>
          <Grid item md={1} xs={0} />

          {/* section 2 */}
          <Grid item md={1} xs={0} />
          <Grid item md={4} xs={5}>
            <Languages id="languages" ref={addNode} />
          </Grid>
          <Grid item md={6} xs={7}>
            <Skills id="skills" ref={addNode} />
          </Grid>
          <Grid item md={1} xs={0} />
          {/* <Experience id="experience" /> */}
        </Grid>

        <WhatDoYouNeed id="contact" ref={addNode} />

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
        <BlogPosts id="blog" ref={addNode} />
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
