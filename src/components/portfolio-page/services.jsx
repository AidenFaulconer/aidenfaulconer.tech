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
} from '../custom/buttons';

import {
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
} from '../../store/theme';

// ========================================================================== //
// services
// ========================================================================== //
import websiteImage from '../../../static/assets/portfolio/website.png';
import vrImage from '../../../static/assets/portfolio/vr.mp4';
import designImage from '../../../static/assets/portfolio/lots.png';
import appsImage from '../../../static/assets/portfolio/clouds.png';
import uiuxImage from '../../../static/assets/portfolio/uiux.png';
import brandingImage from '../../../static/assets/portfolio/branding.jpg';
import servicesImage from '../../../static/assets/portfolio/delivery.png';
import ThreeWrapper from '../threejs/three-wrapper';
import { useStore } from '../../store/store';

// ========================================================================== //
// services
// ========================================================================== //
export default React.forwardRef((props, ref) => {
  const bgAlt = 0;
  const { id } = props;

  return (
    <section
      id={id}
      ref={ref}
      // className={(classes.section)}
    >
      <SelectionMenu />
    </section>
  );
});

// ========================================================================== //
// Selection Menu (SERVICES)
// ========================================================================== //
export const SelectionContent = ({
  contentData: {
    description, costRange, name, title,
  },
  setCurrent,
}) => {
  const changeHand = useStore((state) => state.threejsContext.methods.changeHand);
  return (
  // container
    <Grid
      container
      wrap="wrap"
      sx={{
        position: 'relative',
        border: (theme) => theme.custom.borders.brandBorderSecondary,
        background: (theme) => theme.palette.text.special,
        flexDirection: { md: 'row', xs: 'column' },
        overflowX: 'scroll',
        overflowY: 'hidden',
      }}
    >

      {/* description of service */}
      <Grid
        item
        xs={12}
        md={9}
        lg={10}
        sx={{
          display: 'inline-flex',
          color: (theme) => theme.palette.text.primary,
          padding: 4,
          maxWidth: '100vw',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <Box sx={{
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          width: { md: '50%', xs: '100%' },
          zIndex: 20,
          // minHeight: 400,
          height: { md: '100%', xs: 350 },
        }}
        >

          {/* {JSON.stringify(selected, null, 2)} */}
          <Typography align="left" variant="h2" component="h2" color="primary">
            {title}
          </Typography>

          <Typography
            align="left"
            variant="caption"
            gutterBottom
            component="h3"
            color="primary"
            style={{ marginBottom: 30, fontWeight: 'regular !important' }}
          >
            {costRange}
          </Typography>

          <Typography
            align="left"
            variant="body1"
            color="primary"
            style={{ marginBottom: 30 }}
          >
            {description || 'description'}
          </Typography>

          <Box
            sx={{
              display: 'inline-flex',
              gap: 3,
              row: 3,
              flexDirection: 'row',
              position: 'relative',
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              flexWrap: 'no-wrap',
            }}
          >
            <RegularButton onClick={() => navigate('./booking')}>
              Start
              {' '}
              {name || 'name'}
              {' '}
              project
            </RegularButton>

            <RegularButton type="secondary" onClick={() => navigate('/#contact')}>
              Contact me
            </RegularButton>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
};

// selection components get headline, subsectionData, their corresponding index and a method to change the current selection
export const ServicesSelection = ({
  setCurrent, i, title, width,
}) => (
  <Box
    onClick={() => setCurrent(i)}
    sx={{
      width: '100%',
      position: 'relative',
      p: 2,
      height: 200,
      color: (theme) => theme.palette.text.secondary,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h4" align="center" color="currentColor">
      {title || 'title'}
    </Typography>
  </Box>
);
