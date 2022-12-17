---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T11:34:10.728Z
title: Querying content from NetlifyCMS in Gatsby
metaDescription: "Here is an example of a GraphQL query that you can use to get
  specific data from a Gatsby website that uses Netlify CMS as a content
  management system:"
thumbnail: https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
---
<!--StartFragment-->

Here is an example of a GraphQL query that you can use to get specific data from a Gatsby website that uses Netlify CMS as a content management system:

```
query {
  allMarkdownRemark(filter: {frontmatter: {title: {eq: "My Blog Post"}}}) {
    edges {
      node {
        frontmatter {
          title
          date
          tags
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
}


```

This query will get all of the Markdown files in your Gatsby project that have a title of "My Blog Post," and return the frontmatter (title, date, and tags), excerpt, and slug for each matching file. You can then use this data in your Gatsby project to display your content.

To use this query in your Gatsby project, you will need to add the following plugins to your **`gatsby-config.js`** file:

```
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/src/markdown-pages`,
    },
  },
  `gatsby-transformer-remark`,
]


```

These plugins will allow Gatsby to pull data from your Markdown files and use the GraphQL query to filter and display the specific content that you want.

Additionally, you will need to make sure that your Gatsby project is set up to pull data from Netlify CMS, and that you have the necessary dependencies installed in order for this query to work properly. You can find more information about setting up Gatsby with Netlify CMS in the Gatsby documentation.

To use the GraphQL query with **`useStaticQuery`** in a Gatsby project, you can use the following code example:

```
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const BlogPost = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(filter: {frontmatter: {title: {eq: "My Blog Post"}}}) {
          edges {
            node {
              frontmatter {
                title
                date
                tags
              }
              excerpt
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  return (
    <div>
      {data.allMarkdownRemark.edges.map(edge => (
        <div key={edge.node.fields.slug}>
          <h1>{edge.node.frontmatter.title}</h1>
          <p>{edge.node.frontmatter.date}</p>
          <p>{edge.node.frontmatter.tags}</p>
          <p>{edge.node.excerpt}</p>
          <p>{edge.node.fields.slug}</p>
        </div>
      ))}
    </div>
  )
}

export default BlogPost

```

This code will use the **`useStaticQuery`** hook to get the data for all Markdown files that have a title of "My Blog Post," and then display the frontmatter (title, date, and tags), excerpt, and slug for each matching file in a React component.

To use this code in your Gatsby project, you will need to make sure that you have the necessary plugins and dependencies installed, as described in the previous answer. You can then use this component in your Gatsby project to display the specific content that you want.

<!--EndFragment-->