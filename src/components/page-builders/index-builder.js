import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { Row, Col, Pagination, Media } from "react-bootstrap";
import styled from "@emotion/styled";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import stickybits from "stickybits";
import { Icon, InlineIcon } from "@iconify/react";
import projectsIcon from "@iconify/icons-ic/baseline-work";
import skillsIcon from "@iconify/icons-fa-solid/clipboard-list";
import experienceIcon from "@iconify/icons-fa-solid/road";
import backgroundIcon from "@iconify/icons-ic/sharp-person-pin";
import contactIcon from "@iconify/icons-bx/bxs-contact";
import { StaticQuery, graphql } from "gatsby";

import { CSSTransition } from "react-transition-group";

// section components
import Projects from "../portfolio/projects";
import Experience from "../portfolio/experience";
import Skills from "../portfolio/skills";
import Contact from "../portfolio/contact";

import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import { GlobalStore } from "../layout";

// used by all child components to config there intersection observer
export const INVIEWCONFIG = {
  threshold: [0.4],//offset vertically where intersection observer detects a new section
  rootMargin: "0px" // account for nav bar
}; // not working... why??????

// #region section builder
// keys must be Capitalized for react to render them
const sections = {
  Projects: React.memo(Projects),
  Skills: React.memo(Skills),
  Experience: React.memo(Experience),
  Contact: React.memo(Contact)
};

const sectionDataMapping = {
  Projects: "projectSection",
  Skills: "skillSection",
  Experience: "experienceSection",
  Contact: "contactSection"
};

const sectionIcons = {
  Projects: projectsIcon,
  Skills: skillsIcon,
  Experience: experienceIcon,
  Background: backgroundIcon,
  Contact: contactIcon
};

export default React.memo(({ theme }) => {

  const {setColorSwap,colorSwap} = useContext(GlobalStore);
  const [currentSection, setCurrentSection] = useState({
    name: "Projects",
    odd: true
  });

  const colorMapping = {
    "odd":{
      background: "",
      textSecondary: "",
    },
    "even":{
      text: "",
      textSecondary: "",
      background: "",
    }
  }

  const sectionRefs = useRef({});

  const scrollToSection = useCallback(elem => {
    if (typeof window !== "undefined") {
      window.scrollBy(0, -115);
    } // adjust scrolling with negative value
    sectionRefs.current[elem].scrollIntoView({ behavior: "smooth" });
    setCurrentSection(elem);
  });

  useEffect(() => {
    //initialize stickybits
    stickybits("#sticky", { useStickyClasses: true });
  }, []);
  // https://www.npmjs.com/package/react-intersection-observer#polyfill

  // handle a section coming into view
  useEffect(() => {
  setColorSwap(currentSection.odd);
  }, [currentSection]);

  return (
    <StaticQuery
      query={pageQuery}
      render={data => {
        const processedData = data.allMarkdownRemark.edges[0].node.frontmatter;
        return (
          <>
            <Row noGutters>
              <Col xl lg md>
                {Object.keys(sections).map((sectionName, i) => {
                  const RenderSection = sections[sectionName];
                  const odd = i % 2 === 0; // create alternating pattern on page for styling and animations
                  return (
                    <ContentContainer
                      colorSwap={currentSection.odd}
                      odd={odd}
                      id={sectionName}
                      key={`${sectionName} ${i}`}
                      ref={ref => {
                        if (ref !== null) {
                          sectionRefs.current[sectionName] = ref;
                        }
                      }} // use the inview api to update the current ref state on viewport enter
                    >
                      <Row noGutters>
                        <Col xl={3} md={2} lg={2} />
                        <Col className="content" xl md key={`${sectionName} content`}>
                          <div className="header" key={`${sectionName} header`}>
                            <h1>{sectionName}</h1>
                          </div>
                          <div
                            className="section-container"
                            key={`${sectionName} content-container`}
                            id={sectionName}
                            // ref={ref => {
                            //   sectionRefs.current[sectionName] = ref;
                            // }}
                          >
                            <RenderSection
                              key={`${sectionName} component`}
                              sectionName={sectionName}
                              odd={odd}
                              data={
                                processedData[sectionDataMapping[sectionName]]
                              }
                              setCurrentSection={setCurrentSection}
                            />
                          </div>
                        </Col>
                        <Col xl={2} md={2} lg={1} />
                      </Row>
                    </ContentContainer>
                  );
                })}
              </Col>

              <Col
                xl={1}
                lg={1}
                // css to be overriden programatically
                style={{ marginTop: "0px"}}
              >
                <ContentNavigation
                  className="d-none d-md-none d-lg-none d-xl-block"
                  colorSwap={colorSwap}
                  id="sticky"
                  src="./assets/svg/wave-graphic.png"
                >
                  <div className="navigation-container">
                    <div className="navigation-header">
                      <img src="./assets/svg/profile.png" />
                    </div>
                    {Object.keys(sections).map(sectionName => (
                      <button
                        key={`navigate-to ${sectionName}`}
                        className={
                          currentSection.name === sectionName ? "active" : ""
                        }
                        type="submit"
                        onClick={() => {
                          setCurrentSection(sectionName);
                          scrollToSection(sectionName);
                        }}
                      >
                      {/**  <Icon icon={sectionIcons[sectionName]} /> */}
                        <p>{sectionName}</p>
                      </button>
                    ))}
                  </div>
                </ContentNavigation>
              </Col>
            </Row>
          </>
        );
      }}
    />
  );
});
// #endregion section builder

// render all this pages content
const Test = styled.div`
  ${props => props.theme.test2}
`;
const ContentNavigation = styled.nav`
  z-index: 100;
  padding-top: 250px;
  max-height: 0vh;//dont allow stickybits container to be any size or else it will overflow
  position: sticky;//stickybits
  visibility: visible;

  &:after {
    content: "";
    position: absolute;
    top: 0px;
    height: 400%;
    z-index: -1;
    width: 100%;
    ${props => props.theme.transitions.primary("all")};

    color: ${props =>
      props.colorSwap
        ? props.theme.colors.textPrimary
        : props.theme.colors.foreground};
    background: ${props =>
      props.colorSwap
        ? props.theme.colors.primary
        : props.theme.colors.foreground};
  }


  & .heading {
  }

  & .navigation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    top: 0px;
    overflow: hidden;
    z-index: -1;
    padding: 12.5px;

    & .navigation-header {
      border-radius: ${props => props.theme.corners.borderRadius1};
      overflow: hidden;
      margin: auto;
      position: relative;
      width: 100%;
      height: 100px;
      margin-bottom: 15px;
      background: ${props=>props.theme.textPrimary};

      & img {
        display: block;
        margin: auto;
        top: 5px;
        position: relative;
        border-radius: ${props => props.theme.corners.borderRadius100};
        max-width: 100%;
        max-height: 90px;
      }

      & svg {
        background: ${props => props.theme.colors.contentColor};
        position: relative;
        top: -50px;
        left: -200px;
        width: 750px;
        height: 150px;
      }
    }

    & button {
      background: transparent;
      border-radius: ${props => props.theme.corners.borderRadius1};
      padding: 12.25px;
      border: none;
      width: 100%;
      opacity: 0.25;
      z-index: 2;
       color: ${props =>
      props.colorSwap
        ? props.theme.colors.textPrimary
        : props.theme.colors.textSecondary};

      &:hover {
        color: ${props => props.theme.colors.textSecondary};
        opacity: 1;
        background: ${props => props.theme.colors.foreground};
      }

      & p {
        margin: auto;
        display:block;
        font-family: poppins;
        text-align: center;
        font-weight: 400;
        visibility: visible;
      }

      & svg {
        width: 12.5px;
        height: 12.5px;
        display: hidden;
        visibility: hidden;
        margin-right: 10px;
        margin-left: 10px;
        fill: ${props => props.theme.colors.textColor};
        ${props=>props.theme.breakpoints.lg(`
        display: block;
        visibility: visible;
        `)}
      }

      &.active {
        opacity: 1;
        fill: white;
        ${props => props.theme.transitions.primary("background")};
      }
    }
  }
`;
const ContentContainer = styled.section`
  position: relative;
  z-index: 1;
  padding: 100px 25px 200px 25px;

  ${props => props.theme.transitions.secondary("all")};
  background: ${props =>
    props.colorSwap ? props.theme.colors.primary : props.theme.colors.foreground};
  color: ${props =>
    props.colorSwap
      ? props.theme.colors.textPrimary
      : props.theme.colors.textSecondary};

  & *[class*="content"] {
    z-index: 2;
    padding: 0px;
    color:inherit;

    & .header {
      width:100%;
      position: relative;
      left:0px;
      z-index: 1;
      overflow: hidden;
      color: inherit;
      margin-bottom: 25px;
      text-align: center;
      ${props =>
        props.theme.breakpoints.lg(`
        text-align: left;
          `)}
      }

    //expereince section needs the two items to go on top of eachother

    & .section-container {
      margin: 6.25px 0px;
      margin-bottom: 100px;
      min-height: 700px;//required to ensure intersection observer is detecting the corrent current section
      width: 100%;
      display: flex;
      background: ${props => props.theme.colors.contentColor};
      border-radius: ${props => props.theme.corners.borderRadius2};
      flex-direction: column;

      ${props =>
        props.theme.breakpoints.md(`
        flex-direction: row;
        flex-wrap: no-wrap;
        `)}

      &:hover: {
        background: black;
        &::after{
          background: black;
          margin-left: -12.5px;
          ${props => props.theme.transitions.primary("all")};
        }
      }
          & #Experience {
      display: flex;
      flex-wrap: wrap;
      ${props =>
        props.theme.breakpoints.lg(`
        flex-wrap: no-wrap;
        `)}
    }


      }
    }


   }

    ${props =>
      props.theme.breakpoints.lg(`

      `)}

  }
`;
const SectionBreak = styled.hr`
  z-index: 2;
  position: relative;
  top: 0px;
`;

export const pageQuery = graphql`
  query indexPageContentQuery {
    allMarkdownRemark(
      filter: { frontmatter: { catagory: { regex: "/P|pageC|config/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            contactSection {
              formPrefill
            }
            experienceSection {
              languages {
                endDate(formatString: "DD MMMM YYYY")
                image
                experienceRole
                experienceEmployer
                experienceDescription
                startDate(formatString: "DD MMMM YYYY")
                skillsUsed {
                  skill
                }
              }
            }
            projectSection {
              post_limit
            }
            skillSection {
              cgi {
                icon_name
                skillDescription
                skill_name
              }
              tools {
                icon_name
                skillDescription
                skill_name
              }
              languages {
                skillDescription
                skill_name
                icon_name
              }
              framework_apis {
                icon_name
                skillDescription
                skill_name
              }
            }
          }
        }
      }
    }
  }
`;
