import {
  Box, useTheme,
} from '@mui/material';
import {
  useSpring,
  a,
  interpolate,
  useSprings,
} from '@react-spring/web';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useGesture } from '@use-gesture/react';
import { useWindowSize } from 'react-use-breakpoints';
import { usePrevious, toggleScrollHook, useManyGestures } from '../util/customHooks';

import pingSound from '../../../static/assets/portfolio/interaction-sound.mp3';
import { useStore } from '../../store/store';
import Services, { SelectionContent, ServicesSelection } from '../portfolio-page/services';
import Qualifications from '../portfolio-page/qualifications';
import { Experience, Languages } from '../portfolio-page/skills';
import SectionHeader from '../section-header';

/*
9 Slides total: 360 Degrees (full circle) --> 360/9 = 40 --> our increment for rotation

Some math. Consider how the carousel will be set up. It's going to be a 3D circle, like an orbit. The orientation will be such that it would be like setting a ring down on a table, then bending down and looking at the ring head on from the edge of the table. The main "front" image will be entirely front-facing. The other images will be rotated slightly to make a full circle. You could sketch this out in 2D from a bird's eye view, and you'd end up with a picture like the following:

https://cl.ly/image/2P3E1U0W0c29

Each triangle/piece would be a slide, hence 9 pieces. That being said, let's do some calculations, but we'll use the dimensions of our elements rather than those in the picture.

So, we're rotating all the slides in 40º increments relative to each other, because 360º makes a full circle, and we have 9 elements: 360/9 = 40

In the picture above, we want to find the radius of the circle (which isn't exactly a circle because it's made up of triangles). So we can cut each triangle in half and solve for `r` (radius). We can solve for `r` using some geometry and our own elements' dimensions.

The width of the slides is 300px. We're going to split those triangles in half and use the TANGENT function in geometry/trigonemty to solve for `r`. And since we're splitting each of the 9 triangles (the slides) in half for this, we need to account for the fact that our key angle is now going to be 20º and not 40º. We can solve for `r` by taking our smaller triangles' width (150px) and dividing by the tangent of 20º (in degrees, not radians). So:

            150
   r =  -----------
          tan(20º)

Math things: https://cl.ly/image/1t0j1V2Y2l2Z

So, `r` is (about) 412px long! This means we need to TRANSLATE the slides in the Z 3-dimensional plane by 412px. This should be done AFTER the rotateY transformation.
*/
// ========================================================================== //
// selection carousel
// ========================================================================== //
export default React.memo(
  ({
    // this section
    _radius = 0,
    carouselData,
    gutter = 0.04,
    key = 'default',
    cardWidth = 350,
    carouselHeight = 250,
    carouselIndex = 0,
    SelectionComponent = SectionHeader, // component used for selection
    // sub section
    children,
    subSectionData,
    SubSelectionComponent, // component used for content
    HasContent = false, // tells component we have children to render with THIS instance of the component
  }) => {
    // ========================================================================== //
    //     Calculations and properties
    // ========================================================================== //
    const theme = useTheme();
    const carouselID = carouselData[0].key;

    const windowSize = useWindowSize();// detect resize
    const [containerDimensions, setContainerDimensions] = React.useState({ width: 0, height: 0 });
    const radius = ((containerDimensions.width) / 2) - (gutter * 2);
    // const zOrigin = 859 / carouselData.length - 1;
    const zOrigin = -containerDimensions.width;
    const slideWidth = ((radius * 2) / (carouselData.length / Math.PI));
    const slideAngle = 360 / carouselData.length; // rotation increment for each slide

    const containerRef = useRef(null);
    // expose setCurrent method to store (only for topmost level)

    // ========================================================================== //
    //   handling state change
    // ========================================================================== //
    const [current, setCurrent] = React.useState(0);
    const [curRot, setCurRot] = React.useState(0);
    const prevCurrent = usePrevious(current);

    useEffect(() => {
      // cap the width at 1000
      const { clientWidth, clientHeight } = containerRef.current;
      const width = clientWidth > 1250 ? 1250 : clientWidth;
      const height = clientHeight > 1250 ? 1250 : clientHeight;

      setContainerDimensions({
        width: width - gutter,
        height: height - gutter,
      });
    }, [windowSize, containerRef]);

    useEffect(() => {
      if (carouselIndex === 0) {
        useStore.setState((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            methods: {
              ...state.appContext.methods,
              setCurrent: (args) => setCurrent(setDirection(args)),
            },
          },
        }));
      }
    }, []);

    // ========================================================================== //
    //     For custom components associated with sub-content
    // ========================================================================== //
    const componentReference = {
      SelectionContent,
      ServicesSelection,
      Qualifications,
      Services,
      Languages,
      Experience,
    };
    const renderContent = React.useCallback((componentRef) => {
      const ContentComponent = componentReference[componentRef || 'SelectionContent'];
      return (
        <Box sx={{
          gridArea: 'content',
          width: '100%',
          height: '100%',
          perspective: 'inherit',
          mt: 3,
          // transform: 'preserve-3d',
          // transform: `rotate(${slideAngle * i}deg) translateZ(${radius}px)`,
          perspectiveOrigin: `50% ${carouselIndex > 0 && -(carouselIndex * 100)}px`,
        }}
        >
          <ContentComponent
            key="content-component"
            current={current} // edit parents selection if needed
            setCurrent={setCurrent} // this is the NESTED selection carousels setCurrent
            contentData={carouselData[current]}
          />
        </Box>
      );
    }, []);

    // ========================================================================== //
    //   Handle interactions with the carousel
    const ping = typeof window !== 'undefined' && useMemo(() => new Audio(pingSound), []);

    // ========================================================================== //
    //   handle animation **consider the current SELECTION**
    // ========================================================================== //
    const to = (i) => ({
      x: 0, rot: slideAngle * i, y: i * -4, scale: 1, delay: i * 100,
    }); // config: { ...config.gentle },
    const from = (i) => ({
      x: 0, rot: slideAngle * i, scale: 1.5, y: -1000,
    });// config: { ...config.gentle }

    // we need two springs, one wraps all the carousel cards, another wraps the ORIGIN of the carousel
    const [wrappedCards, setCard] = useSprings(carouselData.length, (i) => ({
      ...to(i),
      from: from(i),
    })); // Create a bunch of springs using the helpers above
    const [wrappedOrigin, setOrigin] = useSpring((i) => ({
      ...to(i),
      from: from(0),
    })); // Create a spring using the helpers above for the ORIGIN

    const gestureHandler = ({
      args: [index],
      down,
      delta: [xDelta, yDelta],
      direction: [xDir],
      velocity: [xVel, yVel],
      tap,
      // memo
      // cancel
      // touches
      // scrolling,
      // wheeling,
    }) => {
      const swipeSpeed = 1.5;

      // if we are at the end of the carousel we dont handle gestures
      if (current === carouselData.length) { setCurrent(0); return; }
      // const trigger = xVel > 0.1; // If you flick hard enough it should trigger the card to fly out
      // const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      const x = 200 * swipeSpeed + window.innerWidth;
      const scale = down ? 1.1 : 1; // Active cards lift up a bit

      // compensate for left and right directions
      xDelta = (Math.abs(xDelta) - window.innerWidth * xVel) / 100; // relative to velocity and viewport size
      xDelta = xDir > 0 ? -xDelta : xDelta; // left or right

      const rot = curRot + (xDelta * swipeSpeed);
      // console.log(`curRot ${curRot} rotOffset ${rot} delta: ${xDelta} dir: ${xDir} vel: ${xVel}`,);

      setOrigin(() => ({
        x,
        rot,
        scale,
        delay: 0,
        // config: { friction: 0, tension: down ? 800 : 200 },
      }));
      setCurRot(curRot);
    };

    const bindGestureHandler = useManyGestures({
      // onScroll: (state) => gestureHandler(state),
      onDrag: (state) => gestureHandler(state), // set angleBounds to 360/-360
      onWheel: (state) => gestureHandler(state), // swipe.distance capped at 3 pixels of movement
      onHover: () => {},
      handlerConfig: {
        onDrag: {
          threshold: 5,
          pointer: { capture: false },
          axis: 'x',
          filterTaps: true,
        },
        // useScroll: {
        //   threshold: 5,
        //   pointer: { capture: false },
        //   axis: 'y',
        //   filterTaps: true,
        // },
        onWheel: { threshold: 5 },
      },
    });

    // ========================================================================== //
    //   effects
    // ========================================================================== //
    const setDirection = useCallback(
      (_current, direction = 'right') => {
        // if we go left, we increment negatively -360 relative to current, if we go right, we increment positively 360 relative to current
        const rot = direction === 'left'
          ? _current == carouselData.length - 1
            ? slideAngle
            : slideAngle * Math.abs(_current - carouselData.length)
          : carouselData.length == 0
            ? -slideAngle
            : -slideAngle * _current;

        // console.log(
        //   `angle:${slideAngle},length: ${
        //     carouselData.length - 1
        //   }, slide:${_current}, ${direction}, Rotate: ${rot}`,
        // );

        setOrigin((i) => {
          const isGone = 0; // gone.has(index);
          const scale = 1; // Active cards lift up a bit
          const x = 0;
          return {
            x, rot, scale, delay: undefined, config: { friction: 50, tension: 1 ? 800 : isGone ? 200 : 500 },
          };
        });
        setCurRot(rot);
        ping.play();

        return _current;
      },
      [current],
    );

    // ========================================================================== //
    //   carousel **has grid areas defined for use in a parent container**
    // ========================================================================== //
    return (
      <>
        {/* carousel container w controls */}
        <Box
          id={`carousel-container-${carouselIndex}`}
          ref={containerRef}
          {...bindGestureHandler(0)}
          sx={{
            gridArea: `Slider-${carouselID}`,
            background: (theme) => theme.palette.text.primary,
            // py: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignContent: 'center',
            pointerEvents: 'all',
            height: carouselHeight,
            perspective: 2500,
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            width: '100%',
          }}
        >
          {/* carousel button container */}
          {/* <Box
            sx={{
              width: '100%',
              // left: '0%',
              px: '5%',
              maxWidth: (theme) => radius + theme.spacing(3),
              position: 'absolute',
              height: 0,
              p: 4,
              zIndex: 10,
              display: { xs: 'none', xl: 'inline-flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              // border: (theme) => theme.custom.borders.brandBorder2,
            }}
          > */}
          {/* go left */}
          {/* <RegularButton
              type="secondary"
              icon={{ enabled: true, type: 'arrow' }}
              style={{
                transform: 'rotate(180deg)',
              }}
              onClick={(e) => {
                setCurrent(
                  setDirection(
                    current == 0 ? carouselData.length - 1 : current - 1,
                    'left',
                  ),
                );
              }}
            /> */}

          {/* go right */}
          {/* <RegularButton
              type="secondary"
              icon={{ enabled: true, type: 'arrow' }}
              onClick={(e) => {
                setCurrent(
                  setDirection(
                    current == carouselData.length - 1 ? 0 : current + 1,
                    'right',
                  ),
                );
              }}
            />
          </Box> */}

          {/* carousel container w carousel */}
          <Box
            unselectable="on"
            sx={{
              // background: 'red',
              perspective: 'inherit',
              perspectiveOrigin: `50% ${carouselIndex > 0 && -(carouselIndex * 100)}px`,
              position: 'relative',
              display: 'inline-flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              width: '100%',
              transform: `scale(${0.7}) translateY(${-carouselIndex * 35}px)`,
              height: carouselHeight, // centers the carousel, carousel is spawned at baseline of this element
            }}
          >
            {/* the carousel origin */}
            <a.div
              style={{
                pointerEvents: 'all',
                transform: interpolate(
                  [wrappedOrigin.rot, wrappedOrigin.scale],
                  (rot, scale) => `rotateY(${rot}deg) scale(${scale})`,
                ),
                zIndex: 5,
                position: 'absolute',
                transformStyle: 'preserve-3d',
                alignSelf: 'center',
                height: cardWidth / 6,
                width: cardWidth / 6,
                transformOrigin: `center 50% ${zOrigin}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* carousel panels */}
              {wrappedCards.map(
                // get animation values for each card
                ({
                  x, y, rot, scale,
                }, i) => {
                  const data = carouselData[i];
                  { /* console.log(data); */ }
                  return (
                    <a.div
                      key={`selection-${i}-${data?.key || subSectionData?.title}-${Math.random()}`}
                      style={{
                        minWidth: `${slideWidth}px`,
                        width: `${slideWidth}px`,
                        maxHeight: `${carouselHeight}px`,
                        // backdropFilter: 'blur(25px)',
                        color: theme.palette.text.seconary,
                        boxShadow: 'none !important',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.spacing(1),
                        overflow: 'hidden',
                        border: theme.custom.borders.brandBorder,
                        padding: theme.spacing(1),

                        // align rotation to fit in a circle
                        transform: `rotateY(${slideAngle * i}deg) translateZ(${radius}px)`,
                        zIndex: 5 * i + 1,
                        // handle selection/unselection
                        background: theme.palette.text.secondary,
                        ...(current === i
                          ? { opacity: 1 }
                          : current === i - 1 || current === i + 1 ? { opacity: 0.9 }
                            : { opacity: 0.3 }
                        ),
                      }}
                      onClick={() => {
                        setCurrent(
                          setDirection(setDirection(i, 'right'), 'left'),
                        );
                      }}
                    >
                      <SelectionComponent
                        unselectable="on"
                        id={`${String(data.key).toLowerCase()}`}
                        width={slideWidth}
                        height={carouselHeight}
                        {...data}
                        setCurrent={setCurrent}
                        i={i}
                      />
                    </a.div>
                  );
                },
              )}
            </a.div>
          </Box>
        </Box>

        {/* additional Carousels */}
        {/* nest carousels from top to bottom via children, they need eachother, this is recursive, ensure a stopping condition */}
        {/* this carousel is different for every single subsection, current powers this selection */}
        {(SubSelectionComponent && (
          <SubSelectionComponent
            carouselIndex={carouselIndex + 1}
            // carousel dimensions
            gutter={gutter}
            carouselHeight={carouselHeight}
            cardWidth={cardWidth}
            carouselData={subSectionData[current].subSectionData} // this will contain selections, and the root subSectionData for the children to base from
            key={subSectionData[current].key}
            title={subSectionData[current].headline}
            SelectionComponent={componentReference[subSectionData[current].selectionComponent]}
            // handle further nested carousels
            SubSelectionComponent={componentReference[subSectionData[current].subSelectionComponent] || null}
            HasContent={subSectionData[current].HasContent}
          />
        )) || null}

        {/* note that carouselData in the childs point of view is of the parents, which is subsectionData[current].subSectionData **since its inheriting the grandfathers subsectionData** */}
        {/* props to this component are passed down below in children(), since we create it via (), we only pass a reference here */}
        {/* for a carousel, give an option for content, you see the above nested component places content here */}
        {/* current and set current, correspond to a parent WITH children, if they dont, they wont have a current/setCurrent to correspond */}
        {(HasContent && (renderContent(HasContent))) || null}
      </>
    );
  },
  (prevProps, nextProps) =>
    // console.log(prevProps, nextProps);
    prevProps.carouselData !== nextProps.carouselData
    || prevProps.subSectionData !== nextProps.subSectionData,
);
