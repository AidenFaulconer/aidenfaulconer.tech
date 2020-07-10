import React from "react";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import BlogBuilder from "../components/blog-builder";
import PostLink from "../components/post-link";

// <GraphicWave dangerouslySetInnerHTML={{ __html: lhs }} />

const blogPage = React.memo(
  ({
    data: {
      site,
      allMarkdownRemark: { edges }
    }
  }) => {
    const Posts = edges
      .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
      .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

    return (
      <Layout>
        <script src="https://cdn.rawgit.com/LeaVerou/conic-gradient/609dc5f4/conic-gradient.js" />

        <Helmet>
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
        </Helmet>
        <BlogBuilder />
      </Layout>
    );
  }
);
// {Posts}

export default blogPage;
export const pageQuery = graphql`
  query visualisationsPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`;
