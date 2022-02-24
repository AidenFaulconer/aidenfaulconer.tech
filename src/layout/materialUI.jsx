import * as React from 'react';
import {
  createTheme, CssBaseline, ThemeProvider, StyledEngineProvider, NoSsr,
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import {
  dt, lt, useStore, LIGHT_THEME, afCreateTheme,
} from '../store/store';

// import { dt, lt, valtioState } from "../store/store-wrapper"
// import { ServerStyleSheets } from "@mui/material/styles"
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

export default ({ children }) => {
  const type = useStore((state) => state.appContext.type);
  return (
    <>
      <React.StrictMode>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,
      maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        {/* <NoSsr> */}
        <StyledEngineProvider injectFirst>
          <ThemeProvider
            theme={type === 'light' && lt || dt}
            key="ThemeProvider"
            // sheetsManager={new Map()}
          >
            <StylesProvider injectFirst>
              <CssBaseline />
              {children}
            </StylesProvider>
          </ThemeProvider>
        </StyledEngineProvider>
        {/* </NoSsr> */}
      </React.StrictMode>
    </>
  );
};
// }, (pre, post) => pre.type === post.type);

// export default ({ children }) => (
//   <>
//     {children}
//   </>
// );
