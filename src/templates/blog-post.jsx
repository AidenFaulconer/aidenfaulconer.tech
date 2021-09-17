import React, { useEffect, useCallback } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';
import stickybits from 'stickybits';
import { makeStyles, Box, Grid } from '@material-ui/core';

import blogHeroImage from '../../static/images/garden-blog.png';
// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import '../css/@wordpress/block-library/build-style/style.css';
import '../css/@wordpress/block-library/build-style/theme.css';

// import Bio from "../components/bio"
// import Seo from "../components/seo"
import Layout from '../layout/layout';
import { GoldButton } from '../components/customButton';

// ========================================================================== //
// Blog post styles
// ========================================================================== //
const useStyles = makeStyles((theme) => {
  const containerStyles = {
    // maxWidth: 1450,
    maxWidth: 1850,
    margin: 'auto',
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(0),
  };
  return ({
    blogContainer: {
      ...containerStyles,
    },
    blogPost: {
      background: 'white',
      position: 'relative',
      padding: theme.spacing(6),
      paddingTop: theme.spacing(12),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
      },
      maxWidth: 1250,
      // margin: '0 auto',
      // marginLeft: theme.spacing(3),
      border: theme.shape.brandBorderSecondary,
      boxShadow: theme.shadows.brand,
      borderRadius: theme.shape.brandBorderRadius,
    },
    tableOfContents: {
      '& li': {
        '& a': {
          textDecoration: 'none',
        },
      },
    },
    blogSideBar: {
      background: 'white',
      position: 'sticky',
      boxShadow: theme.shadows.brand,
      top: theme.spacing(12),
      padding: theme.spacing(6),
      borderRadius: theme.shape.brandBorderRadius,
      border: theme.shape.brandBorderSecondary,
      width: '100%',
      marginTop: '0 !important',
      marginBottom: 'auto',
      display: 'block',
      marginLeft: 'auto',
      marginRight: theme.spacing(0),
      [theme.breakpoints.down('lg')]: {
        position: 'fixed',
        display: 'none',
      // marginRight: 'auto',
      // marginLeft: 'auto',
      },
    },
    blogPostFeaturedImage: {
      width: '100%',
      height: '100%',
      maxHeight: '600px',
      minHeight: '525px',
      objectFit: 'cover',
    },
    suggestedBlogPost: {
      maxWidth: 350,
      margin: 'auto',
      marginBottom: theme.spacing(6),
      maxHeight: 500,
      border: theme.shape.brandBorderSecondary,
      boxShadow: theme.shadows.brandBig,
      borderRadius: theme.shape.brandBorderRadius,
      padding: theme.spacing(6),
      color: theme.palette.text.primary,
      background: theme.palette.background.main,
      textDecoration: 'none',
      '& img': {
        border: theme.shape.brandBorder,
      },
    },
    otherBlogPosts: {
      ...containerStyles,
    },
    blogHeroUnderlay: {
      marginTop: '-80px',
      marginBottom: '20px',
      paddingTop: '50px',
      paddingBottom: '20px',
      height: '750px',
      width: '100vw',
      zIndex: 0,
      position: 'absolute !important',

      '& img': {
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        width: '100%',
      },

      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: '#334409',
        zIndex: -1,
        height: '100%',
        width: '100%',
      },

      bottomCutout: {
        zIndex: 1,
        position: 'relative',
        marginTop: theme.spacing(12),
        marginBottom: -theme.spacing(12),
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: `${theme.spacing(6)}px ${theme.spacing(6)}px`,
        background: theme.palette.background.main,

      },

      heroCutout: {
        position: 'absolute',
        bottom: '-175px',
        left: '0px',
        top: 0,
        margin: 'auto',
        marginBottom: -theme.spacing(6),
        width: '100vw',
        color: theme.palette.background.default,
      },
    },
  });
});

// ========================================================================== //
// Blog post template
// ========================================================================== //
const BlogPostTemplate = ({ data: { previous = {}, next = {}, post = {} } }) => {
  const classes = useStyles();
  useEffect(() => {
    stickybits('#stickySideBar', { usePlaceholder: true });
  }, []);

  const postFeaturedImage = post?.featuredImage?.node;
  const featuredImage = {
    fluid: postFeaturedImage?.localFile?.childImageSharp?.fluid,
    alt: postFeaturedImage?.alt || '',
    src: postFeaturedImage?.localFile?.relativePath,
  };

  // ========================================================================== //
  //   Blog suggestions
  // ========================================================================== //
  const blogSuggestionLink = useCallback((blogPostData, type) => {
    const postLink = `/blog${blogPostData?.uri}`;
    const featuredImage = blogPostData?.featuredImage?.node;
    const otherBlogFeatured = {
      fluid: featuredImage?.localFile?.childImageSharp?.fluid,
      alt: featuredImage?.alt || '',
      src: featuredImage?.localFile?.relativePath,
    };
    // console.log(postLink, blogPostData);
    return (
      <Grid item xs={12} sm={6} className={classes.suggestedBlogPost}>
        <Image
          fixed
          objectFit="contain"
          src={otherBlogFeatured?.src}
          fluid={otherBlogFeatured?.fluid}
          alt={otherBlogFeatured?.alt}
          style={{ marginBottom: 50 }}
        />
        <Link to={postLink} rel="prev">
          <GoldButton size="large">
            {parse(blogPostData?.title)}
          </GoldButton>
          {/* ← */}
          {/* {' '} */}
        </Link>
      </Grid>
    );
  }, []);

  return (
    <Layout seo={{ title: post.title, description: post.excerpt }}>
      <div className={classes.blogHeroUnderlay}>
        <img src={blogHeroImage} alt="welcome to the blog graphic" />
        <svg
          height="140"
          viewBox="0 0 1920 140"
          className={classes.heroCutout}
          preserveAspectRatio="none"
        >
          <path
            d="M0 139.993C0 139.993 584.204 139.979 959.548 139.994C1335.24 140.008 1920 139.993 1920 139.993V47.3841C1920 47.3841 1335.51 -0.0173798 959.548 0C583.938 0.0173645 0 47.3841 0 47.3841V139.993Z"
            fill="#E1F2D4"
          />
        </svg>
      </div>

      <Grid container className={classes.blogContainer} spacing={12} alignContent="center" justifyContent="flex-start" alignItems="center">

        {/* table of contents if one exists */}
        {(post?.toc?.items.length > 1) && (
          <Grid item xs={2} id="#stickySideBar" className={classes.blogSideBar}>
            <TableOfContent toc={post?.toc} />
          </Grid>
        ) }

        <Grid item className={classes.blogPost} lg={8} xs={10}>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline">{parse(post?.title || '')}</h1>

              <p>{post.date}</p>

              {/* if we have a featured image for this post let's display it */}
              {featuredImage?.fluid && (
                <div className={classes.blogPostFeaturedImage} id="#top">
                  <Image
                    fluid={featuredImage.fluid}
                    alt={featuredImage.alt}
                    style={{ marginBottom: 50, maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </header>

            {!!post.content && (
              <section itemProp="articleBody">{parse(post?.content || '')}</section>
            )}

            <hr />

            <footer>
              {/* <Bio /> */}
            </footer>
          </article>
        </Grid>

        {/* will include comments, likes, subscribe to newsletter, etc */}
        {/* <Grid item xs={1} id="#stickySideBar" className={classes.blogSideBar}>
          Social Media
        </Grid> */}
      </Grid>

      <Grid container xs={12} spacing={0} tyles={{ marginBottom: '100px' }} className={classes.otherBlogPosts} alignContent="flex-end" justifyContent="flex-start" alignItems="baseline">
        {previous && blogSuggestionLink(previous, 'previous')}
        {next && blogSuggestionLink(next, 'next')}
      </Grid>

      {/* <div className={classes.blogHeroUnderlay}>
        <img src={blogHeroImage} />
      </div> */}

    </Layout>
  );
};

// ========================================================================== //
// Table of contents
// ========================================================================== //
const renderTableOfContentItems = (items/** array */) => {
  const classes = useStyles();

  return (
    <ol className={classes.tableOfContents}>
      {items.map(({ url, title, items }) => (
        <li key={url}>
          <a href={url}>{title}</a>
          {items && items.length && renderTableOfContentItems(items)}
        </li>
      ))}
    </ol>
  );
};

const TableOfContent = ({ toc, className }) => (
  <aside className={className}>
    <h2>Table of contents</h2>
    {renderTableOfContentItems(toc.items)}
  </aside>
);

// ========================================================================== //
// graphql blog query
// ========================================================================== //
export const pageQuery = graphql`
query BlogPost(
  # these variables are passed in via createPage.pageContext in gatsby-node.js
  $id: String!
  $previousPostId: String
  $nextPostId: String
) {
  # selecting the current post by id
  post: wpPost(id: { eq: $id }) {
    id
    excerpt
    content
    title
    toc
    date(formatString: "MMMM DD, YYYY")

    featuredImage {
      node {
        altText
        localFile {
          absolutePath
          publicURL
          relativePath
          childImageSharp {
            fluid(maxWidth: 1000,maxHeight: 1000, quality: 100) {
              # ...GatsbyImageSharpFluid_tracedSVG
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

  # this gets us the previous post by id (if it exists)
  previous: wpPost(id: { eq: $previousPostId }) {
    uri
    title
      featuredImage {
      node {
        altText
        localFile {
          absolutePath
          publicURL
          relativePath
          childImageSharp {
            fluid(maxWidth: 250,maxHeight:150, quality: 100) {
              # ...GatsbyImageSharpFluid_tracedSVG
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

  # this gets us the next post by id (if it exists)
  next: wpPost(id: { eq: $nextPostId }) {
    uri
    title
      featuredImage {
      node {
        altText
        localFile {
          absolutePath
          publicURL
          relativePath
          childImageSharp {
            fluid(maxWidth: 250,maxHeight: 150, quality: 100) {
              # ...GatsbyImageSharpFluid_tracedSVG
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}`;

export default BlogPostTemplate;
