import * as React from "react"
import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import Layout from "../layout/layout"
import HeroHeader from "../components/heroHeader"
import {
  About,
  Projects,
  Languages,
  Contact,
  Experience,
  WhatDoYouNeed,
} from "../components/indexSections"

import cubesOffset from "../../static/assets/portfolio/cubesOffset.png"

const useStyles = makeStyles(theme => ({
  underlay: {
    position: "relative",
    // top: '-400px',
    content: "",
    margin: theme.spacing(3),
    padding: theme.spacing(12),
    paddingTop: "unset",
    pointerEvents: "all",
    overflow: "hidden",
    // boxShadow: theme.custom.shadows.brandBig,
    background:
      "linear-gradient(180deg, #324308 15.49%, #8BAD6B 68.98%, #AAC882 103.74%)",
    borderRadius: theme.custom.borders.brandBorderRadius3,
  },
  sectionCurve: {
    borderRadius: "100%",
    margin: "auto",
    width: "100%",
    left: "0px",
    fill: "#324308",
    // marginTop: '-43px',
    // fill: theme.palette.background.default,
  },
  cubesOffset: {
    top: "-7%",
    left: "37%",
    top: "-6%",
    left: "38%",
    opacity: 0.6,
    zIndex: -1,
    position: "absolute",
    maxWidth: 860,
  },
}))

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

const IndexPage = React.memo(
  ({
    // returned from pageQuery as props
    // data: {
    //   allMarkdownRemark: { edges },
    // },
    transitionStatus,
    entry,
    exit,
  }) => {
    const marginAmount = "175px"
    const classes = useStyles()

    return (
      <>
        <Container maxWidth="lg">
          <HeroHeader id="back-to-top-anchor" />
          <Grid
            item
            xs={12}
            md={5}
            style={{ paddingBottom: 20, margin: "auto" }}
          >
            <Typography
              align="center"
              gutterBottom
              style={{ marginBottom: 25, marginTop: 80 }}
              variant="h2"
            >
              A bit about what I can do for you
            </Typography>
            <Typography component="body" gutterBottom align="center">
              I’ll work with you to create a new Jamstack marketing or eCommerce
              site that works towards your business goals.
            </Typography>
          </Grid>
          <About id="about" />
          <Languages id="languages" />
        {/* <Experience id="experience" /> */}
        <WhatDoYouNeed id="call-to-action" />

          <Grid
            item
            xs={12}
            md={5}
            style={{ paddingBottom: 20, margin: "auto" }}
          >
            <img
              src={cubesOffset}
              alt="cubes"
              className={classes.cubesOffset}
            />
            <Typography
              align="center"
              gutterBottom
              style={{ marginBottom: 25, marginTop: 80 }}
              variant="h2"
            >
              Read on!
            </Typography>
            <Typography component="body" gutterBottom align="center">
              I’ll work with you to create a new Jamstack marketing or eCommerce
              site that works towards your business goals.
            </Typography>
          </Grid>
          <Projects id="projects" />
        </Container>

        {/* <Contact id="contact" /> */}
      </>
    )
  }
)

export default IndexPage

// autorun at gatsby rebuild-cycle
// export const pageQuery = graphql`
//   query indexPageQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail_
//           }
//         }
//       }
//     }
//   }
// `;
