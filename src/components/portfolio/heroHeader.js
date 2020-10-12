import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { useTheme } from "emotion-theming";
import { TypeWriter } from "../util/typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

import ThreePortfolio from "../threejs/three-blog";

import { portfolioGraphic} from "../../../static/assets/svg/hardcoded-svgs";

const HeroHeader = styled.section`
  max-height:45vh;
  z-index: 0;
`;

export const Content = styled.div`
justify-content: space-between;
position: relative;
margin: auto;
max-width: 900px;
display: flex;


  & .graphic {
    position: relative;
    min-height: 100%;
    width: 100%;
    & svg {
      position: absolute;
      right: 0px;
      bottom: 0px;
      width: 100%;
      height: 100%;
      & #blue {
        fill: ${props=>props.theme.colors.primary};
      }
      & #white {
        fill: ${props=>props.theme.colors.foreground};
      }
    }
  }
  & .headline {
    color: ${props => props.theme.colors.textSecondary};
    text-transform: capitalcase;
    font-family: poppins;
    font-weight: bolder;
    text-align: center;
    font-size: 3em;
    margin: auto;
    z-index: 3;
    margin-top: 50px;

    ${props =>
      props.theme.breakpoints.md(`
      font-size: 4.5em;
      width: 80%;
      margin-top: -100px;
  `)}
    ${props =>
      props.theme.breakpoints.xl(`
      text-align: left;
      margin-top: 0px;
      margin-left: 0px;
      font-size: 85px;
  `)}


    & .primary-content {
    color: ${props => props.theme.colors.textSecondary};
    ${props => props.theme.mixins.contentFont};
    line-height: ${props => props.theme.text.details.lineheight3};
    font-family: "poppins";
    font-weight: 300;
    font-size: 20px;
    text-align: left;
    margin: 25px auto;
    z-index: 30;
    display: none;

    ${props => props.theme.breakpoints.lg(`
      display: block;
      text-align: left;
      margin-left: 0px;
      width: 100%;
  `)}
  }

  & .buttons {
    width: 100%;
    display: flex;
    font-size: 20px;
    margin-top: 30px;
    justify-content: center;

    ${props => props.theme.breakpoints.lg(`
      justify-content: space-between;
    `)}

  }

  }
  color: ${props => props.theme.colors.textPrimary};

`



const ThreeWrapper = styled.div`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 105%;
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
              <Row>
              {/**
               */}
                  <ThreeWrapper>
                    <ThreePortfolio theme={theme} />
                  </ThreeWrapper>
              <Col xl={1} lg={1} md={3} sm={1}/>
                <Content>
                  <div>
                    <h1 className="headline">
                      {headline}
                      <div
                        className="primary-content"
                        dangerouslySetInnerHTML={{
                          __html: headlineDescription
                        }}
                      />
                      <div className="buttons">
                        <a href="#Contact" className="button -primary" >
                          <BtnSecondary bg={theme.colors.primary}
                            color="white"
                            padding="12.5px 30px"
                            text="Let's Connect"/>
                        </a>
                        <a href="#Contact"  className="button -primary">
                          <BtnSecondary bg="transparent"
                           padding="12.5px 30px"
                            color="transparan  t"
                            text="Start project"/>
                        </a>
                      </div>
                    </h1>
                  </div>

                  <div className="graphic d-xl-block d-lg-none d-md-none d-sm-none d-none">
                    <div
                    style={{ fill: theme.colors.secondary }}
                    dangerouslySetInnerHTML={{ __html: portfolioGraphic }}
                    />
                  </div>
                </Content>
              <Col xl={1} lg={1} md={3} sm={1}/>
              </Row>
            </HeroHeader>
          </>
        );
      }}
    />
  );
};
