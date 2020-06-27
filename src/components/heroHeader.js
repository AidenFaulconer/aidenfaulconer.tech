import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { TypeWriter } from "./typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "./buttons.js";

const HeroHeader = styled.section`
  position: fixed;
  padding: 25px;
  padding-top: 150px;

  & .headline {
    font-size: ${props => props.theme.text.sizes.h1};
    font-weight: bolder;
    line-height: ${props => props.theme.text.details.lineheight3};
  }

  & .primary-content {
    font-family: brown-light;
    line-height: ${props => props.theme.text.details.lineheight3};
    font-size: ${props => props.theme.text.sizes.p};
    margin: 50px 0px;
    width: 100%;
    margin-bottom: 25px;
  }
  color: ${props => props.theme.colors.textPrimary};
  & .graphic {
    margin: 0px 25px;
    position: relative;
    width: 100%;
    height: 100%;
    top: -100px;
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

export default ({ context, headerGraphic, headline, headlineDescription }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => setInProp(true), []);
  const test = context;
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              sitePageContent {
                blog {
                  title
                }
              }
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
          <HeroHeader>
            <Row>
              <Col xl={1} lg={1} md={2} sm={2} />
              <Col xl={4} lg={8} md={8} sm={8}>
                <div className="headline">
                {headline}
                </div>
                <div
                  className="primary-content"
                  dangerouslySetInnerHTML={{
                    __html:
                     headlineDescription
                  }}
                />
                <Link to="/contact" className="button -primary">
                  <BtnSecondary text="Lets work together" />
                </Link>
                <Link to="/contact" className="button -secondary">
                  <Btn text="Lets connect" />
                </Link>
              </Col>

              <Col xl={1} lg md sm />

              <Col xl lg={12} md={12} sm={12}>
                <img
                  className="graphic"
                  src={headerGraphic}//TODO: this will be dynamic per page (with a hero header)
                />
              </Col>

              <Col xl={1} lg={1} md={2} sm={2} />
            </Row>
          </HeroHeader>
        );
      }}
    />
  );
};
