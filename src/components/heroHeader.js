import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import { TransitionGroup } from "react-transition-group";

import { TypeWriter } from "./typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "./buttons.js";

const HeroHeader = styled.section`
  position: fixed;
  padding-top: 300px;//185px + 25px

  & .headline {
    font-weight: bolder;
    font-family: poppins-extrabold;
    color: ${props => props.theme.colors.primary};
  }

  & .primary-content {
    color: ${props => props.theme.colors.black};
    ${props => props.theme.mixins.contentFont};
    line-height: ${props => props.theme.text.details.lineheight3};
    font-size: ${props => props.theme.text.sizes.h3};
    width: 70%;
    margin-bottom: 50px;
    margin-top: 25px;
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
          <HeroHeader>
            <Row>
              <Col xl={1} lg={1} md={1} sm={1} />
              <Col xl={6} lg={8} md={8} sm={8}>
                <h1 className="headline">{headline}</h1>

                <div
                  className="primary-content"
                  dangerouslySetInnerHTML={{
                    __html: headlineDescription
                  }}
                />
                <Link to="/contact" className="button -primary">
                  <BtnSecondary text="Start project" bg="#E5801A" />
                </Link>
                <Link to="/contact" className="button -secondary">
                  <Btn text="Connect" />
                </Link>
              </Col>

              <Col xl lg={12} md={12} sm={12}>
                <img
                  className="graphic"
                  src={headerGraphic} // TODO: this will be dynamic per page (with a hero header)
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
