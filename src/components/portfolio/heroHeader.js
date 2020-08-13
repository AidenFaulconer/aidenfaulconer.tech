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
  max-height: 69vh;
  z-index: 0;

  & .headline {
    color: ${props => props.theme.colors.textSecondary};
    z-index: 3;
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins-bold;
    text-align: center;
    margin: auto;

    ${props =>
      props.theme.breakpoints.md(`
      text-align: left;
      font-size: 3em;
      width: 80%;
  `)}
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

    ${props =>
      props.theme.breakpoints.lg(`
      text-align: left;
      margin-left: 0px;
  `)}
    ${props =>
      props.theme.breakpoints.md(`
      text-align: left;
      font-size: .35em;
  `)}
    ${props =>
      props.theme.breakpoints.sm(`
      font-size: .35em;
  `)}
  }

  & .buttons {
    display: flex;
    justify-content: center;
    ${props =>
      props.theme.breakpoints.lg(`
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
      width: 350px;
      height: 350px;
  `)}
      ${props =>
        props.theme.breakpoints.lg(`
      width: 450px;
      height: 450px;
      top: 0px;
  `)}
      ${props =>
        props.theme.breakpoints.xl(`
      width: 600px;
      height: 600px;
      margin-right: 0px;
      top: -70px;
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
                  md={0}
                  sm={1}
                  className="d-md-none d-lg-block"
                />
                <Col xl={5} lg={5} md={7} sm={10}>
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
                  </div>
                </Col>

                <Col xl lg md>
                  <ThreeWrapper>
                    <ThreePortfolio theme={theme} />
                    <img
                      className="graphic d-xl-block d-lg-block d-md-block d-sm-none d-none"
                      src={`./assets/svg/portfolio-graphic-${theme.name}.png`} // TODO: this will be dynamic per page (with a hero header)
                    />
                  </ThreeWrapper>
                </Col>

                <Col xl={1} lg={1} md={2} sm={2} xs={2} />
              </Row>
            </HeroHeader>
          </>
        );
      }}
    />
  );
};
