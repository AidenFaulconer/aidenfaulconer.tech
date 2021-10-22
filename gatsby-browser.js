// https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement

import 'prismjs/themes/prism-okaidia.css';
import './src/styles/bootstrap.scss';
import '@fontsource/poppins'; // https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

// wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
import React from 'react';
import { navigate } from 'gatsby';
import MaterialUI from './src/layout/materialUI';
import Layout from './src/layout/layout';
import { useStateWithCallbackInstant } from './src/components/util/customHooks';
import { useStore } from './src/store/store';

// wont unmount on page change
export const wrapPageElement = ({ element, props }) => {
  if (typeof window === 'undefined') return;
  // const setLocation = useStore((state) => state.appContext.setLocation);
  // appContext.setLocation(props.location);
  // useStore.setState({ appContext: { location: props.location } });
  // setLocation(props.location);
  // const unsub = useStore.subscribe((curState, prevState) => {
  //   if (curState.appContext.location !== props.location) {
  //     console.log('update State');
  //     curState.appContext.setLocation(props.location);
  //   }
  // });
  return <Layout>{element}</Layout>;
};

export function wrapRootElement({ element, props }) {
  if (typeof window === 'undefined') return;
  return <MaterialUI>{element}</MaterialUI>;
}
