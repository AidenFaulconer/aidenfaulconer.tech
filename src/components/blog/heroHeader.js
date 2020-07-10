import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { useTheme } from "emotion-theming";
import { TypeWriter } from "../typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";


export default ({ context, headerGraphic, headline, headlineDescription }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => setInProp(true), []);
  const theme = useTheme();
  const test = context;
  return (
    <HeroHeader>
      <Row>
        <Col xl={1} lg={1} md={1} sm={1} />
        <Col xl={6} lg={8} md={8} sm={8}>

          <img></img>
          <h1 className="headline">{headline}</h1>

          <div
            className="primary-content"
            dangerouslySetInnerHTML={{
              __html: headlineDescription
            }}
          />
          <Link to="/contact" className="button -primary">
            <BtnSecondary text="Start project" bg="#0D7BF2" color="white" />
          </Link>
          <Link to="/contact" className="button -secondary">
            <Btn text="Connect" />
          </Link>
        </Col>

        <Col>
        </Col>



        <Col xl={1} lg={1} md={2} sm={2} />
      </Row>
    </HeroHeader>
  );
};



const HeroHeader = styled.section`
  position: fixed;
  padding-top: 280px; //185px + 25px

  & .headline {
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins-bold;
    color: ${props => props.theme.colors.textSecondary};
  }

  & .primary-content {
    color: ${props => props.theme.colors.textSecondary};
    ${props => props.theme.mixins.contentFont};
    line-height: ${props => props.theme.text.details.lineheight3};
    font-size: 25px;
    font-family: "poppins-regular";
    width: 60%;
    margin-bottom: 25px;
    margin-top: 40px;
  }
  color: ${props => props.theme.colors.textPrimary};
  & .graphic {
    margin: 0px 25px;
    margin-bottom: 150px;
    position: relative;
    width: 100%;
    height: 100%;
    top: -100px;
    bottom: 0px;
    object-fit: contain;

    //react transition group on graphic, height 0 to 100
    & .-enter {
      height: 0%;
    }
    & .-enter-active {
      height: 100%;
    }
    & .-exit {
      ${props => props.theme.test};
      height: 100%;
    }
    & .-exit-done {
    }
    //react transition group on graphic
  }
`;