import {
  Box, Grid, Typography, useTheme, CardMedia,
} from '@mui/material';
import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';

import {
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
} from '../store/theme';

import headlineImage from '../../static/assets/portfolio/designs.png';

import BookingForm from '../components/booking-form';

const SectionWrapper = ({ children, type = 'primary' }) =>
  // some stuff
  (
    (
      <Grid container>
        <Grid
          item
          md={1}
          width="100%"
          sx={{
            mt: 0,
            background: (theme) => theme.palette.text[type],
          // border: (theme) => theme.custom.borders.brandBorder
          }}
        />
        <Grid item width="100%" md={10} xs={12} sx={{ overflow: 'hidden' }}>
          {children}
        </Grid>
        <Grid
          item
          md={1}
          width="100%"
          sx={{
            background: (theme) => theme.palette.text[type],
            // border: (theme) => theme.custom.borders.brandBorder
          }}
        />
      </Grid>
    )
  );
const BookingPage = ({
  // returned from pageQuery as props
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const theme = useTheme();

  return (
    <SectionWrapper type="primary">
      <BookingForm />
    </SectionWrapper>
  );
};

export default BookingPage;

// autorun at gatsby rebuild-cycle
export const pageQuery = graphql`
  query bookingPageQuery {
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
