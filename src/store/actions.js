import { bindActionCreators } from "redux";
import THEME_DEFINITIONS from "./theme";

//**action creators **/
//all return an action object, these express intent of a dispatch, the type: is important because it will be evaluated in the reducer
const _SET_THEME = (theme) => ({ type: SET_THEME, payload: theme });
const _SET_THEME_STATE = (theme) => ({
  type: SET_THEME,
  theme: THEME_DEFINITIONS[theme],
});
const _SET_BLOG = (blogContext) => ({
  type: SET_BLOG,
  payload: blogContext,
});
const _SET_THREEJS = (threejsContext) => ({
  type: SET_THREEJS,
  payload: threejsContext,
});
const _SET_USER_DATA = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});
const _INCREMENT = (amnt) => ({ type: INCREMENT, payload: amnt });

//**wraps each action with a dispatch so we only need to call the actions such that it is **/
//import this into components using the store, then boundActions.theMethodYouWishToUse
export const boundActions = bindActionCreators(
  {
    SET_BLOG: _SET_THEME,
    SET_TYHREEJS: _SET_THREEJS,
    SET_USER_DATA: _SET_USER_DATA,
    SET_THEME: _SET_THEME,
    SET_THEME_STATE: _SET_THEME_STATE,
  }
  // store.dispatch
);

//**alternatively, you can import the methods direcly and call them like... */
//import {_SET_THEME} from ...
//... onClick={store.dispatch(_SET_THEME())}
