import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { InView, useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import { INVIEWCONFIG } from "../index-builder";

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

export default ({ sectionName, odd, setCurrentSection }) => {
  const [selected, selectProject] = useState(0);
  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd }); // entry.target.id)
    }
  }, [inView]);

  return (
    <motion.div>
      <ImageGrid>
        {projectData.map((project, i) => (
          <div className="preview-content">
            <img
              alt="Selectable project view"
              src={project.imgsrc}
              onClick={() => selectProject(i)}
            />
            <h3>{i}.</h3>
            <p>descripton</p>
          </div>
        ))}
      </ImageGrid>
      <DisplayImage ref={ref} src={projectData[selected].imgsrc}>
        <img src={projectData[selected].imgsrc} alt="display image" />
        <h3>{projectData[selected].title}</h3>
        <p>{projectData[selected].description}</p>
        <BtnSecondary text="see more" />
      </DisplayImage>
    </motion.div>
  );
};

// #region projecet styles
const ImageGrid = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  display: grid;
  width: 20%;

  ${props =>
    props.theme.breakpoints.lg(`
  width: 50%;
      `)}

  & .preview-content {
    & img {
      border-radius: ${props => props.theme.corners.borderRadius1};
      width: 250px;
      height: 350px;
      max-height: 125px;
      object-fit: cover;
      opacity: 0.9;
      margin: -8px;
      margin-bottom: 8px;
      ${props => props.theme.transitions.primary("transform")};

      ${props =>
        props.theme.breakpoints.md(`
      `)}
      ${props =>
        props.theme.breakpoints.lg(`
      `)}
    }

    &:hover {
      transform: scale(1.05);
      ${props => props.theme.transitions.primary("transform")};
      border: ${props => props.theme.borders.primary};
      & img {
        box-shadow: ${props => props.theme.shadows.primary};
      }
    }

    padding: 8px;
    background: ${props => props.theme.colors.textSecondary};
    & h3 {
    }

    & p {
      text-align: center;
    }
  }
`;

const DisplayImage = styled.article`
  left: 0px;
  display: flex;
  margin-left: 100px;
  position: relative;
  flex-direction: column;
  max-height: 600px;
  color: inherit;

  ${props =>
    props.theme.breakpoints.lg(`
  width: 50%;
      `)}

  &::after {
    content: "";
    width: 595px;
    height: 434px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    background-image: url(${props => props.src});
    opacity: 0.6;
    z-index: -1;
    transform: rotate(-3deg);
    box-shadow: ${props => props.theme.shadows.primary};
    ${props => props.theme.transitions.primary("transform")};
  }

  &:hover {
    & img {
    cursor: pointer;
      ${props => props.theme.mixins.transform3dPrimary};
      box-shadow: ${props => props.theme.shadows.primary};
      ${props => props.theme.transitions.primary("transform")};
    }
    &::after {
    cursor: pointer;
      ${props => props.theme.mixins.transform3dSecondary};
      box-shadow: ${props => props.theme.shadows.primary};
      ${props => props.theme.transitions.primary("transform")};
    }
  }

  & img {
    box-shadow: ${props => props.theme.shadows.primary};
    ${props => props.theme.transitions.primary("transform")};
    width: 595px;
    height: 434px;
    margin: 0px 0px;
  }
  & h3 {
    margin-top: 25px;
    position: realtive;
  }
  & p {
    margin-top: 8px;
    position: realtive;
  }
  & button {
    margin-top: 8px;
    position: relative;
    max-width: 300px;
    bottom: 0px;
    left: 0px;
  }
`;
// #endregion projecet styles
// #endregion projects
