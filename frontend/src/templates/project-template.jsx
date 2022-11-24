import React, { useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Link, graphql, StaticQuery, useStaticQuery,
  navigate,
} from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';
import stickybits from 'stickybits';
import { Box, Grid, useTheme } from '@mui/material';
// import Bio from "../components/bio"
// import Seo from "../components/seo"
import { RegularButton } from '../components/custom/buttons';

import { HomeIcon } from '@heroicons/react/20/solid'

export const breadcrumbs= () => {
  return (
    <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ========================================================================== //
// Blog post template
// ========================================================================== //
export default ({ data: { post = {}, next = {}, previous = {} } }) => {
  const theme = useTheme();

  useEffect(() => {
    stickybits('#stickySideBar', { usePlaceholder: true });
  }, []);

  //   alert(JSON.stringify(previous, null, 2));
  const {
    path, title, metaDescription, thumbnail, template, date, catagory,
  } = post?.edges[0]?.node?.frontmatter;
  const {
    html, excerpt, tableOfContents, timeToRead,
  } = post?.edges[0]?.node;

  // ========================================================================== //
  //   Blog suggestions
  // ========================================================================== //
  const blogSuggestionLink = useCallback((blogPostData, type) => {
    const {
      path, title, metaDescription, thumbnail, template, date, catagory,
    } = post.edges[0].node.frontmatter;
    // console.log(postLink, blogPostData);
    return (
      <Grid item container justifyContent="center" xs={4} sx={{}}>
        <img
          alt="thumbnail"
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
        <RegularButton onClick={() => navigate(path || '/')} type="secondary" size="large">
          {parse(title)}
        </RegularButton>
      </Grid>
    );
  }, []);

  // {/* ← */}
  // {/* table of contents if one exists */}
  // {/* {(tableOfContents && tableOfContents.items.length > 1) && (
  //   <Grid item xs={2} id="#stickySideBar" className={classes.blogSideBar}>
  //     <TableOfContent toc={tableOfContents} />
  //   </Grid>
  // ) } */}

  return (
    <>
      <Grid container sx={{}} spacing={12} alignContent="center" justifyContent="flex-start" alignItems="center">

        <Grid item md={1} xs={false} />
        <Grid item sx={{}} md={10} xs={12}>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline">{parse(title || '')}</h1>

              <p>{post?.date}</p>

              {thumbnail && (
                <div sx={{}} id="#top">
                  <Image
                    // fluid={featuredImage.fluid}
                    alt="alt"
                    style={{ marginBottom: 50, maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </header>

            {!!post?.content && (
              <section itemProp="articleBody">{parse(html || '')}</section>
            )}

            <hr />

            <footer />
          </article>
        </Grid>
        <Grid item md={1} xs={false} />

      </Grid>

      <Grid container xs={12} spacing={0} tyles={{ marginBottom: '100px' }} sx={{}} alignContent="flex-end" justifyContent="flex-start" alignItems="baseline">
        {previous && blogSuggestionLink(previous, 'previous')}
        {next && blogSuggestionLink(next, 'next')}
      </Grid>

    </>
  );
};

// ========================================================================== //
// graphql blog query
// ========================================================================== //

// export const pageQuery = graphql`
//   query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
//     posts: allWpPost(
//       sort: { fields: [date], order: DESC }
//       limit: $postsPerPage
//       skip: $offset
//     ) {
//       nodes {
//         excerpt
//         uri
//         date(formatString: "MMMM DD, YYYY")
//         title
//         excerpt
//       }
//     }
//   }
// `;

// this page query is not run
export const templatePageQuery = graphql`
    query projectPostTemplateQuery(
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
  }}`;

// ========================================================================== //
// Table of contents
// ========================================================================== //
const renderTableOfContentItems = (items/** array */) => (
  <ol styles={{}}>
    {items.map(({ url, title, items }) => (
      <li key={url}>
        <a href={url}>{title}</a>
        {items && items.length && renderTableOfContentItems(items)}
      </li>
    ))}
  </ol>
);

const TableOfContent = ({ toc, className }) => (
  <Box sx={{}}>
    <h2>Table of contents</h2>
    {renderTableOfContentItems(toc.items)}
  </Box>
);
