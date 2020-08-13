import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { InView, useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { graphql, StaticQuery, Link } from "gatsby";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import { INVIEWCONFIG } from "../page-builders/index-builder";

// #region projects
// export const projectData = [
//   {
//     imgsrc: "./assets/755729.jpg",
//     title: "loreum ipsum",
//     description: "a description"
//   },
//   {
//     imgsrc: "./assets/image-1.jpg",
//     title: "hello world",
//     description: "a description"
//   },
//   {
//     imgsrc: "./assets/755729.jpg",
//     title: "loreum ipsum",
//     description: "a description"
//   },
//   {
//     imgsrc: "./assets/755729.jpg",
//     title: "loreum ipsum",
//     description: "a description"
//   },
//   {
//     imgsrc: "./assets/755729.jpg",
//     title: "loreum ipsum",
//     description: "a description"
//   },
//   {
//     imgsrc: "./assets/755729.jpg",
//     title: "loreum ipsum",
//     description: "a description"
//   }
// ];

export default ({ data, sectionName, odd, setCurrentSection }) => {
  const [selected, selectProject] = useState(0);
  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd }); // entry.target.id)
    }
  }, [inView]);

  return (
    <StaticQuery
      query={projectsQuery}
      render={data => {
        const rawProjectData = data.allMarkdownRemark.edges;
        const selectedProject =
          data.allMarkdownRemark.edges[selected].node.frontmatter;
        return (
          <>
            <DisplayImage ref={ref} src={selectedProject.thumbnail_}>
              <Link to={selectedProject.path}>
                <img src={selectedProject.thumbnail_} alt="display image" />
              </Link>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.metaDescription}</p>
              <Link to={selectedProject.path}>
                <BtnSecondary text="see more" />
              </Link>
            </DisplayImage>
            <ImageGrid>
              {rawProjectData.map((project, i) => {
                const { frontmatter } = project.node;
                return (
                  <div className="preview-content">
                    <img
                      alt="Selectable project view"
                      src={frontmatter.thumbnail_}
                      onClick={() => selectProject(i)}
                    />
                    <h3>{i}.</h3>
                    <p>{frontmatter.title}</p>
                  </div>
                );
              })}
            </ImageGrid>
          </>
        );
      }}
    />
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
    padding: 8px;
    background: ${props => props.theme.colors.textSecondary};
    ${props => props.theme.transitions.primary("transform")};

    & img {
      border-radius: ${props => props.theme.corners.borderRadius1};
      height: 350px;
      width: 106%;
      max-height: 200px;
      object-fit: contain;
      opacity: 0.9;
      margin: -8px;
      margin-bottom: 8px;

      ${props =>
        props.theme.breakpoints.md(`
      `)}
      ${props =>
        props.theme.breakpoints.lg(`
      `)}
    }

    &:hover {
      transform: scale(1.04);
      ${props => props.theme.transitions.primary("transform")};
      border: 1px solid ${props => props.theme.colors.secondary};
      & img {
        box-shadow: ${props => props.theme.shadows.primary};
      }
    }

    & h3 {
    }

    & p {
      margin-top: 25px;
      text-align: center;
    }
  }
`;

const DisplayImage = styled.article`
  left: 0px;
  display: flex;
  margin-right: 100px;
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
    max-width: 100%;
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
    max-width: 100%;
    margin: 0px 0px;
  }
  & h3 {
    margin-top: 25px;
    position: realtive;
  }
  & p {
    margin-top: 12.5px;
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

export const projectsQuery = graphql`
  query projectSectionQuery {
    allMarkdownRemark(
      filter: { frontmatter: { catagory: { regex: "/P|project/" } } }
      limit: 6
      sort: { fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            catagory
            thumbnail_
            title
            date
            metaDescription
            path
          }
        }
      }
    }
  }
`;
