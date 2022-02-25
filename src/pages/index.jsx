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
  // <section
  //   style={{
  //     width: '100vw', /* height: '90vh', */ display: 'block', scrollSnapAlign: 'x y proximity', overflowX: 'scroll',
  //   }}
  //   {...bind()}
  //   ref={ref}
  // >
  // {/* section 1 */}
  // {/* <a.div style={{
  //     position: 'relative', display: 'flex', width: '100vw', scrollSnapAlign: 'x y proximity',
  //   }}
  //   > */}
  return (
    <Grid container>

      <SectionWrapper>
        <SectionHeader headline="Services" />
      </SectionWrapper>
      <SectionWrapper>
        <Services id="contact" /* ref={addNode} */ />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader headline="Experience" illustrationType="confidence" />
      </SectionWrapper>

      <SectionWrapper>
        <Qualifications />
      </SectionWrapper>

      {/* build fails == audio is not defined == */}
      <SectionWrapper>
        <Experience id="skills" />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader headline="Skills" type="inverted" illustrationType="moustache" />
      </SectionWrapper>

      <SectionWrapper>
        <Languages id="skills" />
      </SectionWrapper>

    </Grid>
  );
});

// <SectionWrapper>
// </SectionWrapper>

// <SectionWrapper>
// <SectionHeader headline="Skills" illustrationType="moustache" />
// </SectionWrapper>

// <SectionWrapper>
// <Languages id="languages" />
// </SectionWrapper>

const SectionWrapper = ({ children, colorType = 'primary' }) => {
  const theme = useTheme();
  return (
    (
      <>
        <Grid item md={1} style={{ background: theme.palette.text[colorType] }} />
        <Grid item md={10} xs={12} style={{ maxHeight: '90vh', overflow: 'hidden' }}>
          {children}
        </Grid>
        <Grid item md={1} style={{ background: theme.palette.text[colorType] }} />
      </>
    )
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
