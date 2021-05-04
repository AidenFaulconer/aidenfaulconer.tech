//wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
//wrap entire app in custom element, this is done by hooking into gatsbys wrapRootElement
import { putStoreInContext } from "./src/state/store-wrapper";
export const wrapRootElement = putStoreInContext;
