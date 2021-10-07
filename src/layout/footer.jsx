import React, { Component, useEffect, useState, useCallback } from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import { navigate } from "gatsby-link"
import footerGraphic from "../../static/assets/footer.png"

import { InlineIcon } from "@iconify/react"
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import { Box, Container, Typography, Grid, makeStyles } from "@material-ui/core"
import { render } from "react-three-fiber"
import {
  logoCircular,
  boxAndPyrimid,
  dataBoxAndCodeBox,
} from "../../static/assets/svg/hardcoded-svgs"
import {
  RegularButton,
  SecondaryButton,
} from "../components/custom/customButton"
import { Gridify } from "../components/custom/customCards"

const useStyles = makeStyles(theme => ({
  footer: {
    position: "relative",
    minHeight: 200,
    padding: theme.spacing(3, 6),
    color: theme.palette.text.secondary,
  },
  footerBackground: {
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
}))

export default React.memo(({ children }) => {
  // const theme = useTheme();
  const classes = useStyles()
  const pages = [
    { name: "portfolio", url: "./" },
    { name: "services", url: "./services" },
    { name: "blog", url: "./blog" },
  ]
  //function that sends an email
  const sendEmail = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.open(
        "mailto:aidenf09@yahoo.com?subject=Lets%20Get%20In%20Touch&body=Hi%20there%20I%20saw%20your%20website%20and%20want%20to%20work%20together%20on%20something%20great."
      ),
    []
  )

  const makeCall = useCallback(
    () => typeof window !== "undefined" && window.open("tel:+61-475-565-709"),
    []
  )
  // table footer?
  return (
    <footer className={classes.footer}>
      <Grid
        container
        xs={12}
        spacing={6}
        alignContent="center"
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: "auto" }}
      >
        {/* <Grid item>
          
        </Grid> */}

        <Grid item>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Want to collaborate?
              </Typography>
              <SecondaryButton
                size="small"
                onClick={() => navigate("/booking")}
              >
                Make a booking
              </SecondaryButton>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Send me an email
              </Typography>
              <SecondaryButton size="small" onClick={() => sendEmail()}>
                aidenf09@yahoo.com
              </SecondaryButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <Typography gutterBottom color="inherit">
                Lets Talk
              </Typography>
              <SecondaryButton size="small" onClick={() => makeCall()}>
                0475565709
              </SecondaryButton>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                color="inherit"
                style={{ marginTop: 40 }}
              >
                Copyright © 2020 @ Aiden Faulconer
              </Typography>
              {/* <SecondaryButton size="small">Call me</SecondaryButton> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <img src={footerGraphic} className={classes.footerBackground} />
    </footer>
  )
})
