const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  async function buildPageFromQuery(regex, template) {
    // further code is not executed ontul this graphql query executes as per the 'await'
    const result = await graphql(`
    query blogBuilderQuery {
      allMarkdownRemark(
        filter: { frontmatter: { catagory: { regex: "/${regex}/" } } }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              catagory
              path
            }
          }
        }
      }
    }
  `);
    //further execution awaited from asynchronous result query

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // console.log(node.frontmatter.path);

      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {} // additional data can be passed via context
      });
    });
  }

  buildPageFromQuery("b|Blog", path.resolve(`src/templates/blogTemplate.js`)); // build blog pages

  buildPageFromQuery(
    "P|project",
    path.resolve(`src/templates/projectTemplate.js`)
  ); // build project pages
};

// enable loading of gltf models for a future site update
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.gltf$/,
          use: [`url-loader`]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: "file-loader"
        }
      ]
    }
  });
};
