/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: require("./site-meta-data.json"),
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        //everything netlify cms outputs is now accessible under markdown-pages
        path: `${__dirname}/_data`,
      },
    },
    {
      //makes markdown consumable in graphql through gatsbys api
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it. replace with yours
        trackingId: "UA-164743872-1",
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-preload-fonts`,
      options: {
        crossOrigin: `use-credentials`,
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    // siteURL is a must for sitemap generation
    // `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-remove-trailing-slashes`, // remove pesky /'s at the end of routes ie: localhost/x/
  ],
};
