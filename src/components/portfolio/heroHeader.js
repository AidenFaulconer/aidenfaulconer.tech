import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { useTheme } from "emotion-theming";
import { TypeWriter } from "../util/typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

import ThreePortfolio from "./three-portfolio";
import ThreeBlog from "../blog/three-blog";

const HeroHeader = styled.section`
  max-height:45vh;
  z-index: 0;

  & .graphic {
    position: relative;
    object-fit: contain;
    height: 100%;
    width: 100%;
    top: 0px;
  }
  & .headline {
    color: ${props => props.theme.colors.textSecondary};
    z-index: 3;
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins;
    text-align: center;

    ${props =>
      props.theme.breakpoints.sm(`
      font-size: 4.5em;
      width: 80%;
      margin-top: -100px;
  `)}
    ${props =>
      props.theme.breakpoints.lg(`
      text-align: left;
      margin-top: 0px;
      margin-left: 0px;
      font-size: 3.5em;
      width: 80%;
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
    font-family: "poppins";
    font-weight: 300;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    margin-top: 20px;
    z-index: 30;
    text-align: center;
    font-size: 0.30em;

    ${props => props.theme.breakpoints.lg(`
      text-align: left;
      margin-left: 0px;
      width: 100%;
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
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  top:-150px;

  & #three-portfolio {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
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
                  <ThreeWrapper>
                    <ThreePortfolio theme={theme} />
                  </ThreeWrapper>
              <Row>
                <Col
                  xl={3}
                  lg={3}
                  md={3}
                  sm={3}
                  className="d-xs-none d-lg-block"
                />
                <Col xl={3} lg={3} md={10} sm={10}>
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
                    <a href="#Contact" className="button -primary">
                      <BtnSecondary bg="#0D7BF2"
                        color="white"
                        text="Let's Connect" />
                    </a>
                  </div>
                </Col>

                <Col xl lg md className=" d-xl-block d-lg-block d-md-none d-sm-none d-none">
                    <img
                      className="graphic"
                      src={`./assets/svg/portfolio-graphic-${theme.name}.png`} // TODO: this will be dynamic per page (with a hero header)
                    />
                </Col>

                <Col
                  xl={3}
                  lg={3}
                  md={3}
                  sm={3}
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
