const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}

// const path = require(`path`)
// const { slash } = require(`gatsby-core-utils`)
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   // query content for WordPress posts
//   const result = await graphql(`
//     query {
//       allWordpressPost {
//         edges {
//           node {
//             id
//             slug
//           }
//         }
//       }
//     }
//   `)
//   const postTemplate = path.resolve(`./src/templates/post.js`)
//   result.data.allWordpressPost.edges.forEach(edge => {
//     createPage({
//       // will be the url for the page
//       path: edge.node.slug,
//       // specify the component template of your choice
//       component: slash(postTemplate),
//       // In the ^template's GraphQL query, 'id' will be available
//       // as a GraphQL variable to query for this posts's data.
//       context: {
//         id: edge.node.id,
//       },
//     })
//   })
// }