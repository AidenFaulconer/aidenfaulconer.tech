import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Grid,
  Icon,
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import { Star } from '@mui/icons-material';
import { navigate } from 'gatsby';

import PropTypes from 'prop-types';
import SimplexNoise from 'simplex-noise';
import { config, useSpring } from '@react-spring/core';
import { RegularButton, ThirdButton } from './buttons';

const PREFIX = 'Gridify';

const classes = {
  card: `${PREFIX}-card`,
  expandedCard: `${PREFIX}-expandedCard`,
  expand: `${PREFIX}-expand`,
  expandOpen: `${PREFIX}-expandOpen`,
  cardHeader: `${PREFIX}-cardHeader`,
  perspectiveModifier: `${PREFIX}-perspectiveModifier`,
  perspectiveModifierInner: `${PREFIX}-perspectiveModifierInner`,
  cardContent: `${PREFIX}-cardContent`,
  cardActions: `${PREFIX}-cardActions`,
  collapse: `${PREFIX}-collapse`,
  cardTypography: `${PREFIX}-cardTypography`,
};

const Root = styled('div')((
  {
    theme,
  },
) => ({
  // custom card styling
  [`& .${classes.card}`]: {
    // minHeight: ({ cardHeight }) => cardHeight || cardDimensions.height,
    // minWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    // maxWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    // maxHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // minHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // height: "100%",

    background: ({ alt }) => (alt ? theme.palette.primary.main : theme.palette.secondary),

    // all text inherit this
    color: ({ alt }) => (alt && theme.palette.secondary.main) || theme.palette.primary.main, // rating stars inherit this

    borderRadius: theme.custom.borders.brandBorderRadius,
    textAlign: 'left',
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'grid',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.complex,
    }),
    '& .MuiGrid-item': {
      margin: 0,
    },
  },

  // same as service card except on mobile it takes full width
  [`& .${classes.expandedCard}`]: {
    order: 0,
    position: 'relative',
    margin: 'auto',
    height: '100%',
    borderRadius: theme.custom.borders.brandBorderRadius,
    boxShadow: 'none',
    background: theme.palette.background.primary,
    padding: theme.spacing(3),
    border: theme.custom.borders.brandBorder,
    '&:hover': {
      boxShadow: theme.custom.shadows.brand,
    },
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
  },

  [`& .${classes.expand}`]: {
    transform: 'rotate(0deg)',
    width: '100%',
    margin: 'auto',
    color: 'inherit',
  },

  [`& .${classes.expandOpen}`]: {
    color: 'inherit',
    transform: 'rotate(180deg)',
  },

  [`& .${classes.cardHeader}`]: {
    fontWeight: 1000,
    textTransform: 'uppercase',

    // color: theme.palette.text.primary,
    color: ({ alt }) => (alt && theme.palette.secondary.main) || theme.palette.primary.main, // rating stars inherit this

    width: '100%',
    minHeight: 50,
  },

  [`& .${classes.perspectiveModifier}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '200px',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },

  [`& .${classes.perspectiveModifierInner}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },

  [`& .${classes.cardContent}`]: {
    marginTop: theme.spacing(3),
    color: 'inherit',
    position: 'relative',
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
  },

  [`& .${classes.cardActions}`]: {
    marginTop: theme.spacing(1),
    zIndex: 25,
    padding: 0,
    display: 'inline-flex',
  },

  // ========================================================================== //
  //   buggy
  // ========================================================================== //
  [`& .${classes.collapse}`]: {
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
    marginTop: '-150%',
    background: theme.palette.text.primary,
    zIndex: 25,
  },

  [`& .${classes.cardTypography}`]: {
    color: 'inherit',
    position: 'relative',
    height: '100%',
  },
}));

// ========================================================================== //
// React can be a pain if you dont define prop types for certain cases, such as complex data or passing components
// ========================================================================== //

// ========================================================================== //
// default card dimensions
// ========================================================================== //

// default dimensions
const cardDimensions = {
  width: 200,
  height: 200,
};
const blogCardDimensions = {
  width: 200,
  height: 200,
};

// ========================================================================== //
// card styles
// ========================================================================== //
const customCardStyles = styled('div')((
  {
    theme,
  },
) => ({
  // custom card styling
  [`& .${classes.card}`]: {
    // minHeight: ({ cardHeight }) => cardHeight || cardDimensions.height,
    // minWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    // maxWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    // maxHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // minHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // height: "100%",

    background: ({ alt }) => (alt ? theme.palette.primary.main : theme.palette.secondary),

    // all text inherit this
    color: ({ alt }) => (alt && theme.palette.secondary.main) || theme.palette.primary.main, // rating stars inherit this

    borderRadius: theme.custom.borders.brandBorderRadius,
    textAlign: 'left',
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'grid',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.complex,
    }),
    '& .MuiGrid-item': {
      margin: 0,
    },
  },

  // same as service card except on mobile it takes full width
  [`& .${classes.expandedCard}`]: {
    order: 0,
    position: 'relative',
    margin: 'auto',
    height: '100%',
    borderRadius: theme.custom.borders.brandBorderRadius,
    boxShadow: 'none',
    background: theme.palette.background.primary,
    padding: theme.spacing(3),
    border: theme.custom.borders.brandBorder,
    '&:hover': {
      boxShadow: theme.custom.shadows.brand,
    },
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
  },

  [`& .${classes.expand}`]: {
    transform: 'rotate(0deg)',
    width: '100%',
    margin: 'auto',
    color: 'inherit',
  },

  [`& .${classes.expandOpen}`]: {
    color: 'inherit',
    transform: 'rotate(180deg)',
  },

  [`& .${classes.cardHeader}`]: {
    fontWeight: 1000,
    textTransform: 'uppercase',

    // color: theme.palette.text.primary,
    color: ({ alt }) => (alt && theme.palette.secondary.main) || theme.palette.primary.main, // rating stars inherit this

    width: '100%',
    minHeight: 50,
  },

  [`& .${classes.perspectiveModifier}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '200px',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },

  [`& .${classes.perspectiveModifierInner}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },

  [`& .${classes.cardContent}`]: {
    marginTop: theme.spacing(3),
    color: 'inherit',
    position: 'relative',
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
  },

  [`& .${classes.cardActions}`]: {
    marginTop: theme.spacing(1),
    zIndex: 25,
    padding: 0,
    display: 'inline-flex',
  },

  // ========================================================================== //
  //   buggy
  // ========================================================================== //
  [`& .${classes.collapse}`]: {
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.complex,
    }),
    marginTop: '-150%',
    background: theme.palette.text.primary,
    zIndex: 25,
  },

  [`& .${classes.cardTypography}`]: {
    color: 'inherit',
    position: 'relative',
    height: '100%',
  },
}));

// ========================================================================== //
// parent card components styles
// ========================================================================== //

const genericStyles = styled('div')((theme) => ({
  // carousel styling
  carouselHeading: {
    fontWeight: 'bolder',
    color: ({ color }) => color || theme.palette.text.secondary,
    margin: 'auto',
    width: '100%',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(7),
  },

  // injected card styles

  blogCardMedia: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    minWidth: '80%',
    maxWidth: '80%',

    width: ({ width }) => width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    minHeight: ({ height }) => height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),
    height: ({ height }) => height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),

    margin: 'auto',
    borderBottom: theme.custom.borders.brandBorder,
    borderRadius: theme.custom.borders.brandBorderRadius,
    top: 0,
    pointerEvents: 'none',
    display: 'block',
    position: 'relative',
    objectFit: 'none',
    boxShadow: theme.custom.shadows.brandBig,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 0px transparent',
    },
  },
  cubeCardImage: {
    '& #cube': {
      height: '100%',
      width: '100%',
      minHeight: 200,
      minWidth: 200,
      transformStyle: 'preserve-3d',
    },
    '& #cube > div:first-child': {
      transform: 'rotateX(90deg) translateZ(200px)',
    },
    '& #cube > div:nth-child(2)': {
      transform: 'translateZ(200px)',
    },
    '& #cube > div:nth-child(3)': {
      transform: 'rotateY(90deg) translateZ(200px)',
    },
    '& #cube > div:nth-child(4)': {
      transform: 'rotateY(180deg) translateZ(200px)',
    },
    '& #cube > div:nth-child(5)': {
      transform: 'rotateY(-90deg) translateZ(200px)',
    },
    '& #cube > div:nth-child(6)': {
      transform: 'rotateX(-90deg) rotate(180deg) translateZ(200px)',
    },
  },
  cardImage: {
    // minHeight: ({ height }) => (height),
    textAlign: 'center',
    minWidth: ({ width }) => width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    width: ({ width }) => width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    minHeight: ({ height }) => height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),
    height: ({ height }) => height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),

    // background: theme.palette.background.button,
    top: 0,
    margin: 'auto',
    borderRadius: theme.custom.borders.brandBorderRadius,
    pointerEvents: 'none',
    display: 'inline-block',
    position: 'relative',
    border: theme.custom.borders.brandBorder,
    // boxShadow: theme.custom.shadows.brandInset,
    filter: `drop-shadow(${theme.custom.shadows.filterShadow})`,
  },
  cardIcon: {
    borderRadius: '100%',
    padding: theme.spacing(1) + 2,
    width: 44,
    opacity: 1,
    height: 44,
    background: theme.palette.background.main,
    color: theme.palette.text.secondary,
    boxShadow: theme.custom.shadows.brand,
  },

  // carousel styling
  section: {
    // background: theme.palette.background.primary,
    // boxShadow: theme.custom.shadows.brand,
    borderRadius: theme.custom.borders.brandBorderRadius,
    userSelect: 'none',
    width: '100%',
    '& .react-multi-carousel-list': {
      height: '100%', // 400px
      overflow: 'visible',
      // ========================================================================== //
      //       Carousel styles
      // ========================================================================== //
      '& .react-multi-carousel-track': {
        height: '100%',
        display: 'flex',
        paddingLeft: 0,
        '& li': {
          width: '100% !Important',
          // listStyle: "hiragana",
          height: 'fit-content',
          listStyle: 'none',
          listStylePosition: 'inside',
          // width: ({ width }) => (width || cardDimensions.width),
        },
      },
      '& .react-multiple-carousel__arrow': {
        '&::after': {
          content: '""',
          display: 'block',
          width: '200%',
          height: '200%',
          background: theme.palette.background.default,
        },
        border: theme.custom.borders.brandBorderSecondary,
        marginTop: `-calc(${theme.spacing(6)} * 9.3)`,
        '&:hover': {
          boxShadow: '0px 0px 0px transparent',
        },
        color: theme.palette.text.primary,
        '&::before': { color: 'currentColor' },
      },
    },
  },
  blogSectionHeading: {
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
    width: '100%',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(16),
  },
  blogGridSection: {
    paddingBottom: theme.spacing(12),
    margin: 'auto',
    // overrides
    '& * > .MuiGrid-item': {
      margin: '0px',
    },
  },
}));

// ========================================================================== //
// Route path util
// ========================================================================== //
export const routeToBlog = (path = '/') => {
  navigate(path, {});
};

// ========================================================================== //
// gridify
// ========================================================================== //
// for breakpoints pass an object like {{sm:3},{md:3},{xl:3}}
export const Gridify = ({ children, breakpointSizes }) => (
  <>
    {children.map((component = {}, i) => (
      <Grid key={`${i}gridify`} item {...breakpointSizes}>
        {component}
      </Grid>
    ))}
  </>
);

// add blog card variant
const carouselProps = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// ========================================================================== //
// card carousel
// ========================================================================== //
export const CardCarousel = React.memo(
  ({
    carouselData = [],
    title = '',
    id = 'card-carousel',
    cardWidth = cardDimensions.width,
    cardHeight = cardDimensions.height,
    color = 'primary',
    subtitle = '',
    alt = false,
    special = false,
  }) => {
    const classes = genericStyles({
      width: cardWidth,
      height: cardHeight,
      color: color || '',
      alt,
    });

    // interaction
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

    //   var tz = Math.round( ( cellSize / 2 ) /
    //   Math.tan( ( ( Math.PI * 2 ) / carouselData.length ) / 2 ) );
    // // or simplified to
    //   var tz = Math.round((cellSize / 2) / Math.tan(Math.PI / carouselData.length));
    //   .carousel {
    //     transform: translateZ(-288px) rotateY(-160deg);
    //   }

    const carouselProperties = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: (carouselData.length && carouselData.length + 5) || 3,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        // items:  carouselData.length && carouselData.length+5 || 3,
        items: 7,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: (carouselData.length && carouselData.length + 5) || 3,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: (carouselData.length && carouselData.length + 5) || 3,
      },
    };
    const [autoPlay, setAutoPlay] = React.useState(true);
    return (
      <section id={id} className={classes.section}>
        {/* <div className="d-flex flex-wrap justify-content-center"> */}
        <Carousel
          // ssr
          responsive={carouselProperties}
          infinite
          direction="right"
          draggable
          renderButtonGroupOutside
          arrows
          swipeable
          autoPlay={autoPlay}
          autoPlaySpeed={3000}
          pauseOnHover
          onHover={(e) => setAutoPlay(false)}
          onPointerLeave={(e) => setAutoPlay(true)}
        >
          {carouselData.map((post, index) => {
            const {
              title, metaDescription, thumbnail, path,
            } = post.node.frontmatter;

            const project = false;

            return (
              <>
                <CustomCard
                // alt={ 'alt'}
                // title={
                //   subtitle === true ? (
                //     data.icon ? (
                //       <Icon className={classes.cardIcon} fontSize="large">
                //         {data.icon.toLowerCase()}
                //       </Icon>
                //     ) : (
                //       `${index + 1}.`
                //     )
                //   ) : (
                //     title
                //   )
                // }
                  subheader={title}
                  color={color}
                  image={thumbnail}
                  expanded={expanded[index]}
                  index={index}
                  cardWidth={cardWidth}
                  // rating={data.rating}
                  cardHeight={cardHeight}
                  key={`${title}customCard${index}`}
                  cardContent={(
                    <>
                      <Typography
                        variant="body2"
                        align="left"
                        color="inherit"
                        component="p"
                        className={classes.cardTypography}
                      >
                        {metaDescription}
                      </Typography>
                    </>
                )}
                  cardHeader={<></>}
                /* some data into the carousel includes links to various content, here we handle the various content being passed into the custom cards */
                  cardActions={(
                    <>
                      {(alt && (
                      <RegularButton
                        size="small"
                        fullWidth
                        onClick={() => handleExpandClick(index)}
                      >
                        Read more
                      </RegularButton>
                      )) || (
                      <ThirdButton
                        size="small"
                        fullWidth
                        onClick={() => handleExpandClick(index)}
                      >
                        Read more
                      </ThirdButton>
                      )}
                      {project && (
                      <RegularButton
                        onClick={() => routeToBlog(`./${path}` || '/')}
                      >
                        View project
                      </RegularButton>
                      )}
                    </>
                )}
                  cardMedia={(
                    <CardMedia
                      component="img"
                      className={classes.cardImage}
                      src={thumbnail}
                      title={title}
                    />
                )}
                />
              </>
            );
          })}
        </Carousel>
      </section>
    );
  },
  (pre, post) => pre.carouselData !== post.carouselData,
);

// ========================================================================== //
// custom card
// ========================================================================== //

// generate sine wave based on index
const getSineWave = (index) => {
  const sineWave = Math.sin(index * (Math.PI / 180));
  return sineWave * 1000;
};

const generateNoise = (
  width,
  height,
  seed,
  octaves,
  persistence,
  lacunarity,
  scale,
) => {
  const noise = new SimplexNoise(seed);
  const size = width * height * 4;
  const data = new Uint8Array(size);
  for (let i = 0; i < size; i += 4) {
    const x = (i / 4) % width;
    const y = ~~(i / 4 / width);
    let value = 0;
    for (let j = 0; j < octaves; j++) {
      const frequency = Math.pow(2, j);
      const amplitude = Math.pow(persistence, j);
      value
        += noise.noise2D(x * scale * frequency, y * scale * frequency) * amplitude;
    }
    value = value * 128 + 128;
    data[i] = data[i + 1] = data[i + 2] = value;
    data[i + 3] = 255;
  }
};

export const CustomCard = React.memo(
  (props) => {
    // default to empty object or null in the case these props are not used/defined
    const {
      rating = false,
      title = 'default title',
      subheader = '',
      image = '',
      expanded = false,
      index = {},
      cardHeader = {},
      cardContent = {},
      cardActions = {},
      cardMedia = {},
      children = {},
      data = [],
      alt = false,
    } = props;
    const classes = customCardStyles({
      cardWidth: props.cardWidth,
      cardHeight: props.cardHeight,
      alt: alt || false,
      // color: color ? color : "",
    });

    // 3d persepctive
    const persepctiveModifierOptions = {
      max: 10,
      perspective: 1000,
      scale: 1.05,
    };

    const ratingStars = React.useCallback(
      (rating, index) => Array.from(Array(rating).keys()).map((i) => (
        <Star key={`${i}rating-star`} />
      )),
      [],
    );

    // function that modulates sinewave value from index over time.
    const cardRef = React.useRef(null);
    // const modulateSineWaveFromIndex = (_index = index, add = 0.1) => {
    //   // repeat this function every 5 miliseconds
    //   const interval = setInterval(() => {
    //     cardRef.current.style.marginTop = getSineWave(_index += add);
    //     console.log(cardRef.current.style.marginTop);
    //     modulateSineWaveFromIndex(add += 0.1);
    //   }, 5);
    // };

    // card hover animation
    // ========================================================================== //
    //         Trigger and animate page transitions
    // ========================================================================== //
    const _index = index;
    const [animatedStyles, triggerTransition] = useSpring(() => ({
      to: [
        { marginTop: getSineWave(_index) },
        { marginTop: getSineWave(_index + 1) },
      ],
      from: { marginTop: getSineWave(_index - 1) },
      // delay: 2000,
      immediate: true,
      loop: true,
      config: { ...config.molasses, duration: 500 },
    }));

    // {/* <TiltPhaseSix
    //   key={data.title + index}
    //   // disabled={!expanded[index]}
    //   className={classes.perspectiveModifierInner}
    // > */}

    // {/* </TiltPhaseSix> */}
    return (
      <Card
        className={classes.card}
        ref={cardRef}
        style={animatedStyles}
        elevation={0}
      >
        <Grid container justifyContent="center">
          {rating && (
            <Grid item xs={12} sx={{ mt: 5 }}>
              <Root className="d-flex position-relative">
                {ratingStars(rating, index)}
              </Root>
            </Grid>
          )}

          {cardHeader && cardHeader}
          {cardMedia && cardMedia}
          {title && (
            <Typography
              variant="h4"
              align="center"
              style={{ opacity: 0.6, fontWeight: 'bolder' }}
              className={classes.cardHeader}
            >
              {title}
            </Typography>
          )}
          {subheader && (
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ marginBottom: '15px', marginTop: '25px' }}
              className={classes.cardHeader}
            >
              {subheader}
            </Typography>
          )}

          {/* expand animation handled by collapse */}
          <Collapse in={expanded} className={classes.collapse}>
            <CardContent className={classes.cardContent}>
              {cardContent && cardContent}
            </CardContent>
          </Collapse>
          <CardActions className={classes.cardActions}>
            {cardActions && cardActions}
          </CardActions>
        </Grid>
      </Card>
    );
  },
  (pre, post) => pre !== post,
);
const ThreeDCarousel = React.memo(
  ({
    carouselData = [],
    title = '',
    id = 'card-carousel',
    cardWidth = cardDimensions.width,
    cardHeight = cardDimensions.height,
    color = 'primary',
    subtitle = '',
    alt = false,
    special = false,
  }) => {
    const carouselRef = React.useRef(null);

    // for (var i = 0; i < carousels.length; i++) {
    // 	carousel(carousels[i]);
    // }

    // function carousel(root) {
    // 	var
    // 		figure = root.querySelector('figure'),
    // 		nav = root.querySelector('nav'),
    // 		images = figure.children,
    // 		n = images.length,
    // 		gap = root.dataset.gap || 0,
    // 		bfc = 'bfc' in root.dataset,

    // 		theta =  2 * Math.PI / n,
    // 		currImage = 0
    // 	;

    // 	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    // 	window.addEventListener('resize', () => {
    // 		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width))
    // 	});

    // 	setupNavigation();

    // 	function setupCarousel(n, s) {
    // 		var
    // 			apothem = s / (2 * Math.tan(Math.PI / n))
    // 		;

    // 		figure.style.transformOrigin = `50% 50% ${- apothem}px`;

    // 		for (var i = 0; i < n; i++)
    // 			images[i].style.padding = `${gap}px`;
    // 		for (i = 1; i < n; i++) {
    // 			images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
    // 			images[i].style.transform = `rotateY(${i * theta}rad)`;
    // 		}
    // 		if (bfc)
    // 			for (i = 0; i < n; i++)
    // 				 images[i].style.backfaceVisibility = 'hidden';

    // 		rotateCarousel(currImage);
    // 	}

    // 	function setupNavigation() {
    // 		nav.addEventListener('click', onClick, true);

    // 		function onClick(e) {
    // 			e.stopPropagation();

    // 			var t = e.target;
    // 			if (t.tagName.toUpperCase() != 'BUTTON')
    // 				return;

    // 			if (t.classList.contains('next')) {
    // 				currImage++;
    // 			}
    // 			else {
    // 				currImage--;
    // 			}

    // 			rotateCarousel(currImage);
    // 		}

    // 	}

    // 	function rotateCarousel(imageIndex) {
    // 		figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    // 	}

    const classes = genericStyles({
      width: cardWidth,
      height: cardHeight,
      color: color || '',
      alt,
    });

    // interaction
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

    /*
styles to use
carousel: {
  padding: 20px;

	perspective: $viewer-distance;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	> * {
		flex: 0 0 auto;
	}
}
figure {
		margin: 0;

		width: $item-width;
		transform-style: preserve-3d;
		transition: transform 0.5s;

		img {
			width: 100%;
			box-sizing: border-box;
			padding: 0 $item-separation / 2;

			&:not(:first-of-type) {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}

*/

    return (
      <div className="carousel">
        <figure>
          {/* spawn cards */}
          {carouselData.map((data, index) => (
            <CustomCard
              alt={alt}
              title={
                subtitle === true ? (
                  data.icon ? (
                    <Icon className={classes.cardIcon} fontSize="large">
                      {data.icon.toLowerCase()}
                    </Icon>
                  ) : (
                    `${index + 1}.`
                  )
                ) : (
                  ''
                )
              }
              subheader={data.title}
              color={color}
              image={data.image}
              expanded={expanded[index]}
              index={index}
              cardWidth={cardWidth}
              rating={data.rating}
              cardHeight={cardHeight}
              key={`${data.title}customCard${index}`}
              cardContent={(
                <>
                  <Typography
                    variant="body2"
                    align="left"
                    color="inherit"
                    component="p"
                    className={classes.cardTypography}
                  >
                    {data.description}
                  </Typography>
                </>
              )}
              cardHeader={<></>}
              /* some data into the carousel includes links to various content, here we handle the various content being passed into the custom cards */
              cardActions={(
                <>
                  {(alt && (
                    <RegularButton
                      size="small"
                      fullWidth
                      onClick={() => handleExpandClick(index)}
                    >
                      Read more
                    </RegularButton>
                  )) || (
                    <ThirdButton
                      size="small"
                      fullWidth
                      onClick={() => handleExpandClick(index)}
                    >
                      Read more
                    </ThirdButton>
                  )}
                  {data.project && (
                    <RegularButton
                      onClick={() => routeToBlog(data.project || '/')}
                    >
                      View project
                    </RegularButton>
                  )}
                </>
              )}
              cardMedia={(
                <CardMedia
                  component="img"
                  className={classes.cardImage}
                  src={data.image}
                  title={data.image}
                />
              )}
            />
          ))}
        </figure>

        {/* carousel navigation */}
        <nav>
          <button className="nav prev">Prev</button>
          <button className="nav next">Next</button>
        </nav>
      </div>
    );
  },
  (pre, post) => {},
);
