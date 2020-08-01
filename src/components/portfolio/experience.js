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

  return (
    <>
      <Experiences ref={ref}>
        <Timeline />
        {data.languages.map((experience, index) => {
          return (
            <div
              onClick={() => selectExperience(index)}
              className=".experience"
              role="select experience"
            >
              <h3>{experience.experienceRole}</h3>
              <p>{experience.experienceEmployer}</p>
              <img
                src={experience.image}
                alt="experience selection preview"
                className={
                  experience.experienceEmployer === selectedExperience
                    ? "active"
                    : ""
                }
              />
            </div>
          );
        })}
      </Experiences>
      <SelectedExperience>
        <div className="experience-heading">
          <img
            src={experiences[selectedExperience].image}
            alt="experience selection preview"
          />
          <div>
            <h3>{experiences[selectedExperience].experienceEmployer}</h3>
            <h3>{experiences[selectedExperience].experienceRole}</h3>
          </div>
        </div>
        <p>{experiences[selectedExperience].experienceDescription}</p>
      </SelectedExperience>
    </>
  );
};

const Timeline = styled.div`
  height: 100%;
  width: 100%;
  top: 0px;
  z-index: 0;
  transform: translateZ(-1); //forces this to be below the expereince cards
  & .experience {
    width: 100%;
    opacity: 0.3;
    background: white;
    border-radius: 10px 30px 30px 10px;
  }
  & img {
    right: 0px;
  }
`;
const Experiences = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  height: 100%;

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
  width: 50%;
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
