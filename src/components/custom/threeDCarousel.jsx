import {
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  CardActions,
  useTheme,
  Grid,
} from '@material-ui/core';
import { useSpring, a, config } from '@react-spring/web';
import React, { useEffect, useMemo } from 'react';
import CircleType from 'circletype';
import GraphemeSplitter from 'grapheme-splitter';
import {
  hexToAlpha, pxToRem, SCROLL_PROPS, threeDHoverKeyframes,
} from '../../store/theme.js';
import { usePrevious, useDimensions } from '../util/customHooks.jsx';
import { RegularButton, SecondaryButton, ThirdButton } from './customButton';

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
export const useStyles = makeStyles((theme) => ({
  ...{
    '@keyframes rotate360': {
      from: {
        transform: 'rotateY(0deg)',
      },
      to: {
        transform: 'rotateY(-360deg)',
      },
    },
  },
  // wrapper size, and hardcoded translateZ all correlate to a ratio to be z aligned
  wrapper: {
    // width: ({ cardDimension, carouselLength }) => cardDimension + 20 || 420,
    width: '100%',
    // margin: '100 auto 0 auto',
    minHeight: ({ cardDimension, carouselLength }) => cardDimension /* 1.5 */ || 450,
    position: 'relative',
    // minHeight: 300,
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    // top: '50%',
    // left: '50%',

    perspective: ({ cardDimension, carouselLength }) => cardDimension + 1250 + carouselLength ** 4 || 1000, // This is the perspective of the 3D circle.
    [theme.breakpoints.down('xl')]: {
      transform: `scale(${0.35}) rotate(45deg)`,
    },
    [theme.breakpoints.down('lg')]: {
      transform: `scale(${0.15}) rotate(45deg)`,
    },
    [theme.breakpoints.down('md')]: {
      transform: `scale(${0.3}) rotate(45deg)`,
    },
    [theme.breakpoints.down('sm')]: {
      transform: `scale(${0.25}) rotate(45deg)`,
    },
  },
  // root container, this is tilted to tilt the entire carousel, rotate to position to selected card
  carousel: {
    position: 'absolute',
    width: '100%',
    // overflow: 'hidden',
    height: '100%',
    transformStyle: 'preserve-3d',
    transformOrigin: ({ transformOrigin }) => `center center ${transformOrigin}px}`,
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
  },
  slide: {
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
  },
  media: {
    height: '100%',
    width: '100%',
    transform: 'rotate(-45deg)',
  },
  itemDisplay: {
    position: 'relative',
    alignContent: 'space-between',
    borderBottom: 0,
    width: '100%',
    color: theme.palette.text.primary,
    '& > .MuiGrid-root': {
      transition: 'all .3s ease-in-out',
      border: theme.custom.borders.brandBorder,
      borderLeft: 0,
      borderRight: 0,
      textAlign: 'center',
      display: 'grid',
      alignContent: 'center',
      padding: theme.spacing(3),
      // padding: theme.spacing(2),
    },
  },
  ...threeDHoverKeyframes,
  graphic: {
    borderRadius: theme.custom.borders.brandBorderRadius,
    zIndex: 0,
    width: '100%',
    // transform: 'scale(.8)',
    marginBottom: theme.spacing(12),
    position: 'absolute',
    display: 'inline',
    [theme.breakpoints.down('xl')]: {
      transform: `scale:  ${0.8}`,
    },
    [theme.breakpoints.down('lg')]: {
      transform: `scale:  ${0.8}`,
    },
    [theme.breakpoints.down('md')]: {
      transform: `scale:  ${0.7}`,
    },
    [theme.breakpoints.down('sm')]: {
      transform: `scale:  ${0.7}`,
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
      // copied from theme for H1
      // [theme.breakpoints.down('xl')]: {
      //   fontSize: pxToRem(65 + 5),
      // },
      // [theme.breakpoints.down('lg')]: {
      //   fontSize: pxToRem(60 + 15),
      // },
      // [theme.breakpoints.down('md')]: {
      //   fontSize: pxToRem(50 + 20),
      // },
      // [theme.breakpoints.down('sm')]: {
      //   fontSize: pxToRem(25 + 15),
      // },
    },
  },
}));

const splitter = new GraphemeSplitter();
export const ThreeDCarousel = ({
  slidingText, carouselData, cardHeight, cardWidth = 600,
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

  const anyExpanded = React.useCallback((index) => expanded.some((e) => e), [
    expanded,
  ]);

  const [current, setCurrent] = React.useState(0);

  const tiltAngle = 20;
  const tiltRadians = tiltAngle * (Math.PI / 180);
  // const gutter = cardWidth + 100;
  const gutter = 0.152;
  const slideAngle = 360 / carouselData.length;// rotation increment for each slide
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

  const classes = useStyles({ cardDimension: cardWidth, carouselLength: carouselData.length, transformOrigin: (cardWidth * (carouselData.length * gutter)) * 2 });

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

  const computeTransform = React.useCallback((index) => { // translateZ(412px);
    // transform: rotateY(320deg)
    const y = 0;
    return ({ transform: `rotateY(${slideAngle * index}deg) translateZ(${cardWidth * (carouselData.length * gutter) || 430}px)`, zIndex: (5 * index) + 1 });
  }, []);

  // ========================================================================== //
  // SPIN TEXT
  // ========================================================================== //
  const spinText = React.useCallback((spinText, scale = 1) => {
  // curve text
    const ref = React.useRef(null);
    let circleType = null;
    React.useEffect(() => {
      circleType = new CircleType(ref?.current,
        splitter.splitGraphemes.bind(splitter), // bind to this circletype method to automatically split the elements content text
      );
    }, [ref.current]);
    return (
      <>
        <div item className={classes.graphic} style={{ transform: `scale(${scale})` }}>

          <h1 ref={ref} id="spinText">
            {spinText}
          </h1>
        </div>
      </>
    );
  }, []);

  return (
    <ItemDisplay setCurrent={setCurrent} current={current} carouselData={carouselData}>
      <div
        className={classes.wrapper}
      >
        {spinText('CREATE OUTSIDE THE BOX ✍', 2.5)}
        {computeCarousel()}
        <a.div
          className={classes.carousel}
          style={transitionProps}
        >
          {carouselData.map((data, index) => {
            const {
              title, image, alt, description, icon,
            } = data;
            const ping = useMemo(() => new Audio(pingSound), []);

            return (
              <Card
                key={title + index}
                className={classes.slide}
                style={{ ...computeTransform(index), ...(current === index ? ({ opacity: 1, background: theme.palette.text.secondary }) : ({ opacity: 0.6, background: hexToAlpha(theme.palette.text.secondary, 0.6) })) }}
                onClick={() => {
                  setCurrent(index);
                  ping.play();
                  //   + `rotateZ(${400 * current}deg)`
                  //   + `rotateX(-5deg) translateZ(${420}px)`
                }}
              >
                <CardMedia
                  className={classes.media}
                  image={image}
                  title={title}
                  component="img"
                  height={cardHeight}
                />
              </Card>
            );
          })}
        </a.div>
      </div>
    </ItemDisplay>
  );
};

const ItemDisplay = ({
  children, current, carouselData, setCurrent,
}) => {
  const {
    title, description, icon, image, cta, category = '',
  } = carouselData[current];
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid
      container
      className={classes.itemDisplay}
    >

      {/* row 1 title */}
      <Grid item xs={6} style={{ maxHeight: 150, borderRight: theme.custom.borders.brandBorder }}>
        <Typography
          variant="h2"
          color="inherit"
          align="center"
          component="h3"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} style={{ maxHeight: 150 }}>

        Category
        {category}
      </Grid>
      {/* carousel */}
      {children}

      {/* row 2 details / carousel nav */}
      <Grid
        item
        xs={12}
        style={{ borderBottom: 'none' }}
      >

        <Typography color="inherit" variant="h3" align="left" gutterBottom>
          {`About ${title}`}
        </Typography>
        {/* description */}
        <Grid
          item
          xs={12}
          style={{
            alignContent: 'center', display: 'grid', height: 310, maxHeight: 310,
          }}
        >
          <Typography
            variant="body1"
            color="inherit"
            component="p"
            align="left"
          >
            {description}
          </Typography>
        </Grid>

        {/* carousel nav */}
        <Grid
          item
          container
          justify="space-between"
          alignContent="center"
          style={{ marginTop: theme.spacing(2) }}
        >
          <ThirdButton
            style={{ transform: 'rotate(180deg)' }}
            onClick={(e) => {
              if (current !== carouselData.length) setCurrent(current + 1);
              else e.preventDefault();
            }}
          >
            {cta}
          </ThirdButton>
          <ThirdButton onClick={(e) => {
            if (current !== carouselData.length) setCurrent(current - 1);
            else e.preventDefault();
          }}
          >
            {cta}
          </ThirdButton>
        </Grid>
      </Grid>

    </Grid>
  );
};
