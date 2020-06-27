import React, { useState, useEffect, useCallback, useRef } from "react";
import { Row, Col, Pagination, Media } from "react-bootstrap";
import styled from "@emotion/styled";

import stickybits from "stickybits";
import { Icon, InlineIcon } from "@iconify/react";
import projectsIcon from "@iconify/icons-ic/baseline-work";
import skillsIcon from "@iconify/icons-fa-solid/clipboard-list";
import experienceIcon from "@iconify/icons-fa-solid/road";
import backgroundIcon from "@iconify/icons-ic/sharp-person-pin";
import contactIcon from "@iconify/icons-bx/bxs-contact";
import * as ConicGradient from "conic-gradient";

// #region language svg icons
import javascriptLogo from "@iconify/icons-mdi/language-javascript";
import cppLogo from "@iconify/icons-mdi/language-cpp";
import cSharpLogo from "@iconify/icons-mdi/language-csharp";
import cLogo from "@iconify/icons-mdi/language-c";
import cssLogo from "@iconify/icons-mdi/language-css3";
import htmlLogo from "@iconify/icons-mdi/language-html5";
import javaLogo from "@iconify/icons-mdi/language-java";
import phpLogo from "@iconify/icons-mdi/language-php";
import pythonLogo from "@iconify/icons-mdi/language-python";
import typescriptLogo from "@iconify/icons-mdi/language-typescript";
// #end region language svg icons
// #region backend svg icons
import nodejsLogo from "@iconify/icons-ion/logo-nodejs";
import expressLogo from "@iconify/icons-logos/express";
import djangoLogo from "@iconify/icons-cib/django";
// #endregion backend svg icons

// #region cloud svg icons
import awsLogo from "@iconify/icons-cib/amazon-aws";
import netlifyLogo from "@iconify/icons-cib/netlify";
// #endregion cloud svg icons

// #region frontend svg icons
import vueLogo from "@iconify/icons-ion/logo-vue";
import reactLogo from "@iconify/icons-ion/logo-react";
// #endregion frontend svg icons

// #region database svg icons
import mongoLogo from "@iconify/icons-cib/mongodb";
import mysqlLogo from "@iconify/icons-cib/mysql";
// #endregion database svg icons

// #region office svg icons
import excelLogo from "@iconify/icons-mdi/microsoft-excel";
import wordLogo from "@iconify/icons-mdi/microsoft-word";
import sharepointLogo from "@iconify/icons-mdi/microsoft-sharepoint";
import googledriveLogo from "@iconify/icons-mdi/google-drive";
// #endregion office svg icons

// #region cdn svg icons
import wordpressLogo from "@iconify/icons-mdi/wordpress";
import drupalLogo from "@iconify/icons-mdi/drupal";
// #endregion cdn svg icons

// #region design svg icons
import illustratorLogo from "@iconify/icons-cib/adobe-illustrator";
import photoshopLogo from "@iconify/icons-cib/adobe-photoshop";
import figmaLogo from "@iconify/icons-cib/figma";
// #endregion design svg icons

// #region 3d svg icons
import blenderLogo from "@iconify/icons-cib/blender";
import houdiniLogo from "@iconify/icons-simple-icons/houdini";
// #endregion 3d svg icons

import { BtnPrimary, BtnBlob, BtnSecondary } from "./buttons";

// importing conic gradient implicityly generates this
const gradient = new window.ConicGradient({
  stops: "#7F1BFF, #22004D",
  size: 200
});
// todo use graphic designed pieces here
const gradient2 = new window.ConicGradient({
  stops: "#FFF, #22004D",
  size: 500
});

// #region projects
export const projectData = [
  {
    imgsrc: "./assets/755729.jpg",
    title: "loreum ipsum",
    description: "a description"
  },
  {
    imgsrc: "./assets/image-1.jpg",
    title: "hello world",
    description: "a description"
  },
  {
    imgsrc: "./assets/755729.jpg",
    title: "loreum ipsum",
    description: "a description"
  },
  {
    imgsrc: "./assets/755729.jpg",
    title: "loreum ipsum",
    description: "a description"
  },
  {
    imgsrc: "./assets/755729.jpg",
    title: "loreum ipsum",
    description: "a description"
  },
  {
    imgsrc: "./assets/755729.jpg",
    title: "loreum ipsum",
    description: "a description"
  }
];
// #region projecet styles
const ImageGrid = styled.div`
  grid-template-columns: 1fr 1fr;
  max-height: 600px;
  grid-gap: 6.25px;
  margin-left: 25px;
  display: grid;
  width: 50%;

  ${props =>
    props.theme.breakpoints.lg(`
  width: 50%;
      `)}

  & img {
    border-radius: ${props => props.theme.corners.borderRadius1};
    width: 100%;
    height: 100%;
    max-height: 125px;
    object-fit: cover;
    opacity: 0.9;
    ${props => props.theme.transitions.primary("transform")};

    ${props =>
      props.theme.breakpoints.md(`
      `)}
    ${props =>
      props.theme.breakpoints.lg(`
      `)}

    &:hover {
      ${props => props.theme.transitions.primary("transform")};
      box-shadow: ${props => props.theme.shadows.primary};
      transform: scale(1.05);
    }
  }
`;
const DisplayImage = styled.article`
  left: 0px;
  width: 100%;
  min-height: 400px;
  display: flex;
  position: relative;
  justify-content: center;
  max-height: 600px;

  ${props =>
    props.theme.breakpoints.lg(`
  width: 50%;
      `)}

  & img {
    ${props => props.theme.animations.blob};
    max-width: 100%;
    max-height: 100%;
    margin: 0px 0px;
  }
  & h3 {
    position: absolute;
    top: 0px;
  }
  & button {
    position: absolute;
    bottom: 0px;
  }
`;
// #endregion projecet styles
export const Projects = ({ sectionName }) => {
  const [selected, selectProject] = useState(0);

  return (
    <>
      <DisplayImage>
        <img src={projectData[selected].imgsrc} />
        <h3>{projectData[selected].title}</h3>
        <BtnSecondary text="see more" />
      </DisplayImage>
      <ImageGrid>
        {projectData.map((project, i) => (
          <img
            alt="Selectable project view"
            src={project.imgsrc}
            onClick={() => selectProject(i)}
          />
        ))}
      </ImageGrid>
    </>
  );
};
// #endregion projects

// #region skills
// <Col>{i % 3 === 0 && catagory}</Col>
// <Col>{i % 3 === 1 && catagory}</Col>
// <Col>{i % 3 === 2 && catagory}</Col>
export const skillData = [
  {
    groupName: "Languages",
    skills: [
      {
        skillName: "javascript",
        icon: javascriptLogo,
        description: ``
      },
      {
        skillName: "typescript",
        icon: typescriptLogo,
        description: ``
      },
      {
        skillName: "html",
        icon: htmlLogo,
        description: ``
      },
      {
        skillName: "css",
        icon: cssLogo,
        description: ``
      },
      {
        skillName: "c",
        icon: cLogo,
        description: ``
      },
      {
        skillName: "c-plus-plus",
        icon: cppLogo,
        description: ``
      },
      {
        skillName: "c#",
        icon: cSharpLogo,
        description: ``
      },
      {
        skillName: "php",
        icon: phpLogo,
        description: ``
      },
      {
        skillName: "python",
        icon: pythonLogo,
        description: ``
      }
    ]
  },
  {
    groupName: "Frameworks & API's",
    skills: [
      {
        groupName: "front-end",
        skills: [
          {
            skillName: "vue",
            icon: vueLogo,
            description: ``
          },
          {
            skillName: "react",
            icon: reactLogo,
            description: ``
          }
        ]
      },
      {
        groupName: "back-end",
        skills: [
          {
            skillName: "nodejs",
            icon: nodejsLogo,
            description: ``
          },
          {
            skillName: "django",
            icon: djangoLogo,
            description: ``
          },
          {
            skillName: "mongodb",
            icon: mongoLogo,
            description: ``
          },
          {
            skillName: "mysql",
            icon: mysqlLogo,
            description: ``
          }
        ]
      }
    ]
  },
  {
    groupName: "Tools",
    skills: [
      {
        groupName: "cloud",
        skills: [
          {
            skillName: "netlify",
            icon: netlifyLogo,
            description: ``
          },
          {
            skillName: "aws",
            icon: awsLogo,
            description: ``
          }
        ]
      },
      {
        groupName: "office",
        skills: [
          {
            skillName: "excel",
            icon: excelLogo,
            description: ``
          },
          {
            skillName: "google drive",
            icon: googledriveLogo,
            description: ``
          },
          {
            skillName: "microsoft sharepoint",
            icon: sharepointLogo,
            description: ``
          },
          {
            skillName: "microsoft word",
            icon: wordLogo,
            description: ``
          }
        ]
      },
      {
        groupName: "cdn",
        skills: [
          {
            skillName: "wordpress",
            icon: wordpressLogo,
            description: ``
          },
          {
            skillName: "drupal",
            icon: drupalLogo,
            description: ``
          }
        ]
      },
      {
        groupName: "design",
        skills: [
          {
            skillName: "figma",
            icon: figmaLogo,
            description: ``
          },
          {
            skillName: "photoshop",
            icon: photoshopLogo,
            description: ``
          },
          {
            skillName: "illustrator",
            icon: illustratorLogo,
            description: ``
          }
        ]
      }
    ]
  },
  {
    groupName: "3D/CGI",
    skills: [
      {
        skillName: "blender",
        icon: blenderLogo,
        description: ``
      },
      {
        skillName: "houdini",
        icon: houdiniLogo,
        description: ``
      }
    ]
  }
];
const SkillGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 12.5px;

  & .skill-row {
    position: relative;
    left: 0px;
    border-radius: ${props => props.theme.corners.borderRadius2};
    color: ${props => props.theme.colors.textColor};
    width: 50%;

    ${props =>
      props.theme.breakpoints.lg(`
      `)}

    & .heading {
      position: relative;
      text-align: center;
    }

    & .skill-group {
      margin: 12.5px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;

      & .skill {
        margin: 3.125px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        min-height: 60%;
        max-width: 100%;
        padding: 6.5%;
        font-size: ${props => props.theme.text.sizes.extraSmall};
        background: ${props => props.theme.colors.primary};
        border-radius: ${props => props.theme.corners.borderRadius1};

        & svg {
          max-width: 45px;
          min-width: 50%;
          height: 45px;
          margin: auto;
        }

        &:hover {
          ${props => props.theme.transitions.primary("all")};
          background: ${props => props.theme.colors.primary};
          box-shadow: ${props => props.theme.shadows.primary};
          ${props => props.theme.animations.blob};
        }
        ${props => props.theme.transitions.primary("all")};
      }
      & .selected {
        max-width: 250px;
        ${props => props.theme.animations.blob};
        background: ${props => props.theme.colors.primary};
      }
    }
  }
`;

export const Skills = ({ sectionName }) => {
  const [selected, selectSkill] = useState("javascript");

  return (
    <>
      <SkillGrid>
        {skillData.map((group, i) => {
          return (
            <div className="skill-row">
              <h3 className="heading">{group.groupName}</h3>
              <div className="skill-group">
                {group.skills.map((skillGroup, i) => {
                  if (typeof skillGroup.skills !== "undefined") {
                    return skillGroup.skills.map((secondSkillGrouping, i) => (
                      <div
                        onClick={() =>
                          selectSkill(secondSkillGrouping.skillName)}
                        className={`skill ${
                          secondSkillGrouping.skillName === selected
                            ? "selected"
                            : ""
                        }`}
                      >
                        <p>{secondSkillGrouping.skillName}</p>
                        <InlineIcon icon={secondSkillGrouping.icon} />
                      </div>
                    ));
                  }
                  return (
                    <div
                      onClick={() => selectSkill(skillGroup.skillName)}
                      className={`skill ${
                        skillGroup.skillName === selected ? "selected" : ""
                      }`}
                    >
                      {skillGroup.skillName}
                      <InlineIcon icon={skillGroup.icon} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </SkillGrid>
    </>
  );
};
// #endregion skills

// #region contact
const ContactBranding = styled.div`
    min-width: 40%;
    background: url("./assets/svg/contact-branding.png");
    height: auto;
    background-repeat: no-repeat;
    background-size: contain;

  }
`;
const ContactForm = styled.form`
  color: white;
  min-width: 60%;
  padding-right: 25px;

  & label {
    font-size: ${props => props.theme.text.sizes.extraSmall};
    margin-right: 50px;
    margin-bottom: 6.25px;
    font-size: ;
  }

  & input {
    background: ${props => props.theme.colors.primary};
    border: none;
    padding: 3.125px;
    width: 100%;
    margin-bottom: 12.5px;
    border-radius: ${props => props.theme.corners.borderRadius1};
  }
  & textarea {
    width: 100%;
    background: ${props => props.theme.colors.primary};
    border: none;
    padding: 3.125px;
    border-radius: ${props => props.theme.corners.borderRadius1};
    min-height: 125px;
    margin-bottom: 25px;
  }

  & .button {
  }
`;

export const Contact = ({ sectionName }) => (
  <>
    <ContactForm
      className="form-container"
      // action="https://sendmail.w3layouts.com/SubmitContactForm"
      method="post"
    >
      <div>
        <label htmlFor="w3lName">Name</label>
        <input type="text" name="w3lName" id="w3lName" />
      </div>
      <div>
        <label htmlFor="w3lSender">Email</label>
        <input type="email" name="w3lSender" id="w3lSender" />
      </div>
      <div>
        <label htmlFor="w3lSubject">Subject</label>
        <input type="text" name="w3lSubject" id="w3lSubject" />
      </div>
      <div>
        <label htmlFor="w3lMessage">Message</label>
        <textarea name="w3lMessage" id="w3lMessage" />
      </div>
      <BtnPrimary text="Lets get in touch" onClick={() => {}} />
      <div dangerouslySetInnerHTML={{ __html: "" }} />
    </ContactForm>
    <ContactBranding lazyLoad/>
  </>
);
// <ContactForm>
//   <label />
//   <label />
//   <label />
//   <input />
//   <input />
//   <input />
// </ContactForm>
// #endregion contact

// #region section builder
// keys must be Capitalized for react to render them
const sections = {
  Projects: React.memo(Projects),
  Skills: React.memo(Skills),
  Contact: React.memo(Contact)
};
const sectionIcons = {
  Projects: projectsIcon,
  Skills: skillsIcon,
  Contact: contactIcon
};
// render all this pages content
const Test = styled.div`
  ${props => props.theme.test2}
`;
// must exist outside component
const ContentNavigation = styled.nav`
  z-index: 100;
  margin-top: -200px;
  padding-top: 125px;
  margin: 6.25px 0px;
  position: sticky;
  visibility: visible;
  ${props => props.theme.transitions.primary("all")};

  & .heading {
  }

  & .navigation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    top: 0px;
    height: auto;
    overflow: hidden;
    z-index: -1;
    padding: 12.5px;
    border: ${props => props.theme.borders.primary};
    border-radius: ${props => props.theme.corners.borderRadius2};
    background: ${props => props.theme.colors.contentColor};
    box-shadow: ${props => props.theme.shadows.primary};

    & .navigation-header {
      margin: auto;
      position: relative;
      width: 100%;
      height: 100px;
      margin-bottom: 25px;

      & img {
        position: absolute;
        top: 0px;
        border-radius: ${props => props.theme.corners.borderRadius100};
        width: 75px;
        height: 75px;
      }

      & p {
        position: absolute;
        top: 12.5px;
        margin: auto;
        left: 100px;
        border-radius: ${props => props.theme.corners.borderRadius100};
      }

      & * {
        fill: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.textColor};
      }

      & svg {
        background: ${props => props.theme.colors.innerContentColor};
        position: relative;
        ${props => props.theme.animations.blob};
        top: -50px;
        left: -200px;
        width: 750px;
        height: 150px;
      }
    }

    & button {
      display: flex;
      background: none;
      flex-direction: row;
      justify-content: space-between;
      border-radius: ${props => props.theme.corners.borderRadius4};
      padding: 12.25px;
      border: none;
      width: 100%;
      z-index: 2;
      color: ${props => props.theme.colors.textColor};

      & p {
        margin: auto;
        font-size: ${props => props.theme.text.sizes.small};
        visibility: hidden;
        display: none;

        ${props =>
          props.theme.breakpoints.xl(`
          margin-right: 10px;
          visibility: visible;
          display:block;
      `)}
      }

      & svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        margin-left: 10px;
        fill: ${props => props.theme.colors.textColor};
      }

      &.active {
        fill: white;
        font-weight: bolder;
        background: ${props => props.theme.colors.primary};
        ${props => props.theme.transitions.primary("background")};
      }
    }
  }
`;
// wrap all styled components in useCallback so they do not incur render overhead
const ContentContainer = styled.section`
  position: relative;
  z-index: 1;
  margin-top: 132.5px;
  padding: 0px 25px;
  color: ${props => props.theme.colors.textColor};

  & *[class*="content"] {
    z-index: 2;
    padding: 0px;
    }

    & .section-card {
      padding: 25px;
      padding-top: 82px;//offset the heading
      border: ${props => props.theme.borders.primary};
      margin: 6.25px 0px;
      margin-bottom: 100px;
      max-height: 1000px;
      width: 100%;
      display: flex;
      background: ${props => props.theme.colors.contentColor};
      border-radius: ${props => props.theme.corners.borderRadius2};
      box-shadow: ${props => props.theme.shadows.primary};


    & .header {
      width:100%;
      border: ${props => props.theme.borders.primary};
      color: ${props => props.theme.colors.textColor};
      background: ${props => props.theme.colors.innerContentColor};
      border-radius: 10px 10px 0px 0px;
      position: absolute;
      top:1px;
      left:0px;
      padding: 12.5px;
      padding-bottom: 3.125px;
      z-index: 1;
      overflow: hidden;

      &:before {
        content: "";
        ${props => props.theme.animations.blob};
        position:absolute;
        left:-125px;
        top:-30px;
        z-index: -1;
        height: 250%;
        width: 50%;
        opacity: .6;
        background: ${props => props.theme.colors.primary};
      }
      &:after {
        content: "";
        ${props => props.theme.animations.blob};
        position:absolute;
        left: -10%;
        top:-60px;
        z-index: -1;
        height: 450%;
        width: 80%;
        opacity: .3;
        background: ${props => props.theme.colors.primary};
      }

      & p {
        position: relative;
        display:inline-block;
        width: 50%;
        margin-top:-3px;
      }

      & svg {
        margin-right: 6.25px;
      }
    }
   }

    ${props =>
      props.theme.breakpoints.lg(`
      `)}
    //customize the responsiveness of each section card
      & #Projects {
    }
    & #Skills {
    display: flex;
    flex-direction: row;
    }
    & #Experience {
      flex-direction: column;
      justify-content: space-evenly;
    }
    & #Background {
      flex-direction: row;
    }
    & #Contact {
      flex-direction: row;
    }
  }
  & *[class*="row"] {
  }
`;
const SectionBreak = styled.hr`
  z-index: 2;
  position: relative;
  top: 0px;
`;
const Spacer = styled.div`
  margin-top: 44vh;
  pointer-events: all;
`;
export const waveSvg = `
  <svg width="368" height="152" viewBox="0 0 368 152" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-69.8227 16.0676C-70.7273 18.4623 -70.6095 21.0937 -70.8727 23.6401C-72.6875 41.2015 -78.5837 114.079 -53.7778 132.62C2.76013 174.879 78.7487 129.624 163.538 132.62C226.9 134.858 301.436 166.673 325.48 142.629C441.108 27.0013 373.16 -4.16308 355.957 -9.81157C353.556 -10.6003 351.194 -11.4559 348.798 -12.2629C337.535 -16.0571 295.145 -26.1846 163.538 -26.1846C-36.3323 -26.1845 -65.6777 5.09382 -69.8227 16.0676Z" fill="none"/>
  </svg>
  `;

export default React.memo(({ theme }) => {
  const sectionMeasurements = [];
  const [currentSection, setCurrentSection] = useState("Projects");
  const currentSectionRef = useRef(); // allow usecallbacks to access the current state when they fire
  const [scrollPos, setScrollPos] = useState(
    document.body.getBoundingClientRect().y
  );
  const positionRef = useRef(); // allow usecallbacks to access the current state when they fire
  const sectionRefs = useRef(null);
  const scrollToSection = useCallback(elem => {
    if (typeof window !== "undefined") {
      window.scrollBy(0, -115);
    } // adjust scrolling with negative value
    sectionRefs.current[elem].scrollIntoView({ behavior: "smooth" });
    setCurrentSection(elem);
  });
  const watchScroll = useCallback(() => {
    const currentScrollPos = document.body.getBoundingClientRect().y; // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    setScrollPos(currentScrollPos);

    Object.keys(sectionRefs.current).map(section => {
      console.log(section.__yOffset);
      if (section.__yOffset > Math.abs(currentScrollPos)) {
        setCurrentSection(section.name);
        // scrollToSection(section.name);
      }
    });
  });

  const measureSections = useCallback(() => {
    const sectionRefKeys = Object.keys(sectionRefs.current);

    // adds a __yOffset value to each element
    sectionRefKeys
      .map(elementName => sectionRefs.current[elementName].clientHeight) // get all the heights (in backward order)
      .reduce((accumulatedHeight, nextSectionHeight, i) => {
        sectionRefs.current[sectionRefKeys[i]].__yOffset = accumulatedHeight; // create a new property on the object
        return accumulatedHeight + nextSectionHeight;
      });
  });

  useEffect(() => {
    stickybits("#sticky", { useStickyClasses: true });
        if (typeof window !== "undefined") {
      window.addEventListener("resize", measureSections);
      window.addEventListener("scroll", watchScroll);

    }
  }, []);

  useEffect(() => {
    // measureSections();
  }, [sectionRefs.current]);

  positionRef.current = scrollPos;
  currentSectionRef.current = currentSection;
  sectionRefs.current = {};

  return (
    <>
      <Spacer />
      <Row noGutters>
        <Col xl={1} lg={1} md={1} className="d-sm-none d-md-none d-lg-block" />

        <Col xl lg md>
          <ContentContainer>
            {Object.keys(sections).map((sectionName, i) => {
              const RenderSection = sections[sectionName];
              return (
                <Col className="content" xl md>
                  <div
                    className="section-card"
                    key={sectionName}
                    id={sectionName}
                    ref={ref => {
                      sectionRefs.current[sectionName] = ref;
                    }}
                  >
                    <div className="header">
                      <InlineIcon icon={sectionIcons[sectionName]} />
                      <p>{sectionName}</p>
                    </div>
                    <RenderSection sectionName={sectionName} />
                  </div>
                </Col>
              );
            })}
          </ContentContainer>
        </Col>
        <Col xl={1} lg={1} md={1} className="d-sm-none d-md-none d-lg-block" />

        <Col
          xl={3}
          lg={1}
          style={{ marginTop: "0px" }}
          className="d-xs-none d-md-none d-lg-block "
        >
          <ContentNavigation id="sticky">
            <div className="navigation-container">
              <div className="navigation-header">
                <div
                  dangerouslySetInnerHTML={{
                    __html: waveSvg
                  }}
                />
                <img imgSrc="./assets/svg/profile.png" />
                <p>portfolio</p>
              </div>
              {Object.keys(sections).map(sectionName => (
                <button
                  className={currentSection === sectionName ? "active" : ""}
                  type="submit"
                  onClick={() => {
                    setCurrentSection(sectionName);
                    scrollToSection(sectionName);
                  }}
                >
                  <Icon icon={sectionIcons[sectionName]} />
                  <p>{sectionName}</p>
                </button>
              ))}
            </div>
          </ContentNavigation>
        </Col>

        <Col xl={1} lg={1} md={1} className="d-sm-none d-md-none d-lg-block" />
      </Row>
    </>
  );
});
// #endregion section builder
