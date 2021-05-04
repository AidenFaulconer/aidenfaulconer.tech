import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../../layout/layout";

export default ({ otherBlogs }) => {
  return (
    <Container>
      Read more
      {otherBlogs.map((post, i) => {
        //  alert(JSON.stringify(post, null, 2))
        const {
          catagory,
          path,
          title,
          thumbnail_,
          metaDescription,
        } = post.node.frontmatter;
        return (
          <Link to={path} className="post">
            <img src={thumbnail_} />
            <h3>{title}</h3>
            <p>{catagory}</p>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  margin: 50px 0px;
  margin-bottom: 200px;
  display: flex;
  flex: 2 2;

  & .post {
    width: 100%;
    padding: 12.5px;
    margin: 25px;
    height: 100%;
    ${"" /* ${(props) => props.theme.transitions.primary("all")}; */}
    ${"" /* border-radius: ${(props) => props.theme.corners.borderRadius1}; */}

    &:hover {
      ${"" /* ${(props) => props.theme.transitions.primary("all")}; */}
      ${"" /* ${(props) => props.theme.mixins.transform3dPrimary}; */}
      ${"" /* box-shadow: ${(props) => props.theme.shadows.primary}; */}
    }

    & img {
      width: 100%;
      object-fit: fit;
      max-height: 300px;
      height: 100%;
      ${
        "" /* border-radius: ${(props) => props.theme.corners.borderRadius1}; */
      }
    }

    & p {
      text-decoration: none;
      ${"" /* font-size: ${(props) => props.theme.text.sizes.extraSmall}; */}
      ${"" /* color: ${(props) => props.theme.colors.textSecondary}; */}
    }

    & h3 {
      margin-top: 25px;
      margin-bottom: 12.5px;
      margin-left: 0px;
      text-decoration: none;
      ${"" /* color: ${(props) => props.theme.colors.textSecondary}; */}
    }
  }
`;

const Post = styled.article`
  margin-top: 7vw;
  ${"" /* color: ${(props) => props.theme.colors.textSecondary}; */}
  padding: 100px 0vw;
  display: flex;
  flex-direction: row;
  order: 0;

  & .post-details {
    flex: auto;
    padding: 25px;

    & .post-title {
      ${"" /* ${(props) => props.theme.breakpoints.md(`font-size: 3em;`)} */}
      ${"" /* color: ${(props) => props.theme.colors.textSecondary}; */}
      text-transform: capitalcase;
      margin-bottom: 6.125px;
      font-weight: bolder;
      text-align: center;
      font-size: 1.75em;
      font-weight: bold;
      z-index: 3;
    }

    & .post-meta {
      text-align: center;
      font-family: "brown";
      ${"" /* color: ${(props) => props.theme.colors.textSecondary}; */}
    }
  }

  & .post-thumbnail {
    position: absolute;
    order: 1;
    left: 0px;
    opacity: 0.25;
    top: 0px;
    z-index: -1;
    height: 60vh;
    width: 100%;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
