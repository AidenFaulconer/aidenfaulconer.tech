import React, { Component, useState, useEffect } from "react";

import { ThemeProvider, useTheme } from "emotion-theming";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";

const Curtain = styled.div`
  & .curtain {
  }
  //css transition animation

  //bring in navbar
  & .enter {
    ${"" /* ${props => props.theme.transitions.long("all")}; */}
    //hiding nav
    margin-right: 0vw;
    visibility: visible;
    opacity: 1;
  }

  & .enter-done {
    //showing nav
    ${"" /* ${props => props.theme.transitions.long("all")}; */}
    opacity: 0;
    margin-right: -215vw;
    ${"" /* background: ${props => props.theme.colors.primary}; */}
    visibility: hidden;
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
