import { createTheme } from '@mui/material';
import create from 'zustand';
import React from 'react';
import { deepmerge } from '@mui/utils';
// ========================================================================== //
// Handle theming
// ========================================================================== //
import { navigate } from 'gatsby-link';

import {
  DARK_THEME, LIGHT_THEME, OVERRIDES, CUSTOM_THEME_PROPS,
} from './theme';

// create themes to be used in valtio
const afCreateTheme = (theme) => {
  const muiTheme = createTheme({ ...theme });
  const newTheme = deepmerge(muiTheme, CUSTOM_THEME_PROPS, OVERRIDES);
  // custom theme properties
  newTheme.typography.h1.fontWeight = 900;
  newTheme.typography.h2.fontWeight = 900;
  newTheme.typography.h2.textTransform = 'capitalize';
  // console.log(newTheme);
  // newTheme.typography = TYPOGRAPHY;
  return newTheme;
};

// To avoid 'this' pitfall, the recommended pattern is not to use this and prefer arrow function.
const lt = afCreateTheme(LIGHT_THEME);
const dt = afCreateTheme(DARK_THEME);

// ========================================================================== //
// App Global Shared State
// ========================================================================== //
const useStore = create((set) => ({
  // control the app
  appContext: {
    type: 'light',
    toggleTheme: () => { // TODO: move to methods for better separation
      set((state) => ({
        ...state,
        appContext: {
          ...state.appContext,
          type: state.appContext.type === 'light' ? 'dark' : 'light',
        },
      }));
    },
    location: {},
    methods: {
      setAppContext: (newAppContext) => {
        set((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            newAppContext,
          },
        }));
      },
      // this method is overridden when a threeDCarousel is instanced with its setCurrent method
      setCurrent: () => {},
    },
  },
  // for useFormInput for testing purposes
  testForm: {
    text: '',
    number: '',
    file: '',
    date: '',
    message: '',
    methods: {
      changeFormData: (newContext) => {
        set((state) => ({
          ...state,
          bookingForm: {
            ...state.bookingForm,
            ...newContext,
          },
        }));
      },
      clear: () => {
        set((state) => ({
          ...state,
          bookingForm: {
            // empty an object to clear all the fields
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          },
        }));
      },
    },
  },
  // control form input
  contactForm: {
    name: false,
    email: false,
    message: 'Hello world',
    phone: false,
    service: false,
    methods: {
      changeFormData: (newContext) => {
        set((state) => ({
          ...state,
          bookingForm: {
            ...state.bookingForm,
            ...newContext,
          },
        }));
      },
      clear: () => {
        set((state) => ({
          ...state,
          bookingForm: {
            // empty an object to clear all the fields
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          },
        }));
      },
    },
  },
  // control form input
  bookingForm: {
    // user details
    name: '',
    email: '',
    message: '',
    phone: '',
    service: '',
    subService: '',
    // project details
    referencePhotos: [],
    projectRequirements: '',
    budgetRange: '',
    dueDate: '',
    projectSuccessHow: '',
    // confirmation
    summary: [],
    methods: {
      changeFormData: (newContext) => {
        set((state) => ({
          ...state,
          bookingForm: {
            ...state.bookingForm,
            ...newContext,
          },
        }));
      },
      clear: () => {
        set((state) => ({
          ...state,
          bookingForm: {
            // empty an object to clear all the fields
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          },
        }));
      },
    },
  },
  // control 3d app
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
      hand: {
        animationsPlaying: ['hold'],
        propsUsing: [],
      },
      // headline: 'THE BUILDING BLOCK FOR YOUR ORGANISATION',
      pageTheme: {
        primary: '#fff',
        secondary: '#fff',
      },
    },
    methods: {
      changeHero: (newContext) => {
        set((state) => ({
          ...state,
          threejsContext: {
            ...state.threejsContext,
            context: {
              ...state.threejsContext.context,
              hero: {
                ...state.threejsContext.context.hero,
                ...newContext,
              },
            },
          },
        }));
      },
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
      changeHand: (newContext) => {
        set((state) => ({
          ...state,
          threejsContext: {
            ...state.threejsContext,
            context: {
              ...state.threejsContext.context,
              hand: {
                ...newContext,
              },
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
        // other methods to run TODO: add more methods, ie: setColor, triggerPageChange, etc... so its cleaner
        navigate(newSelectedData.pageLink, { replace: true });
      },
      // overritten by page transition overlay
      triggerPageChange: () => {},
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
    pushGameObject: (newObject) => set((state) => ({
      threejsContext: {
        gameObjects: [...state.threejsContext.gameObjects, newObject],
      },
    })),
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
