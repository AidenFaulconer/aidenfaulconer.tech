import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, createSvgIcon, Icon } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';

import {
  patternHover, patternHoverKeyframes, socialMediaPopup, socialMediaPopupKeyframes,
} from '../../store/theme';

// ========================================================================== //
// Button styles
// ========================================================================== //

const useStyles = makeStyles((theme) => {
  const transistion = theme.transitions.create(
    ['color', 'box-shadow', 'background', 'margin', 'border'],
    { duration: '0.3s', easing: 'ease-in-out' },
  );

  return ({
    // ========================================================================== //
    //     define animation names at top level
    // ========================================================================== //
    ...socialMediaPopupKeyframes,
    ...patternHoverKeyframes, // these can only be referenced in one spot in the app, either locally or globally **so here**
    root: {
      background: theme.custom.shadows.brand,
    },
    // dark (in default theme)
    regularButton: {
      ...patternHover,
      // background: ({ color }) => (color || theme.palette.primary.main),
      background: `${theme.palette.background.primary}`,
      color: theme.palette.text.secondary,
    },
    // light (in default theme)
    secondaryButton: {
      background: `${theme.palette.background.secondary}`,
      color: theme.palette.text.primary,
      border: `${theme.custom.borders.brandBorderSecondary}`,
      ...patternHover,
    },
    thirdButton: {
      background: `${theme.palette.background.default}`,
      border: `${theme.custom.borders.brandBorderSecondary}`,
      color: `${theme.palette.text.primary.main}`,
      ...patternHover,
    },
    selectionButton: {
      opacity: 0.6,
      border: `${theme.custom.borders.brandBorderSecondary}`,
      fill: theme.palette.text.secondary,
      background: theme.palette.text.secondary,
      justifyContent: 'flex-start',
      '& svg': {
        fill: theme.palette.text.secondary,
      },
      '&::hover': {
        background: theme.palette.text.primary,
        '& svg': {
          fill: theme.palette.text.secondary,
        },
      },
    },
    dropDownButton: {

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
      boxShadow: theme.custom.shadows.brandInset,
      borderRadius: theme.custom.borders.brandBorderRadius,
      padding: '7px',
    },
    inputButton: {

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
      boxShadow: theme.custom.shadows.brandInset,
      borderRadius: theme.custom.borders.brandBorderRadius,
      padding: '7px',
    },
    socialMediaPopup: {
      ...socialMediaPopup,

    },
  });
});

const ButtonArrow = () => (
  <Icon>
    {/* <img
      src={`
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.0761836 0.0760178L0.0836879 9.81926L8.96634 4.90446L0.0761836 0.0760178Z" fill="white"/>
          </svg>
          `}
      alt="arrow"
      height={25}
      width={25}
    /> */}
    arrow_right
  </Icon>
);

// ========================================================================== //
// Social media button grid
// ========================================================================== //
export const SocialMediaGroupButton = (props) => {
  const { socialMediaData } = props;
  const classes = useStyles();
  return (
    <button type="button" className={classes.socialMediaPopup}>
      <div className="text">
        Share Your Profile
      </div>
      <div className="icons">
        <div className="icons__icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
          </svg>
        </div>
        <div className="icons__icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z" />
          </svg>
        </div>
        <div className="icons__icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-telegram" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
          </svg>
        </div>
        <div className="icons__icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3" />
            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
          </svg>
        </div>
        <div className="icons__icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-dribbble" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="12" r="9" />
            <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
            <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
            <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
          </svg>
        </div>
      </div>
    </button>
  );
};

// ========================================================================== //
// Button variant 1 (secondary)
// ========================================================================== //
export const ThirdButton = (props) => {
  const {
    Icon, shadow, children, color = {}, size = 'large',
  } = props;
  const classes = useStyles(color);
  return (
    <Button
      disableRipple
      {...props}
      className={classes.thirdButton}
      size={size}
      variant="contained"
      color="inherit"
      endIcon={<ButtonArrow />}
    >
      {children}
    </Button>
  );
};
// ========================================================================== //
// Button variant 2 (light)
// ========================================================================== //
export const SecondaryButton = (props) => {
  const {
    Icon, shadow, children, color = {}, size = 'large',
  } = props;
  const classes = useStyles(color);
  return (
    <Button
      {...props}
      disableRipple
      className={classes.secondaryButton}
      size={size}
      color="inherit"
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
  const classes = useStyles({ color });
  return (
    <Button
      {...props}
      disableRipple
      className={classes.regularButton}
      color="primary"
      size={size}
      variant="contained"
      centerRipple
      endIcon={<ButtonArrow />}
    >
      {children}
    </Button>
  );
};

// ========================================================================== //
// Selection buttons
// ========================================================================== //
export const SelectionButton = (props) => {
  const {
    Icon, shadow, children, color = {}, size = 'large', selected = false,
  } = props;
  const classes = useStyles({ color });
  return (
    <Button
      {...props}
      disableRipple
      className={classes.selectionButton}
      // color="sec"
      size={size}
      variant="contained"
      centerRipple
      style={{ opacity: selected && 1 }}
      startIcon={(
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8.00049" cy="8.3396" r="7.5" fill={selected && '#000064'} stroke="#000064" />
        </svg>
        )}
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
