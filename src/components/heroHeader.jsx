import React from "react"
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
} from "@material-ui/core"

import { alpha, makeStyles } from "@material-ui/core/styles"
import ThreeWrapper from "./threejs/three-wrapper"
import { RegularButton } from "./custom/customButton"

import cubesOffset from "../../static/assets/portfolio/cubesOffset.png"
import { useBreakpoints } from "react-use-breakpoints"

const useStyles = makeStyles(theme => ({
  heroContainer: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  cubesOffset: {
    top: "75%",
    left: "48%",
    opacity: 0.6,
    zIndex: -1,
    position: "absolute",
    maxWidth: 860,
  },
}))

export const HeroHeader = props => {
  const classes = useStyles()
  const {
    title = "Beautiful Scalable Software",
    description = "I design and code experiences for online businesses like you, so you can focus on getting your user's needs fulfilled. ",
  } = props
  
  const breakpoint = useBreakpoints()

  return (
    <section id="#hero">
      <Grid
        container
        className={classes.heroContainer}
        justify="space-between"
        alignContent="center"
        alignItems="center"
      >
        {/* Headline */}
        <Grid item justify="center" md={5} style={{margin: 'auto'}}>
          {/* Typography */}
          <Grid item >
            <Grid item>
              <Typography align="left" md={6} style={{maxWidth: 325}} gutterBottom variant="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="body" style={{maxWidth: 325}}  gutterBottom align="left">
                {description}
              </Typography>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Grid item container justify="flex-start" style={{paddingTop: 10}}>
            <Grid item style={{marginRight: 10,paddingBottom: 5}}>
              <RegularButton size={"small"}>Lets get in touch</RegularButton>
            </Grid>
            <Grid item >
              <RegularButton size={"small"}>See my work</RegularButton>
            </Grid>
          </Grid>

        </Grid>

        {/* ThreeJS */}
        <Grid item sm={6} xs={12}>
          <ThreeWrapper />
          <img src={cubesOffset} alt="cubes" className={classes.cubesOffset} />
        </Grid>
      </Grid>
    </section>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default React.memo(HeroHeader)
// export default connect(mapStateToProps, mapDispatchToProps)(HeroHeader);
