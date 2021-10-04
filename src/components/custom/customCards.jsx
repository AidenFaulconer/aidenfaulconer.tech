import * as React from "react"
import { alpha, makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  Grid,
  Icon,
} from "@material-ui/core"
import Carousel from "react-multi-carousel"
import { Star } from "@material-ui/icons"
import { navigate } from "gatsby"

import shadows from "@material-ui/core/styles/shadows"
import TiltPhaseSix from "./reactTilt"
import { GoldButton, RegularButton, SecondaryButton, ThirdButton } from "./customButton"

import quoteGraphic from "../../../static/assets/exploration.png"

// ========================================================================== //
// default card dimensions
// ========================================================================== //

// default dimensions
const cardDimensions = {
  width: 200,
  height: 200,
}
const blogCardDimensions = {
  width: 200,
  height: 200,
}

// ========================================================================== //
// blog card styles
// ========================================================================== //
const blogCardStyles = makeStyles(theme => ({
  // blog card styling
  featuredBlog: {
    background: theme.palette.background.hero,
  },
  blogCard: {
    margin: "auto",
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
    background: "rgba(255,255,255,.6)",
    border: theme.custom.borders.brandBorderSecondary,
    maxHeight: ({ cardHeight }) => cardHeight || "100%",
    borderRadius: theme.custom.borders.brandBorderRadius,
    minWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    minHeight: ({ cardHeight }) => cardHeight || cardDimensions.height,
    // minHeight: ({ cardHeight }) => (cardHeight || '100%'),
    boxShadow: theme.custom.shadows.brandBig,
    "&:hover": {
      boxShadow: "0px 0px 0px transparent",
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),
    },
    // effect
    marginLeft: -theme.spacing(0),
    marginBottom: -theme.spacing(0),
    transition: theme.transitions.create(
      ["color", "box-shadow", "background", "margin", "border"],
      { duration: "0.3s", easing: "ease-in-out" }
    ),

    // responsivity
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
  },
  // card content
  blogTypography: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    textAlign: "left",
  },
  blogHeading: {
    fontWeight: "bolder",
    color: theme.palette.text.primary,
    width: "100%",
    textAlign: "left",
  },
  avatar: {
    color: theme.palette.text.primary,
    background: theme.palette.background.hero,
  },
  blogCardActions: { padding: theme.spacing(2) },
  blogCardContent: {
    padding: theme.spacing(2),
    width: "100%",
  },
}))

// ========================================================================== //
// card styles
// ========================================================================== //
const customCardStyles = makeStyles(theme => ({
  // custom card styling
  card: {
    minHeight: ({ cardHeight }) => cardHeight || cardDimensions.height,
    minWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    maxWidth: ({ cardWidth }) => cardWidth || cardDimensions.width,
    // maxHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // minHeight: ({ cardHeight }) => (cardHeight || '100%'),
    // height: "100%",
    
    background: ({ alt }) => (alt && theme.palette.primary.main) || "none",
    color: ({ alt }) =>
    (alt && theme.palette.primary.main) || theme.palette.secondary.main, // rating stars inherit this
    
    borderRadius: theme.custom.borders.brandBorderRadius,
    textAlign: "left",
    // margin: theme.spacing(3),
    // padding: theme.spacing(1),
    marginBottom: theme.spacing(6),
    // boxShadow: theme.custom.shadows.brand,
    display: "grid",
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.complex,
    }),
    "& .MuiGrid-item": {
      margin: 0,
    },
  },
  // same as service card except on mobile it takes full width
  expandedCard: {
    order: 0,
    position: "relative",
    margin: "auto",
    height: "100%",
    borderRadius: theme.custom.borders.brandBorderRadius,
    boxShadow: "none",
    background: theme.palette.background.primary,
    padding: theme.spacing(3),
    border: theme.custom.borders.brandBorder,
    "&:hover": {
      boxShadow: theme.custom.shadows.brand,
    },
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.complex,
    }),
  },
  expand: {
    transform: "rotate(0deg)",
    width: "100%",
    margin: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardHeader: {
    fontWeight: 1000,
    textTransform: "uppercase",

    // color: theme.palette.text.primary,
    color: ({ alt }) =>
      (alt && theme.palette.secondary.main) || theme.palette.primary.main, // rating stars inherit this

    width: "100%",
    minHeight: 50,
    textAlign: "left",
  },
  perspectiveModifier: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "200px",
    position: "relative",
    marginBottom: "10px",
    alignItems: "center",
  },
  perspectiveModifierInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "relative",
    marginBottom: "10px",
    alignItems: "center",
  },
  cardContent: {
    marginTop: theme.spacing(3),
    position: "relative",
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.complex,
    }),
  },
  cardActions: {
    marginTop: `${theme.spacing(1)}px`,
    zIndex: 25,
    padding: 0,
    display: "inline-flex",
  },
  collapse: {
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.complex,
    }),
  },
  cardTypography: {
    color: theme.palette.text.primary,
    position: "relative",
    height: "100%",
  },
}))

// ========================================================================== //
// parent card components styles
// ========================================================================== //

// create jss styles to be used in the following component via const classes=useStyles(), used in top level components for card griding, ie carousel and blog grid for instance
const genericStyles = makeStyles(theme => ({
  // carousel styling
  carouselHeading: {
    fontWeight: "bolder",
    color: ({ color }) => color || theme.palette.text.secondary,
    margin: "auto",
    width: "100%",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(7),
  },

  // injected card styles

  blogCardMedia: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    minWidth: "80%",
    maxWidth: "80%",

    width: ({ width }) =>
      width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    minHeight: ({ height }) =>
      height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),
    height: ({ height }) =>
      height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),

    margin: "auto",
    borderBottom: theme.custom.borders.brandBorder,
    borderRadius: theme.custom.borders.brandBorderRadius,
    top: 0,
    pointerEvents: "none",
    display: "block",
    position: "relative",
    objectFit: "none",
    boxShadow: theme.custom.shadows.brandBig,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 0px transparent",
    },
  },
  cardImage: {
    // minHeight: ({ height }) => (height),
    minWidth: ({ width }) =>
      width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    width: ({ width }) =>
      width - theme.spacing(4) || cardDimensions.width - theme.spacing(4),
    minHeight: ({ height }) =>
      height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),
    height: ({ height }) =>
      height - theme.spacing(4) || cardDimensions.height - theme.spacing(4),

    // background: theme.palette.background.button,
    top: 0,
    margin: "auto",
    borderRadius: theme.custom.borders.brandBorderRadius,
    pointerEvents: "none",
    display: "inline-block",
    position: "relative",
    // boxShadow: theme.custom.shadows.brandInset,
    filter: `drop-shadow(${theme.custom.shadows.filterShadow})`,
  },
  cardIcon: {
    borderRadius: "100%",
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
    userSelect: "none",
    width: '100%',
    "& .react-multi-carousel-list": {
      height: "100%", // 400px
      overflow: "visible",
      // ========================================================================== //
      //       Carousel styles
      // ========================================================================== //
      "& .react-multi-carousel-track": {
        height: "100%",
        display: "flex",
        "& li": {
          width: "100% !Important",
          // listStyle: "hiragana",
          height: 'fit-content',
          listStyle: "none",
          listStylePosition: "inside",
          // width: ({ width }) => (width || cardDimensions.width),
        },
      },
      "& .react-multiple-carousel__arrow": {
        "&::after": {
          content: "",
          display: "block",
          width: "200%",
          height: "200%", 
          background: theme.palette.background.default,
        },
        // marginLeft: '-100px',
        border: theme.custom.borders.brandBorderSecondary,
        marginTop: `-${theme.spacing(6) * 9.3}px`,
        "&:hover": {
          boxShadow: "0px 0px 0px transparent",
        },
        color: theme.palette.text.primary,
        "&::before": { color: "currentColor" },
      },
    },
  },
  blogSectionHeading: {
    fontWeight: "bolder",
    color: theme.palette.text.primary,
    width: "100%",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(16),
  },
  blogGridSection: {
    paddingBottom: theme.spacing(12),
    margin: "auto",
    // overrides
    "& * > .MuiGrid-item": {
      margin: "0px",
    },
  },
}))

// ========================================================================== //
// Route path util
// ========================================================================== //
export const routeToBlog = (path = "/") => {
  navigate(path, {})
}

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
)

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
}

// ========================================================================== //
// card carousel
// ========================================================================== //
export const CardCarousel = React.memo(
  ({
    carouselData,
    title,
    id,
    cardWidth = cardDimensions.width,
    cardHeight = cardDimensions.height,
    color,
    subtitle,
    alt,
  }) => {
    const classes = genericStyles({
      width: cardWidth,
      height: cardHeight,
      color: color || "",
      alt,
    })

    // interaction
    const [expanded, setExpanded] = React.useState(
      Array.from(Array(carouselData.length).keys()).map(
        i => /* i==0 ? true: */ false
      )
    )
    // set index in array to true and allow it to be toggled, while all other items remain false
    const handleExpandClick = index =>
      setExpanded(
        [...Array(carouselData.length).keys()].map(i =>
          i === index ? !expanded[i] : false
        )
      )

    const anyExpanded = React.useCallback(index => expanded.some(e => e), [
      expanded,
    ])

    const carouselProperties = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: carouselData.length,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: carouselData.length,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: carouselData.length,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: carouselData.length,
      },
    }

    return (
      <section id={id} className={classes.section}>
        {/* <div className="d-flex flex-wrap justify-content-center"> */}
        <Carousel responsive={carouselProperties}>
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
                  ""
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
              cardContent={
                <>
                  <Typography
                    variant="body2"
                    align="left"
                    color="textPrimary"
                    component="p"
                    className={classes.cardTypography}
                  >
                    {data.description}
                  </Typography>
                </>
              }
              cardHeader={<></>}
              /* some data into the carousel includes links to various content, here we handle the various content being passed into the custom cards */
              cardActions={
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
                    <GoldButton
                      onClick={() => routeToBlog(data.project || "/")}
                    >
                      View project
                    </GoldButton>
                  )}
                </>
              }
              cardMedia={
                <CardMedia
                  component="img"
                  className={classes.cardImage}
                  src={data.image}
                  title={data.image}
                />
              }
            />
          ))}
        </Carousel>
      </section>
    )
  }
)

// ========================================================================== //
// custom card
// ========================================================================== //
export const CustomCard = React.memo(props => {
  // default to empty object or null in the case these props are not used/defined
  const {
    rating = false,
    title = "default title",
    subheader = "",
    image = "",
    expanded = false,
    index = {},
    cardHeader = {},
    cardContent = {},
    cardActions = {},
    cardMedia = {},
    children = {},
    data = [],
    alt = false,
  } = props
  const classes = customCardStyles({
    cardWidth: props.cardWidth,
    cardHeight: props.cardHeight,
    alt: alt ? alt : false,
    // color: color ? color : "",
  })

  // 3d persepctive
  const persepctiveModifierOptions = {
    max: 10,
    perspective: 1000,
    scale: 1.05,
  }

  const ratingStars = React.useCallback(
    (rating, index) =>
      Array.from(Array(rating).keys()).map(i => (
        <Star key={`${i}rating-star`} />
      )),
    []
  )

  return ( 
      <Card {...props} className={classes.card} elevation={0}>
        <Grid container>
          {title && (
            <Typography
              variant="h4"
              align="left"
              style={{ opacity: 0.6, fontWeight: "bolder" }}
              className={classes.cardHeader}
            >
              {title}
            </Typography>
          )}
          {subheader && (
            <Typography
              variant="h4"
              gutterBottom
              align="left"
              style={{ marginBottom: "15px", marginTop: "25px" }}
              className={classes.cardHeader}
            >
              {subheader}
            </Typography>
          )}
          {rating && (
            <Grid item xs={12} sx={{ mt: 5 }}>
              <div className="d-flex position-relative">
                {ratingStars(rating, index)}
              </div>
            </Grid>
          )}

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
  )
})

// ========================================================================== //
// blog card
// ========================================================================== //
export const BlogPostCard = React.memo(props => {
  const {
    featured,
    width = cardDimensions.width,
    height = cardDimensions.height,
    title = "default",
    data = {},
    size,
    cardMedia = {},
    cardHeader = {},
    cardContent = {},
    breakpointSizes = {},
    avatarImg = {},
  } = props
  const classes = blogCardStyles({ height, width })

  const isAlt = size !== 12
  const altSize = size === 12 ? 6 : 12
  return (
    <Grid container item {...breakpointSizes} key={data.title + Math.random()}>
      {/* headlined blog post */}
      <Card className={classes.blogCard} {...props}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={avatarImg && avatarImg}
            >
              AJ
            </Avatar>
          }
        />
        <CardContent className={classes.blogCardContent}>
          <Grid container justifyContent="flex-start">
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
              {/* <Typography
                variant="h4"
                gutterBottom
                align="left"
                className={classes.blogHeading}
              >
                {data.subheader}
              </Typography> */}
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
              onClick={() => routeToBlog(data.postUrl)}
              item
              xs={altSize}
              style={{
                order: isAlt ? 1 : 0,
                pointerEvents: "all",
                cursor: "pointer",
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
          <GoldButton size="large" onClick={() => routeToBlog(data.postsUrl)}>
            Read more
          </GoldButton>
        </CardActions>
      </Card>
    </Grid>
  )
})

// ========================================================================== //
// blog grid
// ========================================================================== //
export const BlogGrid = ({ cardHeight, cardWidth, id, title, blogData }) => {
  const classes = genericStyles({ cardWidth, cardHeight })

  // const { node: { id, link, uri,content,title, date, featuredImage:
  // { node: { link, sourceUri } } } } = blogData;

  return (
    <section id={id} className={classes.blogGridSection}>
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        className={classes.blogSectionHeading}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={6}
        justifyContent="flex-start"
        alignItems="center"
      >
        {blogData.map((data, index) => {
          const stripHtml = React.useCallback(
            string => `${string.slice(0, 300).replace(/(<([^>]+)>)/gi, "")}...`,
            []
          )

          // data is an edge when using graphql, data? is edge in the resulting data, and edge?.node is a blog post
          const parsedData = {
            image: data?.node?.featuredImage?.node?.sourceUrl || quoteGraphic,
            avatar: data?.node?.author?.node?.avatar?.url || "",
            // used in blog card
            title: data?.node?.title || "AJ`s gardening tips",
            description:
              stripHtml(data?.node?.content) ||
              "A post about gardening, learn more by exploring this blog post!",
            postUrl: `blog${data?.node?.uri}`,
          }

          const breakpointSizes = {
            xs: 12,
            sm: 12,
            md: index === 0 ? 12 : 6,
            lg: index === 0 ? 12 : 6,
            xl: index === 0 ? 12 : 6,
          }

          return (
            <BlogPostCard
              height={cardHeight}
              width={cardWidth}
              key={parsedData.title + Math.random()}
              breakpointSizes={breakpointSizes}
              featured={index === 0}
              data={parsedData}
              cardMedia={
                <CardMedia
                  component="img"
                  className={classes.blogCardMedia}
                  src={parsedData.image}
                  title={parsedData.image}
                  avatarImg={parsedData.avatar}
                />
              }
            />
          )
        })}
      </Grid>
    </section>
  )
}
