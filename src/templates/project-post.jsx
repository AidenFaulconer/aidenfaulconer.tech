import React, { useEffect, useCallback } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';
import stickybits from 'stickybits';
import {
  makeStyles, Box, Grid, useTheme,
} from '@material-ui/core';

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version

// import Bio from "../components/bio"
// import Seo from "../components/seo"
import Layout from '../../layout/layout';
import { RegularButton, SecondaryButton } from '../custom/buttons';

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
      border: theme.custom.borders.brandBorderSecondary,
      boxShadow: theme.custom.shadows.brand,
      borderRadius: theme.custom.borders.brandBorderRadius,
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
      boxShadow: theme.custom.shadows.brand,
      top: theme.spacing(12),
      padding: theme.spacing(6),
      borderRadius: theme.custom.borders.brandBorderRadius,
      border: theme.custom.borders.brandBorderSecondary,
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
    //   maxWidth: 350,
      margin: 'auto',
      marginBottom: theme.spacing(6),
      //   maxHeight: 500,
      border: theme.custom.borders.brandBorderSecondary,
      boxShadow: theme.custom.shadows.brandBig,
      borderRadius: theme.custom.borders.brandBorderRadius,
      padding: theme.spacing(6),
      color: theme.palette.text.primary,
      background: theme.palette.text.primary,
      textDecoration: 'none',
      '& img': {
        border: theme.custom.borders.brandBorder,
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
  const theme = useTheme();

  useEffect(() => {
    stickybits('#stickySideBar', { usePlaceholder: true });
  }, []);

  //   alert(JSON.stringify(previous, null, 2));
  const {
    path, title, metaDescription, thumbnail, template, date, catagory,
  } = post.edges[0].node.frontmatter;
  const {
    html, excerpt, tableOfContents, timeToRead,
  } = post.edges[0].node;

  // ========================================================================== //
  //   Blog suggestions
  // ========================================================================== //
  const blogSuggestionLink = useCallback((blogPostData, type) => {
    const {
      path, title, metaDescription, thumbnail, template, date, catagory,
    } = post.edges[0].node.frontmatter;
    // console.log(postLink, blogPostData);
    return (
      <Grid item container justify="center" xs={4} className={classes.suggestedBlogPost}>
        <img
          src={thumbnail}
          style={{
            position: 'relative',
            display: 'inline',
            width: '100%',
            height: '100%',
            maxWidth: 200,
            maxHeight: 200,
            objectFit: 'cover',
            marginBottom: theme.spacing(2),
          }}
        />
        <Link to={path || '/'} rel="prev">
          <SecondaryButton size="large">
            {parse(title)}
          </SecondaryButton>
          {/* ← */}
          {/* {' '} */}
        </Link>
      </Grid>
    );
  }, []);

  return (
    <>
      {/* <div className={classes.blogHeroUnderlay}>
        <img src={template} alt="welcome to the blog graphic" />
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
      </div> */}

      <Grid container className={classes.blogContainer} spacing={12} alignContent="center" justifyContent="flex-start" alignItems="center">

        {/* table of contents if one exists */}
        {/* {(tableOfContents && tableOfContents.items.length > 1) && (
          <Grid item xs={2} id="#stickySideBar" className={classes.blogSideBar}>
            <TableOfContent toc={tableOfContents} />
          </Grid>
        ) } */}

        <Grid item md={1} xs={false} />
        <Grid item className={classes.blogPost} md={10} xs={12}>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline">{parse(title || '')}</h1>

              <p>{post.date}</p>

              {/* if we have a featured image for this post let's display it */}
              {thumbnail && (
                <div className={classes.blogPostFeaturedImage} id="#top">
                  <Image
                    // fluid={featuredImage.fluid}
                    alt="alt"
                    style={{ marginBottom: 50, maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </header>

            {!!post.content && (
              <section itemProp="articleBody">{parse(html || '')}</section>
            )}

            <hr />

            <footer>
              {/* <Bio /> */}
            </footer>
          </article>
        </Grid>
        <Grid item md={1} xs={false} />

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
    </>
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
query ProjectPost(
  # these variables are passed in via createPage.pageContext in gatsby-node.js
  $id: String!
  $previousPostId: String
  $nextPostId: String
) {
  # selecting the current post by id
  post: allMarkdownRemark(filter: {id: { eq: $id }}) {
      edges {
        node {
        excerpt
        fileAbsolutePath
        html
        tableOfContents
        timeToRead
        id

        frontmatter {
            title
            metaDescription
            date(formatString: "MMMM DD, YYYY")
            thumbnail
          }
        }
      }
    }

  # this gets us the previous post by id (if it exists)
  previous: allMarkdownRemark(filter: {id: { eq: $previousPostId }}) {
   edges {
    node {
    excerpt
    fileAbsolutePath
    tableOfContents
    timeToRead
    id

    frontmatter {
        title
        metaDescription
        date(formatString: "MMMM DD, YYYY")
        thumbnail
        }
    }
}
}

  # this gets us the next post by id (if it exists)
  next: allMarkdownRemark(filter: {id: { eq: $nextPostId }}) {
    edges {
    node {
    excerpt
    fileAbsolutePath
    tableOfContents
    timeToRead
    id

    frontmatter {
        title
        metaDescription
        date(formatString: "MMMM DD, YYYY")
        thumbnail
        }
    }
}
}
}`;

export default BlogPostTemplate;
