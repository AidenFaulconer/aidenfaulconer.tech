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

export const Contact = ({ i, title = 'default', setSelected = () => { } }) => {
  const s = 's';
  return (
    <Box
      onClick={() => setSelected(i)}
      sx={{
        width: 250,
        height: 200,
        color: (theme) => theme.palette.text.secondary,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="h4" color="currentColor">
        {title}
      </Typography>
    </Box>
  );
};
