import * as React from 'react';
import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ScrollSnap from 'scroll-snap';
import { useGesture, useScroll } from 'react-use-gesture';
import { a } from '@react-spring/web';
import { graphql } from 'gatsby';
import Layout from '../layout/layout';
import {
  About,
  BlogPosts,
  Languages,
  Contact,
  Experience,
  WhatDoYouNeed,
  Skills,
  Intro,
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
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: -1,
    display: 'flex',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
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

const handler = (entries = [], observer = null) => {
  for (const entry of entries) {
    if (entry.intersectionRatio >= 1) {
      console.log('i Am visible', entry.target);
    }
  }
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
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

export const ScrollContainer = React.forwardRef(({ children, inView }, ref) => {
// ========================================================================== //
//   Gesture to have sections move in naturally horizontally
// ========================================================================== //
  // const scrollRef = React.createRef();
  const handleGesture = React.useCallback((state) => {
    console.log(state);
  }, []);

  const bind = useGesture({
    onDrag: (state) => handleGesture(state),
    onWheel: (state) => handleGesture(state),
    onWheelStart: (state) => handleGesture(state),
    onWheelEnd: (state) => handleGesture(state),
    onWheelCapture: (state) => handleGesture(state),

  },
  {
    // domTarget: typeof window !== 'undefined' && window,
    domTarget: ref.current,
  });

  // const [props, api] = useSprings(pages.length, i => ({
  //   x: i * width,
  //   scale: 1,
  //   display: 'block',
  // }))

  // React.useEffect(() => {
  //   console.log(ref.current);
  // }, []);
  // React.useEffect(() => {
  // }, [bind]);

  return (
    <section
      style={{
        width: '100vw', height: '90vh', display: 'block', scrollSnapAlign: 'x y proximity', overflowX: 'scroll',
      }}
      {...bind()}
      ref={ref}
    >
      <a.div style={{
        position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
      }}
      >
        <Grid item md={1} xs={0} />
        <Grid item md={4} xs={5}>
          <About id="services" />
        </Grid>
        <Grid item md={6} xs={7}>
          <Experience id="skills" />
        </Grid>
        <Grid item md={1} xs={0} />
      </a.div>

      {/* section 2 */}
      <a.div style={{
        position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
      }}
      >
        <Grid item md={1} xs={0} />
        <Grid item md={4} xs={5}>
          <Languages id="languages" />
        </Grid>
        <Grid item md={6} xs={7}>
          <Skills id="skills" />
        </Grid>
        <Grid
          item
          md={1}
          xs={0}
        />
      </a.div>
    </section>
  );
});

const IndexPage = React.memo(
  ({
    // returned from pageQuery as props
    data: {
      allMarkdownRemark: { edges },
    },
    location,
  }) => {
    const marginAmount = '175px';
    // alert(JSON.stringify(edges));
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
    const theme = useTheme();

    return (
      <>
        {/* <Grid item md={1} xs={0} /> */}
        <Intro />
        {/* <Grid item md={1} xs={0} /> */}
        {/* <Grid container className={classes.contentContainer}> */}

        {/* section 1 */}
        <ScrollContainer ref={addNode} />

        {/* <Experience id="experience" /> */}
        {/* </Grid> */}

        <WhatDoYouNeed id="contact" /* ref={addNode} */ />

        <Grid item xs={12} md={5} style={{ paddingBottom: 20, margin: 'auto' }}>
          <Typography
            align="left"
            gutterBottom
            style={{ marginBottom: 25, marginTop: 80 }}
            variant="h2"
          >
            Read on!
          </Typography>
          <Typography gutterBottom align="left">
            Its an exciting time to be a software developer. Read some of the
            latest news and articles below about design, business, and the
            future of software development.
          </Typography>
        </Grid>
        <BlogPosts id="blog" posts={edges}/* ref={addNode} */ />

      </>
    );
  },
);

export default IndexPage;

// autorun at gatsby rebuild-cycle
export const pageQuery = graphql`
  query indexPageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {catagory: {eq: "blog"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            catagory
            title
            thumbnail
            metaDescription
          }
        }
      }
    }
  }
`;
