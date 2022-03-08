import {
  Box, Grid, Typography, useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { NoToneMapping } from 'three';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  RegularButton,
  SelectionButton,
  FancyTextField,
} from '../custom/buttons';

import {
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
} from '../../store/theme';

import headlineImage from '../../../static/assets/portfolio/designs.png';
import { sendContactForm } from '../util/apis';

export default ({ i, title = 'Contact Me', setSelected = () => { } }) => {
  const handleError = () => {

  };
  const inputSources = React.createRef([]);
  React.useEffect(() => {
    console.log(inputSources.current);
  }, [inputSources]);
  const theme = useTheme();
  return (
    <Grid
      container
      display="flex"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 1000, md: 600 },
        py: 4,
        color: (theme) => theme.palette.text.primary,
        borderLeft: (theme) => theme.custom.borders.brandBorder,
        borderRight: (theme) => theme.custom.borders.brandBorder,
      }}
    >
      <Box sx={{
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
      >
        <img
          src={headlineImage}
          alt="designs"
          height="100%"
          style={{
            position: 'absolute',
            left: 115,
            bottom: 0,
            zIndex: 2,
            height: 150,
            width: 320,
          }}
        />
      </Box>
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
          formName="contactForm"
          fieldName="name"

          label="name"
          helperText="your full name"
          size="normal"
        />
        <FancyTextField
          formName="contactForm"
          fieldName="phone"

          label="phone"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FancyTextField
          formName="contactForm"
          fieldName="email"

          label="email"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' }}
        />

        <FancyTextField
          formName="contactForm"
          fieldName="service"

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
          formName="contactForm"
          fieldName="message"

          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
        <RegularButton style={{ marginTop: 16 }} onClick={() => sendContactForm()}>
          Send message
        </RegularButton>
      </Grid>

    </Grid>
  );
};
