import {
  Box, CardMedia, Typography, useTheme, Grid,
} from '@mui/material';
import {
  useSpring,
  a,
  config,
  interpolate,
  useSprings,
} from '@react-spring/web';
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDrag, useGesture } from '@use-gesture/react';
import { useBreakpoints } from 'react-use-breakpoints';
import { hexToAlpha } from '../../store/theme';
import { usePrevious, useDimensions } from '../util/customHooks';
import { RegularButton } from './buttons';

import pingSound from '../../../static/assets/portfolio/interaction-sound.mp3';

// ========================================================================== //
// Math
// ========================================================================== //

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

Here's a screenshot of me doing the calculations in JavaScript, right in the browser console!

Math things: https://cl.ly/image/1t0j1V2Y2l2Z

So, `r` is (about) 412px long! This means we need to TRANSLATE the slides in the Z 3-dimensional plane by 412px. This should be done AFTER the rotateY transformation.
*/
// export const useStyles = makeStyles((theme) => ({

// wrapper size, and hardcoded translateZ all correlate to a ratio to be z aligned
// root container, this is tilted to tilt the entire carousel, rotate to position to selected card

// ...threeDHoverKeyframes,

// ========================================================================== //
// SPIN TEXT
// ========================================================================== //
// const splitter = new GraphemeSplitter();
// const graphicStyles = {
//   borderRadius: theme.custom.borders.brandBorderRadius,
//   zIndex: 0,
//   width: '100%',
//   // transform: 'scale(.8)',
//   mb: 12,
//   position: 'absolute',
//   display: 'inline',
//   transform: {
//     xl: { scale: 0.5 },
//     lg: { scale: 0.5 },
//     md: { scale: 0.5 },
//     sm: { scale: 0.5 },
//     xs: { scale: 0.5 },
//   },
//   '& .spin-container': {
//     transform: 'translate(-50%,-50%) scale(1)',
//     left: '50%',
//     top: '50%',
//     fontWeight: 1000,
//     position: 'absolute',
//   },
//   '& #spinText': {
//     animation: '$rotateAngle 6s linear infinite',
//     zIndex: 'inherit',
//     fontWeight: 100,
//   },
// };
// const spinText = React.useCallback((spinText, scale = 1) => {
//   // curve text
//   const ref = React.useRef(null);
//   let circleType = null;
//   React.useEffect(() => {
//     circleType = new CircleType(
//       ref?.current,
//       splitter.splitGraphemes.bind(splitter), // bind to this circletype method to automatically split the elements content text
//     );
//   }, [ref.current]);
//   return (
//     <Box
//       item
//       sx={{ ...graphicStyles }}
//       style={{ transform: `scale(${scale})` }}
//     >
//       <h1 ref={ref} id="spinText">
//         {spinText}
//       </h1>
//     </Box>
//   );
// }, []);

// ========================================================================== //
// selection carousel
// ========================================================================== //
export default React.memo(
  ({
    // this section
    carouselData,
    gutter = 0.04,
    key = 'default',
    cardWidth = 350,
    carouselHeight = 350,
    SelectionComponent, // component used for selection
    // sub section
    children,
    subSectionData,
    SubSelectionComponent, // component used for content
    HasContent = false, // tells component we have children to render with THIS instance of the component
  }) => {
    // current selection

    const theme = useTheme();
    const tiltAngle = 20;
    const tiltRadians = tiltAngle * (Math.PI / 180);
    const slideAngle = 360 / carouselData.length; // rotation increment for each slide
    // constrain width of circle to 600,
    const { breakpoint, windowSize } = useBreakpoints({
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    });
    const radius = breakpoint === 'xs' ? 225 : breakpoint === 'sm' ? 225 : breakpoint === 'md' ? 250 : breakpoint === 'lg' ? 300 : 450;
    const zOrigin = 859 / carouselData.length - 1;

    const slideWidth = (gutter - radius * Math.cos(slideAngle));// was gutter - radius
    console.log(slideWidth);
    // ========================================================================== //
    //   handling state change
    // ========================================================================== //
    const [current, setCurrent] = React.useState(0);
    const [curRot, setCurRot] = React.useState(0);
    const prevCurrent = usePrevious(current);
    // ========================================================================== //
    //   handle animation **consider the current SELECTION**
    const to = (i) => ({
      x: 0,
      rot: slideAngle * i,
      y: i * -4,
      scale: 1,
      delay: i * 100,
      // config: { ...config.gentle },
    });
    const from = (i) => ({
      x: 0,
      rot: slideAngle * i,
      scale: 1.5,
      y: -1000,
      // config: { ...config.gentle },
    });

    // we need two springs, one wraps all the carousel cards, another wraps the ORIGIN of the carousel
    const [wrappedCards, setCard] = useSprings(carouselData.length, (i) => ({
      ...to(i),
      from: from(i),
    })); // Create a bunch of springs using the helpers above
    const [wrappedOrigin, setOrigin] = useSpring((i) => ({
      ...to(i),
      from: from(0),
    })); // Create a spring using the helpers above for the ORIGIN

    // ========================================================================== //
    //   Handle interactions with the carousel

    const ping = typeof window !== 'undefined' && useMemo(() => new Audio(pingSound), []);
    const gestureHandler = ({
      args: [index],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity: [xVel],
      tap,
    }) => {
      // TODO: hold an accumulative value for rotation, and change it ONLY when current changes
      // we want this accumulative value inside the gesture handler to save performance

      const trigger = xVel > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      // if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      // console.log(`arg: ${index} d: ${down} delta: ${xDelta} dist: ${distance} dir: ${xDir} vel: ${xVel}`);
      // console.log(trigger);
      // alter card, i comes from the helper function passed into react-spring, which is the index of the animation
      // it is distinct from index because index is THIS card
      if (tap) {
        console.log('tapped');
      }

      if (down) {
        const x = 200 + window.innerWidth;
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        xDelta = (Math.abs(xDelta) - window.innerWidth * xVel) / 100; // relative to velocity and viewport size

        // compensate for left and right directions
        xDelta = xDir > 0 ? -xDelta : xDelta; // left or right

        const rot = curRot + xDelta;
        // individual card animations
        setCard((i) => {});
        // carousel origin animations
        console.log(
          `curRot ${curRot} rotOffset ${rot} delta: ${xDelta} dir: ${xDir} vel: ${xVel}`,
        );

        setOrigin(() => ({
          x,
          rot,
          scale,
          delay: 0,
          // config: { friction: 0, tension: down ? 800 : 200 },
        }));
        setCurRot(curRot);

        // setOrigin((i) => {
        //   const _current = slideAngle * current;
        //   const amnt = _current > prevCurrent ? -_current : _current;
        //   const rot = amnt;
        //   const scale = 0;
        //   const x = 1;
        //   return {
        //     x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        //   };
        // });
      }
      // alter carousel origin

      // reset carousel
      // if (!down && gone.size === carouselData.length) setTimeout(() => gone.clear() || setCard((i) => to(i)), 600);
    };

    // because we nest instances of this, we need to make sure implements useCallback to memoize it to the instance
    const bindGestureHandler = useGesture(
      {
        onDrag: (state) => gestureHandler(state), // set angleBounds to 360/-360
        onWheel: (state) => gestureHandler(state), // swipe.distance capped at 3 pixels of movement
        // onScroll: (state) => gestureHandler(state),
        onHover: () => {},
      },
      {
        drag: {
          threshold: 5,
          pointer: { capture: false },
          axis: 'x',
          filterTaps: true,
        },
        useScroll: {
          threshold: 5,
          pointer: { capture: false },
          axis: 'x',
          filterTaps: true,
        },
        wheel: { threshold: 5 },
      },
    ); // this function instance comes from the component key

    // ========================================================================== //
    //   effects
    const setDirection = useCallback(
      (_current, direction) => {
        // const rotAmnt = slideAngle * _current;
        // if we go left, we increment negatively -360 relative to current, if we go right, we increment positively 360 relative to current
        const rot = direction === 'left'
          ? _current == carouselData.length - 1
            ? slideAngle
            : slideAngle * Math.abs(_current - carouselData.length)
          : carouselData.length == 0
            ? -slideAngle
            : -slideAngle * _current;

        // setRotAcc(rot);

        console.log(
          `angle:${slideAngle},length: ${
            carouselData.length - 1
          }, slide:${_current}, ${direction}, Rotate: ${rot}`,
        );

        setOrigin((i) => {
          const isGone = 0; // gone.has(index);
          const scale = 1; // Active cards lift up a bit
          const x = 0;
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: { friction: 50, tension: 1 ? 800 : isGone ? 200 : 500 },
          };
        });
        setCurRot(rot);
        ping.play();

        return _current;
      },
      [current],
    );

    // ========================================================================== //
    //   effects

    const carouselRef = useRef(null);
    const makeUnselectable = (node) => {
      if (node.nodeType == 1) {
        node.setAttribute('unselectable', 'on');
      }
      let child = node.firstChild;
      while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
      }
    };
    useEffect(() => {
      makeUnselectable(carouselRef.current);
      carouselRef.current.onselectstart = () => false;
    }, []);

    // ========================================================================== //
    //   carousel
    // ========================================================================== //
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          pointerEvents: 'all',
          height: '100%',
          width: '100%',
          background: (theme) => theme.palette.text.primary,
          // borderTop: (theme) => theme.custom.borders.brandBorder,
          // py: 4,
        }}
        {...bindGestureHandler(0)}
      >
        {/* carousel container */}
        <Box
          sx={{
            // background: 'yellow',
            // 3d carousel dimensions
            py: 6,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignContent: 'center',
            width: '100%',
            pointerEvents: 'all',
            minHeight: carouselHeight || '40vh',
            perspective: 2500,
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            // configure scale so this fits properly into the users view without having to deal with associated sizing of children
            // transform: {
            //   xs: `scale(${1}) rotate(0deg) translateZ(100px)`,
            //   sm: `scale(${1}) rotate(0deg) translateZ(100px)`,
            //   md: `scale(${1}) rotate(0deg) translateZ(100px)`,
            //   lg: `scale(${1}) rotate(0deg) translateZ(100px)`,
            //   xl: `scale(${1}) rotate(0deg) translateZ(100px)`,
            // },
            transform: `scale(${1}) rotate(0deg) translateZ(100px)`,
          }}
          // listen to input events and handle them accordingly, this communicates with the springs, labeled with 'wrapped', which correspond with the data we input, and one is for the origin
        >
          {/* carousel button container */}
          <Box
            sx={{
              width: '100%',
              // left: '0%',
              px: '5%',
              maxWidth: (theme) => radius + theme.spacing(3),
              position: 'absolute',
              height: 0,
              p: 4,
              zIndex: 10,
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              // border: (theme) => theme.custom.borders.brandBorder2,
            }}
          >
            {/* go left */}
            <RegularButton
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
            />

            {/* go right */}
            <RegularButton
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
          </Box>

          <Box
            sx={{
              // background: 'red',
              // ({ cardDimension, carouselLength }) => cardDimension + 1250 + carouselLength ** 4 || 1000, // This is the perspective of the 3D circle.
              perspective: 'inherit',
              position: 'relative',
              display: 'inline-flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              width: '100%',
              height: '100%', // centers the carousel, carousel is spawned at baseline of this element
            }}
          >
            {/* the carousel origin */}
            <a.div
              ref={carouselRef}
              style={{
                pointerEvents: 'all',
                transform: interpolate(
                  [wrappedOrigin.rot],
                  (rot) => `rotateY(${rot}deg)`,
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
              {wrappedCards.map(
                (
                  {
                    // get animation values for each card
                    x,
                    y,
                    rot,
                    scale,
                  },
                  i,
                ) => {
                  const data = carouselData[i];
                  return (
                    <a.div

                      // listener to change state of this card
                      // {...bindGestureHandler(i)}
                      key={`selection-${i}-${
                        data?.key || subSectionData?.title
                      }-${Math.random()}`}
                      style={{
                        minWidth: `${slideWidth}px`,
                        width: `${slideWidth}px`,
                        backdropFilter: 'blur(25px)',
                        color: (theme) => theme.palette.text.seconary,
                        padding: 0,
                        boxShadow: 'none !important',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.spacing(2),
                        overflow: 'hidden',
                        // align rotation to fit in a circle
                        transform: `rotateY(${slideAngle * i}deg) translateZ(${gutter + radius}px)`,
                        zIndex: 5 * i + 1,
                        // handle selection/unselection
                        background: theme.palette.text.secondary,
                        ...(current === i
                          ? { opacity: 1 }
                          : current === i - 1 || current === i + 1 ? { opacity: 0.7 }
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
                        width={slideWidth}
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

        {/* nest carousels from top to bottom via children, they need eachother, this is recursive, ensure a stopping condition */}
        {/* this carousel is different for every single subsection, current powers this selection */}
        {(SubSelectionComponent && (
          <SubSelectionComponent
            // carousel dimensions
            gutter={gutter}
            carouselHeight={300}
            cardWidth={500}
            carouselData={subSectionData[current].subSectionData} // this will contain selections, and the root subSectionData for the children to base from
            key={subSectionData[current].key}
            title={subSectionData[current].headline}
            SelectionComponent={subSectionData[current].selectionComponent}
            // handle further nested carousels
            // SubSelectionComponent={subSectionData[current].subSectionData?.subSelectionComponent}
            HasContent={subSectionData[current].subSectionComponent}
          />
        ))
          || null}

        {/* note that carouselData in the childs point of view is of the parents, which is subsectionData[current].subSectionData **since its inheriting the grandfathers subsectionData** */}
        {/* props to this component are passed down below in children(), since we create it via (), we only pass a reference here */}
        {/* for a carousel, give an option for content, you see the above nested component places content here */}
        {/* current and set current, correspond to a parent WITH children, if they dont, they wont have a current/setCurrent to correspond */}
        {(HasContent && (
          <HasContent
            key="content component"
            current={current} // edit parents selection if needed
            setCurrent={setCurrent} // this is the NESTED selection carousels setCurrent
            contentData={carouselData[current]}
          />
        )
        ) || null}
      </Box>
    );
  },
  (prevProps, nextProps) =>
    // console.log(prevProps, nextProps);
    prevProps.carouselData !== nextProps.carouselData
    || prevProps.subSectionData !== nextProps.subSectionData,
);
