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
// Images
// ========================================================================== //
import aboutImage from "../../static/assets/portfolio/about.png"
import languagesImage from "../../static/assets/portfolio/languages.png"
import whatDoYouNeedImage from "../../static/assets/portfolio/website.png"
import whatDoYouNeedImage2 from "../../static/assets/portfolio/lots.png"
import listStyleImage from "../../static/assets/portfolio/listItem.png"

// ========================================================================== //
// Experience images
// ========================================================================== //
import awmImage from "../../static/assets/portfolio/Frame 593.png"
import rvrImage from "../../static/assets/portfolio/Frame 594.png"
import rgImage from "../../static/assets/portfolio/Frame 595.png"
import afImage from "../../static/assets/portfolio/Frame 596.png"
import lgImage from "../../static/assets/portfolio/Frame 597.png"
import xprtImage from "../../static/assets/portfolio/Frame 598.png"
import ajImage from "../../static/assets/portfolio/Frame 599.png"

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
      ...common,
    },
    container: { padding: theme.spacing(3, 0) },
    graphic: {
      maxWidth: 550,
      maxHeight: 550,
      ...common,
      "& img": {
        height: "100%",
        width: "100%",
        position: "relative",
        objectFit: "contain",
        width: "100%",
        borderRadius: "100%",
        height: "100%",
        // marginLeft: "-10px",
        position: " relative",
        // border: `1px solid ${theme.palette.text.primary}`,
        border: theme.custom.borders.brandBorderSecondary,
        background: theme.palette.text.primary,
        // background: `radial-gradient(circle at top, ${theme.palette.text.secondary} 40%,${theme.palette.text.primary} 90%)`,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexToAlpha(
          theme.palette.text.primary,
          1
        )} 41.66%, rgba(255, 255, 255, 0) 100%), 
        radial-gradient(21.07% 10.97% at 60.57% 12.66%, rgba(255, 255, 255, 0.6) 54.48%, rgba(255, 255, 255, 0) 100%),
        radial-gradient(99.61% 99.61% at 87.86% 22.85%, rgba(0, 0, 100, 0) 22.71%, ${hexToAlpha(
          theme.palette.text.primary,
          0.6
        )} 78.96%)`,
        objectFit: "contain",
        zIndex: 1,
        // "&:before": {
        //     content: "",
        //     position: 'absolute',
        //     top: '1%',
        //     left: '5%',
        //     width: '90%',
        //     height: '90%',
        //     borderRadius: '50%',
        //     background: `radial-gradient(circle at bottom,white, ${theme.palette.text.secondary},${theme.palette.text.primary} 58%)`,
        //     filter: 'blur(5px)',
        //     zIndex: 2,
        //   },
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background", "margin", "border"],
          { duration: "0.3s", easing: "ease-in-out" }
        ),
        "&:hover": {
          transform: "skew(-5deg, 2deg) !important",
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background", "margin", "border"],
            { duration: "0.3s", easing: "ease-in-out" }
          ),
        },
      },
    },
    descriptor: {
      height: "100%",
      width: "100%",
      // paddingBottom: theme.spacing(12),
      padding: theme.spacing(6, 3),
      minHeight: "100vh",
      // marginTop: theme.spacing(12),
      // marginBottom: theme.spacing(12),
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
      // background: theme.palette.primary.main,
      // color: theme.palette.secondary.main,
      overflow: "hidden",
    },
    whatDoYouNeed: {
      // marginTop: theme.spacing(6),
      // marginLeft: `${-23}px !important`,
      // marginRight: `${-23}px !important`,
      padding: theme.spacing(3, 3),
      borderRadius: theme.custom.borders.brandBorderRadius,
      background: theme.palette.background.button,
    },
    offerContainer: {
      overflow: "hidden",
    },
    servicesImage: {
      height: "100%",
      width: "100%",
      position: "relative",
      objectFit: "cover",
      minWidth: 400,
      maxWidth: 400,
      minHeight: 200,
      maxHeight: 200,
      overflow: "hidden",
      marginTop: theme.spacing(3),
      boxShadow: theme.custom.shadows.brand,
      borderRadius: theme.custom.borders.brandBorderRadius,
      border: theme.custom.borders.brandBorderSecondary,
      zIndex: 0,
      transition,

      "&:hover": {
        transition,
        marginTop: -theme.spacing(3),
      },
    },
    whatDoYouNeedPoints: {
      marginTop: theme.spacing(5),
      paddingLeft: 0,
      textAlign: "left",
      // listSyle: "none",
      listStyle: "circle",
      "& li": {
        margin: theme.spacing(1, 0),
        // listStyleImage: `url(${listStyleImage})`,
      },
    },
  }
})

import { useBreakpoints } from "react-use-breakpoints"
import ThreeWrapper from "./threejs/three-wrapper"
import { useStaticQuery } from "gatsby"

// ========================================================================== //
// Cta text arrangement

const Descriptor = ({ styleData, children }) => {
  const {
    title = "",
    description = "",
    ctas = [],
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
      justify="center"
      className={classes.descriptor} 
    >
      {children}

      <Grid item container>
        {/* Typography */}
        <Grid item style={{ paddingTop: 20 }}>
          <Typography
            color="inherit"
            align="left"
            gutterBottom
            style={{ marginBottom: 20, zIndex: -1 }}
            variant="h2"
          >
            {title || ""}
          </Typography>
          <Typography
            color="inherit"
            component="body"
            gutterBottom
            align="left"
          >
            {description || ""}
          </Typography>
        </Grid>
        {/* CTA */}
        <Grid item container justify="flex-start">
          <Grid item style={{ marginRight: 10, paddingBottom: 5 }}>
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
    <Grid container className={classes.graphic}>
      <img alt={alt} src={src} />
    </Grid>
  )
}

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { id } = props
  const styleData = {
    bgAlt: 0,
    altButtons: 0,
    rounded: true,
    ctas: ["Read More", "Book Online"],
    description:
      "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs",
    title: "Creative, adaptive, diversified",
  }
  return (
    <section id={id} ref={ref} className={classes.section}>
      <Descriptor styleData={styleData}>
        <Graphic src={aboutImage} />
      </Descriptor>
      <CardCarousel
        alt
        id="skills"
        title="Languages"
        key="languages"
        carouselData={experienceData}
        cardHeight={300}
        cardWidth={300}
      />
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
    image: awmImage,
    alt: "JavaScript",
    description: `
    • Used C#, JavaScript, JSON, REST, back-end & frontend developed 
    • developed in Drupal, React, React360, Unity, JavaScript, & C# 
    • Researching & solving complex front-end & back-end software problems 
    • Team collaboration to deliver VR experiences 
    • Consistent learning & documentation supplying up-to-date technical skills; such as C#, React, & Unity development 
    `,
    icon: "",
  },
  {
    title: "Recovery VR",
    image: rvrImage,
    alt: "JavaScript",
    description: `
    • Use C#, typescript, javascript, with a back-end firebase/graphql and frontend vue development 
    • Built mini-games, and create on both web and mobile unity apps 
    • Programmed frontend application to deliver configurable vr experiences 
    • Web interface for full remote-control of Virtual Reality experiences  
    • developed CI/CD pipelines for back-end and front-end development operations in Gitlab 
    • Perform auto-scaling and load-balancing via Kubernetes and Docker through GitLab pipelines and hosting services provided by Google Cloud Platform 
    • Extending the apollo platform to develop a versatile and clean backend API with GraphQL 
    • UI/UX balanced and designed iteratively with changing clients needs
    `,
    icon: "",
  },
  {
    title: "Freelance",
    image: afImage,
    alt: "JavaScript",
    description: `
    • Designing and iterating through logos to match the desired image of a given brand 
    • Website design, including interactions prototyped through framer 
    • Designing websites for friends/acquaintances/family members 
    • Developing shopfronts with Shopify, and Big-commerce 
    • Utilising WordPress to enable easy content management in given websites 
    • Facilitating work through React, Vue, Framer, Figma, and various cloud storage providers 
    `,
    icon: "",
  },
  {
    title: "XpertHubb",
    image: xprtImage,
    alt: "JavaScript",
    description: `
    • Working in a very high-paced startup environment, networking and managing through startup school and IACT community engagement 
    • Development through Javascript, React, and back-end development through express and MongoDB 
    • Developing a software platform through the cloud services via AWS(IAAS), MongoDB(DAAS), and Stripe(SAAS) 
    • Researching & solving problems in the world of mentor-ships 
    • Engagement with clients and management to create a product they want 
    `,
    icon: "",
  },
  {
    title: "Railgun",
    image: rgImage,
    alt: "JavaScript",
    description: `
    • Typescript, vue, quasar, frontend development with blockchain api’s 
    • Design and brand consultation for communicating the wallet and brands purpose 
    • Developing a secure crypto wallet utilising ethereum smart-contracts 
    • Full UI/UX design and development for the desired application 
    `,
    icon: "",
  },
  {
    title: "L'arche Genesaret",
    image: lgImage,
    alt: "JavaScript",
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
    icon: "",
  },
  {
    title: "AJ Gardencare",
    image: ajImage,
    alt: "JavaScript",
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
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
    image: awmImage,
    alt: "JavaScript",
    description: "",
    icon: "",
  },
  {
    title: "C#",
    image: awmImage,
    alt: "C#",
    description: "",
    icon: "",
  },
  {
    title: "Python",
    image: awmImage,
    alt: "Python",
    description: "",
    icon: "",
  },
  {
    title: "Front-End",
    image: awmImage,
    alt: "Front-End",
    description: "",
    icon: "",
  },
  {
    title: "Office",
    image: awmImage,
    alt: "Office",
    description: "",
    icon: "",
  },
  {
    title: "Business accumen",
    image: awmImage,
    alt: "Business accumen",
    description: "",
    icon: "",
  },
  {
    title: "Interpersonal",
    image: awmImage,
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
      altButtons: 0,
      rounded: true,
      ctas: ["Read More", "Book Online"],
      description:
        "I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs",
    }
    return (
      <section ref={ref} className={classes.section}>
        <CardCarousel
          title="Languages"
          key="languages"
          carouselData={languageData}
          cardHeight={150}
          cardWidth={150}
          alt
        />
        <Descriptor styleData={styleData}>
          <Graphic src={languagesImage} />
        </Descriptor>
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
  {
    title: "Blog 1",
    src: "",
    alt: "Blog 1",
    description: "",
    icon: "",
  },
]
const BlogPosts = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles()
    const { id } = props
    // const projectData = useStaticQuery(graphql`
    //   query {
    //     allMarkdownRemark(
    //       filter: { frontmatter: { templateKey: { eq: "project" } } }
    //     )
    //     nodes {
    //       frontmatter {
    //         title
    //       }
    //       tableOfContents
    //     }
    //   }
    // `)

    return (
      <section
        ref={ref}
        id={id}
        className={(classes.section, classes.experienceContainer)}
      >
        <Grid container justify="space-between">
          <CardCarousel
            title="Languages"
            key="languages"
            carouselData={projectsData}
            alt
            cardHeight={300}
            cardWidth={300}
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

const WhatDoYouNeedDescriptor = ({ description, ctas }) => {
  const { breakpoint } = useBreakpoints()
  return (
    <>
      <Grid item container  style={{ minHeight: 250, maxWidth: 400 }}>
        {/* Typography */}
        <Grid item style={{ paddingBottom: 20 }}>
          <Typography
            color="secondary"
            component="body"
            gutterBottom
            align="center"
          >
            {description || ""}
          </Typography>
        </Grid>
        {/* CTA */}
        <Grid item container justify="center">
          <Grid item style={{ marginRight: 5, paddingBottom: 5 }}>
            {ctas[0] && <ThirdButton>{ctas[0]}</ThirdButton>}
          </Grid>
          <Grid item>{ctas[1] && <ThirdButton>{ctas[1]}</ThirdButton>}</Grid>
        </Grid>
      </Grid>
    </>
  )
}
const WhatDoYouNeed = React.memo(
  React.forwardRef((props, ref) => {
    const bgAlt = 0
    const {id} = props
    const classes = useStyles({ bgAlt })
    const websiteDescription = (
      <ul className={classes.whatDoYouNeedPoints}>
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
      <ul className={classes.whatDoYouNeedPoints}>
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
      <section id={id} ref={ref} className={(classes.section, classes.whatDoYouNeed)}>
        <Grid
          item
          xs={12}
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

        {/*
        // ========================================================================== //
        //         website
        // ========================================================================== // 
        */}
        <Grid container spacing={6} justify="center">
          <Grid
            container
            item 
            className={classes.offerContainer}
          >
            <Grid item>
              <Typography
                color="inherit"
                variant="h3"
                align="left"
                className={classes.typography}
              >
                Website
              </Typography>
              <Typography
                color="inherit"
                variant="h4"
                align="left"
                className={classes.typography}
              >
                From: $6,000
              </Typography>
            </Grid>

            <img
              alt="What Do You Need Graphic"
              className={classes.servicesImage}
              src={whatDoYouNeedImage}
            />

            <WhatDoYouNeedDescriptor
              description={websiteDescription}
              ctas={["Book Online"]}
            />
          </Grid>

          {/* 
          // ========================================================================== //
          //           Design
          // ========================================================================== //
           */}
          <Grid
            container
            item 
            className={classes.offerContainer}
          >
            <Grid item>
              <Typography
                color="inherit"
                variant="h3"
                align="left"
                className={classes.typography}
              >
                Design
              </Typography>
              <Typography
                color="inherit"
                variant="h4"
                align="left"
                className={classes.typography}
              >
                From: $300-$3000
              </Typography>
            </Grid>

            <img
              alt="What Do You Need Graphic"
              className={classes.servicesImage}
              src={whatDoYouNeedImage2}
            />

            <WhatDoYouNeedDescriptor
              description={designDescription}
              ctas={["Book Online"]}
            />
          </Grid>
        </Grid>
      </section>
    )
  })
)

export {
  About,
  BlogPosts,
  Languages,
  Contact,
  Descriptor,
  Experience,
  WhatDoYouNeed,
}
