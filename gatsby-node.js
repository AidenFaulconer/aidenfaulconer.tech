const path = require(`path`);

//define custom graphql types used in cms
// exports.createSchemaCustomization = ({ actions }) => {
//   actions.createTypes(`
//     type Button {
//       text: String
//       link: String
//     }

//     type List {
//       title: String
//       content: String
//     }

//     type Form {
//       provider: String
//       title: String
//       formid: Int
//       redirect: String
//       button: String
//     }

//     type FAQ {
//       question: String
//       answer: String
//     }

//     type MarkdownRemarkFrontmatterSections @infer {
//       id: String
//       type: String
//       subheader: String
//       title: String
//       subtitle: String
//       background: String
//       content: String
//       variant: String
//       video: String
//       bulletpoints: [String]
//       secondarycontent: String
//       button: Button
//       list: [List]
//       form: Form
//       faqs: [FAQ]
//     }
//   `);
// };

//create blog pages, and regular pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  //configure and set where and how content gets processed down
  async function buildPageFromQuery(regex, template) {
    const result = await graphql(`
    query blogBuilderQuery {
      allMarkdownRemark(
        filter: { frontmatter: { catagory: { regex: "/${regex}/" } } },
        limit: 1000
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              catagory
              path
              title
              thumbnail_
            }
          }
        }
      }
    }
  `);

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    //filter through data
    // Filter out the footer, navbar, and meetups so we don't create pages for those
    // const postOrPage = result.data.allMarkdownRemark.edges.filter((edge) => {
    //   let layout = edge.node.frontmatter.layout
    //   return layout == null || layout == 'hidden'
    // })

    // postOrPage.forEach((edge) => {
    //   const id = edge.node.id
    //   let component = path.resolve(
    //     `src/templates/${String(edge.node.frontmatter.layout)}.js`,
    //   )
    //   if (fs.existsSync(component)) {
    //     switch (edge.node.frontmatter.layout) {
    //       case 'page':
    //         createPage({
    //           path: `/${Helper.slugify(edge.node.frontmatter.slug)}/`,
    //           component,
    //           context: {
    //             id,
    //           },
    //         })
    //         break
    //         ...
    //     }
    //   }
    // })

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(async ({ node }, i) => {
      //calculate which posts are previous and next
      const len = posts.length - 1;
      let start;
      let end;
      if (i === 0) {
        start = 1;
        end = len;
      } else if (i === len) {
        start = 0;
        end = len - 1;
      } else {
        start = i - 1;
        end = i + 1;
      }

      await createPage({
        path: node.frontmatter.path,
        component: template,
        context: {
          otherBlogs: [posts[start], posts[end]], //all other blogs of this catagory (get previous and current one)
        }, // additional data can be passed via context
      });
    });
  }

  //now put this all together here

  await buildPageFromQuery(
    "b|Blog",
    path.resolve(`src/templates/blogTemplate.js`)
  ); // build blog pages

  await buildPageFromQuery(
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
  actions,
}) => {
  actions.setWebpackConfig({
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test: /\.gltf$/,
          use: [`url-loader`],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: "file-loader",
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: "file-loader",
        },
      ],
    },
  });
};
