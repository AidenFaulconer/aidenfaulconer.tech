import {
  Box, Grid, Typography, useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { NoToneMapping } from 'three';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { StaticImage } from 'gatsby-plugin-image';
import { RegularButton, SelectionButton } from '../custom/buttons';

import { SCROLL_PROPS, svgEncodeBaseSixtyFour } from '../../store/theme';

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

import defaultImage from '../../../static/assets/portfolio/dibbles.png';

// ========================================================================== //
// services
// ========================================================================== //
export default (props, ref) => {
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
};

// ========================================================================== //
// Selection Menu (SERVICES)
// ========================================================================== //
export const SelectionContent = ({
  contentData: {
    description, costRange, name, title, image,
  },
  setCurrent,
}) => {
  const changeHand = useStore((state) => state.threejsContext.methods.changeHand);
  return (
    // container
    <Grid
      container
      wrap="no-wrap"
      alignContent="center"
      sx={{
        position: 'relative',
        background: (theme) => theme.palette.text.primary,
        border: (theme) => theme.custom.borders.brandBorder,
        flexDirection: { md: 'row', xs: 'column' },
        width: '100%',
        height: '100%',
        minHeight: 400,
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      {/* description of service */}
      <Grid
        item
        xs={12}
        md={6}
        lg={5}
        sx={{
          display: 'inline-flex',
          order: { md: 0, xs: 1 },
          color: (theme) => theme.palette.text.secondary,
          padding: 4,
          height: '100%',
          maxWidth: '100vw',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            flexDirection: 'column',
            maxWidth: '100vw',
            width: { md: '100%', xs: '100%' },
            zIndex: 20,
            // minHeight: 400,
            height: { md: '100%', xs: 350 },
          }}
        >
          {/* {JSON.stringify(selected, null, 2)} */}
          <Typography
            align="left"
            variant="h2"
            component="h2"
            color="currentColor"
          >
            {title}
          </Typography>

          <Typography
            align="left"
            variant="caption"
            gutterBottom
            component="h3"
            color="currentColor"
            style={{ marginBottom: 30, fontWeight: 'regular !important' }}
          >
            {costRange}
          </Typography>

          <Typography
            align="left"
            variant="body1"
            color="currentColor"
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
              height: '50%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              flexWrap: 'no-wrap',
            }}
          >
            <RegularButton onClick={() => navigate('./booking')}>
              Start project
            </RegularButton>

            <RegularButton
              type="secondary"
              onClick={() => navigate('/#contact')}
            >
              Contact me
            </RegularButton>
          </Box>
        </Box>
      </Grid>

      {/* media content */}
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          display: 'inline-flex',
          color: (theme) => theme.palette.text.secondary,
          order: { md: 1, xs: 0 },
          width: '60%',
          maxHeight: { xs: 150, md: 400 },
        }}
      >
        <img
          alt={`${title}`}
          style={{
            position: 'relative',
            width: '100%',
            objectFit: 'contain',
            maxHeight: { xs: 180, md: 400 },
            top: 0,
          }}
          src={defaultImage}
        />
      </Grid>

      {/* stats area */}
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
      height: 75,
      color: 'text.primary',
      background: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography
      sx={{ width: '100%' }}
      variant="h4"
      align="center"
      color="currentColor"
    >
      {title || 'title'}
    </Typography>
  </Box>
);
