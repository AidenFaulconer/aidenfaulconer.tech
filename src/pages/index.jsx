import * as React from 'react';
import {
  Container, Grid, makeStyles, Typography, useTheme,
} from '@material-ui/core';
import ScrollSnap from 'scroll-snap';
import { useGesture, useScroll } from '@use-gesture/react';
import { a } from '@react-spring/web';
import { graphql } from 'gatsby';
import Layout from '../layout/layout';

import Qualifications from '../components/portfolio-page/qualifications';
import Services from '../components/portfolio-page/services';
import { Languages, Experience } from '../components/portfolio-page/skills';

import { SecondaryButton } from '../components/custom/buttons';

import cubesOffset from '../../static/assets/portfolio/clouds.png';
import SectionHeader from '../components/section-header';

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
    target: ref.current,
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
  const theme = useTheme();
  // <section
  //   style={{
  //     width: '100vw', /* height: '90vh', */ display: 'block', scrollSnapAlign: 'x y proximity', overflowX: 'scroll',
  //   }}
  //   {...bind()}
  //   ref={ref}
  // >
  return (
  // <Container maxWidth={false} style={{ border: theme.custom.brandBorder }}>

    <Grid container xs={12}>

      {/* section 1 */}
      {/* <a.div style={{
          position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
        }}
        > */}
      <SectionWrapper>
        <SectionHeader headline="Services" />
      </SectionWrapper>

      <SectionWrapper>
        <Services id="contact" /* ref={addNode} */ />
      </SectionWrapper>

      {/* </a.div> */}

      {/* section 2 */}
      {/* <a.div style={{
          position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
        }}
        > */}
      <SectionWrapper>
        <SectionHeader headline="Experience" illustrationType="confidence" />
      </SectionWrapper>

      <SectionWrapper>
        <Qualifications />
      </SectionWrapper>

      <SectionWrapper>
        <Experience id="skills" />
      </SectionWrapper>

      {/* </a.div> */}

      {/* section 3 */}
      {/* <a.div style={{
          position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
        }}
        > */}
      <SectionWrapper>
        <SectionHeader headline="Skills" illustrationType="moustache" />
      </SectionWrapper>

      <SectionWrapper>
        <Languages id="languages" />
      </SectionWrapper>

      {/* <SectionWrapper>
        <SectionHeader headline="Blog" illustrationType="moustache" />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader headline="Contact me" illustrationType="genie" />
      </SectionWrapper> */}
      {/* </a.div> */}
    </Grid>

  // </Container>
  );
  // </section>
});

const SectionWrapper = ({ children, colorType = 'primary' }) => {
  const theme = useTheme();
  return (
    <>
      <Grid item md={1} xs={false} style={{ background: theme.palette.text[colorType] }} />
      <Grid item container md={10} xs={12} style={{ maxHeight: '90vh', overflow: 'hidden' }}>
        {children}
      </Grid>
      <Grid item md={1} xs={false} style={{ background: theme.palette.text[colorType] }} />
    </>
  );
};

const IndexPage = ({
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
      <ScrollContainer ref={addNode} />
      {/* <Grid item md={1} xs={false} /> */}
      {/* <Grid item md={1} xs={false} /> */}
      {/* <Grid container className={classes.contentContainer}> */}

      {/* section 1 */}

      {/* <Grid item xs={12} md={5} style={{ paddingBottom: 20, margin: 'auto' }}>
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
      </Grid> */}
    </>
  );
};

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
