import React from "react";
import { Provider } from "react-redux";

import {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

import THEME_DEFINITIONS from "./theme";
import { reducers } from "./reducers";
import { boundActions } from "./actions";

//#region initial state **map the shape of data for the application**
const state = {
  setTheme: () => {},
  themeState: "light",
  theme: THEME_DEFINITIONS["light"], //holds themeing values for the page, references THEME_DEFENINTIONS

  setBlogContext: () => {},
  blogContext: [
    {
      title: "",
      description: "",
      link: "./",
      date: new Date().toUTCString(),
      heroImage: "",
      images: [
        "./assets/graphic.png",
        "./assets/frame-95.png",
        "./assets/hero.png",
        "./assets/tank-driver.png",
      ],
      theme: ["#823B3B", "#76EFA6", "#F4D1A4", "#666666"],
      sections: [],
      //... other blog specific content
    },
    {}, //...
  ], //holds blog posts

  setThreejsContext: () => {},
  threejsContext: {
    x: "", //react spring color state
    current: 0, //selected experience
    blogHeroImages: ["", "", "", ""], //title photos for blog posts
    blogThemes: [{}, {}, {}], //a custom blog theme thats injected after fetching a blog query
  }, //holds data formatted to customize threejs experiences

  //deprecated
  colorSwap: false,

  //user data
  setUserData: () => {},
  userData: {
    pathname: typeof location !== "undefined" ? location.pathname : "/",
    isMobile:
      typeof window !== "undefined"
        ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        : false, //overriden at init

    projects: {},
    contact: {},
    googleAds: {},
    googleAnalytics: {},
  },

  //not in use yet **cookies then => userData**
  cookies: {},
};
//#endregion initial state

//#region create a store and provider for react application
export const putStoreInContext = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore(reducers, state);
  return <Provider store={store}>{element}</Provider>;
};
//#endregion create a store and provider for react
