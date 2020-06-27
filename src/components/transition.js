import React, { Component, useState, useEffect } from "react";

import { ThemeProvider, useTheme } from "emotion-theming";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";

const Curtain = styled.button`
  & .curtain {
    background: ${props => props.theme.colors.secondary};
    height: 200vh;
    width: 250vw;
    position: fixed;
    top: 0px;
    left: -100%;
    ${props => props.theme.animations.blob};
    z-index: 5;

    &:before {
      z-index: 6;
      content: "";
      width: 150%;
      height: 250%;
      position: absolute;
      opacity: 0.3;
      top: 20%;
      left: 20%;
      ${props => props.theme.animations.blob};
      background: ${props => props.theme.colors.primary};
      box-shadow: ${props => props.theme.colors.primary};
    }
  }
  //css transition animation

  //bring in navbar
  & .enter {
    ${props => props.theme.transitions.long("all")};
    //hiding nav
    margin-top: -150vw;
    margin-right: 0vw;
    visibility:visible;
    opacity: 1;
  }

  & .enter-done {
    //showing nav
    ${props => props.theme.transitions.long("all")};
    opacity: 0;
    margin-right: -215vw;
    margin-top: -150vw;
    background: ${props => props.theme.colors.primary};
    visibility:hidden;
  }
`;

export default ({ toggle }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <Curtain>
      <CSSTransition in={inProp} timeout={250}>
        <div className="curtain" />
      </CSSTransition>
    </Curtain>
  );
};
