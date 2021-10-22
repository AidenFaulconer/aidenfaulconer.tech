import * as React from 'react';
import {
  createMuiTheme, CssBaseline, StylesProvider, MuiThemeProvider,
} from '@material-ui/core';
import { dt, lt, useStore } from '../store/store';

// import { dt, lt, valtioState } from "../store/store-wrapper"
// import { ServerStyleSheets } from "@material-ui/core/styles"
// // ========================================================================== //
// //   SSR compatibility
// // ========================================================================== //
// const getInitialProps = async () => {
//   const [ssr, setSsr] = React.useState(typeof window == "undefined")
//   const sheets = new ServerStyleSheets()
//   const originalRenderPage = use.renderPage
//   use.renderPage = () => {
//     const sheet = sheets.collect(originalRenderPage())
//     return sheet.getStyleElement()
//   }
//   if (ssr) return sheets.collect(children)
//   const initialProps = await use.getInitialProps()

//   //styles fragment is rendered after the app and page rendering finish
//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   }
// }
// //define it statically so it can be used in ssr
// useImperativeHandle(ref, () => ({
//   getInitialProps,
// }))

const MaterialUI = React.memo(({ children }) => {
  const type = useStore((state) => state.appContext.type);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      {/* must have a key or risk duplicate themes injected **very bad** also, styles may be duplicated on each develop refresh **this needs fixing** */}

      <MuiThemeProvider
        // needs to be cloned to work with material-ui
        theme={type === 'light' && lt || dt}
        key="ThemeProvider"
      >
        {/* inject first adds styles that override existin MUI styles from external files */}
        <StylesProvider injectFirst>
          <CssBaseline />
          {/* <React.StrictMode> */}
          {children}
          {/* </React.StrictMode> */}
        </StylesProvider>
      </MuiThemeProvider>
    </>
  );
}, (pre, post) => pre.type === post.type);

export default MaterialUI;
