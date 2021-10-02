import React from 'react';
import { proxyWithComputed } from 'valtio/utils';
import { proxy, useSnapshot } from 'valtio';
import { createMuiTheme } from '@material-ui/core';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import {
//   createStore,
//   applyMiddleware,
//   bindActionCreators,
//   combineReducers,
// } from 'redux';
// // #endregion reducers

// // ========================================================================== //
// // ACTIONS
// // ========================================================================== //
// import { proxyWithComputed } from 'valtio/utils';
// import THEME_DEFINITIONS from './theme';

// // ========================================================================== //
// // Valtio proxy store **deprecating redux for valtio**
// // ========================================================================== //
// import generateItems from './utils/generateItems';

// // ========================================================================== //
// // REDUCERS
// // ========================================================================== //

// // #region reducers **map the actions by the handler associated with them**
// export const reducers = combineReducers(
//   (state = {}, action) => {
//     switch (action.type) {
//       case 'SET_BLOG':
//         return { ...state, ...action.SET_BLOG };
//       case 'SET_THREEJS':
//         return { ...state, ...action.SET_THREEJS };
//       case 'SET_USER_DATA':
//         return { ...state, ...action.SET_USER_DATA };
//       case 'SET_THEME':
//         return { ...state, ...action.SET_THEME };
//       case 'SET_THEME_STATE':
//         return { ...state, ...action.SET_THEME_STATE };
//       case 'INCREMENT':
//         return { ...state, ...action.INCREMENT };
//       default:
//         return state;
//     }
//   },
// );

// //* *action creators **/
// // all return an action object, these express intent of a dispatch, the type: is important because it will be evaluated in the reducer
// const _SET_THEME = (theme) => ({ type: SET_THEME, payload: theme });
// const _SET_THEME_STATE = (theme) => ({
//   type: SET_THEME,
//   theme: THEME_DEFINITIONS[theme],
// });
// const _SET_BLOG = (blogContext) => ({
//   type: SET_BLOG,
//   payload: blogContext,
// });
// const _SET_THREEJS = (threejsContext) => ({
//   type: SET_THREEJS,
//   payload: threejsContext,
// });
// const _SET_USER_DATA = (userData) => ({
//   type: SET_USER_DATA,
//   payload: userData,
// });
// const _INCREMENT = (amnt) => ({ type: INCREMENT, payload: amnt });

// //* *wraps each action with a dispatch so we only need to call the actions such that it is **/
// // import this into components using the store, then boundActions.theMethodYouWishToUse
// export const boundActions = bindActionCreators(
//   {
//     SET_BLOG: _SET_THEME,
//     SET_TYHREEJS: _SET_THREEJS,
//     SET_USER_DATA: _SET_USER_DATA,
//     SET_THEME: _SET_THEME,
//     SET_THEME_STATE: _SET_THEME_STATE,
//   },
//   // store.dispatch
// );

// //* *alternatively, you can import the methods direcly and call them like... */
// // import {_SET_THEME} from ...
// // ... onClick={store.dispatch(_SET_THEME())}

// // ========================================================================== //
// // STORE STATE
// // ========================================================================== //

// // #region initial state **map the shape of data for the application**
// const state = {
//   setTheme: () => {},
//   themeState: 'light',
//   theme: THEME_DEFINITIONS.light, // holds themeing values for the page, references THEME_DEFENINTIONS

//   setBlogContext: () => {},
//   blogContext: [
//     {
//       title: '',
//       description: '',
//       link: './',
//       date: new Date().toUTCString(),
//       heroImage: '',
//       images: [
//         './assets/graphic.png',
//         './assets/frame-95.png',
//         './assets/hero.png',
//         './assets/tank-driver.png',
//       ],
//       theme: ['#823B3B', '#76EFA6', '#F4D1A4', '#666666'],
//       sections: [],
//       // ... other blog specific content
//     },
//     {}, // ...
//   ], // holds blog posts

//   setThreejsContext: () => {},
//   threejsContext: {
//     x: '', // react spring color state
//     current: 0, // selected experience
//     blogHeroImages: ['', '', '', ''], // title photos for blog posts
//     blogThemes: [{}, {}, {}], // a custom blog theme thats injected after fetching a blog query
//   }, // holds data formatted to customize threejs experiences

//   // deprecated
//   colorSwap: false,

//   // user data
//   setUserData: () => {},
//   userData: {
//     pathname: typeof location !== 'undefined' ? location.pathname : '/',
//     isMobile:
//       typeof window !== 'undefined'
//         ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//           navigator.userAgent,
//         )
//         : false, // overriden at init

//     projects: {},
//     contact: {},
//     googleAds: {},
//     googleAnalytics: {},
//   },

//   // not in use yet **cookies then => userData**
//   cookies: {},
// };
// // #endregion initial state

// // ========================================================================== //
// // Create redux store
// // ========================================================================== //

const itemsData = [
  {
    name: 'Climbing anchor',
    description:
      'A pin that can be driven into the ground to create an anchor point for a strand, enabling the scaling of steep surfaces and safe descents from elevated positions to a length of up to 30 m.',
    weight: 5.0,
    image: 'climbing_anchor.png',
  },
  {
    name: 'Ladder',
    description:
      'A ladder that can be folded down into a compact form for transport, but is 10 meters long when fully extended. Can serve as a makeshift bridge when laid horizontally, enabling the crossing of rivers and other obstacles.',
    weight: 5.0,
    image: 'ladder.png',
  },
  {
    name: 'Porter boots',
    description:
      "Boots designed to be worn with a porter's protective suit. Their old-fashioned construction isn't particularly hard-wearing, and they tend to break fairly easily. Sam wore these during his time as a freelance porter.",
    weight: 0.5,
    image: 'boot.png',
  },
  {
    name: 'Blood bag',
    description:
      'Blood bags are items that can be utilized by Sam to passively restore his blood level, as well as transfuse into weapons that utilize blood such as Hematic Grenades.',
    weight: 1.0,
    image: 'blood_bag.png',
  },
  {
    name: 'Container repair spray',
    description:
      'Container repair spray is an item can be sprayed on a damaged cargo container to repair it. The spray is less effective when used while in timefall.',
    weight: 1.0,
    image: 'container_spray.png',
  },
];

// export default putStoreInContext;
const generateItems = (number, category) => new Array(number).fill().map((value, index) => {
  const random = Math.floor(Math.random() * itemsData.length);
  const damage = Math.round(Math.random() * 100);
  return {
    ...itemsData[random], damage, category, likes: 0, id: `${category}-${index}`,
  };
});
// allItems: [...generateItems(9, 'private'), ...generateItems(3, 'share'), ...generateItems(3, 'sam')],

// ========================================================================== //
// Handle theming  
// ========================================================================== //
import {
  DARK_THEME, LIGHT_THEME, OVERRIDES, CUSTOM_THEME_PROPS, TYPOGRAPHY,
} from './theme';


  //create themes to be used in valtio
  const createTheme = (theme) => {
    const newTheme = Object.assign(createMuiTheme({ ...theme }), CUSTOM_THEME_PROPS, OVERRIDES);
    // custom theme properties
    // newTheme.custom = CUSTOM_THEME_PROPS;
    
    newTheme.typography.h1.fontWeight = 900;
    newTheme.typography.h2.fontWeight = 900;
    newTheme.typography.h2.textTransform = 'capitalize';
    // newTheme.typography = TYPOGRAPHY;
    return newTheme;
  };
  
  // To avoid 'this' pitfall, the recommended pattern is not to use this and prefer arrow function.
  export const lt = createTheme(LIGHT_THEME);
export const dt = createTheme(DARK_THEME);
  
// ========================================================================== //
// App State
// ========================================================================== //

// has computed properties, this is very much like vuex **formerly proxy w computed**
export const valtioState = proxy(
  // ========================================================================== //
  //   State
  // ========================================================================== //
  {
    appContext: {
      type: 'light',
      toggleTheme: () => {
        const type = valtioState.appContext.type === 'light' ? 'dark' : 'light';
        valtioState.appContext.type = type;
        return true;
      },
    },
    threejsContext: {
      selected: {
        color: '#fff', // x
        selectedIndex: 0,
        position: { x: 0, y: 0, z: 0 },
      },
      threejsCubes: [
        {
          blogUrl: './',
          textureUrl: './',
          color: '#fff',
        }, // ...
      ],
      toggleCamera: () => null,
    },
  },
  // ========================================================================== //
  //    Comuted methods
  // ========================================================================== //
  {
    // isPrivateLocker: ({ selectedItem, allItems }) => allItems[selectedItem].category === 'private',
    // isShareLocker: ({ selectedItem, allItems }) => allItems[selectedItem].category === 'share',
    // isSamCargo: ({ selectedItem, allItems }) => allItems[selectedItem].category === 'sam',
    // itemsPrivateLocker: ({ allItems }) => allItems.filter((item) => item.category === 'private' && item.likes >= 0),
    // itemsShareLocker: ({ allItems }) => allItems.filter((item) => item.category === 'share' && item.likes >= 0),
    // itemsSam: ({ allItems }) => allItems.filter((item) => item.category === 'sam' && item.likes >= 0),
    // allItemsSorted: ({ itemsPrivateLocker, itemsShareLocker, itemsSam }) => [...itemsPrivateLocker, ...itemsShareLocker, ...itemsSam],
    // selectedId: ({ selectedItem, allItems }) => allItems[selectedItem].id,
    // selectedCategory: ({ selectedItem, allItems }) => allItems[selectedItem].category,
    // totalWeight: ({ itemsSam }) => itemsSam.reduce((acc, value) => acc + value.weight, 0),
  },
);

 
const putStoreInContext = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  // const store = valtioState();
  // store.persistor = {};
    return (
      <>
        {element}
      </>
    )
    };
    
export default putStoreInContext;
