/* eslint-disable no-param-reassign */
import { createTheme } from '@mui/material';
import create from 'zustand';
import React from 'react';
import { deepmerge } from '@mui/utils';
import produce from 'immer';
import { navigate } from 'gatsby-link';

// ========================================================================== //
// Handle theming
// ========================================================================== //
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
};
const loadStore = () => JSON.parse(localStorage.getItem('store'));

// add on top of this for a more robust store
const useStore = create((set, get) => ({
  appContext: {
    type: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'dark',
    location: {},
    scrollLocked: false,
    methods: {
      // ⚠️ setCurrent **is injected here via threeDCarousel** this allows you to set the carousel globally
      setAppContext: (newAppContext) => {
        set(produce((state) => {
          state.appContext = {
            ...state.appContext,
            newAppContext,
          };
        }));
      },
      toggleTheme: () => {
        set(produce((state) => {
          state.appContext.type = state.appContext.type === 'light' ? 'dark' : 'light';
        }));
      },
    },
  },

  carousel: {
    currentSlide: 0,
    // ⚠️ setCurrent is injected here via threeDCarousel's own setCurrent handler (takes indexofslide, direction,)
  },

  methods: {
    setSlide: (newSlide) => {

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
        set(produce((state) => {
          state.bookingForm = {
            ...state.bookingForm,
            ...newContext,
          };
        }));
      },
      clear: () => {
        set(produce((state) => {
          state.bookingForm = {
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          };
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
        set(produce((state) => {
          state.bookingForm = {
            ...state.bookingForm,
            ...newContext,
          };
        }));
      },
      clear: () => {
        set(produce((state) => {
          state.bookingForm = {
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          };
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
        set(produce((state) => {
          state.bookingForm = {
            ...state.bookingForm,
            ...newContext,
          };
        }));
      },
      clear: () => {
        set(produce((state) => {
          // empty an object to clear all the fields
          state.bookingForm = {
            ...Object(
              Object.keys(state.bookingForm).map((key) => ({ [key]: '' })),
            ),
          };
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
      cameraCoords: [
        0, 3.5, 10,
      ],
      scenePosition: [0, -2, 0],
      // react spring animated values from three wrapper and page transition overlay
      animatedColor: '#fff',
      animatedOpacity: 1,
      // subtitle: 'default',
      hand: {
        animationsPlaying: ['hold'],
        propsUsing: [],
        handPosition: [0, -1, 0],
        numHands: 2,
      },
      // headline: 'THE BUILDING BLOCK FOR YOUR ORGANISATION',
      pageTheme: {
        primary: '#fff',
        secondary: '#fff',
      },
    },
    methods: {
      changeHero: (newContext) => {
        set(produce((state) => {
          state.threejsContext.context.hero = {
            ...newContext,
          };
        }));
      },
      changeContext: (newContext) => {
        set(produce((state) => {
          state.threejsContext.context = {
            ...state.threejsContext.context,
            ...newContext,
          };
        }));
      },
      changeHand: (newContext) => {
        set(produce((state) => {
          state.threejsContext.context.hand = {
            ...newContext,
          };
        }));
      },
      changeHandPosition: (newPosition) => {
        set(produce((state) => {
          state.threejsContext.context.hand = {
            ...state.threejsContext.context.hand,
            ...newPosition,
          };
        }));
      },
      changePage: (newSelectedData) => {
        if (typeof window === 'undefined') return;
        // set theme from selected props
        set(produce((state) => {
          state.threejsContext.context = {
            ...state.threejsContext.context,
            ...newSelectedData,
          };
        }));
        // other methods to run TODO: add more methods, ie: setColor, triggerPageChange, etc... so its cleaner
        navigate(newSelectedData.pageLink, { replace: true });
      },
      // overritten by page transition overlay
      triggerPageChange: () => { },
      setColor: () => { },
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

export {
  createTheme, lt, dt, useStore, saveStore,
};
