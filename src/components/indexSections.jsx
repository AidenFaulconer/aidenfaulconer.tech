import { makeStyles, Grid, Typography } from "@material-ui/core"
import * as React from "react"
import {
  RegularButton,
  SecondaryButton,
  ThirdButton,
} from "./custom/customButton"
import { CardCarousel } from "./custom/customCards"

import {hexToAlpha} from "../../src/store/theme"

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
    display: "block",
    position: "relative",
    // minHeight: contentHeight,
    // margin: `${theme.spacing(0)}, ${theme.spacing(0)}`,
    marginBottom: theme.spacing(3),
    boxShadow: theme.custom.shadows.brand,
    background: theme.palette.background.default,
    borderRadius: theme.custom.borders.brandBorderRadius,
    border: theme.custom.borders.brandBorderSecondary,
    overflow: "hidden",
  },

  graphic: {
    // minHeight: contentHeight,
    height: "100%",
    width: "100%",
    // background: theme.palette.primary.main,
    position: "relative",
    display: "block",
    background: theme.palette.primary.main,
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
    // minHeight: contentHeight,
    "& h1": {
      textTransform: "capitalize",
    },
    padding: theme.spacing(4),
    position: "relative",
    background: ({ bgAlt }) =>
      (bgAlt && theme.palette.background.button) ||
      hexToAlpha(theme.palette.background.default,.6),
    color: ({ bgAlt }) =>
      (bgAlt && theme.palette.text.primary.main) ||
      theme.palette.text.secondary.main,
    // borderRadius: theme.custom.borders.brandBorderRadius,
    backdropFilter: 'blur(30px)',
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
    minHeight: 300,
    maxHeight: 300,
    overflow: "hidden",
    marginBottom: -theme.spacing(2),
    boxShadow: theme.custom.shadows.brand,
    borderRadius: theme.custom.borders.brandBorderRadius,
    border: `1px solid ${theme.palette.background.button}`,
    // padding: theme.spacing(2),
  },
}))

const Descriptor = props => {
  const { title, description, ctas, xs, altButtons = 0, bgAlt = false } = props
  const classes = useStyles(bgAlt)
  return (
    <Grid
      container
      item
      md={xs || 6}
      xs={xs || 6}
      justify="space-evenly"
      alignContent="center"
      alignItems="center"
      className={classes.descriptor}
    >
      <Grid item xs={12} md={8} style={{ paddingBottom: 20 }}>
        <Typography
          color="textSecondary"
          align="left"
          gutterBottom
          style={{ marginBottom: 25 }}
          variant="h2"
        >
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          component="body"
          gutterBottom
          align="left"
        >
          {description}
        </Typography>
      </Grid>
      <Grid
        item
        justify="flex-start"
        spacing={2}
        xs={12}
        md={8}
        style={{ margin: "auto", display: "flex" }}
      >
        <Grid item xs={6}>
          {(altButtons === 0 && <RegularButton>{ctas[0]}</RegularButton>) ||
            (altButtons === 1 && (
              <SecondaryButton>{ctas[0]}</SecondaryButton>
            )) || <ThirdButton>{ctas[0]}</ThirdButton>}
        </Grid>

        <Grid item xs={6}>
          {(altButtons === 0 && <RegularButton>{ctas[1]}</RegularButton>) ||
            (altButtons === 1 && (
              <SecondaryButton>{ctas[1]}</SecondaryButton>
            )) || <ThirdButton>{ctas[1]}</ThirdButton>}
        </Grid>
      </Grid>
    </Grid>
  )
}
const Graphic = props => {
  const classes = useStyles()
  const { src, alt } = props
  return (
    <Grid item xs={6} className={classes.graphic}>
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
          <Graphic src={aboutImage} alt="About Graphic" />
          <Descriptor
            title={title}
            description={description}
            ctas={["Read More", "Book Online"]}
            altButtons
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
      <section ref={ref} className={classes.section}>
        <Grid container justify="space-between">
          <CardCarousel
            title="Languages"
            key="languages"
            carouselData={projectsData}
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
    title: "Front-End Frameworks",
    src: "",
    alt: "Front-End Frameworks",
    description: "",
    icon: "",
  },
  {
    title: "Back-end Frameworks",
    src: "",
    alt: "Back-end Frameworks",
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
            cardWidth={200}
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
          {/* <Grid item xs={7} sm={6} />
          <Grid item xs={5} sm={6} /> */}
          {/* <Grid
            container
            spacing={3}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Typography
              align="center"
              gutterBottom
              style={{ marginTop: 50, marginBottom: -15 }}
              variant="h1"
            >
              Experience
            </Typography>
          </Grid> */}
          <CardCarousel
            alt
            title="Languages"
            key="languages"
            carouselData={experienceData}
            cardHeight={150}
            cardWidth={200}
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
    const classes = useStyles()
    return (
      <section ref={ref} className={(classes.section, classes.whatDoYouNeed)}>
        <Grid item xs={12} md={5} style={{ paddingBottom: 20, margin: "auto" }}>
          <Typography
            // color="textSecondary"
            align="center"
            gutterBottom
            style={{ marginBottom: 25, marginTop: 80 }}
            variant="h2"
          >
            What type of project do you need help with?
          </Typography>
          <Typography
            // color="textSecondary"
            component="body"
            gutterBottom
            align="center"
          >
            I’ll work with you to create a new Jamstack marketing or eCommerce
            site that works towards your business goals.
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid container item xs={6} sm={6} className={classes.offerContainer}>
            <img
              alt="What Do You Need Graphic"
              className={classes.servicesImage}
              src={whatDoYouNeedImage}
            />
            <Descriptor
              xs={12}
              title="What Do You Need?"
              description="I’m a full stack developer with a passion for creating software that solves problems. I’m currently looking for a role in a team that will help me build a product that will help people in need."
              ctas={["Read More", "Book Online"]}
              altButtons={2}
            />
          </Grid>
          <Grid container item xs={6} sm={6} className={classes.offerContainer}>
            <img
              alt="What Do You Need Graphic"
              className={classes.servicesImage}
              src={whatDoYouNeedImage2}
            />
            <Descriptor
              xs={12}
              title="What Do You Need?"
              description="I’m a full stack developer with a passion for creating software that solves problems. I’m currently looking for a role in a team that will help me build a product that will help people in need."
              ctas={["Read More", "Book Online"]}
              altButtons={2}
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
