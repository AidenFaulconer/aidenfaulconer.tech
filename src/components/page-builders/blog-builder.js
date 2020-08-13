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

import { StaticQuery, graphql, Link } from "gatsby";

import filterIcon from "@iconify/icons-mdi/filter-variant";
import { useTheme } from "emotion-theming";
import ThreeBlog from "../blog/three-blog";
import { Btn, BtnPrimary, BtnSecondary } from "../buttons";

// #region blog card
export const BlogCard = ({ data }) => {
  const [selected, selectProject] = useState(0);

  return <div>{JSON.stringify(data)}</div>;
};
// #endregion blog card

// #region section builder
// keys must be Capitalized for react to render them

const sectionIcons = {
  Projects: projectsIcon,
  Test: projectsIcon,
  Test1: projectsIcon
};

const mockData = [
  {
    mediaSrc: "./assets/becca-tapert-sY5RjMB1KkE-unsplash.jpg",
    title: "title",
    catagory: "technology",
    description: "description"
  }
];

export const catagories = ["technology", "design", "workflow", "discovery"];

export default React.memo(() => {
  const [featuredBlog, setFeaturedBlog] = useState(0);
  const [filteredBlogs, setFilteredBlogs] = useState([0, 1, 2, 3, 4]);
  const theme = useTheme();

  const [selectedFilters, selectFilters] = useState({
    design: true,
    technology: true
  }); // toggle filters by default

  const filterBlogs = useCallback((data, filters) => {
    return data.filter((current, i) => filters.includes(current));
  });
  // https://www.npmjs.com/package/react-intersection-observer#polyfill

  // handle a section coming into view
  useEffect(() => {
    console.log(filteredBlogs);
  }, [filteredBlogs]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  return (
    <StaticQuery
      //       //       query={graphql`
      query={blogPageQuery}
      render={data => {
        const catagoryMappings = {};
        // alert(JSON.stringify(data));
        const rawBlogData = data.allMarkdownRemark.edges;
        const featuredBlog = rawBlogData[0].node.frontmatter;
        return (
          <>
            <Row noGutters>
              <Col
                xl={1}
                lg={1}
                md={1}
                className="d-sm-none d-md-none d-lg-block"
              />

              <Col xl={6} lg={6} md={10}>
                <Link to={featuredBlog.path}>
                  <FeaturedBlog src={featuredBlog.thumbnail_}>
                    <img src={featuredBlog.thumbnail_} />
                    <div className="featured-content">
                      <h2>{featuredBlog.title}</h2>
                      <p>{featuredBlog.metaDescription}</p>
                      <h3>read more</h3>
                    </div>
                  </FeaturedBlog>
                </Link>
              </Col>

              <Col xl={2} lg md={10}>
                <OtherBlogs>
                  {rawBlogData.map((blog, i) => {
                    const blogData = blog.node.frontmatter;
                    return (
                      <Link to={blogData.path}>
                        <div className="card">
                          <img src={blogData.thumbnail_} />
                          <p>{blogData.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </OtherBlogs>
              </Col>

              <Col
                xl={2}
                lg={2}
                style={{ marginTop: "0px" }}
                className="d-xs-none d-sm-none d-md-none d-xl-block "
              >
                <img
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    marginTop: "-100px"
                  }}
                  className="graphic"
                  src={`./assets/svg/blog-graphic-${theme.name}.png`}
                />
              </Col>

              <Col
                xl={1}
                lg={1}
                md={1}
                className="d-sm-none d-md-none d-lg-block"
              />
            </Row>
          </>
        );
      }}
    />
  );
});
// #endregion section builder
const Test = styled.div``;

const FeaturedBlog = styled.article`
  position: relative;
  width: 832px;
  height: 484px;
  z-index: 2;
  background: ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.primary};
  color: ${props => props.theme.colors.textPrimary};
  border-radius: ${props => props.theme.corners.borderRadius1};
  overflow: hidden;

  & img {
    object-fit: fit;
    position: relative;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 35%;
  }


  &:hover {
      cursor: pointer;
      box-shadow: ${props => props.theme.shadows.primary};
  }


    ${props => props.theme.transitions.primary("transform")};
    &:hover {
      cursor: pointer;
      box-shadow: ${props => props.theme.shadows.primary};
      ${props => props.theme.transitions.primary("transform")};
      transform: scale(1.025);
  }

  & .featured-content {
    padding: 12.5px;
  z-index: 2;
    position: absolute;
    content: "";
    width: 65%;
    height: 100%;
    object-fit: cover;
    right: 0px;
    top: 0px;
    z-index: 0;
    background: ${props => props.theme.colors.primary};
    // box-shadow: ${props => props.theme.shadows.primary};

    & h2 {
      position: relative;
      top: 0px;
      left: 0px;
    }
    & p {
      top: 0px;
      right: 0px;
      position: relative;
    }
    & h3 {
      bottom: 0px;
      left: 0px;
      margin: 12.5px;
      position: absolute;
      text-transform: capitalize;
    }
  }
`;

const OtherBlogs = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 200px;
  width: 100%;
  margin-left: -50px;
  & .card {
    z-index: 2;
    postiion: relative;
    height: 150px;
    width: 200px;
    margin: 6px;
    border: none;
    border-radius: ${props => props.theme.corners.borderRadius1};
    color: ${props => props.theme.colors.textPrimary};

    & img {
      width: 100%;
    }
    & p {
      position: absolute;
      bottom: -16px;
      padding: 6.125px;
      background: ${props => props.theme.colors.primary};
      width: 100%;
    }

    ${props => props.theme.transitions.primary("all")};
    &:hover {
      cursor: pointer;
      ${props => props.theme.mixins.transform3dPrimary};
      box-shadow: ${props => props.theme.shadows.primary};
      ${props => props.theme.transitions.primary("all")};
    }
  }
`;

const Header = styled.div`
  margin-top: 125px;
  margin-bottom: 12.5px;
  font-size: ${props => props.theme.text.sizes.title};
  color: ${props => props.theme.colors.textPrimary};
  font-weight: bolder;
  font-family: "brown-bold";
`;
export const blogPageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      filter: { frontmatter: { catagory: { regex: "/(B|blog)|(P|project)/" } } }
      limit: 3
      sort: { fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            catagory
            thumbnail_
            title
            date(formatString: "DD MMMM YYYY")
            metaDescription
            path
          }
        }
      }
    }
  }
`;
