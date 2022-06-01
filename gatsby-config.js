/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// ========================================================================== //
// Environment variables
// ========================================================================== //
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const path = require('path');

// ========================================================================== //
// Bundle checks
// ========================================================================== //
const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES: true,
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
    DEV_SSR: true,
    // ENABLE_GATSBY_EXTERNAL_JOBS: true,//for gatsby-parallel-runner, which outsources to google cloud
  },
  // 'gatsby-parallel-runner',//uses google cloud,
  /* Your site config here */
  // eslint-disable-next-line global-require
  siteMetadata: require('./site-meta-data.json'),
  plugins: [
    // ========================================================================== //
    //     Scroll animations
    // ========================================================================== //
    {
      resolve: 'gatsby-plugin-scroll-reveal',
      options: {
        threshold: 1, // Percentage of an element's area that needs to be visible to launch animation
        once: true, // Defines if animation needs to be launched once
        disable: false, // Flag for disabling animations

        // Advanced Options
        selector: '[data-sal]', // Selector of the elements to be animated
        animateClassName: 'sal-animate', // Class name which triggers animation
        disabledClassName: 'sal-disabled', // Class name which defines the disabled state
        rootMargin: '0% 50%', // Corresponds to root's bounding box margin
        enterEventName: 'sal:in', // Enter event name
        exitEventName: 'sal:out', // Exit event name
      },
    },
    // ========================================================================== //
    //     Page transitioning
    // ========================================================================== //

    // page, and template components receive, transitionStatus, entry, and exit
    // instead of gatsby-link use transition link with transition configuration attatched
    // {
    //   resolve: "gatsby-plugin-transition-link",
    //   options: {
    //     //layout injected manually in gatsby-browser and gatsby-ssr
    //     injectPageProps: true,
    //     layout: require.resolve(`${__dirname}/src/layout/layout.jsx`), // this is excluded and stays static on transtiions **this means not including layout in pages or templates**
    //   },
    // }, // creates the 'tl-edge & tl-wrapper https://github.com/TylerBarnes/gatsby-plugin-transition-link/issues/29

    // have a custom plugin inject theme before this
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layout/layout.jsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-catch-links',
      options: {
        // excludePattern: /^\/_/,
      },
    },
    // ========================================================================== //
    //     File system management
    // ========================================================================== //
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        // everything netlify cms outputs is now accessible under markdown-pages
        path: `${__dirname}/_data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        // access images through graphql queries w sharp
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'admin',
        path: `${__dirname}/static/admin`,
      },
    },
    // ========================================================================== //
    //     Image compression
    // ========================================================================== //
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJped: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    'gatsby-transformer-sharp',
    // ========================================================================== //
    //       Consume markdown from netlify
    // ========================================================================== //

    // makes markdown consumable in graphql through gatsbys api
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // use code markup in blog posts
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          // use emojis in blog posts
          // 512 //384 //256 //192 //48 /144
          'gatsby-remark-emojis',

          {
            // flexible images with embedded image content in blogs
          // use images in blog posts **png and jpg only**
          // reference: https://www.gatsbyjs.com/plugins/@redocly/gatsby-remark-images/?=remark
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              // backgroundColor:
              // quality
              // withWebP
              // tracedSvgs
              withWebp: true,
              showCaptions: true,
              quality: 50,
              maxWidth: 590,
              // wrapperStyle: (fluidResult) => `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
          // point remark data to public folder
          // {
          //   resolve: 'gatsby-remark-copy-linked-files',
          //   options: {
          //     destinationDir: `${__dirname}/_data`,
          //     // ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
          //   },
          // },
          // proportion and make iframe content responsive in blogs
          'gatsby-remark-responsive-iframe',
          // make blog content more customizable **not compatible with gatsby-transformer-remark@^4.0.0
          // reference: https://www.gatsbyjs.com/plugins/gatsby-remark-custom-blocks/?=remark
          // {
          //   resolve: 'gatsby-remark-custom-blocks',
          //   options: {
          //     blocks: {
          //       danger: {
          //         classes: 'danger',
          //       },
          //       info: {
          //         classes: 'info',
          //         title: 'optional',
          //       },
          //     },
          //   },
          // },
        ],
      },
    },

    // MDX is markdown format that also allows embedding jsx within the markdown itself
    // reference: https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=remark
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mediaTypes: ['text/markdown', 'text/x-markdown'],
        // rehypePlugins: []
        // defaultLayouts: {
        //   posts: require.resolve("./src/components/posts-layout.js"),
        //   default: require.resolve("./src/components/default-page-layout.js"),
        // },
        // shouldBlockNodeFromTransformation(node) {
        //   return (
        //     [`NPMPackage`, `NPMPackageReadme`].includes(node.internal.type) ||
        //     (node.internal.type === `File` &&
        //       path.parse(node.dir).dir.endsWith(`packages`))
        //   )
        // },
      },
    },
    // `gatsby-plugin-mdx`,
    // ========================================================================== //
    //     analytics
    // ========================================================================== //
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it. replace with yours
        trackingId: 'UA-164743872-1',
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Aiden Faulconer',
        short_name: 'Aiden Faulconer',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#381696',
        display: 'standalone',
        icon: 'src/images/icon.png',
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
    // 'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    // siteURL is a must for sitemap generation
    // `gatsby-plugin-sitemap`,

    // ========================================================================== //
    //     Offline capabilities
    // ========================================================================== //
    // 'gatsby-plugin-offline',
    'gatsby-plugin-remove-trailing-slashes', // remove pesky /'s at the end of routes ie: localhost/x/

    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    //     head: true,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        // // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
        // // The values for each key in this example are the defaults the plugin uses.
        // ...process.env.NODE_ENV === 'production' && ({
        //   sourceMap: true,
        //   autoLabel: 'dev-only',
        //   labelFormat: '[local]',
        //   cssPropOptimization: true,
        // })
        // || ({
        //   sourceMap: false,
        //   autoLabel: 'AF-',
        //   labelFormat: '[local]',
        //   cssPropOptimization: true,
        // }),
      },
    },
    'gatsby-theme-material-ui',
    // 'gatsby-plugin-material-ui',
    // ========================================================================== //
    // Netlify CMS
    // ========================================================================== //
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
    //   options: {
    //     develop: true, // Activates purging in npm run develop
    //     purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
    //   },
    // }, // must be after other CSS plugins

    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
        extraDirsToCache: ['./static'],
      },
    },
    // ========================================================================== //
    //     Webpack optimizations
    // ========================================================================== //
    // {
    //   resolve: 'gatsby-plugin-direct-import',
    //   options: {
    //     packages: [
    //       'threejs',
    //       {
    //         name: 'three',
    //         indexFile: 'three/src/Three.js',
    //       },
    //     ],
    //   },
    // },

    // makes imports come from ./ instead of ../../, by resolving ALIASES and MODULES, so you resolve FROM THE ROOT of the project NOT RELATIVE
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-root-import/
    // {
    //   resolve: 'gatsby-plugin-root-import',
    //   options: {
    //     src: path.join(__dirname, 'src'),
    //     pages: path.join(__dirname, 'src/pages'),
    //     // images: path.join(__dirname, 'static'),
    //   },
    // },
    process.env.NODE_ENV === 'production' && 'gatsby-plugin-minify-html',
    // ========================================================================== //
    //     Debugging Webpack bundles
    // ========================================================================== //
    // 'gatsby-plugin-webpack-speed-measure'
    process.env.NODE_ENV === 'development' && {
      resolve: 'gatsby-plugin-perf-budgets',
      options: {},
    },

    // process.env.NODE_ENV === 'development' && {
    //   resolve: 'gatsby-plugin-webpack-size',
    //   options: {
    //     development: true,
    //   },
    // },

    process.env.NODE_ENV === 'development' && {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'server',
        analyzerPort: 8001,
        devMode: true,
        // defaultSizes: 'gzip',
        openAnalyzer: true,
      },
    },

    // ========================================================================== //
    //     Compression
    // ========================================================================== //
    process.env.NODE_ENV === 'production' && {
      // prefer this to gzip
      resolve: 'gatsby-plugin-brotli', // was zopfli
      options: {
        // verbose: true,
        extensions: ['css', 'html', 'js', 'svg', 'gltf', 'glb', 'png', 'jpg', 'jpeg', 'html', 'jsx'],
        // level: 4,//default is highest level, dont change it
        // compression: {
        //   numiterations: 25,
        // },
      },
    },
  ].filter(Boolean),
};
