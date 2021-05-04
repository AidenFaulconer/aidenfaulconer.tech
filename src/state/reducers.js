import { combineReducers } from "redux";
//#region reducers **map the actions by the handler associated with them**
export const reducers = (state = {}, action) => {
  switch (action.type) {
    case "SET_BLOG":
      return { ...state, ...action.SET_BLOG };
    case "SET_THREEJS":
      return { ...state, ...action.SET_THREEJS };
    case "SET_USER_DATA":
      return { ...state, ...action.SET_USER_DATA };
    case "SET_THEME":
      return { ...state, ...action.SET_THEME };
    case "SET_THEME_STATE":
      return { ...state, ...action.SET_THEME_STATE };
    case "INCREMENT":
      return { ...state, ...action.INCREMENT };
    default:
      return state;
  }
};

export const rootreducer = combineReducers({ reducers });
//#endregion reducers
