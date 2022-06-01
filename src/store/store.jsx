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
 
const afCreateTheme = (theme) => {
  const muiTheme = createTheme({ ...theme });
  const newTheme = deepmerge(muiTheme, CUSTOM_THEME_PROPS, OVERRIDES); 
  newTheme.typography.h1.fontWeight = 900;
  newTheme.typography.h2.fontWeight = 900;
  newTheme.typography.h2.textTransform = 'capitalize'; 
  return newTheme;
};
 
const lt = afCreateTheme(LIGHT_THEME);
const dt = afCreateTheme(DARK_THEME);

// ========================================================================== //
// App Global Shared State
// ========================================================================== //
const saveStore = (storeSnapshot) => {
  localStorage.setItem('store', JSON.stringify(storeSnapshot));
}
const loadStore = () => {
  return JSON.parse(localStorage.getItem('store'));
}

const useStore = create(persist((set,get) => {
  //add on top of this for a more robust store
  return {
  appContext: {
    type: 'light',
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
      toggleTheme: () => { // TODO: move to methods for better separation
        set((state) => ({
          ...state,
          appContext: {
            ...state.appContext,
            type: state.appContext.type === 'light' ? 'dark' : 'light',
          },
        }));
      },
    },
  },

  // temp holder for forms that have not been assigned their own store space
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
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          },
        }));
      },
    },
  },

  contactForm: {
    name: 'aiden',
    email: 'aidenf09@yahoo.com',
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
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          },
        }));
      },
    },
  },

  bookingForm: {
    // user details
    name: 'aiden',
    email: 'aidenf09@yahoo.com',
    message: 'test message',
    phone: '',
    service: '',
    subService: '',
    // project details
    referencePhotos: [],
    projectRequirements: '',
    budgetRange: '',
    dueDate: new Date().getTime(),
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
}
})); 

export {
  createTheme, lt, dt, useStore, saveStore
};
// 60668172
