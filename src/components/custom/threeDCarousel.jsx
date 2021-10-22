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
import React, { useEffect } from 'react';
import { hexToAlpha } from '../../store/theme.js';
import { usePrevious } from '../util/customHooks.jsx';
import { RegularButton, SecondaryButton, ThirdButton } from './customButton';

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
    width: 320,
    // margin: '100 auto 0 auto',
    height: 350,
    margin: theme.spacing(2, 'auto'),
    position: 'relative',
    // overflowY: 'hidden',
    perspective: 1000, // This is the perspective of the 3D circle.
    transform: 'scale(.5)',
  },
  // root container, this is tilted to tilt the entire carousel, rotate to position to selected card
  carousel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transformOrigin: 'center',
    // animation: '$rotate360 60s linear infinite',
  },
  slide: {
    background: hexToAlpha('#5e60a8', 0.6),
    padding: 0,
    backdropFilter: 'blur(5px)',
    boxShadow: theme.custom.shadows.brandShadow,
    position: 'absolute',
    height: 300,
    width: 300,
    // height: 187,
    top: 20,
    left: 10,
    right: 10,
    display: 'flex',
    // top: '25%',
    // left: '25%',
    // width: '300px',
    // height: '187px',
  },
  media: {
    height: '100%',
    width: '100%',
  },
  itemDisplay: {
    position: 'relative',
    width: '100%',
    height: 400,
    '& > .MuiGrid-root': {
      transition: 'all .3s ease-in-out',
      border: theme.custom.borders.brandBorderSecondary,
      textAlign: 'center',
      display: 'grid',
      padding: theme.spacing(2),
    },
  },
}));

export const ThreeDCarousel = ({ carouselData, cardHeight, cardWidth }) => {
  const classes = useStyles();
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
  const gutter = cardWidth + 100;
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

  // ========================================================================== //
  //   Initial react-spring
  // ========================================================================== //
  const fixed = '';
  // `rotateZ(${4}deg) rotateX(-5deg) `;
  const [transitionProps, setTransition] = useSpring(() => ({
    // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
    to: {
      transform: `rotateY(${slideAngle * current}deg) ${fixed}`,
      transformOrigin: `center center ${gutter / 2}`,
    },
    // tells spring what the values mean and what they should start with
    from: {
      transform: `rotateY(${slideAngle * current}deg) ${fixed}`,
      transformOrigin: `center center ${gutter / 2}`,
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
    return ({ transform: `rotateY(${slideAngle * index}deg) translateZ(${430}px)`, zIndex: (5 * index) + 1 });
  }, []);

  const itemDisplay = React.useCallback(() => {
    const {
      title, description, icon, image, cta,
    } = carouselData[current];
    return (
      <Grid container xs={12} className={classes.itemDisplay}>

        {/* row 1 */}
        <Grid item xs={3}>
          Category
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" color="inherit" align="center" component="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          icon
        </Grid>

        {/* row 2 */}
        <Grid item xs={7}>
          <Typography
            variant="body2"
            color="inherit"
            component="p"
            align="left"
          >
            {description}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <ThirdButton onClick={(e) => {
            e.preventDefault();
            setCurrent(current === carouselData.length ? 0 : current + 1);
          }}
          >
            {cta}
          </ThirdButton>
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      <div className={classes.wrapper}>
        {computeCarousel()}
        <a.div className={classes.carousel} style={transitionProps}>
          {carouselData.map((data, index) => {
            const {
              title, image, alt, description, icon,
            } = data;

            return (
              <>
                <Card
                  className={classes.slide}
                  style={{ ...computeTransform(index), opacity: current === index ? 1 : 0.3 }}
                  onClick={() => {
                    setCurrent(index);
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
              </>
            );
          })}
        </a.div>
      </div>
      {itemDisplay()}
    </>
  );
};
