import { Grid } from '@mui/material';
import React from 'react';
import ThreeDCarousel from '../components/custom/threeDCarousel';
import { SectionHeader } from '../components/section-header';

// ========================================================================== //
// Routlette
// ========================================================================== //
import jsonConfiguration from '../../static/admin/site-data.json';

export default () => {
  const { sections, subSections } = jsonConfiguration;
  return (
    <Grid
      container
      display="flex"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        width: '100%',
        background: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <ThreeDCarousel
        // carousel dimensions
        carouselHeight={225}
        cardWidth={400}
        gutter={0}
        // top section
        title="Sections"
        key="Sections-carousel"
        carouselData={sections} // needs, title, image, alt, description, icon, cta, category
        SelectionComponent={SectionHeader} // top level selection
        // sub section
        subSectionData={subSections} // needs selectionComponent, subSectionComponent, headline, key
        SubSelectionComponent={ThreeDCarousel}
      />
    </Grid>
  );
};
