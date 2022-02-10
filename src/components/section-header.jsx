import { makeStyles, Typography } from '@material-ui/core';
import React, { PureComponent } from 'react';
import { svgEncodeBaseSixtyFour } from '../store/theme';
import { Illustration } from './custom/illustrations';

const useStyles = makeStyles((theme) => ({
  // borderRadius: theme.custom.borders.brandBorderRadius,
  // padding: theme.spacing(1) * 0.5,
  // paddingBottom: theme.spacing(3),
  // marginTop: -theme.spacing(6) * 0.5,
  // position: 'absolute',
  // right: theme.spacing(0),
  // marginLeft: -theme.spacing(0) * 0.89,
  // color: theme.palette.text.secondary,
  // background: theme.palette.background.button,
  // fontSize: '.75rem',
  container: {
    width: '100%',
    position: 'realtive',
    background: theme.palette.text.primary,
    border: theme.custom.borders.brandBorder,
    height: 400,
    padding: theme.spacing(4, 8),
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing(4),
    justifyContent: 'flex-start',

    // '& * > *': {
    //   border: theme.custom.borders.brandBorder,
    // },

    '& .illustration-container': {

      background: svgEncodeBaseSixtyFour(`
            <svg xmlns="http://www.w3.org/2000/svg" width="292" height="291" fill="none" viewBox="0 0 292 291">
            <defs/>
            <path stroke="#635AB2" stroke-width=".5" d="M248.53 42.97c56.626 56.626 56.626 148.434 0 205.06-56.626 56.626-148.434 56.626-205.06 0M248.53 42.97c-56.626-56.627-148.434-56.627-205.06 0-56.627 56.626-56.627 148.434 0 205.06M248.53 42.97c56.626 56.626 44.642 136.45-11.984 193.076-56.626 56.626-136.45 68.61-193.077 11.984M248.53 42.97C191.904-13.657 112.079-1.673 55.453 54.953c-56.626 56.626-68.61 136.451-11.984 193.077M248.53 42.97c56.626 56.626 31.993 123.801-24.633 180.427-56.626 56.626-123.801 81.259-180.428 24.633M248.53 42.97c-56.626-56.627-123.134-31.326-179.76 25.3-56.626 56.626-81.926 123.134-25.3 179.76M248.53 42.97c56.626 56.626 18.677 110.485-37.949 167.111-56.626 56.626-110.485 94.575-167.111 37.949M248.53 42.97C191.904-13.657 138.711 24.959 82.085 81.585 25.459 138.21-13.156 191.404 43.47 248.03M248.53 42.97c56.626 56.626 6.026 97.834-50.6 154.46-56.626 56.626-97.834 107.226-154.46 50.6M248.53 42.97c-56.626-56.627-95.838-4.03-152.464 52.596C39.44 152.192-13.156 191.404 43.469 248.03M248.53 42.97c56.626 56.626-16.609 75.199-73.235 131.825-56.626 56.626-75.199 129.861-131.825 73.235M248.53 42.97c-56.626-56.627-71.203 20.605-127.829 77.231C64.075 176.827-13.156 191.404 43.47 248.03M248.531 42.97c56.626 56.627-6.624 85.186-63.25 141.812-56.626 56.626-85.185 119.876-141.811 63.25-56.626-56.626 8.62-83.189 65.246-139.815 56.626-56.626 83.189-121.872 139.815-65.246zm-.003-.002c56.626 56.626-29.259 62.55-85.885 119.176-56.626 56.626-62.55 142.511-119.176 85.885-56.626-56.626 33.255-58.554 89.881-115.18 56.626-56.626 58.554-146.507 115.18-89.88z"/>
          </svg>
        `),

      borderRadius: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      width: 260,
      height: 260,
      display: 'inline-flex',
      border: theme.custom.borders.brandBorder,
      '& #illustration': {
        top: 40,
        // transform: "skewX(100)"
        display: 'inline-table',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        '& svg': {
          width: '100% !important ',
        },
      },
    },
  },
  headline: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: theme.spacing(4),
  },
}));

export const SectionHeader = ({ headline, illustrationType }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>

      <div className="illustration-container">
        <Illustration type={illustrationType} maxWidth={150} />
      </div>

      <Typography align="left" variant="h1" color="secondary">
        {headline}
      </Typography>
    </div>
  );
};

export default SectionHeader;
