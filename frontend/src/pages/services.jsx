import * as React from 'react';
import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import Roullete from '../components/roullette';
import Contact from '../components/forms/contact';

// TODO: get model actions from store, compare against the services sections data
function SectionWrapper({ children, type = 'primary' }) {
  return (
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
  );
}

function ServicesPage({
  // returned from pageQuery as props
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) {
  return (
    <Grid container>
      <SectionWrapper>
        <Roullete headline="Services" threejs />
      </SectionWrapper>
      <SectionWrapper type="secondary">
        <Contact />
      </SectionWrapper>
    </Grid>
  );
}

export default ServicesPage;

// autoruns at gatsby rebuild-cycle
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
            # catagory
            title
            thumbnail
            metaDescription
          }
        }
      }
    }
  }
`;
