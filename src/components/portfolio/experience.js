import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import {INVIEWCONFIG} from "../index-builder"

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

export default ({ sectionName,odd,setCurrentSection }) => {
  const [selectedExperience, selectExperience] = useState(
    "australianwarmemorial"
  );

  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({name:sectionName,odd:odd});
    }
  }, [inView]);

  return (
    <>
      <Experiences ref={ref}>
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
// #endregion experience
