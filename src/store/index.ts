import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import { Store } from 'vuex';


import VuexPersistence from 'vuex-persist';
import { RailgunWallet, IRailgunWallet } from "./RailgunWallet";

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';


//plugins
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// namespaced stores go here w associated types
export interface IRailgunStore {
  // Define your own store structure, using submodules if needed
  // example: ExampleIRailgunStore;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  RailgunWallet: IRailgunWallet;
}


export default store(function ({ Vue }): Store<IRailgunStore> {
  Vue.use(Vuex);

  const Store = new Vuex.Store<IRailgunStore>({
    modules: {
      RailgunWallet
    },
    devtools: process.env.NODE_ENV === 'development' ? true : false,
    plugins: [vuexLocal.plugin],//

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV === 'development' ? true : false,
  });

  return Store;
});



