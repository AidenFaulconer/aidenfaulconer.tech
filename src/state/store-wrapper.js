import React from "react";
import { Provider } from "react-redux";
import { _createStore } from "./create-store";

//#region create a store and provider for react application
export const putStoreInContext = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = _createStore();
  return <Provider store={store}>{element}</Provider>;
};
//#endregion create a store and provider for react
