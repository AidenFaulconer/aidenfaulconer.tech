import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { useTheme } from "emotion-theming";
import { TypeWriter } from "../util/typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

import ThreePortfolio from "./three-portfolio";

const HeroHeader = styled.section`
  padding-top: 250px; //185px + 25px
  height: 75vh;
  z-index: 0;

  //breakpoint overrides (mobile in sm, tablet / desktop in md)
  ${props =>
    props.theme.breakpoints.sm(`
  & .headline {text-align: center;}
  & .primary-content {width: 100%;}
  `)}
  ${props =>
    props.theme.breakpoints.md(`
  & .headline {text-align: left;}
  & .primary-content {width: 74%;}
  `)}

  & .headline {
    z-index: 3;
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins-bold;
    color: ${props => props.theme.colors.textSecondary};
  }

  & a {
    position: relative;
    z-index: 2;
  } //fix buttons

  & .primary-content {
    color: ${props => props.theme.colors.textSecondary};
    ${props => props.theme.mixins.contentFont};
    line-height: ${props => props.theme.text.details.lineheight3};
    font-size: 1.25em;
    font-family: "poppins-light";
    // width: 74%;
    margin-bottom: 25px;
    margin-top: 40px;
    z-index: 30;
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

const ThreeWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  top: 0px;
  z-index: 1;
`;

export default ({ context, headerGraphic, headline, headlineDescription }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => setInProp(true), []);
  const theme = useTheme();
  const test = context;
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              description
              title
            }
          }
        }
      `}
      render={data => {
        // {JSON.stringify(context)}
        // const location =
        //   typeof window !== "undefined"
        //     ? window.location.pathname.slice(1)
        //     : "portfolio";
        // location === "" ? (location = "portfolio") : (location = location); // TODO: structure so this isnt nessasary
        return (
          <>
            <ThreeWrapper id="three-portfolio">
              <ThreePortfolio theme={theme} />
            </ThreeWrapper>
            <HeroHeader id="hero-header">
              <Row>
                <Col xl={1} lg={1} md={1} sm={1} />
                <Col xl={6} lg={8} md={5} sm={10}>
                  <h1 className="headline">{headline}</h1>
                  <div
                    className="primary-content"
                    dangerouslySetInnerHTML={{
                      __html: headlineDescription
                    }}
                  />
                  <Link to="/contact" className="button -primary">
                    <BtnSecondary
                      text="Start project"
                      bg="#0D7BF2"
                      color="white"
                    />
                  </Link>
                  <Link to="/contact" className="button -secondary">
                    <Btn text="Connect" />
                  </Link>
                </Col>

                <Col xl lg={12} md={5} sm={2}>
                  <img
                    className="graphic d-md-block d-sm-none"
                    src={`./assets/svg/portfolio-graphic-${theme.name}.png`} // TODO: this will be dynamic per page (with a hero header)
                  />
                </Col>

                <Col xl={1} lg={1} md={2} sm={2} />
              </Row>
            </HeroHeader>
          </>
        );
      }}
    />
  );
};
