import { Box, Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useInView } from 'react-intersection-observer';
import ThreeDCarousel from './custom/threeDCarousel';
import { IllustrationSelection } from './custom/carousel/selection';

// ========================================================================== //
// Roulette
// ========================================================================== //
import jsonConfiguration from '../../static/admin/site-data.json';
import { useStore } from '../store/store';
import { useLockBodyScroll } from './util/customHooks';

export default function () {
  const { sections, subSections } = jsonConfiguration;
  // const scrollProgress = useScrollProgress();
  // const setAppContext = useStore((state) => state.appContext.methods.setAppContext);
  // const { ref, inView } = useInView({
  //   root: null,
  //   rootMargin: '10px 0px 30px 0px',
  //   threshold: 0.8,
  // });
  const containerRef = useRef(null);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the ref
    if (containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight) {
      // Scroll the user back to the top of the containerRef
      containerRef.current.scrollTo(0, 0);
      alert('scroll back');
    }
  };

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      className="pb-24 relative"
      sx={{
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
        SelectionComponent={IllustrationSelection} // top level selection
          // sub section
        subSectionData={subSections} // needs selectionComponent, subSectionComponent, headline, key
        SubSelectionComponent={ThreeDCarousel}
      />
    </Box>
  );
}
