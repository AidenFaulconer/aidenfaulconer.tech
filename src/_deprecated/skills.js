import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { InView, useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// #region language svg icons
import javascriptIcon from "@iconify/icons-mdi/language-javascript";
import cppIcon from "@iconify/icons-mdi/language-cpp";
import cSharpIcon from "@iconify/icons-mdi/language-csharp";
import cIcon from "@iconify/icons-mdi/language-c";
import cssIcon from "@iconify/icons-mdi/language-css3";
import htmlIcon from "@iconify/icons-mdi/language-html5";
import javaIcon from "@iconify/icons-mdi/language-java";
import phpIcon from "@iconify/icons-mdi/language-php";
import pythonIcon from "@iconify/icons-mdi/language-python";
import typescriptIcon from "@iconify/icons-mdi/language-typescript";
// #end region language svg icons
// #region backend svg icons
import nodejsIcon from "@iconify/icons-ion/logo-nodejs";
import expressIcon from "@iconify/icons-logos/express";
import djangoIcon from "@iconify/icons-cib/django";
// #endregion backend svg icons

// #region cloud svg icons
import awsIcon from "@iconify/icons-cib/amazon-aws";
import netlifyIcon from "@iconify/icons-cib/netlify";
// #endregion cloud svg icons

// #region frontend svg icons
import vueIcon from "@iconify/icons-ion/logo-vue";
import reactIcon from "@iconify/icons-ion/logo-react";
import angularIcon from "@iconify/icons-ion/logo-angular";
// #endregion frontend svg icons

// #region database svg icons
import mongoIcon from "@iconify/icons-cib/mongodb";
import mysqlIcon from "@iconify/icons-cib/mysql";
// #endregion database svg icons

// #region office svg icons
import excelIcon from "@iconify/icons-mdi/microsoft-excel";
import wordIcon from "@iconify/icons-mdi/microsoft-word";
import sharepointIcon from "@iconify/icons-mdi/microsoft-sharepoint";
import googledriveIcon from "@iconify/icons-mdi/google-drive";
// #endregion office svg icons

// #region cdn svg icons
import wordpressIcon from "@iconify/icons-mdi/wordpress";
import drupalIcon from "@iconify/icons-mdi/drupal";
// #endregion cdn svg icons

// #region design svg icons
import illustratorIcon from "@iconify/icons-cib/adobe-illustrator";
import photoshopIcon from "@iconify/icons-cib/adobe-photoshop";
import figmaIcon from "@iconify/icons-cib/figma";
// #endregion design svg icons

// #region 3d svg icons
import blenderIcon from "@iconify/icons-cib/blender";
import houdiniIcon from "@iconify/icons-simple-icons/houdini";
// #endregion 3d svg icons

import { Icon, InlineIcon } from "@iconify/react";
import { INVIEWCONFIG } from "../page-builders/index-builder";

import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";

// name referenced in CMS project page configuration
export const skillIcons = {
  // languages
  javascriptIcon,
  typescriptIcon,
  htmlIcon,
  cssIcon,
  cIcon,
  cppIcon,
  cSharpIcon,
  phpIcon,
  pythonIcon,
  // frontend
  vueIcon,
  reactIcon,
  angularIcon,
  // backend
  nodejsIcon,
  djangoIcon,
  mongoIcon,
  mysqlIcon,
  // cloud
  netlifyIcon,
  awsIcon,
  // office
  excelIcon,
  googledriveIcon,
  sharepointIcon,
  wordIcon,
  // cms
  wordpressIcon,
  drupalIcon,
  // design
  figmaIcon,
  photoshopIcon,
  illustratorIcon,
  // cgi
  blenderIcon,
  houdiniIcon
};

// #region skills
export default ({ data, sectionName, odd, setCurrentSection }) => {
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
        {Object.keys(data).map((groupName, i) => {
          const group = data[groupName];
          return (
            <div className="skill-row" key={`${groupName}-catagory`}>
              <h3 className="heading">{groupName}</h3>
              <div className="skill-group" key={`group-${i}`}>
                {group.map((skill, i) => {
                  return (
                    <div
                      key={`skill-${skill.skill_name}`}
                      onClick={() => selectSkill(skill.skill_name)}
                      className={`skill ${
                        skill.skill_name === selected ? "selected" : ""
                      }`}
                    >
                      <InlineIcon icon={skillIcons[skill.icon_name]} />
                      {skill.skill_name}
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
  margin-top: 25px;
  column-gap: 100px;

  & .skill-row {
    margin-top: 100px;
    background: ${props => props.theme.colors.textSecondary};
    width: auto;
    left: 0px;
    flex: 45%;
    border-radius: ${props => props.theme.corners.borderRadius1};

    & .heading {
      position: relative;
      text-align: left;
      top: -37px;
    }

    & .skill-group {
      margin-top: -25px;
      margin-right: -8px;
      padding: 8px 8px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      ${props =>
        props.theme.breakpoints.md(`
        // grid-template-columns: 1fr 1fr 1fr;
      `)}
      row-gap: 2px;
      align-self: center;

      & .skill {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 8px;
        height: 90%;
        width: 95%;
        border-radius: ${props => props.theme.corners.borderRadius1};
        font-size: ${props => props.theme.text.sizes.extraSmall};
        background: ${props => props.theme.colors.textPrimary};
        color: ${props => props.theme.colors.textSecondary};

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
          background: ${props => props.theme.colors.primary};
          color: ${props => props.theme.colors.textPrimary};
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
