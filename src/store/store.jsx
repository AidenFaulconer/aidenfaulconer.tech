import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import create from 'zustand';
// ========================================================================== //
// Handle theming
// ========================================================================== //
import { navigate, Link, createHistory } from '@reach/router';
import {
  DARK_THEME,
  LIGHT_THEME,
  OVERRIDES,
  CUSTOM_THEME_PROPS,
  TYPOGRAPHY,
  pxToRem,
} from './theme';

// create themes to be used in valtio
const createTheme = (theme) => {
  const muiTheme = createMuiTheme({ ...theme });
  const newTheme = Object.assign(
    muiTheme,
    CUSTOM_THEME_PROPS,
    OVERRIDES,
  );
    // custom theme properties
  newTheme.typography.h1.fontWeight = 900;
  newTheme.typography.h2.fontWeight = 900;
  newTheme.typography.h2.textTransform = 'capitalize';
  // console.log(newTheme);
  // newTheme.typography = TYPOGRAPHY;
  return newTheme;
};

// To avoid 'this' pitfall, the recommended pattern is not to use this and prefer arrow function.
const lt = createTheme(LIGHT_THEME);
const dt = createTheme(DARK_THEME);

// ========================================================================== //
// App State
// ========================================================================== //
const useStore = create((set) =>
  // ========================================================================== //
  //   State
  // ========================================================================== //
  ({
    appContext: {
      type: 'light',
      toggleTheme: () => {
        set((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            type: state.appContext.type === 'light' ? 'dark' : 'light',
          },
        }));
      },
      location: {},
      setLocation: (location) => {
        set((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            location,
          },
        }));
      },
    },
    threejsContext: {
      context: {
        color: '#fff', // x
        selectedIndex: -1,
        position: { x: 0, y: 0, z: 0 },
        pageLink: '/',
        postData: [],
        // react spring animated values from three wrapper and page transition overlay
        animatedColor: '#fff',
        animatedOpacity: 1,
        // subtitle: 'default',
        // headline: 'THE BUILDING BLOCK FOR YOUR ORGANISATION',
        pageTheme: {
          primary: '#fff',
          secondary: '#fff',
        },
      },
      methods: {
        changeContext: (newContext) => {
          set((state) => ({
            ...state,
            threejsContext: {
              ...state.threejsContext,
              context: {
                ...state.threejsContext.context,
                ...newContext,
              },
            },
          }));
        },
        changePage: (newSelectedData) => {
          if (typeof window === 'undefined') return;

          // set theme from selected props
          set((state) => ({
            ...state,
            threejsContext: {
              ...state.threejsContext,
              context: {
                ...state.threejsContext.context,
                ...newSelectedData,
              },
            },
          }));
          // route to page
          // alert(newSelectedData.pageLink);
          // navigate(newSelectedData.pageLink, { replace: true, state: newSelectedData });
          // navigate to another page with @react/router
          navigate(newSelectedData.pageLink, { replace: true });
        },
        // overritten by page transition overlay
        triggerPageChange: () => { },
        setColor: () => {},
      },
      gameObjects: [
        {
          blogUrl: './',
          textureUrl: './',
           
          color: '#fff',
        },
      ],
      setNewObjects: (newObjects) => set((state) => ({ threejsContext: { gameObjects: newObjects } })),
      pushGameObject: (newObject) => set((state) => ({ threejsContext: { gameObjects: [...state.threejsContext.gameObjects, newObject] } })),
    },
  }));
//   import { devtools } from 'zustand/middleware'

// // Usage with a plain action store, it will log actions as "setState"
// const useStore = create(devtools(store))
// // Usage with a redux store, it will log full action types
// const useStore = create(devtools(redux(reducer, initialState)))
// export all
export {
  createTheme, lt, dt, useStore,
};
 