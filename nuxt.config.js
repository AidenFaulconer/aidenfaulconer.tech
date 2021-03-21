import MomentLocalesPlugin from "moment-locales-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import colors from "vuetify/es5/util/colors";
import fs from "fs";

//set the ENV based on whats set via cross-env **NODE_ENV=development|production** in the console
require("dotenv").config({
  path: `${__dirname}/RVR.${process.env.NODE_ENV}.env`,
});

export default {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      {
        // httpEquiv: "Content-Security-Policy",
      },
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  //https://www.npmjs.com/package/nuxt-helmet
  helmet: {
    frameguard: false, //build fails if set to true
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff",
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/railgun.ts", // recoveryVR plugin *handles events in and out of vuex *enabling full control of nuxt for future expansions of webapp
    "~/plugins/vuedraggable",
  ],
  /*
   ** Nuxt.js dev-modules (excluded from build and **only required during development or server side ie: vuetify compiles down to css, it dosent need to be included in the clientside**)
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment", "@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "nuxt-helmet",
    "@nuxtjs/pwa",
  ],

  ssr: false, //true for universal mode, false for spa mode
  pwa: {
    manifest: {
      name: "Railgun Wallet",
      short_name: "Railgun",
      start_url: "/login", //make sure precache finds this
      display: "browser",
      description: "Railgun Wallet",
      offline: true,
      icon: {
        purpose: ["any", "maskable"],
        sizes: [64, 120, 144, 152, 192, 384, 512],
        plugin: true,
      },
      meta: {},
      offlinePage: "~/pages/dashboard",
    },
    // workbox: {
    //   importScripts: [
    //     // "~/static/firebase-auth-sw.js",
    //     // "~static/firebase-messaging-sw.js",
    //   ],
    //   dev: process.env.NODE_ENV === "development",
    // },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */ vuetify: {
    customVariables: ["~/static/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#07599b",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: "#2196F3",
          warning: "#f37458",
          error: colors.deepOrange.accent4,
          success: "#079B16",
        },
        light: {
          primary: "#07599b",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: "#2196F3",
          warning: "#f37458",
          error: colors.deepOrange.accent4,
          success: "#079B16",
        },
      },
    },
  },
  build: {
    /*
     ** You can extend webpack config here if you wish to add any webpack plugins to improve builds
     */
    //   extend(config, { _ctx, isDev, isClient }) {
    //     plugins: [
    //       // strip 75% of moment bundle size used for varied languages in moment code, we are using english at the moment
    //       new MomentLocalesPlugin({
    //         localesToKeep: ["en"], // what languages to keep
    //       }),
    //       new OptimizeCSSAssetsPlugin({
    //         cssProcessorOptions: {
    //           map: {
    //             inline: false,
    //             annotation: true,
    //           },
    //         },
    //       }),
    //     ],
    // },
  },
};
