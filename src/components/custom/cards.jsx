import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import { Star } from '@material-ui/icons';
import { navigate } from 'gatsby';
// import { grass, styledContentBox } from '../../../static/svgs/hardcoded-svgs';

import TiltPhaseSix from './reactTilt';
// import { leafComponent, flowerComponent } from "./imagery"
import { RegularButton, RegularButton } from './customButton';

// create jss styles to be used in the following component via const classes=useStyles()
const cardStyles = makeStyles((theme) => ({
  // carousel styling
  carouselHeading: {
    fontWeight: 'bolder',
    color: theme.palette.text.secondary,
    margin: 'auto',
    width: '100%',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(16),
  },
  // carousel styling
  section: {
    // background: theme.palette.background.primary,
    // boxShadow: theme.custom.shadows.brand,
    borderRadius: theme.custom.borders.brandBorderRadius,
    userSelect: 'none',
    '& .react-multi-carousel-list': {
      height: '100%', // 400px
      overflow: 'visible',
      '& .react-multi-carousel-track': {
        height: '100%',
        '& li': {
          width: '100% !important',
        },
      },
      '& .react-multiple-carousel__arrow': {
        // marginLeft: '-100px',
        background: '#DCF15B',
        border: theme.custom.borders.brandBorderSecondary,
        boxShadow: theme.custom.shadows.brand,
        '&:hover': {
          boxShadow: '0px 0px 0px transparent',
        },
        color: theme.palette.text.primary,
        '&::before': { color: 'currentColor' },
      },
    },
  },
  // custom card styling
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    background: 'rgba(255,255,255,.6)',
    borderRadius: theme.custom.borders.brandBorderRadius2,
    textAlign: 'left',
    // paddingTop: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    padding: theme.spacing(4),
    boxShadow: theme.custom.shadows.brand,
    height: '100%',
    display: 'grid',
    border: theme.custom.borders.brandBorder,
    color: theme.palette.background.button, // rating stars inherit this
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.complex,
    }),
  },
  // same as service card except on mobile it takes full width
  expandedCard: {
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
    transition: theme.transitions.create(
      ['all'],
      {
        duration: theme.transitions.duration.complex,
      },
    ),
  },
  expand: {
    transform: 'rotate(0deg)',
    width: '100%',
    margin: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardHeader: {},
  roundCardImage: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    maxHeight: '200px',
    minWidth: '200px',
    margin: 'auto',
    borderBottom: theme.custom.borders.brandBorder,
    height: '100%',
    borderRadius: theme.custom.borders.brandBorderRadius,
    top: 0,
    pointerEvents: 'none',
    display: 'block',
    position: 'relative',
    boxShadow: theme.custom.shadows.brandBig,
  },
  cardImage: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    maxHeight: '200px',
    minHeight: '200px',
    minWidth: '200px',
    margin: 'auto',
    borderBottom: theme.custom.borders.brandBorder,
    height: '100%',
    borderRadius: theme.custom.borders.brandBorderRadius,
    top: 0,
    pointerEvents: 'none',
    display: 'block',
    position: 'relative',
    boxShadow: theme.custom.shadows.brandBig,
  },
  perspectiveModifier: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '200px',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },
  perspectiveModifierInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: theme.spacing(6),
    position: 'relative',
    transition: theme.transitions.create(
      ['all'],
      {
        duration: theme.transitions.duration.complex,
      },
    ),
  },
  cardActions: {
    display: 'inline-flex',
    marginTop: theme.spacing(12),
  },
  collapse: {
    transition: theme.transitions.create(
      ['all'],
      {
        duration: theme.transitions.duration.complex,
      },
    ),
  },
  cardTypography: {
    color: theme.palette.text.primary,
    position: 'relative',
    height: '100%',
  },

  // blog card styling
  blogCard: {
    border: theme.custom.borders.brandBorderSecondary,
    background: 'rgba(255,255,255,.3)',
    boxShadow: '0px 0px 0px transparent',
    margin: 'auto',
    textAlign: 'center',
    borderRadius: theme.custom.borders.brandBorderRadius,
    padding: theme.spacing(2),

    '&:hover': {
      boxShadow: theme.custom.shadows.brand,
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),
    },

    // effect
    marginLeft: -theme.spacing(0),
    marginBottom: -theme.spacing(0),
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),

    // responsivity
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    // overrides
    '& .MuiGrid-item': {
      margin: '0px',
    },
  },
  blogCardMedia: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    minWidth: '80%',
    maxWidth: '80%',
    margin: 'auto',
    borderBottom: theme.custom.borders.brandBorder,
    height: '100%',
    borderRadius: theme.custom.borders.brandBorderRadius,
    top: 0,
    pointerEvents: 'none',
    display: 'block',
    position: 'relative',
    boxShadow: theme.custom.shadows.brandBig,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 0px transparent',
    },
  },
  blogCardActions: { padding: theme.spacing(2) },
  blogCardContent: {
    padding: theme.spacing(2),
    width: '100%',
  },
  blogTypography: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '100%',
    textAlign: 'left',
  },
  blogSectionHeading: {
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
    width: '100%',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(16),
  },
  blogHeading: {
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
    width: '100%',
    textAlign: 'left',
  },
  blogGridSection: {
    margin: theme.spacing(12),
  },
}));

const CustomCard = React.memo((props) => {
  const classes = cardStyles();

  // default to empty object or null in the case these props are not used/defined
  const {
    image = {},
    expanded = false,
    index = {},
    cardHeader = {},
    cardContent = {},
    cardActions = {},
    cardMedia = {},
    children = {},
    data = [],
  } = props;

  // 3d persepctive
  const persepctiveModifierOptions = {
    max: 10,
    perspective: 1000,
    scale: 1.05,
  };

  return (
    <TiltPhaseSix
      key={data.title + index}
      options={persepctiveModifierOptions}
      className={classes.perspectiveModifier}
    >
      <Card {...props} className={classes.card} elevation={0}>
        <Grid container>
          <Grid item>
            {cardHeader && cardHeader}
            {cardMedia && (
              <TiltPhaseSix
                key={data.title + index}
                // disabled={!expanded[index]}
                className={classes.perspectiveModifierInner}
              >
                {cardMedia}
              </TiltPhaseSix>
            )}
          </Grid>
          {/* expand animation handled by collapse */}
          <Grid item>
            <Collapse in={expanded} className={classes.collapse}>
              <CardContent className={classes.cardContent}>
                {cardContent && cardContent}
              </CardContent>
            </Collapse>
          </Grid>
          <Grid item>
            <CardActions className={classes.cardActions}>
              {cardActions && cardActions}
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </TiltPhaseSix>
  );
});

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

export const CardCarousel = React.memo(({ carouselData, title, id }) => {
  const classes = cardStyles();

  const ratingStars = React.useCallback((rating, index) => Array.from(Array(rating).keys()).map((i) => (
    <Star key={`${i}rating-star`} />
  )), []);

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

  return (
    <section id={id} className={classes.section}>
      <Typography
        variant="h2"
        gutterBottom
        align="left"
        className={classes.carouselHeading}
      >
        {title && title}
      </Typography>
      {/* <div className="d-flex flex-wrap justify-content-center"> */}
      <Carousel responsive={carouselProps}>
        {carouselData.map((data, index) => (
          <CustomCard
            title={data.title}
            image={data.image}
            expanded={expanded[index]}
            index={index}
            key={`${data.title}customCard${index}`}
            cardContent={(
              <>
                {data.rating && (
                  <div className="d-flex position-relative">
                    {ratingStars(data.rating, index)}
                  </div>
                )}
                <Typography
                  variant="body2"
                  align="left"
                  color="textSecondary"
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
              <CardActions style={{ marginTop: '-65px', zIndex: 25 }}>
                <RegularButton onClick={() => handleExpandClick(index)}>
                  Read more
                </RegularButton>
                {data.project && (
                  <RegularButton onClick={() => routeToBlog(data.project || '/')}>
                    View project
                  </RegularButton>
                )}
              </CardActions>
            )}
            cardMedia={(
              <CardMedia
                component="img"
                className={classes[data.imageType || 'cardImage']}
                src={data.image}
                title={data.image}
              />
            )}
          />
        ))}
      </Carousel>
    </section>
  );
});

export const BlogPostCard = React.memo((props) => {
  const classes = cardStyles();
  const {
    title = 'default',
    data = {},
    size,
    cardMedia = {},
    cardHeader = {},
    cardContent = {},
    avatarImg = {},
  } = props;

  const isAlt = size != 12;
  const altSize = size == 12 ? 6 : 12;

  return (
    <Grid container item xs={size} key={data.title + Math.random()}>
      {/* headlined blog post */}
      <Card className={classes.blogCard} {...props}>
        <CardHeader
          avatar={(
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={avatarImg && avatarImg}
            >
              AJ
            </Avatar>
          )}
          // action={
          //     <IconButton aria-label="settings">
          //         <MoreVertIcon />
          //     </IconButton>
          // }
        />
        <CardContent className={classes.blogCardContent}>
          <Grid container>
            {/* blog post content */}
            <Grid item xs={altSize} style={{ order: isAlt ? 1 : 0 }}>
              {/* header */}
              <Typography
                variant="h3"
                align="left"
                className={classes.blogHeading}
              >
                {data.title}
              </Typography>
              {/* subheader */}
              <Typography
                variant="h4"
                gutterBottom
                align="left"
                className={classes.blogHeading}
              >
                {data.title}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                align="left"
                className={classes.blogTypography}
              >
                {data.description}
              </Typography>
            </Grid>

            {/* blog post image */}
            <Grid
              onClick={() => routeToBlog(data.postsUrl)}
              item
              xs={altSize}
              style={{
                order: isAlt ? 1 : 0,
                pointerEvents: 'all',
                cursor: 'pointer',
              }}
            >
              <TiltPhaseSix
                // disabled={!expanded[index]}
                className={classes.perspectiveModifierInner}
              >
                {cardMedia && cardMedia}
              </TiltPhaseSix>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions className={classes.blogCardActions}>
          <RegularButton size="large" onClick={() => routeToBlog(data.postsUrl)}>
            Read more
          </RegularButton>
        </CardActions>
      </Card>
    </Grid>
  );
});

export const BlogGrid = ({ id, title, blogData }) => {
  const classes = cardStyles();

  return (
    <section id={id} className={classes.blogGridSection}>
      <Typography
        variant="h2"
        gutterBottom
        align="left"
        className={classes.blogSectionHeading}
      >
        {title}
      </Typography>
      <Grid container spacing={4} direction="row">
        {blogData.map((data, index) => (
          <BlogPostCard
            key={data.title + Math.random()}
            size={index == 0 ? 12 : 4}
            data={data}
            cardMedia={(
              <CardMedia
                component="img"
                className={classes.blogCardMedia}
                src={data.image}
                title={data.image}
                avatarImg={data.avatar}
              />
            )}
          />
        ))}
      </Grid>
    </section>
  );
};

// utility functions
export const routeToBlog = (path = '/') => {
  navigate(path, {});
};
