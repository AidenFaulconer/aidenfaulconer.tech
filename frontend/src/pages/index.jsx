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
        md={0}
        styles={styles}
        sx={{ background: (theme) => theme.palette.text[type] }}
      />
      <Grid item md={12} xs={12} className="overflow-hidden">
        {children}
      </Grid>
      <Grid
        item
        md={0}
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
        <Box
          sx={{ background: (theme) => theme.palette.text.primary, color: (theme) => theme.palette.text.secondary }}
          className="w-full py-12 flex flex-col justify-center items-center gap-2"
        >
          <h1 style={{ lineHeight: '100%' }} className="text-center md:text-[4.5rem] text-[3rem] md:max-w-[500px] max-w-[400px] min-h-[150px] italic font-black">SPIN THE CAROUSEL LEARN MORE</h1>
          <svg className="animate-bounce" width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M59.6104 19.1584L37.7354 34.9918L15.8604 19.1584L15.8604 26.9168L37.7354 42.7501L59.6104 26.9168L59.6104 19.1584ZM59.6104 38.0001L37.7354 53.8334L15.8604 38.0001L15.8604 45.7584L37.7353 61.5918L59.6104 45.7584L59.6104 38.0001Z" fill="#000064" />
          </svg>
        </Box>
      </SectionWrapper>

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
