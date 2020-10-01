import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import data from "@iconify/icons-ic/round-arrow-right";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import { INVIEWCONFIG } from "../page-builders/index-builder";

export default ({ data, sectionName, odd, setCurrentSection }) => {
  const [selectedExperience, selectExperience] = useState(0);

  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd });
    }
  }, [inView]);

  const experiences = data.languages;
  const currentExpereince = experiences[selectedExperience];
  return (
    <>
      <Experiences ref={ref}>
        {data.languages.map((experience, index) => {
          return (
            <div
              key={`${experience.experienceRole}-index`}
              onClick={() => selectExperience(index)}
              className={`experience ${
                selectedExperience === index ? "active" : ""
              }}`}
              role="select experience"
            >
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <div>
                  <h3>{experience.experienceRole}</h3>
                  <p>{experience.experienceEmployer}</p>
                </div>
                <img
                  src={experience.image}
                  alt="experience selection preview"
                />
              </div>
            </div>
          );
        })}
      </Experiences>
      <SelectedExperience src="./assets/svg/wave-graphic.png">
        <div className="experience-heading">
          <img
            src={currentExpereince.image}
            alt="experience selection preview"
          />
          <div>
            <h3>{currentExpereince.experienceRole}</h3>
            <p>{currentExpereince.experienceEmployer}</p>
            <div className="experience-date">{`${currentExpereince.startDate} - ${currentExpereince.endDate}`}</div>
          </div>
        </div>
        <h3>Skills Used</h3>
        <div className="skills-used">
          {currentExpereince.skillsUsed.map(skill => (
            <div className="skill" key={`${skill.skill}`}>{skill.skill}</div>
          ))}
        </div>
        <h3>About the role</h3>
        <p className="experience-description">
          {currentExpereince.experienceDescription}
        </p>
      </SelectedExperience>
    </>
  );
};

const Experiences = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  z-index: 0;
  order: 2;

  ${props =>
    props.theme.breakpoints.md(`
    flex-direction: column;
    order: 1;
    display: flex;
    margin-right: 100px;
  `)}

  & .experience {
    width: 100%;
    border-radius: ${props => props.theme.corners.borderRadius1};
    display: flex;
    justify-content: space-between;
    ${props => props.theme.transitions.primary("transform")};
    background: white;
    margin: 25px 0;
    color: black;
    padding: 25px;

    ${props =>
      props.theme.breakpoints.md(`
    margin: 25px;
    `)}

    & img {
      z-index: 2;
      border-radius: ${props => props.theme.corners.borderRadius100};
      max-height: 50px;
      margin: auto 50px;
    }

    & p {
      text-align: left;
      margin: auto;
      margin-top: 8.25px;
      font-size: ${props => props.theme.text.sizes.small};
    }

    & h3 {
      min-width: 150px;
      text-align: left;
      margin: auto;
    }

    &:hover {
      transform: scale(1.04);
      box-shadow: ${props => props.theme.shadows.primary};
    }

    & .active {
      box-shadow: ${props => props.theme.shadows.primary};
    }
  }
`;

const SelectedExperience = styled.div`
  border-radius: ${props => props.theme.corners.borderRadius1};
  min-height: 350px;
  padding: 12.5px;
  width: 100%;
  order: 0;
  background: white;
  position: relative;
  color: black;
  background: ${props => props.theme.colors.innerContentColor};

  & .experience-heading {
    margin-bottom: 25px;
    min-width: 100%;
    //offset padding so background covers the card
    margin-top: -25px;
    margin-left: -12.5px;
    margin-right: -12.5px;
    padding-bottom: 12.5px;
    //make sure content is still padded appropriately
    padding: 12.5px;
    color: ${props=>props.theme.textPrimary};

    display: flex;
    width: auto;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    & img {
      margin: 25px;
      display: none;
      border-radius: ${props => props.theme.corners.borderRadius1};
      object-fit: fit;
      height: 100%;
      max-height: 100px;
      ${props => props.theme.breakpoints.lg(`display: inline-block;`)}
    }

    & .experience-date {
      font-size: ${props => props.theme.text.sizes.extraSmall};
      opacity: 0.6;
    }

    & p {
      font-size: ${props => props.theme.text.sizes.extraSmall};
      margin-bottom: 25px;
    }

    & h3 {
      margin-top: 25px;
    }
  }

  & .experience-description {
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  & .skills-used {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    & .skill {
      text-align: center;
      background: #0d7bf2;
      color: white;
      margin-left: 8.25px;
      margin-top: 8.25px;
      vertical-align: middle;
      border-radius: ${props => props.theme.corners.borderRadius1};
      padding: 8.25px;
      font-size: ${props => props.theme.text.sizes.extraSmall};
      ${props => props.theme.borderRadius1};
    }
  }
`;
