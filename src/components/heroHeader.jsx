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

const useStyles = makeStyles(theme => ({
  heroContainer: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  cubesOffset: {
    top: '75%',
    left: '48%',
    opacity: .6,
    zIndex: -1,
    position: 'absolute',
    maxWidth: 860,
  }
}))

export const HeroHeader = props => {
  const classes = useStyles()
  const {
    title = "Beautiful Scalable Software",
    description = "I design and code experiences for online businesses like you, so you can focus on getting your user's needs fulfilled. ",
  } = props
  return (
    <section id="#hero">
      <Grid
        container
        className={classes.heroContainer}
        justify="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Grid container item md={5} xs={12}>
          <Grid item xs={10} style={{ margin: "auto", paddingBottom: 20 }}>
            <Typography align="left" gutterBottom variant="h1">
              {title}
            </Typography>
            <Typography component="body" gutterBottom align="left">
              {description}
            </Typography>
          </Grid>
          <Grid
            item
            justify="flex-start"
            spacing={2}
            xs={10}
            style={{ margin: "auto", display: "flex" }}
          >
            <Grid item xs={6}>
              <RegularButton size="small">Lets get in touch</RegularButton>
            </Grid>
            <Grid item xs={6}>
              <RegularButton size="small">See my work</RegularButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} style={{marginTop: 20}}>
          <ThreeWrapper />
          <img src={cubesOffset} alt="cubes" className={classes.cubesOffset}/>
        </Grid>
      </Grid>
    </section>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default React.memo(HeroHeader)
// export default connect(mapStateToProps, mapDispatchToProps)(HeroHeader);
