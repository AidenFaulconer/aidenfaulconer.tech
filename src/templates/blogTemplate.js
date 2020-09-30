import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import Layout from "../components/layout";


export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data; // data.markdownRemark holds your post data
  const { siteMetadata } = site;
  const { frontmatter, html } = markdownRemark;

  // alert(JSON.stringify(data));

  return (
    <Layout pageType="blog">
      <Row noGutters>
        <Col xl={1} sm={1} xs={1} />
        <Col xl={10} xs={10}>
          <Post src={frontmatter.thumbnail_}>
            {!frontmatter.thumbnail_ && (
              <>
                <div className="post-thumbnail" />
                <div className="post-details">
                  <h1 className="post-title">{frontmatter.title}</h1>
                  <div className="post-meta">{frontmatter.date}</div>
                </div>
              </>
            )}
            {!!frontmatter.thumbnail_ && (
              <>
                <div className="post-details">
                  <h1 className="post-title">{frontmatter.title}</h1>
                  <div className="post-meta">{frontmatter.date}</div>
                </div>
                <div className="post-thumbnail" />
              </>
            )}
          </Post>
          <BlogContent dangerouslySetInnerHTML={{ __html: html }} />
        </Col>
        <Col xl={1} sm={1} xs={1} />
      </Row>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail_
        template
        metaDescription
        catagory
      }
      tableOfContents
      timeToRead
    }
  }
`;

//       <Helmet>
//         <title>
//           {frontmatter.title}
// {' '}
// |
// {siteMetadata.title}
//         </title>
//         <meta name="description" content={frontmatter.metaDescription} />
//       </Helmet>

// border-top: 1px solid
//   ${props =>
//     props.theme.name === "dark"
//       ? "rgba(255, 255, 255, 0.25)"
//       : "rgba(0, 0, 0, 0.25)"};

const BlogContent = styled.section`
  margin-top: 25px;
  font-family: "poppins";
  padding: 100px 5vw;
  overflow-x: hidden;
  color: ${props => props.theme.colors.textSecondary};

  & img {
    display: block;
    object-fit: contain;
    max-width: 100%;
    background-origin: center;
    margin: 25px auto;
  }

  & * {
    line-height: 175%;
  }

  & .carousel {
    display: flex;
    flex-direction: row;
  }

  & .image-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  & h1 {
    font-size: 1.5em;
    margin-bottom: 25px;
    margin-top: 50px;
    font-family: "poppins";
    font-weight: bolder;
  }

  & h2 {
    font-size: 1.5em;
    margin-top: 50px;
    font-weight: bolder;
    margin-bottom: 25px;
    font-family: "poppins";
  }
  & h3 {
    font-weight: bolder;
    font-size: 1.5em;
    margin-top: 50px;
    margin-bottom: 25px;
    font-family: "poppins";
  }
`;

const Post = styled.article`
  margin-top: 150px;
  color: ${props => props.theme.colors.textSecondary};
  padding: 100px 0vw;
  display: flex;
  flex-direction: row;
  order: 0;

  & .post-details {
    flex: auto;
    padding: 25px;

    & .post-title {
      ${props=>props.theme.breakpoints.md(`font-size: 3em;`)}
      color: ${props => props.theme.colors.textSecondary};
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
      color: ${props => props.theme.colors.textSecondary};
    }
  }

  & .post-thumbnail {
    position: absolute;
    order: 1;
    left: 0px;
    opacity: .25;
    top:0px;
    z-index: -1;
    height: 60vh;
    width: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
