import { Box, Typography } from '@mui/material';
import React from 'react';
import { hexToAlpha } from '../../../store/theme';
import { Illustration } from '../illustrations';

// selection components get headline, subsectionData, their corresponding index and a method to change the current selection
export function Selection({
  setCurrent, i, title, width, height, id, icon,
}) {
  return (
    <Box
      id={id}
      onClick={() => setCurrent(i)}
      className="bg-inherit items-center content-center inline-flex relative p-2"
      sx={{
        width: width || '100%',
        height: height || 75,
        color: 'text.primary',
      }}
    >
      <Typography
        className="w-full"
        variant="h3"
        align="center"
        color="currentColor"
      >
        {title || 'title'}
      </Typography>
      {icon}
    </Box>
  );
}

/**
 * The SectionHeader function is a React component that renders a header for the
 * section of the page. It accepts an optional `width` and `height` prop to
 * control its size, as well as an optional `headline` prop to display text in
 * the center of it. The default type is 'default', but can be set to 'inverted'
 *
 * @param {width=200 Set the width of the illustration
 * @param height=200 Set the height of the illustration
 * @param headline Set the headline text in the sectionheader component
 * @param illustrationType Determine which illustration to use
 * @param type='default' Set the background color of the section header
 * @param id Set the id of the section header
 * @param } Close the function
 *
 * @return A box with a background color, and some text
 *
 */
export function IllustrationSelection({
  width = 200, height = 200, headline, illustrationType, type = 'default', id,
}) {
  const sectionHeaderStyles = {
    inverted: {
      color: (theme) => theme.palette.text.secondary,
    },
    default: {
      color: (theme) => theme.palette.text.primary,
    },
  };

  return (
    <Box
      id={id}
      className="flex-col items-center inline-flex justify-start gap-2 p-2 relative"
      sx={{
        ...sectionHeaderStyles[type],
        width,
        height,
      }}
    >
      <Box
        className="justify-center relative inline-flex rounded-full items-center overflow-hidden h-40 w-40"
        sx={{
          background: (theme) => hexToAlpha(theme.palette.text.primary, 0.3),
          '& #illustration': {
            width: 200,
            height: 200,
            '& svg': {
              mt: 1,
              width: '100% !important ',
            },
          },
        }}
      >
        <Illustration type={illustrationType} maxWidth={350} />
      </Box>

      <Typography align="center" variant="h3" color="currentColor">
        {headline}
      </Typography>
    </Box>
  );
}
