import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container, Grid, Typography, useTheme,
} from '@mui/material';
import ScrollSnap from 'scroll-snap';
import { useGesture, useScroll } from '@use-gesture/react';
import { a } from '@react-spring/web';
import { graphql } from 'gatsby';
import Layout from '../layout/layout';

import Qualifications from '../components/portfolio-page/qualifications';
import Services from '../components/portfolio-page/services';
import { Languages, Experience } from '../components/portfolio-page/skills';

import cubesOffset from '../../static/assets/portfolio/clouds.png';
import { SectionHeader } from '../components/section-header';
import Roullete from '../layout/roullette';
import Contact from '../components/portfolio-page/contact';

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
  return (
    <Grid container>
      <SectionWrapper>
        <Roullete headline="Services" />
      </SectionWrapper>
      <SectionWrapper type="secondary">
        <Contact />
      </SectionWrapper>
    </Grid>
  );
});

const SectionWrapper = ({ children, type = 'primary' }) => ((
  <>
    <Grid
      item
      md={1}
      sx={{
        background: (theme) => theme.palette.text[type],
        // border: (theme) => theme.custom.borders.brandBorder
      }}
    />
    <Grid item md={10} xs={12} sx={{ overflow: 'hidden' }}>
      {children}
    </Grid>
    <Grid
      item
      md={1}
      sx={{
        background: (theme) => theme.palette.text[type],
        // border: (theme) => theme.custom.borders.brandBorder
      }}
    />
  </>
));
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

  const theme = useTheme();

  return (
    <>
      <ScrollContainer ref={addNode} />
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
