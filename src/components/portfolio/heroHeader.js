import React, { useState, useEffect, useContext } from "react";
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby";

//styles / animation
import styled from "@emotion/styled";
import { TransitionGroup } from "react-transition-group";

//ui
import { useTheme } from "emotion-theming";
import { TypeWriter } from "../util/typewriter";
import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

//threejs experience
import ThreePortfolio from "../threejs/three-portfolio-page";
import { portfolioGraphic } from "../../static/assets/svg/hardcoded-svgs";

//context
import { GlobalStore } from "../../layout/layout";

const HeroHeader = styled.section`
  max-height: 35vh;
  z-index: 0;
`;

const ThreeWrapper = styled.div`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100vh;
  left: 0px;
  margin-top: -250px;

  & #three-portfolio {
    background: transparent;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    bottom: 0px;
  }
`;
//prettier-ignore
export default React.memo(({ context, headerGraphic, headline, headlineDescription }) => {
    //prettier-ignore
    const {site:{siteMetadata:{title,description}}} = useStaticQuery(pageQuery);

    //configure what section is in view
    const [inProp, setInProp] = useState(false);
    useEffect(() => {
      setInProp(true);
    }, []);
    const theme = useTheme();

    return (
      <div className="row">
        <title>
          {title}
          {/* Beautiful<br />
                Scalable<br />
                Software<br /> */}
        </title>
        <div>{description}</div>
        <div className="buttons">
          <a href="#Contact" className="button -primary">
            <BtnSecondary
              color="white"
              padding="12.5px 30px"
              text="Let's Connect"
            />
          </a>
          <a href="#Contact" className="button -primary">
            <BtnSecondary
              bg="transparent"
              padding="12.5px 30px"
              color="transparan  t"
              text="Start project"
            />
          </a>
        </div>
      </div>
    );
  }
);

export const pageQuery = graphql`
  query heroHeaderQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
