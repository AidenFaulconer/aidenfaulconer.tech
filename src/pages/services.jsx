import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container, Grid, Typography, useTheme,
} from '@mui/material';
import { graphql } from 'gatsby';

import Services from '../components/portfolio-page/services';
import { Languages, Experience } from '../components/portfolio-page/skills';

import { SectionHeader } from '../components/section-header';
import Roullete from '../layout/roullette';
import Contact from '../components/portfolio-page/contact';

// TODO: get model actions from store, compare against the services sections data
const SectionWrapper = ({ children, type = 'primary' }) => ((
  <>
    <Grid
      item
      md={1}
      sx={{ background: (theme) => theme.palette.text[type] }}
    />
    <Grid item md={10} xs={12} sx={{ overflow: 'hidden' }}>
      {children}
    </Grid>
    <Grid
      item
      md={1}
      sx={{ background: (theme) => theme.palette.text[type] }}
    />
  </>
));

const ServicesPage = ({
  // returned from pageQuery as props
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => (
  <Grid container>
    <SectionWrapper>
      <Roullete headline="Services" threejs />
    </SectionWrapper>
    <SectionWrapper type="secondary">
      <Contact />
    </SectionWrapper>
  </Grid>
);

export default ServicesPage;
// autorun at gatsby rebuild-cycle
export const pageQuery = graphql`
  query servicesPageQuery {
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
