import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby"; 
import Layout from "../layout/layout";
import Reccomendations from "./components/reccomendations";

const useStyles = makeStyles(theme => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
  post: {}
}))

export default (props) => {
  const classes = useStyles();
  const { site, markdownRemark } = props.data; // data.markdownRemark holds your post data
  const { siteMetadata } = site;
  const { frontmatter, html } = markdownRemark;
  const { otherBlogs } = props.pageContext;

  // alert(JSON.stringify(data));

  return (
    <Layout pageType="blog">
      <div className="row no-gutters">
        <div className="col" />
        <div className="col" />
        <div className={classes.post} src={frontmatter.thumbnail_}>
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
        </div>
        <BlogContent dangerouslySetInnerHTML={{ __html: html }} />
        <Reccomendations otherBlogs={otherBlogs} />
      </div>
      <col className="col" />
    </Layout>
  );
};

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
 