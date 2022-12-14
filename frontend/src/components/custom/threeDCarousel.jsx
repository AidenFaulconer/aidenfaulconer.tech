/* eslint-disable no-param-reassign */
import {
  Box, Grid, useTheme,
} from '@mui/material';
import {
  useSpring,
  a,
  to,
  useSprings,
  interpolate,
} from '@react-spring/web';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useWindowSize } from 'react-use-breakpoints';
import { Howl } from 'howler';
import {
  usePrevious, useManyGestures,
} from '../util/customHooks';

import { useStore } from '../../store/store';
import { Selection, IllustrationSelection } from './carousel/selection';
import { CtaImage, CtaList } from './carousel/content';
import Contact from '../forms/contact';
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

export default React.memo(
  ({
    // this section
    _radius = 0,
    carouselData,
    gutter = 0.04,
    key = 'default',
    cardWidth = 350,
    carouselHeight = 250,
    carouselLevel = 0,
    SelectionComponent = IllustrationSelection, // component used for selection
    // sub section
    parentData = {
      setParentCurrent: () => {},
      setParentDirection: () => {},
      calculateNext: () => {},
      parentCurrent: 0,
    },
    subSectionData,
    SubSelectionComponent = CtaImage, // component used for current submost selections content
    HasContent = false, // tells component we have children to render with THIS instance of the component
    // if ever wanted
    children,
  }) => {
    // hooks
    const theme = useTheme();
    const windowSize = useWindowSize();// detect resize
    const containerRef = useRef(null);// ref used for the carousel
    const contentRef = useRef(null);// ref used for the scroll back and  behaviour

    const [containerDimensions, setContainerDimensions] = React.useState({ width: 0, height: 0 });
    const [current, setCurrent] = React.useState(0);
    const [curRot, setCurRot] = React.useState(0);

    // properties
    const length = carouselData?.length;
    const offsetLen = carouselData.length - 1;
    const carouselID = carouselData[0].key;
    const radius = ((containerDimensions.width) / 2) - (gutter * 2);
    const zOrigin = -containerDimensions.width;
    const slideWidth = ((radius * 2) / (length / Math.PI));
    const slideAngle = 360 / length; // rotation increment for each slide

    // handling sizing
    useEffect(() => {
      // cap the width at 1250
      const { clientWidth, clientHeight } = containerRef.current;
      const width = clientWidth > 1250 ? 1250 : clientWidth;
      const height = clientHeight > 1250 ? 1250 : clientHeight;

      setContainerDimensions({
        width: width - gutter,
        height: height - gutter,
      });
    }, [windowSize, containerRef]);

    // expose setCurrent method to store (only for topmost level)
    useEffect(() => {
      // if top level carousel control
      if (carouselLevel === 0) {
        useStore.setState((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            methods: {
              ...state.appContext.methods,
              // eslint-disable-next-line no-use-before-define
              setCurrent: (args) => setCurrent(setDirection(args)),
            },
          },
        }));
      }
    }, []);

    useEffect(() => {
      if (carouselLevel === 0 && current === offsetLen) {
      } else if (current === offsetLen) {
        // console.log(`set parent ${parentData.calculateNext(-1)}`);
        parentData.setCurrent(parentData.setDirection(parentData.calculateNext(-1)));
      }
    }, [parentData.current, current]);

    // #region For custom components associated with sub-content
    const componentReference = {
      CtaImage,
      CtaList,
      Selection,
      Contact,
      IllustrationSelection,
    };

    const renderContent = React.useCallback((componentRef) => {
      const ContentComponent = componentReference[componentRef || 'SelectionContent'];
      return (
        <Box
          className="w-full h-full mt-3"
          sx={{
            // transform: 'preserve-3d',
            // transform: `rotate(${slideAngle * i}deg) translateZ(${radius}px)`,
            gridArea: 'content',
            perspective: 'inherit',
            perspectiveOrigin: `50% ${carouselLevel > 0 && -(carouselLevel * 100)}px`,
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
    }, [current]);
    // #endregion

    // #region   Handle interactions/animation with the carousel by taking the gestures offset and multiply by the angle
    const ping = typeof window !== 'undefined' && useMemo(
      () => new Howl({ src: './assets/portfolio/interaction-sound.mp3' }), // use howl.js for audio to prevent the dreaded **you must interact with the page to play audio**
      [],
    );
    const to = (i) => ({
      x: 0, rot: slideAngle * i, y: i * -4, scale: 1, delay: i * 100,
    });
    const from = (i) => ({
      x: 0, rot: slideAngle * i, scale: 1.5, y: -1000,
    });

    // we need two springs, one wraps all the carousel cards, another wraps the ORIGIN of the carousel
    const [wrappedCards, setCard] = useSprings(length, (i) => ({
      ...to(i),
      from: from(i),
    })); // Create a bunch of springs using the helpers above

    const [wrappedOrigin, setOrigin] = useSpring((i) => ({
      ...to(i),
      from: from(0),
    })); // Create a spring using the helpers above for the ORIGIN
    // #endregion

    // #region carousel rotation and slide logic
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    // TODO: this needs cleanup, its hacked together look at all those conditions???!!
    const calcSlideRotation = (dir, next = 0) => {
      // same slide do nothing
      if (next === current) { return curRot; }
      const incrementAmount = length % Math.abs(next - current);
      const incrementByOne = incrementAmount === 0 || incrementAmount === 1;
      let res;
      if (incrementByOne) {
        res = curRot + (dir * slideAngle);
      } else {
        res = next * (dir * slideAngle);
      }
      // console.log(`rotation ${res} for ${current}->${next} incrementByOne ${incrementByOne}`);
      return res;
    };

    // TODO: this needs cleanup, its hacked together look at all those conditions???!!
    const determineDirection = (next) => {
      let res;
      // we must invert the equation when transitioning to the end or beginning
      // we offset by 1 to account for 0 in the equation (breaks everything)
      if ((next === 0 && current === offsetLen) || (next === offsetLen && current === 0)) {
        res = (next + 1) - (current + 1) > 0 ? 1 : -1;
      } else {
        res = (current + 1) - (next + 1) > 0 ? 1 : -1;
      }
      // console.log(`right ${res === -1}, left ${res === 1}`);
      return res;
    };

    const setDirection = useCallback(
      (next) => {
        const rot = calcSlideRotation(determineDirection(next), next);
        setOrigin(() => ({
          x: 0, rot, scale: 1, delay: undefined, config: { friction: 50, tension: 500 },
        }));
        setCurRot(rot);
        ping.play();
        return next;
      },
      [current],
    );

    const determineOpacity = useCallback((i) => {
      let res;
      if (current === i) {
        // selection
        res = { opacity: 1 };
      } else if (current === i - 1 || current === i + 1) {
        // 1 away from selection
        res = { opacity: 0.9 };
      } else if ((current % offsetLen === 0) && (i % offsetLen === 0)) {
      // highlight end or beginning if current is at the end or beginning
        res = { opacity: 0.3, pointerEvents: 'none' };
      } else {
        // other
        res = { opacity: 0.3, pointerEvents: 'none' };
      }
      return res;
    }, [current]);

    const calculateNext = (direction) => {
      let res;
      if (direction === 1) {
        res = current === 0 ? offsetLen : current - 1;
      } else {
        res = current === offsetLen ? 0 : current + 1;
      }
      return res;
    };

    const gestureHandler = ({
      // args: [index],
      delta: [xdel, ydel],
      direction: [xdir, ydir],
      velocity: [xvel, yvel],
      movement: [xmov, ymov],
      memo: pre = [false, curRot],
      down,
      dragging,
      scrolling,
      wheeling,
      cancel,
      active,
      shiftKey,
      ctrlKey,
      altKey,
    }) => {
      if (xdir === 0) xdir = 1; // no movement/ assume right
      const dragSpeed = 0.025;
      const scrollSpeed = 0.05;
      const thresholdOffset = dragging ? 15 : 25;

      // eslint-disable-next-line prefer-const
      let [stop, activeRot] = pre;
      const slideThresholdRight = (curRot + slideAngle) - thresholdOffset;
      const slideThresholdLeft = (curRot - slideAngle) + thresholdOffset;

      // FOR TOUCH
      if (dragging) {
        const amnt = (activeRot + ((xmov * dragSpeed)));
        activeRot = clamp(amnt, slideThresholdLeft, slideThresholdRight);
      }
      // FOR SCROLL
      if (scrolling || wheeling && shiftKey || ctrlKey || altKey) {
        const amnt = (activeRot + ((-ymov * scrollSpeed)));
        activeRot = clamp(amnt, slideThresholdLeft, slideThresholdRight);
      }

      // console.log(`active rot ${activeRot}, cur rot ${curRot}, active rot ${activeRot} direction ${xdir}`);

      // DETERMINE TO SELECT SLIDE OR NOT exit if we change slides
      if ((activeRot === slideThresholdLeft) && !stop) {
        setCurrent(setDirection(calculateNext(-1)));
        // to stop any more slide triggers, flush the activeRot
        pre[0] = true;
        pre[1] = curRot;
        if (dragging)cancel();
        return pre;
      } if (activeRot === slideThresholdRight && !stop) {
        setCurrent(setDirection(calculateNext(1)));
        // to stop any more slide triggers, flush the activeRot
        pre[0] = true;
        pre[1] = curRot;
        if (dragging)cancel();
        return pre;
      }

      setOrigin(() => ({
        rot: active ? activeRot : curRot, scale: active && down ? 1.1 : 1, delay: 0, immediate: active,
      }));

      // maintain a reference to the active rotation **not the same as the carousels set rotation (curRot)**
      pre[1] = activeRot;
      return pre;
    };

    const bindGestureHandler = useManyGestures({
      onScroll: (state) => gestureHandler(state), // disable scroll ability if we have scrolled through the entire carousel
      onDrag: (state) => gestureHandler(state),
      onWheel: (state) => gestureHandler(state),
      // onHover: () => { },
      handlerConfig: {
        onDrag: {
          threshold: 10,
          pointer: { capture: false },
          axis: 'x',
          // filterTaps: true,
          delay: true,
        },
        useScroll: {
          threshold: 10,
          pointer: { capture: false },
          axis: 'y',
          // filterTaps: true,
        },
        onWheel: {
          threshold: 10,
          pointer: { capture: false },
          axis: 'y',
          // filterTaps: true,
        },
      },
    });
    // #endregion

    return (
      <Grid
        ref={contentRef}
        container
        className="relative flex mx-auto items-stretch justify-start w-full min-h-[90vh]  max-w-[960px]"
      >
        {/* carousel container w controls */}
        <Box
          id={`carousel-container-${carouselLevel}`}
          ref={containerRef}
          // bind top level here
          {...bindGestureHandler(0)}
          className="relative flex justify-center flex-col content-center w-full"
          sx={{
            gridArea: `Slider-${carouselID}`,
            background: (theme) => theme.palette.text.primary,
            pointerEvents: 'all',
            height: carouselHeight,
            perspective: 2500,
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            userDrag: 'none',
            userSelect: 'none',
          }}
        >
          {/* carousel container w carousel */}
          <Box
            unselectable="on"
            className="relative inline-flex justify-center w-full self-center items-center "
            sx={{
              perspective: 'inherit',
              perspectiveOrigin: `50% ${carouselLevel > 0 && -(carouselLevel * 100)}px`,
              transform: `scale(${0.7}) translateY(${-carouselLevel * 35}px)`,
              height: carouselHeight, // centers the carousel, carousel is spawned at baseline of this element
            }}
          >
            {/* the carousel origin */}
            <a.div
              className="cursor-pointer flex items-center justify-center self-center absolute z-[5]"
              style={{
                pointerEvents: 'all',
                transform: interpolate(
                  [wrappedOrigin.rot, wrappedOrigin.scale],
                  (rot, scale) => `rotateY(${rot}deg) scale(${scale})`,
                ),
                transformStyle: 'preserve-3d',
                height: cardWidth / 6,
                width: cardWidth / 6,
                transformOrigin: `center 50% ${zOrigin}`,
              }}
            >
              {/* carousel panels */}
              {/* // get animation values for each card */}
              {wrappedCards.map(({
                x, y, rot, scale,
              }, i) => {
                const data = carouselData[i];
                return (
                  <a.div
                    key={`selection-${i}-${data?.key || subSectionData?.title}-${Math.random()}`}
                    className="absolute flex items-center content-center overflow-hidden p-2"
                    style={{
                      minWidth: `${slideWidth}px`,
                      width: `${slideWidth}px`,
                      maxHeight: `${carouselHeight}px`,
                      // backdropFilter: 'blur(25px)',
                      color: theme.palette.text.seconary,
                      borderRadius: theme.spacing(1),
                      border: theme.custom.borders.brandBorder,
                      // align rotation to fit in a circle
                      transform: `rotateY(${slideAngle * i}deg) translateZ(${radius}px)`,
                      zIndex: 5 * i + 1,
                      // handle selection/unselection
                      background: theme.palette.text.secondary,
                      ...determineOpacity(i),
                    }}
                    onClick={() => setCurrent(setDirection(i))}
                  >
                    <span className="absolute top-4 left-4">{i}</span>
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
              })}
            </a.div>
          </Box>
        </Box>

        {/* additional Carousels */}
        {/* nest carousels from top to bottom via children, they need eachother, this is recursive, ensure a stopping condition */}
        {/* this carousel is different for every single subsection, current powers this selection */}
        {(SubSelectionComponent && (
          <SubSelectionComponent
            carouselLevel={carouselLevel + 1}
            // carousel dimensions
            gutter={gutter}
            carouselHeight={carouselHeight / 1.75}
            cardWidth={cardWidth}
            carouselData={subSectionData[current].subSectionData} // this will contain selections, and the root subSectionData for the children to base from
            key={subSectionData[current].key}
            title={subSectionData[current].headline}
            SelectionComponent={componentReference[subSectionData[current].selectionComponent]}
            // handle further nested carousels
            parentData={{
              setCurrent,
              setDirection,
              calculateNext,
              current,
            }}
            SubSelectionComponent={componentReference[subSectionData[current].subSelectionComponent] || null}
            HasContent={subSectionData[current].HasContent}
          />
        )) || null}

        {/* note that carouselData in the childs point of view is of the parents, which is subsectionData[current].subSectionData **since its inheriting the grandfathers subsectionData** */}
        {/* props to this component are passed down below in children(), since we create it via (), we only pass a reference here */}
        {/* for a carousel, give an option for content, you see the above nested component places content here */}
        {/* current and set current, correspond to a parent WITH children, if they dont, they wont have a current/setCurrent to correspond */}
        {(HasContent && (renderContent(HasContent))) || null}
      </Grid>
    );
  },
  (pre, next) => pre.carouselData !== next.carouselData
    || pre.subSectionData !== next.subSectionData || pre.parentCurrent !== next.parentCurrent,
);

//  {/* carousel button container */}
//   {/* <Box
//   className="z-10 p-4 h-0 abaoluste px-[5%] w-full xs:none xl:inline-flex justify-between items-center self-center"
//     sx={{
//       maxWidth: (theme) => radius + theme.spacing(3),
//       // border: (theme) => theme.custom.borders.brandBorder2,
//     }}
//   > */}
//   {/* go left */}
//   {/* <RegularButton
//       type="secondary"
//       icon={{ enabled: true, type: 'arrow' }}
//       style={{
//         transform: 'rotate(180deg)',
//       }}
//       onClick={(e) => {
//         setCurrent(
//           setDirection(
//             current == 0 ? length : current - 1,
//             'left',
//           ),
//         );
//       }}
//     /> */}

//   {/* go right */}
//   {/* <RegularButton
//       type="secondary"
//       icon={{ enabled: true, type: 'arrow' }}
//       onClick={(e) => {
//         setCurrent(
//           setDirection(
//             current == length  ? 0 : current + 1,
//             'right',
//           ),
//         );
//       }}
//     />
//   </Box> */}
