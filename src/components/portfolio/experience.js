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
            <div className="skill">{skill.skill}</div>
          ))}
        </div>
        <h3>About the role</h3>
        <p className="experience-description">
          {currentExpereince.experienceDescription}
        </p>
      </SelectedExperience>
      <Experiences ref={ref}>
        {data.languages.map((experience, index) => {
          return (
            <div
              onClick={() => selectExperience(index)}
              className={`experience ${
                selectedExperience === index ? "active" : ""
              }}`}
              role="select experience"
            >
              <h3>{experience.experienceRole}</h3>
              <p>{experience.experienceEmployer}</p>
              <img src={experience.image} alt="experience selection preview" />
            </div>
          );
        })}
      </Experiences>
    </>
  );
};

const Experiences = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  height: 100%;
  z-index: 0;

  & .experience {
    background: white;
    margin: 25px;
    padding: 25px;
    border-radius: 10px 50px 50px 10px;
    max-height: 100px;
    height: 100px;
    color: black;
    position: relative;
    & img {
      z-index: 2;
      border-radius: ${props => props.theme.corners.borderRadius100};
      position: absolute;
      max-height: 100%;
      right: 0px;
      margin: auto;
      top: 0px;
      transform: scale(1.04);
    }

    & p {
      text-align: left;
      margin: auto;
      font-size: ${props => props.theme.text.sizes.small};
    }

    & h3 {
      text-align: left;
      margin: auto;
    }

    ${props => props.theme.transitions.primary("transform")};
    &:hover {
      transform: scale(1.04);
      box-shadow: ${props => props.theme.shadows.primary};
      border: ${props => props.theme.borders.secondary};
    }

    & .active {
      box-shadow: ${props => props.theme.shadows.primary};
      border: ${props => props.theme.borders.secondary};
    }
  }
`;
const SelectedExperience = styled.div`
  border-radius: ${props => props.theme.corners.borderRadius2};
  min-height: 350px;
  padding: 12.5px;
  margin: 6.25px;
  width: 50%;
  background: white;
  color: black;
  overflow: hidden;
  background: ${props => props.theme.colors.innerContentColor};

  & .experience-heading {
    margin-bottom: 25px;
    min-width: 104%;
    margin-top: -12.5px;
    margin-left: -12.5px;
    padding-bottom: 12.5px;
    display: flex;
    width: auto;
    background: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 100%;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    & img {
      margin: 25px;
      display: inline-block;
      border-radius: ${props => props.theme.corners.borderRadius1};
      object-fit: fit;
      width: 10%;
      max-height: 100px;
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
    row-gap: 8px;
    column-gap: 8px;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    & .skill {
      text-align: center;
      background: #0d7bf2;
      color: white;
      vertical-align: middle;
      border-radius: ${props => props.theme.corners.borderRadius1};
      padding: 8.25px;
      font-size: ${props => props.theme.text.sizes.extraSmall};
      ${props => props.theme.borderRadius1};
    }
  }
`;
