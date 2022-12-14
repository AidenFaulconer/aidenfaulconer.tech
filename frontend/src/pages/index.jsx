import * as React from 'react';
import {
  Box,
  Grid, useTheme,
} from '@mui/material';
import { graphql } from 'gatsby';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import Contact from '../components/forms/contact';
import Roullete from '../components/roullette';
import { RegularButton } from '../components/custom/buttons';

function SectionWrapper({ styles, children, type = 'primary' }) {
  return (
    <>
      <Grid
        item
        md={1}
        styles={styles}
        sx={{ background: (theme) => theme.palette.text[type] }}
      />
      <Grid item md={10} xs={12} className="overflow-hidden">
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

function IndexPage({
  // returned from pageQuery as props
  data: { allMarkdownRemark: { edges } },
}) {
  const marginAmount = '175px';
  const [count, setCount] = React.useState(0);
  // const addNode = useScrollSnappedChildren();
  return (
    <Grid container>
      <SectionWrapper>
        <Roullete />
      </SectionWrapper>
      <Contact />
    </Grid>
  );
}

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
