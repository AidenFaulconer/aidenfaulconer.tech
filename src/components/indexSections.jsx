import { makeStyles, Grid, Typography, Box } from "@material-ui/core"
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
const useStyles = makeStyles(theme => {
  const common = {
    background: ({ bgAlt }) =>
      bgAlt ? theme.palette.text.primary : theme.palette.text.secondary,
    borderRadius: theme.custom.borders.brandBorderRadius,
  }
  const altCommon = {
    background: ({ bgAlt }) =>
      bgAlt ? theme.palette.text.secondary : theme.palette.text.primary,
    borderRadius: theme.custom.borders.brandBorderRadius,
  }
  const buttonCommon = {
    color: ({ bgAlt }) =>
      bgAlt ? theme.palette.text.secondary : theme.palette.text.primary,
    background: ({ bgAlt }) =>
      bgAlt === 2
        ? theme.palette.background.button
        : bgAlt === 1
        ? theme.palette.text.primary
        : theme.palette.background.default,
  }
  return {
    section: {
      overflow: "hidden",
      marginBottom: theme.spacing(6),
      ...common,
    },
    container: { padding: theme.spacing(3, 0) },
    graphic: {
      maxWidth: 380,
      maxHeight: 300,
      ...common,
      "& img": {
        height: "100%",
        width: "100%",
        position: "relative",
        objectFit: "contain",
      },
    },
    descriptor: {
      padding: theme.spacing(6),
      height: "100%",
      borderRadius: ({ rounded }) =>
        rounded ? theme.custom.borders.brandBorderRadius : 0,
      "& h1": {
        textTransform: "capitalize",
      },
      border: ({ border }) =>
        border ? theme.custom.borders.brandBorderSecondary : null,
      ...buttonCommon,
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
      overflow: "hidden",
    },
    whatDoYouNeed: {
      marginTop: 80,
      // marginLeft: `${-23}px !important`,
      // marginRight: `${-23}px !important`,
      padding: theme.spacing(3, 3),
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
  }
})

import { useBreakpoints } from "react-use-breakpoints"
import ThreeWrapper from "./threejs/three-wrapper"

// ========================================================================== //
// Cta text arrangement

const Descriptor = ({styleData,children}) => {
  const {
    title="",
    description="",
    ctas=[],
    altButtons = 0,
    bgAlt = false,
    border = false,
    rounded = false,
  } = styleData
  const classes = useStyles({ bgAlt, border, rounded })
  const { breakpoint } = useBreakpoints()

  return (
    <Grid
      container
      item
      alignContent="center"
      alignItems="center"
      className={classes.descriptor}
      xs={12}
    >
      {/* 
        // ========================================================================== //
        //       Blocks
        // ========================================================================== //
       */}

      {/* Headline */}
      <Grid
        item
        md={6}
        xs={12}
        alignContent="center"
        justify="center"
        style={{ padding: 20 }}
      >
        {/* Typography */}
        <Grid item style={{ paddingBottom: 20 }}>
          <Typography
            color="inherit"
            align={breakpoint === "sm" ? "center" : "left"}
            gutterBottom
            style={{ marginBottom: 20 }}
            variant="h3"
          >
            {title || ""}
          </Typography>
          <Typography
            color="inherit"
            component="body"
            gutterBottom
            align={breakpoint === "sm" ? "center" : "left"}
          >
            {description ||""}
          </Typography>
        </Grid>
        {/* CTA */}
        <Grid item container justify={breakpoint === "sm" ? "center" : "left"}>
          <Grid item style={{ marginRight: 5, paddingBottom: 5 }}>
            {ctas[0] &&
              ((altButtons === 0 && <RegularButton>{ctas[0]}</RegularButton>) ||
                (altButtons === 1 && (
                  <SecondaryButton>{ctas[0]}</SecondaryButton>
                )) || <ThirdButton color="textPrimary">{ctas[0]}</ThirdButton>)}
          </Grid>
          <Grid item>
            {ctas[1] &&
              ((altButtons === 0 && <RegularButton>{ctas[1]}</RegularButton>) ||
                (altButtons === 1 && (
                  <SecondaryButton>{ctas[1]}</SecondaryButton>
                )) || <ThirdButton color="textPrimary">{ctas[1]}</ThirdButton>)}
          </Grid>
        </Grid>
      </Grid>
      {/* 
        // ========================================================================== //
        //       Blocks
        // ========================================================================== //
       */}
        <Grid item md={6} xs={12}>
          {children}
        </Grid>
    </Grid>
  )
}

// ========================================================================== //
// Cta image
// ========================================================================== //
const Graphic = props => {
  const { src, alt, bgAlt = false, border } = props
  const classes = useStyles({ bgAlt, border })
  return (
    <Grid item xs={5} md={6} className={classes.graphic}>
      <img alt={alt} src={src} />
    </Grid>
  )
}

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = React.forwardRef((props, ref) => {
    const classes = useStyles()
    const styleData = {
      bgAlt: 1,
      altButtons: 1,
      rounded: true,
      ctas: ["Read More", "Book Online"],
      description: "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs",
      title: "Creative, adaptive, diversified",
    }
    return (
      <section ref={ref} className={classes.section}>
        <Descriptor styleData={styleData}>
          <ThreeWrapper />
        </Descriptor>
        <Experience />
      </section>
    )
  })
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
        <Grid container>
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
    const styleData = {
      title: "Any Language, Any Framework",
      bgAlt: 0,
      altButtons: 1,
      rounded: true,
      ctas: ["Read More", "Book Online"],
      description: "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs",
    }
    return (
      <section ref={ref} className={classes.section}>
        <Descriptor styleData={styleData}>
          <ThreeWrapper />
        </Descriptor>
        {/* <CardCarousel
          title="Languages"
          key="languages"
          carouselData={languageData}
          cardHeight={150}
          cardWidth={150}
        /> */}
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
// WhatDoYouNeed
// ========================================================================== //

const WhatDoYouNeedDescriptor = props => {
  const d = 3;
  return (<></>)
}
const WhatDoYouNeed = React.memo(
  React.forwardRef((props, ref) => {
    const bgAlt = 0
    const classes = useStyles({ bgAlt })
    const websiteDescription = (
      <ul>
        <li>
          Your current website is outdated or is not meeting your business goals
        </li>
        <li>
          Your current website is hard to manage, has security problems or is
          slow
        </li>
        <li>
          You need a new website to promote your product or business to users,
          stakeholders, or investors
        </li>
      </ul>
    )
    const designDescription = (
      <ul>
        <li>You want new branding that captivates your audiences attention</li>
        <li>
          You want a website or app design that builds user trust and usability
        </li>
        <li>
          You want to build a image that communicates your companys purpose
        </li>
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
          <Typography color="inherit" variant="h2" gutterBottom align="center">
            What type of project do you need help with?
          </Typography>
          <Typography
            color="inherit"
            component="body"
            gutterBottom
            align="center"
          >
            I’ll work with you to create new designs, websites, and applications
            that work towards your business goals.
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid container item xs={6} sm={6} className={classes.offerContainer}>
            <Grid item xs={12} sm={12}>
              <Typography
                color="inherit"
                variant="h3"
                align="center"
                className={classes.typography}
              >
                Website
              </Typography>
              <Typography
                color="inherit"
                variant="h4"
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

            <WhatDoYouNeedDescriptor
              xs={12}
              // title="What Do You Need?"
              description={websiteDescription}
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
                variant="h3"
                align="center"
                style={{ marginTop: 25 }}
                className={classes.typography}
              >
                Design
              </Typography>
              <Typography
                color="inherit"
                variant="h4"
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

            <WhatDoYouNeedDescriptor
              xs={12}
              // title="What Do You Need?"
              description={designDescription}
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
