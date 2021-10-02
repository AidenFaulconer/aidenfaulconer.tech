/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const path = require('path');
const chunk = require('lodash/chunk');

const { graphql } = require('gatsby');
const {
  reporter,
} = require('gatsby/node_modules/gatsby-cli/lib/reporter/reporter');
const cheerio = require('cheerio');
//  dd() will prettily dump to the terminal and kill the process
// const { dd } = require('dumper.js');

/**
 * This function creates all the individual blog pages in this site
 */
// ========================================================================== //
// BLOG POST ARCHIVE
// ========================================================================== //
async function createBlogPostArchive({ edges, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const { postsPerPage } = graphqlResult.data.wp.readingSettings;
  const postsChunkedIntoArchivePages = chunk(edges, postsPerPage);
  const totalPages = postsChunkedIntoArchivePages.length;

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1;

      const getPagePath = (page) => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? '/' : `/blog/${page}`;
        }

        return null;
      };

      // createPage is an action passed to createPages
      // See https:www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        data: await graphql(`query WpPosts {
          allWpPost(sort: { fields: [date], order: DESC }) {
            edges {

            }
          }
        }`),
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve('./src/templates/blog-post-archive.jsx'),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          //  postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      });
    }),
  );
}

// ========================================================================== //
// Queries
// ========================================================================== //
async function getPosts({ graphql, reporter, regex }) {
  const graphqlResult = await graphql(/* GraphQL */ `
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

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      graphqlResult.errors,
    );
    return;
  }
  reporter.log('graphqlResult', JSON.stringify(graphqlResult, null, 2));
  return graphqlResult.data.allWpPost.edges;
}

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https:www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
// ========================================================================== //
// CREATE GATSBY PAGES
// ========================================================================== //

// create blog pages, and regular pages this function is destructuring the gatsby utils passed in
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // configure and set where and how content gets processed down
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
      reporter.panicOnBuild('Error while running GraphQL query.');
      return;
    }

    // filter through data
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
      // calculate which posts are previous and next
      const { start, end } = getStartEnd(i, posts.length - 1);

      await createPage({
        path: node.frontmatter.path,
        component: template,
        context: {
          otherBlogs: [posts[start], posts[end]], // all other blogs of this catagory (get previous and current one)
        }, // additional data can be passed via context
      });
    });
  }

  // now put this all together here

  // await buildPageFromQuery(
  //   'b|Blog',
  //   path.resolve('src/templates/blogTemplate.jsx'),
  // ); // build blog pages

  // await buildPageFromQuery(
  //   'P|project',
  //   path.resolve('src/templates/projectTemplate.jsx'),
  // ); // build project pages
};

const getStartEnd = (i, len) => {
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
  return { start, end };
};

// ========================================================================== //
// TABLE OF CONTENTS
// ========================================================================== //
// #region create a table of contents for every post
function UniqueId() {
  const tempMap = {};
  return (el) => {
    if (tempMap[el]) {
      tempMap[el] += 1;
      const result = `${el}-${tempMap[el]}`;
      tempMap[result] = 1;
      return result;
    }
    tempMap[el] = 1;
    return el;
  };
}

function createId($, title) {
  let id = $(title).attr('id');

  if (!id) {
    id = $(title)
      .text()
      .toLowerCase()
      .replace(/[^a-z_0-9]+/gi, '-')
      .replace(/-+/g, '-');
  }

  return id;
}

function extendContentField(options, prevFieldConfig) {
  return {
    resolve(source) {
      const $ = cheerio.load(source.content);
      const titles = $('h2,h3,h4,h5');
      const getUniqueId = UniqueId();
      Array.from(titles).forEach((title) => {
        const id = createId($, title);
        $(title).attr('id', getUniqueId(id));
      });

      return $('body').html();
    },
  };
}

function groupHeadings(index, grouping, headings) {
  if (index < headings.length) {
    const nextHeading = headings[index];

    if (grouping.length) {
      const prevHeading = grouping.slice().pop();

      try {
        if (nextHeading.depth > prevHeading.depth) {
          prevHeading.items = prevHeading.items || [];
          return groupHeadings(index, prevHeading.items, headings);
        }
        if (nextHeading.depth === prevHeading.depth) {
          grouping.push({ ...nextHeading });
          return groupHeadings(++index, grouping, headings);
        }
        throw { index, heading: nextHeading };
      } catch (higherHeading) {
        if (higherHeading.heading.depth === prevHeading.depth) {
          grouping.push({ ...higherHeading.heading });
          return groupHeadings(++higherHeading.index, grouping, headings);
        }
        throw higherHeading;
      }
    } else {
      grouping.push({ ...nextHeading });
      groupHeadings(++index, grouping, headings);
    }
  }

  return grouping;
}

async function createTableOfContents(source, args, context, info) {
  const $ = cheerio.load(source.content);
  const titles = $('h1,h2,h3,h4,h5');
  reporter.log('titles', titles);
  const getUniqueId = UniqueId();

  const headings = Array.from(titles).map((title) => {
    const depth = parseInt($(title).prop('tagName').substr(1), 10);
    const id = createId($, title);
    return { url: `#${getUniqueId(id)}`, title: $(title).text(), depth };
  });

  const reduced = groupHeadings(0, [], headings);
  return { items: reduced };
}

// ========================================================================== //
// graphql schema customization
// ========================================================================== //
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;
  createFieldExtension({
    name: 'content',
    extend: extendContentField,
  });

  const typeDefs = `
  #was implements Node 
    type wpPost implements Node {
      toc: JSON
      content: String @content 
    }

    type Button {
      text: String
      link: String
    }
      
    type List {
      title: String
      content: String
    }
      
    type Form {
      provider: String
      title: String
      formid: Int
      redirect: String
      button: String
    }
      
    type FAQ {
      question: String
      answer: String
    }
      
    type MarkdownRemarkFrontmatterSections @infer {
      id: String
      type: String
      subheader: String
      title: String
      subtitle: String
      background: String
      content: String
      variant: String
      video: String
      bulletpoints: [String]
      secondarycontent: String
      button: Button
      list: [List]
      form: Form
      faqs: [FAQ]
    }`;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers, schema }) => createResolvers({
  wpPost: {
    toc: {
      resolve: createTableOfContents,
    },
  },
});

// #endregion

// ========================================================================== //
// webpack configuration
// ========================================================================== //
// enable loading of gltf models for a future site update
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /react-hot-loader/,
          use: [
            loaders.js(),
          ],
        },
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf|png|jp(e*)g|svg|gif|glb|gltf)$/i,
        //   use: 'file-loader',
        // //   options: {
        // //     publicPath: './',
        // //     name: '[name].[ext]'
        // // },
        // },
        { test: /\.(glb|gltf)$/i, use: 'file-loader' },
        // {
        //   test: /\.(png|jpg|gif|svg)$/,
        //   type: 'asset/resource',
        // }, {
        //   test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        //   type: 'asset/resource',
        // },
      ],
    },
  });
};

// const CompressionPlugin = require('compression-webpack-plugin');
// const webpack = require('webpack');

// exports.onCreateWebpackConfig = ({
//   stage,
//   rules,
//   getConfig,
//   loaders,
//   plugins,
//   actions,
//   // webpack,
// }) => {
//   // repalce offending modules with dummy modules during server side rendering
//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /bad-module/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
//   actions.setWebpackConfig({

//     module: {
//       rules: [
//         {
//           test: /react-hot-loader/,
//           use: [
//             loaders.js(),
//           ],
//         },
//       ],
//     },
//     // module: {
//     //   rules: [
//     //     {
//     //       test: /\.scss$/,
//     //       use: [ ],
//     //     },
//     //   ],
//     // },

//     // main point of customization irrespective of other plugins
//     plugins: [

//       plugins.define({
//         'process.env.BROWSER': JSON.stringify(true), // undefined on server side for a conveneint check
//         __DEV__: process.env.NODE_ENV === 'development',
//         __DEVELOPMENT__: stage === 'develop' || stage === 'develop-html',
//         // __GLOBAL_ENV__: bypassWindowDocumentCheckServerSide(),
//       }),

//       // // provide plugin https://webpack.js.org/guides/shimming/#shimming-globals

//       // process.env.NODE_ENV === 'production' &&
//       // new webpack.ProvidePlugin({
//       //   global: 'global',
//       //   window: 'global/window', // if encountered window, use package global/window
//       //   document: 'global/document',
//       // }) || {},

//       new CompressionPlugin(), // https://github.com/webpack-contrib/compression-webpack-plugin
//     ],
//   });
// };

// // exports.modifyWebpackConfig = ({ config, stage }) => {
// //   config._config.externals = {
// //     // googleapis: 'googleapis',
// //     'material-ui': '@material-ui',
// //   };
// // };
