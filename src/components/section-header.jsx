import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { PureComponent } from 'react';
import { hexToAlpha, svgEncodeBaseSixtyFour } from '../store/theme';
import { Illustration } from './custom/illustrations';

export const SectionHeader = ({ headline, illustrationType, type = 'default' }) => {
  const sectionHeaderStyles = {
    inverted: {
      // background: (theme) => theme.palette.text.primary,
      color: (theme) => theme.palette.text.secondary,
      // border: (theme) => theme.custom.borders.brandBorderSecondary,
    },
    default: {
      // background: (theme) => theme.palette.text.secondary,
      color: (theme) => theme.palette.text.primary,
      // border: (theme) => theme.custom.borders.brandBorder,
    },
  };

  return (
    <Box
      sx={{
        ...sectionHeaderStyles[type],
        justifyContent: 'flex-start',
        flexDirection: 'column',
        display: 'inline-flex',
        alignItems: 'center', // { md: 'row', sm: 'column', xs: 'column' },
        position: 'realtive',
        width: 250,
        gap: 2,
        p: 2, // padding: (theme) => theme.spacing(8, 4),

        '& .illustration-container': {
          // background: svgEncodeBaseSixtyFour(`
          //       <svg xmlns="http://www.w3.org/2000/svg" width="292" height="291" fill="none" viewBox="0 0 292 291">
          //       <defs/>
          //       <path stroke="#635AB2" stroke-width=".5" d="M248.53 42.97c56.626 56.626 56.626 148.434 0 205.06-56.626 56.626-148.434 56.626-205.06 0M248.53 42.97c-56.626-56.627-148.434-56.627-205.06 0-56.627 56.626-56.627 148.434 0 205.06M248.53 42.97c56.626 56.626 44.642 136.45-11.984 193.076-56.626 56.626-136.45 68.61-193.077 11.984M248.53 42.97C191.904-13.657 112.079-1.673 55.453 54.953c-56.626 56.626-68.61 136.451-11.984 193.077M248.53 42.97c56.626 56.626 31.993 123.801-24.633 180.427-56.626 56.626-123.801 81.259-180.428 24.633M248.53 42.97c-56.626-56.627-123.134-31.326-179.76 25.3-56.626 56.626-81.926 123.134-25.3 179.76M248.53 42.97c56.626 56.626 18.677 110.485-37.949 167.111-56.626 56.626-110.485 94.575-167.111 37.949M248.53 42.97C191.904-13.657 138.711 24.959 82.085 81.585 25.459 138.21-13.156 191.404 43.47 248.03M248.53 42.97c56.626 56.626 6.026 97.834-50.6 154.46-56.626 56.626-97.834 107.226-154.46 50.6M248.53 42.97c-56.626-56.627-95.838-4.03-152.464 52.596C39.44 152.192-13.156 191.404 43.469 248.03M248.53 42.97c56.626 56.626-16.609 75.199-73.235 131.825-56.626 56.626-75.199 129.861-131.825 73.235M248.53 42.97c-56.626-56.627-71.203 20.605-127.829 77.231C64.075 176.827-13.156 191.404 43.47 248.03M248.531 42.97c56.626 56.627-6.624 85.186-63.25 141.812-56.626 56.626-85.185 119.876-141.811 63.25-56.626-56.626 8.62-83.189 65.246-139.815 56.626-56.626 83.189-121.872 139.815-65.246zm-.003-.002c56.626 56.626-29.259 62.55-85.885 119.176-56.626 56.626-62.55 142.511-119.176 85.885-56.626-56.626 33.255-58.554 89.881-115.18 56.626-56.626 58.554-146.507 115.18-89.88z"/>
          //     </svg>
          //   `),
          // width: '100%',
          backgroundColor: (theme) => hexToAlpha(theme.palette.text.primary, 0.3),
          border: (theme) => theme.custom.borders.brandBorder,
          justifyContent: 'center',
          display: 'inline-flex',
          borderRadius: '100%',
          alignItems: 'center',
          overflow: 'hidden',
          height: 100,
          width: 100,
          '& #illustration': {
            // display: 'inline-flex',
            // justifyContent: 'center',
            // transform: "skewX(100)",
            // alignItems: 'flex-end',
            display: 'contents',
            position: 'relative',
            width: 100,
            height: 200,

            '& svg': {
              mt: 1,
              width: '100% !important ',
            },
          },
        },
      }}
    >
      <div className="illustration-container">
        <Illustration type={illustrationType} maxWidth={350} />
      </div>

      <Typography align="center" variant="h4" color="currentColor">
        {headline}
      </Typography>
    </Box>
  );
};

export default SectionHeader;
