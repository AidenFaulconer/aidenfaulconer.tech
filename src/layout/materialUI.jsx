import * as React from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { use, useSnapshot } from 'valtio';
import { valtioState } from '../store/store-wrapper';


const MaterialUI = React.memo(({ children }) => {
  // const [THEME_TYPE, changeTheme] = useToggle();

  const {appcontext: theme} = useSnapshot(valtioState,{synch:true}); 
  console.log('valtioState', theme);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      {/* must have a key or risk duplicate themes injected **very bad** also, styles may be duplicated on each develop refresh **this needs fixing** */}
      <ThemeProvider
        // the theme is toggled HERE
        // theme={state.appContext.theme}
        // theme={lt}
        theme={theme}
        key="ThemeProvider"
      >
        <StylesProvider injectFirst>
          <CssBaseline />
          {/* inject first adds styles that override existin MUI styles from external files */}
          {/* <CssBaseline /> */}
          <React.StrictMode>
          {children}
          </React.StrictMode>
        </StylesProvider>
      </ThemeProvider>
    </>
  );
});

export default MaterialUI;
