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
              <div>
                <div>
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.metaDescription}</p>
                </div>
                <Link to={selectedProject.path}>
                  <BtnSecondary text="see more" padding="12.5px 25px" />
                </Link>
              </div>
            </DisplayImage>
            <ImageGrid>
              {rawProjectData.map((project, i) => {
                const { frontmatter } = project.node;
                return (
                  <div
                    className="preview-content"
                    key={`${frontmatter.title}-project`}
                    onClick={() => selectProject(i)}
                  >
                    <img
                      alt="Selectable project view"
                      src={frontmatter.thumbnail_}
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
  position: relative;
  overflow: hidden;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 50px;

  ${props =>
    props.theme.breakpoints.lg(`
      width: 100%;
      grid-template-columns: 1fr 1fr;
  `)}

  & .preview-content {
    border-radius: ${props => props.theme.corners.borderRadius1};
    ${props => props.theme.transitions.primary("transform")};
    background: ${props => props.theme.colors.textPrimary};
    overflow: hidden;

    & img {
      ${props => props.theme.transitions.primary("transform")};
      ${props => props.theme.breakpoints.md(`max-height: 200px;`)}
      position: relative;
      max-height: 50px;
      object-fit: fit;
      opacity: 0.9;
      width: 106%;
      top: -10px;
      left: -2px;
    }

    &:hover {
      transform: scale(1.05);
      & img {
        transform: scale(1.08);
        ${props => props.theme.transitions.primary("transform")};
      }
      ${props => props.theme.transitions.primary("transform")};
      box-shadow: ${props => props.theme.shadows.primary};
    }
    & h3 {
      margin: 6.25px 12.5px;
      font-size: ${props => props.theme.text.sizes.small};
    }
    & p {
      margin: 6.25px 12.5px;
      font-size: ${props => props.theme.text.sizes.extraSmall};
    }
  }
`;

const DisplayImage = styled.article`
  left: 0px;
  display: flex;
  position: relative;
  flex-direction: column;
  color: inherit;
  text-align: center;

  & a {
    align-self: center;
    display: inline-block;
  }

  ${props =>
    props.theme.breakpoints.sm(`
    text-align: left;
    max-height: 600px;
    width: 50%;
    margin: 50px auto;
    & a { align-self: flex-start;}
  `)}

  ${props =>
    props.theme.breakpoints.md(`
    margin-right: 100px;
    width: 100%;
  `)}

  &:hover {
    & img {
      cursor: pointer;
      ${props => props.theme.mixins.transform3dPrimary};
      box-shadow: ${props => props.theme.shadows.primary};
      ${props => props.theme.transitions.primary("transform")};
    }
  }

  & img {
    border-radius: ${props => props.theme.corners.borderRadius1};
    ${props => props.theme.transitions.primary("transform")};
    max-height: 150px;
    max-width: 100%;
    margin: 0px 0px;

    ${props =>
      props.theme.breakpoints.sm(`
        max-height: 200px;
        width: 595px;
        height: 434px;
    `)}

    ${props =>
      props.theme.breakpoints.md(`
        max-height: 600px;
    `)}
  }
  & h3 {
    margin-top: 25px;
  }
  & p {
    margin-top: 12.5px;
    position: relative;
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
