import React, { Component, useEffect, useState, useCallback } from "react";

import { Link, useStaticQuery, graphql } from "gatsby";

import styled from "@emotion/styled";

import { InlineIcon } from "@iconify/react";
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import {
  logoCircular,
  boxAndPyrimid,
  dataBoxAndCodeBox,
} from "../static/assets/svg/hardcoded-svgs";

import { Btn, BtnPrimary } from "../components/buttons";

import { Box, Container } from "@material-ui/core";
import { render } from "react-three-fiber";
import { pageQuery } from "./layout";
import { useTheme } from "emotion-theming";

const _Footer = styled.footer``;

export const Footer = ({ children }) => {
  // const theme = useTheme();
  const pages = [
    { name: "portfolio", url: "./" },
    { name: "services", url: "./services" },
    { name: "blog", url: "./blog" },
  ];

  return (
    <_Footer className="footer row p-5 align-items-center">
      {/* <div className="position-absolute bottom-0">
        2020 Aiden Faulconer. All Rights Reserved
      </div> */}
      <div
        className="col col-3"
        dangerouslySetInnerHTML={{ __html: boxAndPyrimid }}
      />
      <div className="col col-3">
        <div>want to collaborate? aidenf09@yahoo.com</div>

        <div>lets talk 0475565709</div>
      </div>
      <div className="col col-3">
        <div>
          {pages.map((page) => (
            <div key={page.name}>{(page.url, page.name)}</div>
          ))}
        </div>
        <div>Socials</div>
      </div>
      <div
        className="col col-3"
        dangerouslySetInnerHTML={{ __html: dataBoxAndCodeBox }}
      />
    </_Footer>
  );
};
