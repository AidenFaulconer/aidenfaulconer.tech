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
import { StaticQuery, graph } from "gatsby";

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
      border: ${props => props.theme.borders.secondary};
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
    display: none;
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
        <img src={projectData[selected].imgsrc} alt="display image" />
        <h3>{projectData[selected].title}</h3>
        <BtnPrimary text="see more" />
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
          background: ${props => props.theme.colors.secondary};
          color: ${props => props.theme.colors.primary};
          box-shadow: ${props => props.theme.shadows.primary};
          ${props => props.theme.animations.blob};
        }
        ${props => props.theme.transitions.primary("all")};
      }
      & .selected {
        max-width: 250px;
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.primary};
        ${props => props.theme.animations.blob};
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

// #region experience
export const experienceData = {
  australianwarmemorial: {
    description: `I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled`,
    location: "canberra",
    employer: "Australian War Memorial",
    imgSrc: "./assets/image-2.jpg",
    date: "april 2020",
    role: "developer"
  },
  yum: {
    description: `I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled`,
    employer: "Australian War Memorial",
    location: "canberra",
    imgSrc: "./assets/image-3.jpg",
    date: "december 2020",
    role: "developer"
  },
  icn: {
    description: ``,
    employer: "Australian War Memorial",
    location: "",
    imgSrc: "./assets/image-2.jpg",
    date: "",
    role: ""
  },
  larchegenesaret: {
    description: ``,
    employer: "Australian War Memorial",
    location: "",
    imgSrc: "./assets/image-2.jpg",
    date: "",
    role: ""
  }
};
const Timeline = styled.div`
  position: absolute;
  margin: auto 0px;
  height: 50%;
  width: 100%;
  border-bottom: 1px solid white;
  top: 0px;
  opacity: 0.3;
  z-index: 0;
  transform: translateZ(-1); //forces this to be below the expereince cards

  &:before {
    position: absolute;
    height: 100%;
    top: 50%;
    content: "";
    border-right: 1px solid white;
    left: 0px;
  }
  &:after {
    position: absolute;
    height: 100%;
    top: 50%;
    content: "";
    border-right: 1px solid white;
    right: 0px;
  }
`;
const Experiences = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  z-index: 0;

  & img {
    z-index: 2;
    border-radius: ${props => props.theme.corners.borderRadius100};
    height: 80px;
    width: 80px;
    max-width: 75px;
    max-height: 75px;
    margin: 25px;
    padding-top: 12.5px;
    transform: scale(1.1);

    &:hover {
      transform: scale(1.25);
      ${props => props.theme.animations.blob};
      box-shadow: ${props => props.theme.shadows.primary};
      border: ${props => props.theme.borders.secondary};
      ${props => props.theme.transitions.primary("border-radius")};
    }

    & .active {
      box-shadow: ${props => props.theme.shadows.primary};
      border: ${props => props.theme.borders.secondary};
    }

    ${props => props.theme.transitions.primary("border-radius")};
  }

  & p {
    margin-top: -12.5px;
    text-align: center;
    font-size: ${props => props.theme.text.sizes.small};
  }
`;
const SelectedExperience = styled.div`
  border-radius: ${props => props.theme.corners.borderRadius2};
  min-height: 350px;
  padding: 12.5px;
  margin: 6.25px;
  width: 100%;
  background: ${props => props.theme.colors.innerContentColor};

  & .experience-heading {
    margin-bottom: 25px;
    min-width: 100px;
    padding-bottom: 12.5px;
    display: flex;
    width: auto;
    height: auto;
    border-bottom: 1px solid ${props => props.theme.colors.contentColor};

    & img {
      margin-right: 25px;
      display: inline-block;
      border-radius: ${props => props.theme.corners.borderRadius1};
      object-fit: fit;
      width: 15%;
      max-height: 100px;
    }
    & p {
      font-size: ${props => props.theme.text.sizes.extraSmall};
      display: inline-block;
      padding-left: 100px;
      width: 90%;
    }
  }
`;
export const Experience = ({ sectionName }) => {
  const [selectedExperience, selectExperience] = useState(
    "australianwarmemorial"
  );

  return (
    <>
      <Experiences>
        <Timeline />
        {Object.keys(experienceData).map(experienceName => {
          const experience = experienceData[experienceName];
          return (
            <div
              onClick={() => selectExperience(experienceName)}
              className=".card"
              role="select experience"
            >
              <img
                src={experience.imgSrc}
                alt="experience selection preview"
                className={
                  experienceName === selectedExperience ? "active" : ""
                }
              />
              <p>{experience.role}</p>
            </div>
          );
        })}
      </Experiences>
      <SelectedExperience>
        <div className="experience-heading">
          <img
            src={experienceData[selectedExperience].imgSrc}
            alt="experience selection preview"
          />
          <div>
            <h3>{experienceData[selectedExperience].employer}</h3>
            <h3>{experienceData[selectedExperience].role}</h3>
          </div>
        </div>
        <p>{experienceData[selectedExperience].description}</p>
      </SelectedExperience>
    </>
  );
};

// #endregion experience

// #region background
// three columns

const BackgroundColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.corners.borderRadius2};
  min-height: 500px;

  & img {
    border-radius: ${props => props.theme.corners.borderRadius2};
    box-shadow: ${props => props.theme.shadows.primary};
    position: relative;
    min-height: 250px;
    max-height: 350px;
    display: inline;
    width: 100%;
  }
  & h2 {
    border-bottom: 1px solid ${props => props.theme.colors.innerContentColor};
    position: relative;
    margin: 0px 12.5px;
    margin-top: 12.5px;
  }
  & p {
    position: relative;
    margin: 12.5px;
  }
`;

export const Background = ({ sectionName }) => {
  return (
    <>
      <BackgroundColumn>
        <h2>
          <img src="./assets/image-5.jpg" />
          Test
        </h2>
        <p>words words words</p>
      </BackgroundColumn>
      <BackgroundColumn>
        <h2>
          <img src="./assets/image-5.jpg" />
          Test
        </h2>
        <p>words words words</p>
      </BackgroundColumn>
    </>
  );
};
// #endregion background

// #region contacts
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
      <BtnPrimary text="Contact" onClick={() => {}} />
      <div dangerouslySetInnerHTML={{ __html: "" }} />
    </ContactForm>
    <ContactBranding lazyLoad />
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
  Experience: React.memo(Experience),
  Background: React.memo(Background),
  Contact: React.memo(Contact)
};
const sectionIcons = {
  Projects: projectsIcon,
  Skills: skillsIcon,
  Experience: experienceIcon,
  Background: backgroundIcon,
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
    border-radius: ${props => props.theme.corners.borderRadius2};
    background: ${props => props.theme.colors.contentColor};
    box-shadow: ${props => props.theme.shadows.primary};

    & .navigation-header {
      margin: auto;
      position: relative;
      width: 100%;
      height: 100px;
      margin-bottom: 15px;

      & img {
        position: absolute;
        top: 0px;
        border-radius: ${props => props.theme.corners.borderRadius100};
        width: 75px;
        height: 75px;
        background: ${props => props.theme.colors.contentColor};
      }

      & p {
        ${props => props.theme.mixins.bold};
        position: relative;
        margin: auto;
        width: 100%;
        top: -125px;
        text-align: center;
        border-radius: ${props => props.theme.corners.borderRadius1};
      }

      & * {
        fill: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.textSecondary};
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
      display: flex;
      background: none;
      flex-direction: row;
      justify-content: space-between;
      border-radius: ${props => props.theme.corners.borderRadius2};
      padding: 12.25px;
      border: none;
      width: 100%;
      margin-bottom: 6.25px;
      z-index: 2;
      color: ${props => props.theme.colors.textColor};

      &:hover {
        color: ${props => props.theme.colors.foreground};
        background: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.primary};
      }
      & p {
        margin: auto;
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
  padding: 100px 0px 200px 0px;
  background: ${props => (props.odd ? props.theme.colors.primary : props.theme.colors.foreground)};
  color: ${props => (props.odd ? props.theme.colors.textPrimary : props.theme.colors.textSecondary)};

  & *[class*="content"] {
    z-index: 2;
    padding: 0px;
    color:inherit;
    }

    & .section-card {
      padding: 25px;
      padding-top: 82px;//offset the heading
      margin: 6.25px 0px;
      margin-bottom: 100px;
      max-height: 1000px;
      min-height: 700px;
      width: 100%;
      display: flex;
      background: ${props => props.theme.colors.contentColor};
      border-radius: ${props => props.theme.corners.borderRadius2};

      &:hover: {
        background: black;
        &::after{
          background: black;
          margin-left: -12.5px;
          ${props => props.theme.transitions.primary("all")};
        }
      }

    & .header {
      width:100%;
      background: ${props => props.theme.colors.primary};
      border-radius: 10px 10px 0px 0px;
      position: absolute;
      top:-25px;
      left:0px;
      padding: 25px;
      z-index: 1;
      overflow: hidden;
      ${props => props.theme.mixins.bold};

      &:before {
        content: "";
        ${props => props.theme.animations.blob};
        position:absolute;
      box-shadow: ${props => props.theme.shadows.primary};

        left:-125px;
        top:-30px;
        z-index: -1;
        height: 250%;
        width: 50%;
      }
      &:after {
        content: "";
      box-shadow: ${props => props.theme.shadows.primary};

        ${props => props.theme.animations.blob};
        position:absolute;
        left: -10%;
        top:-60px;
        z-index: -1;
        height: 450%;
        width: 80%;
      }

      & p {
        position: relative;
        display:inline-block;
        ${props => props.theme.mixins.bold};
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
  margin-top: 48vh;
  height: 185px;
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
  const [scrollPos, setScrollPos] = useState(0);
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
    if (sectionRefs.current) {
      const currentScrollPos = document.body.getBoundingClientRect().y; // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
      const scrollRatio = Math.abs(currentScrollPos - scrollPos);
      // scroll differnce OF 10% permits running through logic
      console.log(
        currentScrollPos,
        "<curr ",
        scrollPos,
        "<state ",
        Math.abs(currentScrollPos - scrollPos)
      );
      if (scrollRatio > 100) {
        setScrollPos(currentScrollPos);
        console.log("state hit!");
        Object.keys(sectionRefs.current).map(section => {
          if (section.__yOffset > Math.abs(currentScrollPos)) {
            setCurrentSection(section.name);
            // scrollToSection(section.name);
          }
        });
      }
    }
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
    }
  }, []);

  useEffect(() => {
    // measureSections();
    console.log("hit!");
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", watchScroll);
    }
  }, [sectionRefs.current]);

  positionRef.current = scrollPos;
  currentSectionRef.current = currentSection;
  sectionRefs.current = {};

  return (
    <StaticQuery
      query={pageQuery}
      render={data => (
        <>
          <Spacer />
          <Row noGutters>
          <Col xl lg md>
            {Object.keys(sections).map((sectionName, i) => {
              const RenderSection = sections[sectionName];
              return (
                <ContentContainer odd={i % 2 === 0}>
                  <Row noGutters>
                    <Col xl={1} md={1} lg={1} />
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
                          <h1>{sectionName}</h1>
                        </div>
                        <RenderSection sectionName={sectionName} />
                      </div>
                    </Col>
                    <Col xl={2} md={2} lg={2} />
                  </Row>
                </ContentContainer>
              );
            })}
          </Col>


            <Col
              xl={2}
              lg={2}
              style={{ marginTop: "0px", background: "black" }}
              className="d-xs-none d-md-none d-lg-block"
            >
              <ContentNavigation id="sticky">
                <div className="navigation-container">
                  <div className="navigation-header">
                    <img src="./assets/svg/wave-graphic.png" />
                    <img src="./assets/svg/profile.png" />
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
          </Row>
        </>
      )}
    />
  );
});
// #endregion section builder

export const pageQuery = graphql`
  query indexBuilderQuery {
    site(siteMetadata: { description: {} }) {
      id
    }
  }
`;

// # projects {
// #   title
// #   mediaUrl
// #   catagory
// #   description
// #   blog {
// #     about
// #     objectives
// #     results
// #   }
// # }
// # experience {
// #   mediaUrl
// #   description
// #   location
// #   title
// #   role
// # }
// # skills {
// #   skills
// # }
// # background {
// #   title
// #   description
// #   mediaUrl
// # }

// export const skillData = [
//   {
//     groupName: "Languages",
//     skills: [
//       {
//         skillName: "javascript",
//         icon: javascriptLogo,
//         description: ``
//       },
//       {
//         skillName: "typescript",
//         icon: typescriptLogo,
//         description: ``
//       },
//       {
//         skillName: "html",
//         icon: htmlLogo,
//         description: ``
//       },
//       {
//         skillName: "css",
//         icon: cssLogo,
//         description: ``
//       },
//       {
//         skillName: "c",
//         icon: cLogo,
//         description: ``
//       },
//       {
//         skillName: "c-plus-plus",
//         icon: cppLogo,
//         description: ``
//       },
//       {
//         skillName: "c#",
//         icon: cSharpLogo,
//         description: ``
//       },
//       {
//         skillName: "php",
//         icon: phpLogo,
//         description: ``
//       },
//       {
//         skillName: "python",
//         icon: pythonLogo,
//         description: ``
//       }
//     ]
//   },
//   {
//     groupName: "Frameworks & API's",
//     skills: [
//       {
//         groupName: "front-end",
//         skills: [
//           {
//             skillName: "vue",
//             icon: vueLogo,
//             description: ``
//           },
//           {
//             skillName: "react",
//             icon: reactLogo,
//             description: ``
//           }
//         ]
//       },
//       {
//         groupName: "back-end",
//         skills: [
//           {
//             skillName: "nodejs",
//             icon: nodejsLogo,
//             description: ``
//           },
//           {
//             skillName: "django",
//             icon: djangoLogo,
//             description: ``
//           },
//           {
//             skillName: "mongodb",
//             icon: mongoLogo,
//             description: ``
//           },
//           {
//             skillName: "mysql",
//             icon: mysqlLogo,
//             description: ``
//           }
//         ]
//       }
//     ]
//   },
//   {
//     groupName: "Tools",
//     skills: [
//       {
//         groupName: "cloud",
//         skills: [
//           {
//             skillName: "netlify",
//             icon: netlifyLogo,
//             description: ``
//           },
//           {
//             skillName: "aws",
//             icon: awsLogo,
//             description: ``
//           }
//         ]
//       },
//       {
//         groupName: "office",
//         skills: [
//           {
//             skillName: "excel",
//             icon: excelLogo,
//             description: ``
//           },
//           {
//             skillName: "google drive",
//             icon: googledriveLogo,
//             description: ``
//           },
//           {
//             skillName: "microsoft sharepoint",
//             icon: sharepointLogo,
//             description: ``
//           },
//           {
//             skillName: "microsoft word",
//             icon: wordLogo,
//             description: ``
//           }
//         ]
//       },
//       {
//         groupName: "cdn",
//         skills: [
//           {
//             skillName: "wordpress",
//             icon: wordpressLogo,
//             description: ``
//           },
//           {
//             skillName: "drupal",
//             icon: drupalLogo,
//             description: ``
//           }
//         ]
//       },
//       {
//         groupName: "design",
//         skills: [
//           {
//             skillName: "figma",
//             icon: figmaLogo,
//             description: ``
//           },
//           {
//             skillName: "photoshop",
//             icon: photoshopLogo,
//             description: ``
//           },
//           {
//             skillName: "illustrator",
//             icon: illustratorLogo,
//             description: ``
//           }
//         ]
//       }
//     ]
//   },
//   {
//     groupName: "3D/CGI",
//     skills: [
//       {
//         skillName: "blender",
//         icon: blenderLogo,
//         description: ``
//       },
//       {
//         skillName: "houdini",
//         icon: houdiniLogo,
//         description: ``
//       }
//     ]
//   }
// ];
