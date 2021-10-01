import * as React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Layout from '../layout/layout';
import HeroHeader from '../components/heroHeader';
import {
  About, Projects, Languages, Contact, Experience,WhatDoYouNeed
} from '../components/indexSections';

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
    // boxShadow: theme.brandShadows.brandBig,
    background:
      'linear-gradient(180deg, #324308 15.49%, #8BAD6B 68.98%, #AAC882 103.74%)',
    borderRadius: theme.shape.brandBorderRadius3,
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
}));

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

const IndexPage = React.memo(
  (
    {
      // returned from pageQuery as props
      // data: {
      //   allMarkdownRemark: { edges },
      // },
      transitionStatus, entry, exit,
    },
  ) => {
    const marginAmount = '175px';
    const classes = useStyles();

    return (
      <>
        <Container maxWidth="lg">
          <HeroHeader id="back-to-top-anchor" />
          <About id="about" />
          <Languages id="languages" />
          <WhatDoYouNeed id="call-to-action" /> 
          {/* <Projects id="projects" />
          <Experience id="experience" /> */}
          {/* <Contact id="contact" /> */}
        </Container>
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
