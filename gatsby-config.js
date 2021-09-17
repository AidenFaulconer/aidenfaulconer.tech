/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */


// ========================================================================== //
// Environment variables
// ========================================================================== //
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// ========================================================================== //
// Bundle checks
// ========================================================================== //
const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;


module.exports = {
    flags: {
    PRESERVE_WEBPACK_CACHE: true,
    GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES: true,
    FAST_DEV: true,
    DEV_SSR: false,
    PARALLEL_SOURCING: true,
    },
    /* Your site config here */
    siteMetadata: require("./site-meta-data.json"),
    plugins: [
      {
        resolve: 'react-refresh',
        options: {
  
        },
      },
      // have a custom plugin inject theme before this
      // `gatsby-plugin-top-layout`,
      {
        resolve: 'gatsby-plugin-material-ui',
        options: {
          stylesProvider: {
            injectFirst: true,
          },
        },
      },
    // ========================================================================== //
    //     File system management
    // ========================================================================== //
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        //everything netlify cms outputs is now accessible under markdown-pages
        path: `${__dirname}/_data`,
      },
    },
    // ========================================================================== //
    // Netlify CMS
    // ========================================================================== //
    `gatsby-plugin-netlify-cms`,

    // ========================================================================== //
    //       Consume markdown from netlify
    // ========================================================================== //
    
    //makes markdown consumable in graphql through gatsbys api
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          //use code markup in blog posts
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          //use emojis in blog posts
          // 512 //384 //256 //192 //48 /144
          {
            resolve: "gatsby-remark-emojis",
          },
          //flexible images with embedded image content in blogs
          //use images in blog posts **png and jpg only**
          //reference: https://www.gatsbyjs.com/plugins/@redocly/gatsby-remark-images/?=remark
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              // backgroundColor:
              //quality
              //withWebP
              //tracedSvgs
              //
              maxWidth: 590,
              wrapperStyle: (fluidResult) =>
                `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
          //point remark data to public folder
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/_data`,
              // ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          //proportion and make iframe content responsive in blogs
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [`gatsby-remark-responsive-iframe`],
            },
          },
          //make blog content more customizable **not compatible with gatsby-transformer-remark@^4.0.0
          //reference: https://www.gatsbyjs.com/plugins/gatsby-remark-custom-blocks/?=remark
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                danger: {
                  classes: "danger",
                },
                info: {
                  classes: "info",
                  title: "optional",
                },
              },
            },
          },
        ],
      },
    },
    //MDX is markdown format that also allows embedding jsx within the markdown itself
    //reference: https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=remark
    //reference: https://mdxjs.com/ (absoloutely broken plugin, not worth the pain)
    // `gatsby-plugin-mdx`,
// ========================================================================== //
//     analytics

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it. replace with yours
        trackingId: "UA-164743872-1",
        head: true,
      },
    }, 
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aiden Faulconer`,
        short_name: `Aiden Faulconer`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#381696`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    // ========================================================================== //
    //     Preload fonts for performance
    // ========================================================================== //
    {
      resolve: 'gatsby-plugin-preload-fonts',
      options: {
        crossOrigin: 'use-credentials',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    // siteURL is a must for sitemap generation
    // `gatsby-plugin-sitemap`,

    // ========================================================================== //
    //     Offline capabilities
    // ========================================================================== //
    `gatsby-plugin-offline`,
    `gatsby-plugin-remove-trailing-slashes`, // remove pesky /'s at the end of routes ie: localhost/x/
    // ========================================================================== //
    //     Debugging Webpack bundles
    // ========================================================================== //
    process.env.NODE_ENV === 'development' && {
      resolve: 'gatsby-plugin-perf-budgets',
      options: {},
    },
    process.env.NODE_ENV === 'development' && {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'server',
        analyzerPort: 8000,
        openAnalyzer: true,
      },
    },
  ].filter(Boolean),
};
