import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { useTheme } from "emotion-theming";
import { TypeWriter } from "../util/typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

import ThreePortfolio from "./three-portfolio";

import { portfolioGraphic} from "../../../static/assets/svg/hardcoded-svgs";
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
    font-size: ${props=>props.theme.text.sizes.headline};
    z-index: 3;
    font-weight: bolder;
    text-transform: capitalcase;
    font-family: poppins;
    text-align: center;
    margin: auto;

    ${props =>
      props.theme.breakpoints.md(`
      font-size: 4.5em;
      width: 80%;
      margin-top: -100px;
  `)}
    ${props =>
      props.theme.breakpoints.lg(`
      text-align: left;
      margin-top: 0px;
      margin-left: 0px;
      font-size: 85px;
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
    font-size: 20px;

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
  height: 120%;
  top:-150px;

  & #three-portfolio {
  background: transparent;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
    top: 0px;
  }

`;

export default ({ context, headerGraphic, headline, headlineDescription }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
  setInProp(true)
  }, []);
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
                  xl={{span:2,offset:1}}
                  lg={2}
                  md={2}
                  sm={1}
                  className="d-xs-none d-lg-block"
                />
                <Col xl={3} lg={3} md={8} sm={10}>
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
                      <BtnSecondary bg={theme.colors.primary}
                        color="white"
                        text="Let's Connect" />
                    </a>
                    <a href="#Contact" className="button -primary">
                      <BtnSecondary bg={theme.colors.foreground}
                        color="transparant"
                        text="Start project" />
                    </a>
                  </div>
                </Col>

                <Col xl={3} lg={7} md className=" d-xl-block d-lg-block d-md-none d-sm-none d-none">
                    <Graphic>
                      <div
                      style={{ fill: theme.colors.secondary }}
                      dangerouslySetInnerHTML={{ __html: portfolioGraphic }}
                    />
                    </Graphic>
                </Col>

                <Col
                  xl={{span:2,offset:1}}
                  lg={2}
                  md={2}
                  sm={2}
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

// <ThreeWrapper>
//       <ThreePortfolio theme={theme} />
//     </ThreeWrapper>

export const Graphic = styled.div`

& svg {
height: 100%;
width: 80%;
  & #blue {
  fill: ${props=>props.theme.colors.primary};
  }
  & #white {
  fill: ${props=>props.theme.colors.foreground};
}
}

`

//  <img
//                       className="graphic"
//                       src={`./assets/svg/portfolio-graphic-${theme.name}.png`} // TODO: this will be dynamic per page (with a hero header)
//                     />