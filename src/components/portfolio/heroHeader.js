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
  max-height:69vh;
  // padding-bottom: 25px;
  z-index: 0;

  & .headline {
    color: ${props => props.theme.colors.textSecondary};
    z-index: 3;
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins-bold;
    text-align: center;

    ${props =>
      props.theme.breakpoints.lg(`
      text-align: left;
      margin-left: 0px;
      font-size: 3.5em;
      width: 100%;
  `)}
  }

  & a {
    position: relative;
    z-index: 2;
  } //fix buttons

  & .primary-content {
    color: ${props => props.theme.colors.textSecondary};
    ${props => props.theme.mixins.contentFont};
    line-height: ${props => props.theme.text.details.lineheight3};
    font-family: "poppins-light";
    width: 100%;
    margin: 0 auto;
    margin-bottom: 25px;
    margin-top: 75px;
    z-index: 30;
    text-align: center;
    font-size: 0.30em;

    ${props => props.theme.breakpoints.lg(`
      text-align: left;
      margin-left: 0px;
  `)}
  }

  & .buttons {
    display: flex;
    justify-content: center;
    ${props => props.theme.breakpoints.lg(`
      justify-content: flex-start;
    `)}
  }
  color: ${props => props.theme.colors.textPrimary};
`;

const ThreeWrapper = styled.div`
  position: relative;
  margin: auto;
  width: 400px;
  height: 400px;

    ${props =>
      props.theme.breakpoints.sm(`
      width: 350px;
      height: 300px;
  `)}
    ${props =>
      props.theme.breakpoints.md(`
      width: 380px;
      height: 380px;
  `)}
      ${props =>
        props.theme.breakpoints.lg(`
      width: 1000px;
      height: 1000px;
      top: -265px;
      left: -275px;
      margin-bottom: -1000px;
      & .graphic {display: none;}
  `)}
      ${props =>
        props.theme.breakpoints.xl(`
      width: 600px;
      height: 600px;
      left: 0px;
      margin-bottom: 0px;
      top: -70px;
      & .graphic {display: block;}
  `)}

  & #three-portfolio {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    top: 0px;
  }

  & .graphic {
    position: relative;
    object-fit: contain;
    height: 100%;
    width: 100%;
    top: 0px;
  }
`;

export default ({ context, headerGraphic, headline, headlineDescription }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => setInProp(true), []);
  const theme = useTheme();
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
            <HeroHeader id="hero-header">
              <Row>
                <Col
                  xl={1}
                  lg={1}
                  md={1}
                  sm={1}
                  className="d-xs-none d-lg-block"
                />
                <Col xl={5} lg={5} md={10} sm={10}>
                  <h1 className="headline">
                    {headline}
                    <div
                      className="primary-content"
                      dangerouslySetInnerHTML={{
                        __html: headlineDescription
                      }}
                    />
                  </h1>
                  <div className="buttons">
                  {/**
                    <Link to="/contact" className="button -primary">
                      <BtnSecondary
                        text="Start project"
                        bg="#0D7BF2"
                        color="white"
                      />
                    </Link>
                   */}
                    <Link to="#Contact" className="button -primary">
                      <BtnSecondary bg="#0D7BF2"
                        color="white"
                        text="Let's Connect" />
                    </Link>
                  </div>
                </Col>

                <Col xl lg md className=" d-xl-block d-lg-block d-md-none d-sm-none d-none">
                  <ThreeWrapper>
                    <ThreePortfolio theme={theme} />
                    <img
                      className="graphic"
                      src={`./assets/svg/portfolio-graphic-${theme.name}.png`} // TODO: this will be dynamic per page (with a hero header)
                    />
                  </ThreeWrapper>
                </Col>

                <Col
                  xl={1}
                  lg={1}
                  md={1}
                  sm={1}
                  xs={0}
                  className="d-sm-block -xs-none"
                />
              </Row>
            </HeroHeader>
          </>
        );
      }}
    />
  );
};
