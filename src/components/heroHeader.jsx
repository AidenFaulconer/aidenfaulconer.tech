import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
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
  Box,
} from "@material-ui/core"

import { alpha, makeStyles } from "@material-ui/core/styles"
import ThreeWrapper from "./threejs/three-wrapper"
import { RegularButton, SecondaryButton } from "./custom/customButton"

import cubesOffset from "../../static/assets/portfolio/cubesOffset.png"
import { useBreakpoints } from "react-use-breakpoints"
import { useSnapshot } from "valtio"
import { valtioState } from "../store/store-wrapper"

const useStyles = makeStyles(theme => ({
  heroContainer: {
    minHeight: "90vh",
    position: "relative",
    marginBottom: theme.spacing(3),
    // marginBottom: theme.spacing(0),
    // border: theme.custom.borders.brandBorder,
    background: theme.palette.text.primary,
    width: "100%",
  },
  cubesOffset: {
    top: "75%",
    left: "48%",
    opacity: 0.6,
    zIndex: -1,
    position: "absolute",
    maxWidth: 860,
  },
  headline: {
    padding: theme.spacing(0, 6),
    position: "absolute",
    bottom: theme.spacing(6),
    pointerEvents: "none",
    zIndex: 0,
    color: theme.palette.text.primary,
    "&:after": {
      color: theme.palette.text.primary,
      mixBlendMode: "difference",
    },
  },
  cta: {
    pointerEvents: "all",
    paddingTop: theme.spacing(2),
    zIndex: 2,
    position: "relative",
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(1),
    // borderTop: `1px solid ${theme.palette.text.secondary}`,
  },
  cubesPosition: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    display: "block",
    minHeight: "100%",
    marginTop: -theme.spacing(3),
    // minHeight: 500,
    // height: '100vh',
    // marginTop: '250px',
  },
}))

export const HeroHeader = props => {
  const classes = useStyles()
  const {
    id,
    data,
    title = () => (
      <>
        The Building Block
        <br />
        for your organisation
      </>
    ),
    description = "I design and code experiences for online businesses like you, so you can focus on getting your user's needs fulfilled. ",
  } = props

  // const {threejsContext:color} = useSnapshot(valtioState,{sync:true});
  // useEffect(() => {
  //   console.log(color)
  // },[color])

  return (
    <section id={id}>
      <Box className={classes.heroContainer}>
        {/* ThreeJS */}
        <Box className={classes.cubesPosition}>
          <ThreeWrapper />
          {/* <img src={cubesOffset} alt="cubes" className={classes.cubesOffset} /> */}
        </Box>

        {/* Headline */}
        <Grid
          container
          item
          justify="flex-start"
          sm={12}
          className={classes.headline}
        >
          {/* Typography */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography
                align="left"
                sm={12}
                color="secondary"
                gutterBottom
                variant="h1"
                style={{ zIndex: -1 }}
              >
                {title()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="body"
                style={{ maxWidth: 325, zIndex: 1 }}
                color="secondary"
                gutterBottom
                align="left"
              >
                {description}
              </Typography>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Grid item container justify="flex-start" className={classes.cta}>
            <Grid item style={{ marginRight: 10, paddingBottom: 5 }}>
              <SecondaryButton>Lets get in touch</SecondaryButton>
            </Grid>
            <Grid item>
              <SecondaryButton>See my work</SecondaryButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </section>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default React.memo(HeroHeader)
// export default connect(mapStateToProps, mapDispatchToProps)(HeroHeader);
