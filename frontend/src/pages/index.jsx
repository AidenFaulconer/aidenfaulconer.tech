import * as React from 'react';
import {
  Grid, useTheme,
} from '@mui/material';

import { graphql } from 'gatsby';
import Contact from '../components/index-page-roulette/contact';
import Roullete from '../components/roullette';
import { useIntersectionObserver, useScrollSnappedChildren } from '../components/util/customHooks';

const SectionWrapper = React.forwardRef(({ styles, children, type = 'primary' }, ref) => ((
  <>
    <Grid
      item
      md={1}
      styles={styles}
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
)));

const IndexPage = ({
  // returned from pageQuery as props
  data: { allMarkdownRemark: { edges } },
}) => {
  const marginAmount = '175px';
  const [count, setCount] = React.useState(0);
  // const addNode = useScrollSnappedChildren();
  return (
    <Grid container>
      <SectionWrapper>
        <Roullete />
      </SectionWrapper>
      <SectionWrapper type="secondary">
        <Contact />
      </SectionWrapper>
    </Grid>
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
