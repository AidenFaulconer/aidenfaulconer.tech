/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const pth = require('path');
const chunk = require('lodash/chunk');

const { graphql, Reporter } = require('gatsby');

const cheerio = require('cheerio');
// const projectTemplate = require('./src/components/template-components/project-template').default;

// const { dd } = require('dumper.js');
//  dd() will prettily dump to the terminal and kill the process

/**
 * This function creates all the individual blog pages in this site
 */
// ========================================================================== //
// BLOG POST ARCHIVE
// ========================================================================== //
async function createBlogPostArchive({ edges, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `   {
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
        // component: pth.resolve('./src/templates/blog-post-archive.jsx'),
        component: pth.resolve('./src/components/templatecomponents/projecttemplate'),

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

  // ========================================================================== //
  //   function to Get and create blog posts
  // ========================================================================== //
  async function buildPageFromQuery(regex, template) {
    // sort: {order: DESC, fields: [frontmatter__date]}
    const result = await graphql(`
    query blogBuilderQuery {
      allMarkdownRemark(
        filter: {frontmatter: {catagory: {regex: "/${regex}/"}}}
        limit: 5000
      ) {
        edges {
          node {
            id
            html
            excerpt
            frontmatter {
              catagory
              metaDescription
              date
              path
              title
              thumbnail
            }
          }
          next {
            nid: id
          }
          previous {
            pid: id
          }
        }
      }
    }
  `);

    // ========================================================================== //
    // Handle errors
    // ========================================================================== //
    if (result.errors) {
      // reporter.panicOnBuild('Error while running GraphQL query.');
      result.errors.forEach((e) => reporter.error(e.toString()));
      // return Promise.reject(result.errors);//causes errors in node.js
    }

    // ========================================================================== //
    //     Build all the pages
    // ========================================================================== //
    // reporter.warn(JSON.stringify(result, null, 2));
    // return;
    // reporter.warn(pth.resolve('src/components/template-components/project-template.jsx').default);
    if (result !== null) {
      return; // i want a build NOW, i don't want to wait for the build to finish on this side, get it out NOW
      result.data.allMarkdownRemark.edges.forEach((edge, i) => {
        const { node: { id, frontmatter: { path, title, thumbnail } } } = edge;

        createPage({
          context: {
            id,
            nextPostId: edge?.next?.nid || 'ee2133c9-f2d3-590f-afdd-122dc62d602f',
            previousPostId: edge?.next?.pid || 'ee2133c9-f2d3-590f-afdd-122dc62d602f',
          },
          component: pth.resolve('src/components/template-components/project-template.jsx'),
          path,
        });
      });
    }
    reporter.warn(`queried data is null! for a ${regex}page${JSON.stringify(result, null, 2)}`);
  }

  // reporter.warn(pth.resolve('src/components/template-components/project-template.jsx').default);
  // ========================================================================== //
  //   Build pages
  // ========================================================================== //
  await buildPageFromQuery(
    'b|Blog',
    pth.resolve(__dirname, 'project-post.jsx'),
  ); // build blog pages

  await buildPageFromQuery(
    'P|project',
    pth.resolve(__dirname, 'project-post.jsx'),
  ); // build project pages
};

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
        { test: /\.(glb|gltf)$/i, use: 'file-loader' }, // or gltf-webpack-loader
        { test: /react-hot-loader/, use: [loaders.js()] },
        // fix react-three-fiber and react-spring use during buildtime
        {
          test: /react-spring/,
          sideEffects: true,
        },
        // expose, svgs, pdfs, and gifs publicly from the website https://stackoverflow.com/questions/36643649/serving-static-pdf-with-react-webpack-file-loader
        {
          test: /\.(pdf|gif|svg)$/,
          use: 'file-loader?name=[path][name].[ext]',
          include: pth.resolve(__dirname, 'static/assets'),
        },
        // material-ui is faulty on server side, which f**s up the build so, dont bother with it, alternatively use npm install @loadable/component, import loadable from '@loadable/component' => loadable(()=> import(problematicComponent)) **layout in this case/materialui**
        // { causes react error 130, so this wont work on server side, which defeats the point of debugging it altogether **ugh**
        //   test: /materialUI.jsx/,
        //   use: loaders.null(),
        // },
        // { test: /\.(woff|woff2|eot|ttf|otf|png|jp(e*)g|svg|gif|glb|gltf)$/i, use: 'file-loader' },
        // { test: /\.(bin)$/, use: 'file-loader' },
        // { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        // {test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/, type: 'asset/resource' },
        // modules: [path.resolve(__dirname, "src"), "node_modules"],//instead of ../../components => components/whatever.jsx
      ],
    },
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
    plugins: [
      // plugins.define({
      //   '@babel/plugin-syntax-top-level-await'// https://babeljs.io/docs/en/babel-plugin-syntax-top-level-await
      // }),
      // '@babel/plugin-syntax-top-level-await', // https://babeljs.io/docs/en/babel-plugin-syntax-top-level-await
    ],
    // externals: [ nodeExternals() ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      symlinks: false,
    },
  });
};

// pnpm i @babel/core @date-io/core @date-io / date-fns @fontsource/poppins @iconify/iconify @iconify/icons-ic @iconify/react @juggle/resize-observer @material-ui/core @material-ui / icons @material-ui / pickers @material-ui / styles @react-hook / mouse - position @react-hook / window - size @react-spring / core @react-spring / three @react-spring / web @react-three / cannon @react-three / drei @react-three / fiber @react-three / postprocessing @react-three / xr @types/react @use-gesture/react axios babel - eslint cheerio circletype compression - webpack - plugin cross - env css - loader date - fns dotenv exit gatsby gatsby - image gatsby - plugin -catch-links gatsby - plugin - feed gatsby - plugin - gatsby - cloud gatsby - plugin - google - analytics gatsby - plugin - image gatsby - plugin - layout gatsby - plugin - manifest gatsby - plugin - material - ui gatsby - plugin - minify - html gatsby - plugin - netlify - cms gatsby - plugin - offline gatsby - plugin - perf - budgets gatsby - plugin - preload - fonts gatsby - plugin - react - helmet gatsby - plugin - remove - trailing - slashes gatsby - plugin - sass gatsby - plugin - scroll - reveal gatsby - plugin - scss - typescript gatsby - plugin - sharp gatsby - plugin - webpack - bundle - analyser - v2 gatsby - remark - copy - linked - files gatsby - remark - custom - blocks gatsby - remark - emojis gatsby - remark - images gatsby - remark - prismjs gatsby - remark - responsive - iframe gatsby - source - filesystem gatsby - transformer - remark gatsby - transformer - sharp global gltf - webpack - loader google - maps - react grapheme - splitter graphql gsap html - react - parser immutable local - cors - proxy lodash lodash - es minipass netlify - cms - app netlify - cms - lib - util node - gyp node - sass postprocessing prismjs programming - languages - logos prop - types react - confetti react - cookie react - custom - scrollbars react react - dom react - geolocated react - google - recaptcha react - helmet react - lines - ellipsis react - multi - carousel react - phone - number - input react - refresh react - use - breakpoints redux redux - persist sass scroll - snap sharp simplex - noise stickybits three typescript webpack yup zustand

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

// filter through data
// Filter out the footer, navbar, and meetups so we don't create pages for those
// const postOrPage = result.data.allMarkdownRemark.edges.filter((edge) => {
//   const { layout } = edge.node.frontmatter;
//   return layout == null || layout == 'hidden';
// });

// postOrPage.forEach((edge) => {
//   const { metaDescription,title,content,catagory,path } = edge.node.frontmatter;
//   const component =
//   if (fs.existsSync(component)) {
//     switch (catagory) {
//       case 'project':
//         createPage({
//           // path: `/${Helper.slugify(edge.node.frontmatter.slug)}/`,
//           path,
//           component: path.resolve(
//             `src/templates/blog-post.js`,
//           ),
//           context: {
//             id,
//           },
//         });
//       case 'blog':
//         createPage({
//           path,
//             component: path.resolve(
//             `src/templates/blog-post.js`,
//           ),
//           context: {
//             id,
//           },
//         });
//         break;
//         // ...
//     }
//   }
// });

//   const posts = result.data.allMarkdownRemark.edges;
//   posts.forEach(async ({ node }, i) => {
//     // calculate which posts are previous and next
//     const { start, end } = getStartEnd(i, posts.length - 1);

//     await createPage({
//       path: node.frontmatter.path,
//       component: template,
//       context: {
//         otherBlogs: [posts[start], posts[end]], // all other blogs of this catagory (get previous and current one)
//       }, // additional data can be passed via context
//     });
//   });
// }

// now put this all together here

// ========================================================================== //
//   add later
// ========================================================================== //

// const getStartEnd = (i, len) => {
//   let start;
//   let end;
//   if (i === 0) {
//     start = 1;
//     end = len;
//   } else if (i === len) {
//     start = 0;
//     end = len - 1;
//   } else {
//     start = i - 1;
//     end = i + 1;
//   }
//   return { start, end };
// };

// // ========================================================================== //
// // TABLE OF CONTENTS
// // ========================================================================== //
// // #region create a table of contents for every post
// function UniqueId() {
//   const tempMap = {};
//   return (el) => {
//     if (tempMap[el]) {
//       tempMap[el] += 1;
//       const result = `${el}-${tempMap[el]}`;
//       tempMap[result] = 1;
//       return result;
//     }
//     tempMap[el] = 1;
//     return el;
//   };
// }

// function createId($, title) {
//   let id = $(title).attr('id');

//   if (!id) {
//     id = $(title)
//       .text()
//       .toLowerCase()
//       .replace(/[^a-z_0-9]+/gi, '-')
//       .replace(/-+/g, '-');
//   }

//   return id;
// }

// function extendContentField(options, prevFieldConfig) {
//   return {
//     resolve(source) {
//       const $ = cheerio.load(source.content);
//       const titles = $('h2,h3,h4,h5');
//       const getUniqueId = UniqueId();
//       Array.from(titles).forEach((title) => {
//         const id = createId($, title);
//         $(title).attr('id', getUniqueId(id));
//       });

//       return $('body').html();
//     },
//   };
// }

// function groupHeadings(index, grouping, headings) {
//   if (index < headings.length) {
//     const nextHeading = headings[index];

//     if (grouping.length) {
//       const prevHeading = grouping.slice().pop();

//       try {
//         if (nextHeading.depth > prevHeading.depth) {
//           prevHeading.items = prevHeading.items || [];
//           return groupHeadings(index, prevHeading.items, headings);
//         }
//         if (nextHeading.depth === prevHeading.depth) {
//           grouping.push({ ...nextHeading });
//           return groupHeadings(++index, grouping, headings);
//         }
//         throw { index, heading: nextHeading };
//       } catch (higherHeading) {
//         if (higherHeading.heading.depth === prevHeading.depth) {
//           grouping.push({ ...higherHeading.heading });
//           return groupHeadings(++higherHeading.index, grouping, headings);
//         }
//         throw higherHeading;
//       }
//     } else {
//       grouping.push({ ...nextHeading });
//       groupHeadings(++index, grouping, headings);
//     }
//   }

//   return grouping;
// }

// async function createTableOfContents(source, args, context, info) {
//   const $ = cheerio.load(source.content);
//   const titles = $('h1,h2,h3,h4,h5');
//   reporter.log('titles', titles);
//   const getUniqueId = UniqueId();

//   const headings = Array.from(titles).map((title) => {
//     const depth = parseInt($(title).prop('tagName').substr(1), 10);
//     const id = createId($, title);
//     return { url: `#${getUniqueId(id)}`, title: $(title).text(), depth };
//   });

//   const reduced = groupHeadings(0, [], headings);
//   return { items: reduced };
// }

// // ========================================================================== //
// // graphql schema customization
// // ========================================================================== //
// // exports.createSchemaCustomization = ({ actions }) => {
// //   const { createTypes, createFieldExtension } = actions;
// //   createFieldExtension({
// //     name: 'content',
// //     extend: extendContentField,
// //   });

// //   const typeDefs = `
// //   #was implements Node
// //     type wpPost implements Node {
// //       toc: JSON
// //       content: String @content
// //     }

// //     type Button {
// //       text: String
// //       link: String
// //     }

// //     type List {
// //       title: String
// //       content: String
// //     }

// //     type Form {
// //       provider: String
// //       title: String
// //       formid: Int
// //       redirect: String
// //       button: String
// //     }

// //     type FAQ {
// //       question: String
// //       answer: String
// //     }

// //     type MarkdownRemarkFrontmatterSections @infer {
// //       id: String
// //       type: String
// //       subheader: String
// //       title: String
// //       subtitle: String
// //       background: String
// //       content: String
// //       variant: String
// //       video: String
// //       bulletpoints: [String]
// //       secondarycontent: String
// //       button: Button
// //       list: [List]
// //       form: Form
// //       faqs: [FAQ]
// //     }`;
// //   createTypes(typeDefs);
// // };

// // exports.createResolvers = ({ createResolvers, schema }) => createResolvers({
// //   allMarkdownRemark: {
// //     tableOfContents: {
// //       resolve: createTableOfContents,
// //     },
// //   },
// // });

// // #endregion
