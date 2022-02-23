import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  useTheme,
  Grid,
} from '@mui/material';
import { useSpring, a, config } from '@react-spring/web';
import React, { useEffect, useMemo } from 'react';
import CircleType from 'circletype';
import GraphemeSplitter from 'grapheme-splitter';
import { keyframes } from '@emotion/react';
import {
  hexToAlpha,
  pxToRem,
  SCROLL_PROPS,
  threeDHoverKeyframes,
} from '../../store/theme';
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
const carouselKeyframes = keyframes`
'@keyframes rotate360': {
      from: {
        transform: 'rotateY(0deg)',
      },
      to: {
        transform: 'rotateY(-360deg)',
      },
    },
  },
`;
const splitter = new GraphemeSplitter();

export default ({
  slidingText,
  carouselData,
  cardHeight,
  cardWidth = 600,
}) => {
  const theme = useTheme();
  // ========================================================================== //
  //     Carousel interaction
  // ========================================================================== //

  const [expanded, setExpanded] = React.useState(
    Array.from(Array(carouselData.length).keys()).map(
      (i) => /* i==0 ? true: */ false,
    ),
  );

  // set index in array to true and allow it to be toggled, while all other items remain false
  const handleExpandClick = (index) => setExpanded(
    [...Array(carouselData.length).keys()].map((i) => (i === index ? !expanded[i] : false)),
  );

  const anyExpanded = React.useCallback(
    (index) => expanded.some((e) => e),
    [expanded],
  );

  const [current, setCurrent] = React.useState(0);

  const tiltAngle = 20;
  const tiltRadians = tiltAngle * (Math.PI / 180);
  // const gutter = cardWidth + 100;
  const gutter = 0.152;
  const slideAngle = 360 / carouselData.length; // rotation increment for each slide
  //   const slideRadius = Math.round(Math.tan(slideAngle * Math.PI / 180) * slide.width / 2);

  // const [current,setCurrent] = React.useState(0)
  // const shiftSlides = React.useCallback(() => {
  //     setCurrent(current => {
  //         if (current === carouselData.length - 1) {
  //             return 0
  //         } else {
  //             return current + 1
  //         }
  //     })

  // }, [current])
  // const ref = React.useRef(null);
  // const { width } = useDimensions(ref);

  // ========================================================================== //
  //   Initial react-spring
  // ========================================================================== //
  const fixed = '';
  // `rotateZ(${4}deg) rotateX(-5deg) `;
  const [transitionProps, setTransition] = useSpring(() => ({
    // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
    to: {
      transform: `rotateY(${slideAngle * current}deg) ${fixed}`,
      // transformOrigin: `center center ${width}`,
    },
    // tells spring what the values mean and what they should start with
    from: {
      transform: `rotateY(${slideAngle * current}deg) ${fixed}`,
      // transformOrigin: `center center ${width}`,
    },
    // tell spring how the transition should be smoothed between values
    delay: '0',
    config: { ...config.gentle },
  }));

  const prevCurrent = usePrevious(current);
  const computeCarousel = React.useCallback(() => {
    // figure out how far we are from the center of the carousel using previous and current
    // const distanceFromCenter =  4 5 6 0 1 2 3 ;
    const _current = slideAngle * current;
    const amnt = _current > prevCurrent ? -_current : _current;

    // alert(`pre: ${prevCurrent}  post: ${current}  rotate: ${amnt}`);
    if (prevCurrent !== _current) {
      setTransition({
        transform: `rotateY(${amnt}deg) ${fixed}`,
      });
    }
  }, [current]);

  const computeTransform = React.useCallback((index) => {
    // translateZ(412px);
    // transform: rotateY(320deg)
    const y = 0;
    return {
      transform: `rotateY(${slideAngle * index}deg) translateZ(${
        cardWidth * (carouselData.length * gutter) || 430
      }px)`,
      zIndex: 5 * index + 1,
    };
  }, []);

  // ========================================================================== //
  // SPIN TEXT
  // ========================================================================== //
  const spinText = React.useCallback((spinText, scale = 1) => {
    // curve text
    const ref = React.useRef(null);
    let circleType = null;
    React.useEffect(() => {
      circleType = new CircleType(
        ref?.current,
        splitter.splitGraphemes.bind(splitter), // bind to this circletype method to automatically split the elements content text
      );
    }, [ref.current]);
    return (
      <Box
        item
        sx={{ ...graphicStyles }}
        style={{ transform: `scale(${scale})` }}
      >
        <h1 ref={ref} id="spinText">
          {spinText}
        </h1>
      </Box>
    );
  }, []);

  const graphicStyles = {
    borderRadius: theme.custom.borders.brandBorderRadius,
    zIndex: 0,
    width: '100%',
    // transform: 'scale(.8)',
    mb: 12,
    position: 'absolute',
    display: 'inline',
    transform: {
      xl: { scale: 0.8 },
      lg: { scale: 0.8 },
      md: { scale: 0.8 },
      sm: { scale: 0.8 },
      xs: { scale: 0.8 },
    },
    '& .spin-container': {
      transform: 'translate(-50%,-50%) scale(1)',
      left: '50%',
      top: '50%',
      fontWeight: 1000,
      position: 'absolute',
    },
    '& #spinText': {
      animation: '$rotateAngle 6s linear infinite',
      zIndex: 'inherit',
      fontWeight: 100,
    },
  };

  // ========================================================================== //
  //   carousel
  // ========================================================================== //
  return (
    <ItemDisplay
      setCurrent={setCurrent}
      current={current}
      carouselData={carouselData}
    >
      <Box
        sx={{
          // width: ({ cardDimension, carouselLength }) => cardDimension + 20 || 420,
          width: '100%',
          // margin: '100 auto 0 auto',
          height: 500,
          // minHeight: ({ cardDimension, carouselLength }) => cardDimension /* 1.5 */ || 450,
          position: 'relative',
          // minHeight: 300,
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'center',
          // top: '50%',
          // left: '50%',

          perspective: ({ cardDimension, carouselLength }) => cardDimension + 1250 + carouselLength ** 4 || 1000, // This is the perspective of the 3D circle.
          transform: {
            sm: `scale(${0.3}) rotate(45deg)`,
            lg: `scale(${0.35}) rotate(45deg)`,
            md: `scale(${0.25}) rotate(45deg)`,
            xs: `scale(${0.25}) rotate(45deg)`,
            xl: `scale(${0.15}) rotate(45deg)`,
          },
        }}
      >
        {/* {spinText('CREATE OUTSIDE THE BOX ✍', 6)} */}
        {computeCarousel()}
        <a.div
          style={{
            ...transitionProps,
            position: 'absolute',
            width: '100%',
            // overflow: 'hidden',
            height: '100%',
            transformStyle: 'preserve-3d',
            // transformOrigin: `center center ${transformOrigin}px}`,
            transformOrigin: 'center center 400px}',
            // animation: '$rotate360 60s linear infinite',
            // [theme.breakpoints.down('xl')]: {
            //   transformOrigin: 'center center 30px',
            // },
            // [theme.breakpoints.down('lg')]: {
            //   transformOrigin: 'center center 30px',
            // },
            // [theme.breakpoints.down('md')]: {
            //   transformOrigin: 'center center 50px',
            // },
            // [theme.breakpoints.down('sm')]: {
            //   transformOrigin: 'center center 30px',
            // },
          }}
        >
          {carouselData.map((data, index) => {
            const {
              title, image, alt, description, icon,
            } = data;
            const ping = useMemo(() => new Audio(pingSound), []);

            return (
              <Card
                key={title + index}
                sx={{
                  // background: hexToAlpha(theme.palette.text.primary, 1),
                  padding: 0,
                  border: theme.custom.borders.brandBorder,
                  // backdropFilter: 'blur(10px)',
                  boxShadow: 'none !important',
                  position: 'absolute',
                  height: ({ cardDimension, carouselLength }) => cardDimension || 400,
                  width: ({ cardDimension, carouselLength }) => cardDimension || 400, // + 50,
                  // height: 187,
                  // top: 20,
                  // left: 10,
                  // right: 10,
                  display: 'flex',
                  // top: '25%',
                  // left: '25%',
                  // width: '300px',
                  // height: '187px',
                }}
                style={{
                  ...computeTransform(index),
                  ...(current === index
                    ? { opacity: 1, background: theme.palette.text.secondary }
                    : {
                      opacity: 0.6,
                      background: hexToAlpha(
                        theme.palette.text.secondary,
                        0.6,
                      ),
                    }),
                }}
                onClick={() => {
                  setCurrent(index);
                  ping.play();
                  //   + `rotateZ(${400 * current}deg)`
                  //   + `rotateX(-5deg) translateZ(${420}px)`
                }}
              >
                <CardMedia
                  sx={{
                    height: '100%',
                    width: '100%',
                    transform: 'rotate(-45deg)',
                  }}
                  image={image}
                  title={title}
                  component="img"
                  height={cardHeight}
                />
              </Card>
            );
          })}
        </a.div>

        <div
          style={{
            width: '100%',
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RegularButton
            type="special"
            icon={{ enabled: true, type: 'arrow' }}
            style={{ transform: 'rotate(180deg)' }}
            onClick={(e) => {
              if (current !== carouselData.length) setCurrent(current + 1);
              else e.preventDefault();
            }}
          >
            {'>'}
          </RegularButton>
          <RegularButton
            type="special"
            icon={{ enabled: true, type: 'arrow' }}
            onClick={(e) => {
              if (current !== carouselData.length) setCurrent(current - 1);
              else e.preventDefault();
            }}
          >
            {'<'}
          </RegularButton>
        </div>
      </Box>
    </ItemDisplay>
  );
};

const ItemDisplay = ({
  children, current, carouselData, setCurrent,
}) => {
  const {
    title,
    description,
    icon,
    image,
    cta,
    category = '',
  } = carouselData[current];
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        alignContent: 'space-between',
        borderBottom: 0,
        width: '100%',
        color: (theme) => theme.palette.text.primary,
        '& > .MuiGrid-root': {
          transition: 'all .3s ease-in-out',
          border: (theme) => theme.custom.borders.brandBorder,
          borderLeft: 0,
          borderRight: 0,
          textAlign: 'center',
          display: 'grid',
          alignContent: 'center',
          padding: 3,
        },
      // padding: theme.spacing(2),
      }}
    >
      {children}

      <Grid
        item
        xs={6}
        style={{
          maxHeight: 150,
          borderRight: theme.custom.borders.brandBorder,
        }}
      >
        <Typography color="inherit" align="left" variant="h2" component="h2">
          {title}
        </Typography>
      </Grid>

      <Grid
        item
        xs={6}
        style={{ maxHeight: 150, display: 'inline-flex', alignItems: 'center' }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.5296 18.7598L26.5996 15.5698V6.42978C26.5964 6.23802 26.5382 6.05123 26.4318 5.89166C26.3254 5.73208 26.1754 5.60647 25.9996 5.52978L18.4996 2.07978C18.368 2.01886 18.2247 1.9873 18.0796 1.9873C17.9346 1.9873 17.7912 2.01886 17.6596 2.07978L10.1596 5.52978C9.98603 5.61011 9.83913 5.73854 9.73633 5.89983C9.63353 6.06112 9.57914 6.24851 9.57961 6.43978V15.5798L2.67961 18.7598C2.50603 18.8401 2.35913 18.9685 2.25633 19.1298C2.15353 19.2911 2.09914 19.4785 2.09961 19.6698V29.4498C2.09914 29.641 2.15353 29.8284 2.25633 29.9897C2.35913 30.151 2.50603 30.2794 2.67961 30.3598L10.1796 33.8098C10.3112 33.8707 10.4546 33.9023 10.5996 33.9023C10.7447 33.9023 10.888 33.8707 11.0196 33.8098L18.0996 30.5498L25.1796 33.8098C25.3112 33.8707 25.4546 33.9023 25.5996 33.9023C25.7447 33.9023 25.888 33.8707 26.0196 33.8098L33.5196 30.3598C33.6932 30.2794 33.8401 30.151 33.9429 29.9897C34.0457 29.8284 34.1001 29.641 34.0996 29.4498V19.6698C34.101 19.4796 34.0481 19.293 33.9471 19.1318C33.8462 18.9706 33.7013 18.8416 33.5296 18.7598V18.7598ZM25.6096 21.9998L20.4996 19.6698L25.6096 17.3198L30.7196 19.6698L25.6096 21.9998ZM24.6096 15.5598L18.1696 18.5598V10.8698C18.2902 10.8644 18.4087 10.8373 18.5196 10.7898L24.5996 7.99978V15.5798L24.6096 15.5598ZM18.0996 4.07978L23.2096 6.42978L18.0996 8.77978L12.9996 6.42978L18.0996 4.07978ZM10.5996 17.3098L15.7096 19.6598L10.5996 21.9998L5.48961 19.6698L10.5996 17.3098ZM17.0996 28.7998L10.5996 31.7998V24.1098C10.7392 24.1015 10.8754 24.064 10.9996 23.9998L17.0796 21.1998L17.0996 28.7998ZM32.0996 28.7998L25.6396 31.7998V24.1098C25.7655 24.0962 25.8877 24.0589 25.9996 23.9998L32.0796 21.1998L32.0996 28.7998Z" />
            </svg>`,
          }}
          style={{
            borderRadius: '100%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            border: '1px solid currentColor',
          }}
        />
        <b>Category:</b>
        {` ${category}`}
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          borderBottom: 'none',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            alignContent: 'flex-start',
            display: 'flex',
            height: 210,
            maxHeight: 310,
          }}
        >
          <Typography
            variant="body1"
            color="inherit"
            component="body1"
            align="left"
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
