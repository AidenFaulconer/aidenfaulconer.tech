import {
  Box, Grid, Typography, useTheme,
} from '@mui/material';
import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  RegularButton,
  SelectionButton,
  FancyTextField,
} from '../components/custom/buttons';

import {
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
} from '../store/theme';

import headlineImage from '../../static/assets/portfolio/designs.png';

const SectionWrapper = ({ children, type = 'primary' }) =>
  // some stuff
  (
    (
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

export const BookingForm = ({ i, title = 'Contact Me', setSelected = () => { } }) => {
  const handleError = () => {

  };
  const theme = useTheme();
  const inputSources = React.createRef([]);
  React.useEffect(() => {
    console.log(inputSources.current);
  }, [inputSources]);
  return (
    <Grid
      container
      display="flex"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        width: '100%',
        height: { xs: 800, md: 600 },
        py: 4,
        color: (theme) => theme.palette.text.primary,
        borderLeft: (theme) => theme.custom.borders.brandBorder,
        borderRight: (theme) => theme.custom.borders.brandBorder,
      }}
    >
      <Box sx={{
        px: 4, width: '100%', position: 'relative', height: 0,
      }}
      >
        <Typography variant="h2" component="h4" align="left" color="currentColor" sx={{ my: 3 }}>
          {title}
        </Typography>
        {/* <RegularButton>
          Start a project
        </RegularButton> */}
      </Box>
      <Grid sx={{ px: 4 }} display="flex" justifyContent="flex-start" gutterBottom align="center" direction="column" xs={12} sm={6}>

        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="name"
          helperText="your full name"
          size="normal"
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="phone"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="email"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' }}
        />

        <img
          src={headlineImage}
          alt="designs"
          height="100%"
          style={{
            position: 'absolute',
            top: -150,
            left: theme.spacing(3),
            zIndex: -1,
            height: 150,
            width: 320,
            borderBottom: theme.custom.borders.brandBorder,
          }}
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          type="select"
          icon={{ start: true, type: 'item' }}
          data={[
            { label: 'Software Development', value: 'Software Development', icon: { start: true, type: 'item' } },
            { label: 'Virtual Reality', value: 'Virtual Reality', icon: { start: true, type: 'item' } },
            { label: 'Backend Development', value: 'Backend Development', icon: { start: true, type: 'item' } },
            { label: 'Frontend Development', value: 'Frontend Development', icon: { start: true, type: 'item' } },
            { label: 'Software Maintenence', value: 'Software Maintenence', icon: { start: true, type: 'item' } },
            { label: 'User Interface Design', value: 'User Interface Design', icon: { start: true, type: 'item' } },
            { label: 'User Experience Design', value: 'User Experience Design', icon: { start: true, type: 'item' } },
            { label: 'Strategy', value: 'Strategy', icon: { start: true, type: 'item' } },
            { label: 'Graphic Design', value: 'Graphic Design', icon: { start: true, type: 'item' } },
            { label: 'Branding', value: 'Branding', icon: { start: true, type: 'item' } },
            { label: 'Website', value: 'Website', icon: { start: true, type: 'item' } },
            { label: 'Mobile App', value: 'Mobile App', icon: { start: true, type: 'item' } },
            { label: 'App', value: 'App', icon: { start: true, type: 'item' } },
          ]}
          label="service"
          message="Select the category of service you are looking for"
          size="normal"
          input={{ mode: 'text' }}
        />
      </Grid>
      <Grid sx={{ px: 4 }} display="flex" justifyContent="space-between" direction="column" xs={12} sm={6}>
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
        <RegularButton style={{ marginTop: 16 }}>
          Send message
        </RegularButton>
      </Grid>
    </Grid>
  );
};
