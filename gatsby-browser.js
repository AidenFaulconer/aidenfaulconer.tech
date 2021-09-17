import "prismjs/themes/prism-okaidia.css";
import "./src/styles/bootstrap.scss";
import "@fontsource/poppins"; //https://github.com/fontsource/fontsource/blob/main/packages/roboto/README.md

//wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
import { putStoreInContext } from "./src/store/store-wrapper";
export const wrapRootElement = putStoreInContext;


//wrap threejs here with higher order animation component
//...
