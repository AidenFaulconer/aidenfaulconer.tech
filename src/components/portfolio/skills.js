import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { InView, useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

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

import { Icon, InlineIcon } from "@iconify/react";
import { INVIEWCONFIG } from "../index-builder";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";

// #region skills
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

export default ({ sectionName, odd, setCurrentSection }) => {
  const [selected, selectSkill] = useState("javascript");
  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd });
      console.log(entry);
    }
  }, [inView]);

  return (
    <>
      <SkillGrid ref={ref}>
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
                        <InlineIcon icon={secondSkillGrouping.icon} />
                        <p>{secondSkillGrouping.skillName}</p>
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
                      <InlineIcon icon={skillGroup.icon} />
                      {skillGroup.skillName}
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

const SkillGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 100px;
  column-gap: 100px;

  & .skill-row {
    background: ${props => props.theme.colors.textSecondary};
    position: relative;
    left: 0px;
    border-radius: ${props => props.theme.corners.borderRadius1};
    width: 45%;

    ${props =>
      props.theme.breakpoints.lg(`
      `)}

    & .heading {
      position: relative;
      text-align: left;
      top: -37px;
    }

    & .skill-group {
      padding: 0px 8px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      row-gap: 8px;
      column-gap: 8px;
      align-self: center;

      & .skill {
        margin: 4px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        width: 95%;
        height: 90%;
        padding: 8px;
        font-size: ${props => props.theme.text.sizes.extraSmall};
        background: ${props => props.theme.colors.textPrimary};
        color: ${props => props.theme.colors.textSecondary};
        border-radius: ${props => props.theme.corners.borderRadius1};

        & p {
          margin: 0px;
        }

        & svg {
          width: 32px;
          height: 32px;
          margin: auto;
        }

        &:hover {
          ${props => props.theme.transitions.primary("all")};
          background: ${props => props.theme.colors.secondary};
          color: ${props => props.theme.colors.primary};
          box-shadow: ${props => props.theme.shadows.primary};
        }
        ${props => props.theme.transitions.primary("all")};
      }
      & .selected {
        max-width: 250px;
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.textPrimary};
      }
    }
  }
`;
// #endregion skills
