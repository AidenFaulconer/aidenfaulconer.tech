import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// ========================================================================== //
// Button styles
// ========================================================================== //
const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      background: theme.palette.background.secondary,
      color: theme.palette.text.secondary,
      boxShadow: theme.shadows.brand,
    },
    background: theme.shadows.brand,
    // margin: theme.spacing(3),
    // "& > *": {
    // },
  },
  regularButton: {
    '&:hover': {
      boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
      color: theme.palette.text.primary,
      background: theme.palette.background.default,
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),

      border: theme.shape.brandBorderSecondary,
    },

    // effect
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),
    marginLeft: -theme.spacing(0),
    marginBottom: -theme.spacing(0),

    // theme styles
    whiteSpace: 'nowrap',
    display: 'inline',
    color: theme.palette.background.default,
    background: theme.palette.background.button,
    boxShadow: theme.shadows.brand,
    borderRadius: theme.shape.brandBorderRadius,
    padding: '7px',
  },
  goldButton: {
    '&:hover': {
      boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
      color: theme.palette.text.primary,
      background: theme.palette.background.hero,
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),
      border: theme.shape.brandBorderSecondary,
    },

    // effect
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),
    marginLeft: -theme.spacing(0),
    marginBottom: -theme.spacing(0),

    // theme styles
    whiteSpace: 'nowrap',
    display: 'inline',
    color: theme.palette.text.primary,
    background: theme.palette.background.hero,
    boxShadow: theme.shadows.brand,
    borderRadius: theme.shape.brandBorderRadius,
    padding: '7px',
  },
  dropDownButton: {
    '&:hover': {
      boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
      color: theme.palette.text.primary,
      background: theme.palette.background.hero,
      marginLeft: -theme.spacing(0),
      marginBottom: -theme.spacing(0),
      border: theme.shape.brandBorderSecondary,
    },

    // effect
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),

    // effect
    marginLeft: -theme.spacing(1),
    marginBottom: -theme.spacing(1),

    // theme styles
    whiteSpace: 'nowrap',
    display: 'inline',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
    boxShadow: theme.shadows.brandInset,
    borderRadius: theme.shape.brandBorderRadius,
    padding: '7px',
  },
  inputButton: {
    '&:hover': {
      boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
      color: theme.palette.text.primary,
      background: theme.palette.background.hero,
      marginLeft: -theme.spacing(0),
      marginBottom: -theme.spacing(0),
      border: theme.shape.brandBorderSecondary,
    },
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),

    whiteSpace: 'nowrap',

    // effect
    marginLeft: -theme.spacing(1),
    marginBottom: -theme.spacing(1),
    display: 'inline',

    // theme styles
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
    boxShadow: theme.shadows.brandInset,
    borderRadius: theme.shape.brandBorderRadius,
    padding: '7px',
  },
}));

// ========================================================================== //
// Button variant 1 (Gold)
// ========================================================================== //
export const GoldButton = (props) => {
  const {
    Icon, shadow, children, color = {}, size = 'large',
  } = props;
  const classes = useStyles(color);
  return (
    <Button
      {...props}
      className={classes.goldButton}
      color="primary"
      size={size}
      variant="contained"
    >
      {children}
    </Button>
  );
};

// ========================================================================== //
// Button variant 2 (Green)
// ========================================================================== //
export const RegularButton = (props) => {
  const {
    Icon, shadow, children, color = {}, size = 'large',
  } = props;
  const classes = useStyles(color);
  return (
    <Button
      {...props}
      className={classes.regularButton}
      color="primary"
      size={size}
      variant="contained"
    >
      {children}
    </Button>
  );
};

// ========================================================================== //
// Button Group
// ========================================================================== //
export const ButtonGroup = (props) => {
  const {
    Icon,
    shadow,
    children,
    color = {},
    autosize = false,
    buttonClass = 'regularButton',
  } = props;
  const classes = useStyles({ color });
  return (
    autosize && (
      <ButtonGroup
        {...props}
        fullWidth
        multiline
        className={classes[buttonClass]}
        margin="normal"
        // InputLabelProps={{
        //   shrink: true,
        // }}
        variant="outlined"
      >
        {children}
      </ButtonGroup>
    )
  );
};
