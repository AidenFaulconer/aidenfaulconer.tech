import { makeStyles, Grid, Typography } from "@material-ui/core"
import * as React from "react"
import {
  RegularButton,
  SecondaryButton,
  ThirdButton,
} from "./custom/customButton"
import { CardCarousel } from "./custom/customCards"

import { hexToAlpha, transition } from "../../src/store/theme"

// ========================================================================== //
// Typography
// ========================================================================== //
import aboutImage from "../../static/assets/portfolio/about.png"
import languagesImage from "../../static/assets/portfolio/languages.png"
import whatDoYouNeedImage from "../../static/assets/portfolio/website.png"
import whatDoYouNeedImage2 from "../../static/assets/portfolio/lots.png"

// const contentHeight = 550
const useStyles = makeStyles(theme => ({
  section: {
    // minHeight: contentHeight,
    display: "block",
    position: "relative",
    marginBottom: theme.spacing(12),
    boxShadow: theme.custom.shadows.brand,
    background: theme.palette.background.default,
    border: theme.custom.borders.brandBorderSecondary,
    borderRadius: theme.custom.borders.brandBorderRadius,
    // margin: `${theme.spacing(0)}, ${theme.spacing(0)}`,
    overflow: "hidden",
  },

  graphic: {
    width: "100%",
    height: "100%",
    display: "block",
    position: "relative",
    // minHeight: contentHeight,
    // background: theme.palette.primary.main,
    background: ({ bgAlt }) =>
      bgAlt ? theme.palette.text.primary : theme.palette.text.secondary,

    "& img": {
      display: "inline-block",
      height: "100%",
      width: "100%",
      position: "relative",
      objectFit: "contain",
      minWidth: 300,
      minHeight: 300,
      maxHeight: 500,
      padding: theme.spacing(6),
    },
  },
  descriptor: {
    position: "relative",
    padding: theme.spacing(4),
    backdropFilter: "blur(30px)",
    borderRadius: ({ rounded }) =>
      rounded ? theme.custom.borders.brandBorderRadius : 0,
    "& h1": {
      textTransform: "capitalize",
    },
    border: ({ border }) =>
      border ? theme.custom.borders.brandBorderSecondary : null,
    // borderRadius: theme.custom.borders.brandBorderRadius,
    color: ({ bgAlt }) =>
      bgAlt ? theme.palette.text.secondary : theme.palette.text.primary,
    background: ({ bgAlt }) =>
      bgAlt === 2
        ? theme.palette.background.button
        : bgAlt === 1
        ? theme.palette.text.primary
        : theme.palette.background.default,
  },
  typography: {
    color: ({ bgAlt }) =>
      bgAlt === 2
        ? theme.palette.background.button
        : bgAlt === 1
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
  },
  experienceContainer: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    margin: `${theme.spacing(4)}px,${-theme.spacing(4)}px !important`,
  },
  whatDoYouNeed: {
    marginTop: 80,
    // marginLeft: `${-23}px !important`,
    // marginRight: `${-23}px !important`,
    padding: theme.spacing(6, 6),
    borderRadius: theme.custom.borders.brandBorderRadius,
    background: theme.palette.background.button,
  },
  offerContainer: {
    borderRadius: theme.custom.borders.brandBorderRadius,
    overflow: "hidden",
  },
  servicesImage: {
    display: "inline-block",
    height: "100%",
    width: "100%",
    position: "relative",
    objectFit: "cover",
    minWidth: 300,
    minHeight: 350,
    maxHeight: 300,
    overflow: "hidden",
    marginBottom: -theme.spacing(4),
    marginTop: theme.spacing(6),
    boxShadow: theme.custom.shadows.brand,
    borderRadius: theme.custom.borders.brandBorderRadius,
    border: theme.custom.borders.brandBorderSecondary,
    // padding: theme.spacing(2),
    zIndex: 0,
    transition,
    "&:hover": {
      transition,
      marginTop: -theme.spacing(10),
    },
  },
}))

const Descriptor = props => {
  const {
    title,
    description,
    ctas,
    xs,
    altButtons = 0,
    bgAlt = false,
    border = false,
    rounded = false,
  } = props
  const classes = useStyles({ bgAlt, border, rounded })
  return (
    <Grid
      container
      item
      md={xs || 6}
      xs={xs || 12}
      justify="space-evenly"
      alignContent="center"
      alignItems="center"
      className={classes.descriptor}
    >
      <Grid item xs={12} md={9} style={{ paddingBottom: 20 }}>
        <Typography
          color="inherit"
          align="left"
          gutterBottom
          style={{ marginBottom: 25 }}
          variant="h2"
        >
          {title}
        </Typography>
        <Typography color="inherit" component="body" gutterBottom align="left">
          {description}
        </Typography>
      </Grid>
      <Grid
        item
        justify="flex-start"
        spacing={2}
        xs={12}
        md={9}
        style={{ margin: "auto", display: "flex" }}
      >
        <Grid item xs={6}>
          {ctas[0] &&
            ((altButtons === 0 && <RegularButton>{ctas[0]}</RegularButton>) ||
              (altButtons === 1 && (
                <SecondaryButton>{ctas[0]}</SecondaryButton>
              )) || <ThirdButton color="textPrimary">{ctas[0]}</ThirdButton>)}
        </Grid>

        <Grid item xs={6}>
          {ctas[1] &&
            ((altButtons === 0 && <RegularButton>{ctas[1]}</RegularButton>) ||
              (altButtons === 1 && (
                <SecondaryButton>{ctas[1]}</SecondaryButton>
              )) || <ThirdButton color="textPrimary">{ctas[1]}</ThirdButton>)}
        </Grid>
      </Grid>
    </Grid>
  )
}
const Graphic = props => {
  const { src, alt, bgAlt = false } = props
  const classes = useStyles({ bgAlt })
  return (
    <Grid item xs={12} md={6} className={classes.graphic}>
      <img alt={alt} src={src} />
    </Grid>
  )
}

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()
    const description =
      "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs"
    const title = "Creative, adaptive, diversified"

    return (
      <section ref={ref} className={classes.section}>
        <Grid container justify="space-between" spacing={12}>
          <Graphic src={aboutImage} alt="About Graphic" bgAlt />
          <Descriptor
            title={title}
            description={description}
            ctas={["Read More", "Book Online"]}
            bgAlt={1}
            altButtons={0}
          />
        </Grid>
        <Experience />
      </section>
    )
  })
)
// ========================================================================== //
// Projects
// ========================================================================== //
const projectsData = [
  {
    title: "Blog 1",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "Blog 1",
    src: "",
    alt: "Blog 1",
    description: "",
    icon: "",
  },
  {
    title: "Blog 1",
    src: "",
    alt: "Blog 1",
    description: "",
    icon: "",
  },
  {
    title: "Blog 1",
    src: "",
    alt: "Blog 1",
    description: "",
    icon: "",
  },
  {
    title: "Blog 1",
    src: "",
    alt: "Blog 1",
    description: "",
    icon: "",
  },
]
const Projects = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()
    return (
      <section
        ref={ref}
        className={(classes.section, classes.experienceContainer)}
      >
        <Grid container justify="space-between">
          <CardCarousel
            title="Languages"
            key="languages"
            carouselData={projectsData}
            alt
            cardHeight={150}
            cardWidth={200}
          />
        </Grid>
      </section>
    )
  })
)
// ========================================================================== //
// Languages
// ========================================================================== //
const languageData = [
  {
    title: "JavaScript",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "C#",
    src: "",
    alt: "C#",
    description: "",
    icon: "",
  },
  {
    title: "Python",
    src: "",
    alt: "Python",
    description: "",
    icon: "",
  },
  {
    title: "Front-End",
    src: "",
    alt: "Front-End",
    description: "",
    icon: "",
  },
  {
    title: "Office",
    src: "",
    alt: "Office",
    description: "",
    icon: "",
  },
  {
    title: "Business accumen",
    src: "",
    alt: "Business accumen",
    description: "",
    icon: "",
  },
  {
    title: "Interpersonal",
    src: "",
    alt: "Interpersonal",
    description: "",
    icon: "",
  },
]
const Languages = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()

    const title = "Any Language, Any Framework"
    const description =
      "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs"

    return (
      <section ref={ref} className={classes.section}>
        <Grid container spacing={12}>
          <Descriptor
            title={title}
            description={description}
            ctas={["Read More", "Book Online"]}
            altButtons
          />
          <Graphic src={languagesImage} alt="Language Graphic" />
        </Grid>
        <Grid container spacing={3}>
          <CardCarousel
            title="Languages"
            key="languages"
            carouselData={languageData}
            cardHeight={150}
            cardWidth={150}
          />
        </Grid>
      </section>
    )
  })
)
// ========================================================================== //
// Contact
// ========================================================================== //
const Contact = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()
    return (
      <section ref={ref} className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={7} sm={6} />
          <Grid item xs={5} sm={6} />
        </Grid>
      </section>
    )
  })
)
// ========================================================================== //
// Experience
// ========================================================================== //
const experienceData = [
  {
    title: "Australian War Memorial",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "Recovery VR",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "Freelance",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "Mentoras",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "Railgun",
    src: "",
    alt: "JavaScript",
    description: "",
    icon: "",
  },
]
const Experience = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()
    return (
      <section
        ref={ref}
        className={(classes.section, classes.experienceContainer)}
      >
        <Grid container spacing={3}>
          <CardCarousel
            alt
            title="Languages"
            key="languages"
            carouselData={experienceData}
            cardHeight={125}
            cardWidth={250}
          />
        </Grid>
      </section>
    )
  })
)

// ========================================================================== //
// WhatDoYouNeed
// ========================================================================== //
const WhatDoYouNeed = React.memo(
  React.forwardRef((props, ref) => {
    const bgAlt = 0
    const classes = useStyles({ bgAlt })
    const description = (
      <ul>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
      </ul>
    )
    return (
      <section ref={ref} className={(classes.section, classes.whatDoYouNeed)}>
        <Grid
          item
          xs={12}
          md={5}
          style={{ paddingBottom: 20, margin: "auto" }}
          className={classes.typography}
        >
          <Typography
            color="inherit"
            variant="h2"
            gutterBottom
            align="center"
            style={{ marginTop: 80 }}
          >
            What type of project do you need help with?
          </Typography>
          <Typography
            color="inherit"
            component="body"
            gutterBottom
            align="center"
          >
            I’ll work with you to create a new Jamstack marketing or eCommerce
            site that works towards your business goals.
          </Typography>
        </Grid>
        <Grid container spacing={6}>
          <Grid container item xs={6} sm={6} className={classes.offerContainer}>
            <Grid item xs={12} sm={12}>
              <Typography
                color="inherit"
                variant="h2"
                align="center"
                style={{ marginTop: 25 }}
                className={classes.typography}
              >
                Website
              </Typography>
              <Typography
                color="inherit"
                variant="h3"
                align="center"
                className={classes.typography}
              >
                From: $6,000
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <img
                alt="What Do You Need Graphic"
                className={classes.servicesImage}
                src={whatDoYouNeedImage}
              />
            </Grid>

            <Descriptor
              xs={12}
              // title="What Do You Need?"
              description={description}
              ctas={["Book Online"]}
              altButtons={1}
              border
              bgAlt={bgAlt}
              rounded
            />
          </Grid>
          <Grid container item xs={6} sm={6} className={classes.offerContainer}>
            <Grid item xs={12} sm={12}>
              <Typography
                color="inherit"
                variant="h2"
                align="center"
                style={{ marginTop: 25 }}
                className={classes.typography}
              >
                Design
              </Typography>
              <Typography
                color="inherit"
                variant="h3"
                align="center"
                className={classes.typography}
              >
                From: $300-$3000
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <img
                alt="What Do You Need Graphic"
                className={classes.servicesImage}
                src={whatDoYouNeedImage2}
              />
            </Grid>

            <Descriptor
              xs={12}
              // title="What Do You Need?"
              description={description}
              ctas={["Book Online"]}
              altButtons={1}
              border
              bgAlt={bgAlt}
              rounded
            />
          </Grid>
        </Grid>
      </section>
    )
  })
)

export {
  About,
  Projects,
  Languages,
  Contact,
  Descriptor,
  Experience,
  WhatDoYouNeed,
}
