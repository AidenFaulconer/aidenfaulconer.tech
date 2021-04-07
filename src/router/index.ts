import { route } from 'quasar/wrappers';
import VueRouter, { Route, NavigationGuardNext } from 'vue-router';
import { Store } from 'vuex';
import routes from './routes';
import RailgunStore, { IRailgunStore } from '../store/index';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */


// check if a user has logged in via a passphrase, referenced in routes.ts in the meta:{} object
// eslint-disable-next-line @typescript-eslint/ban-types
export const requiresWallet = (to: Route, from: Route, next: NavigationGuardNext, walletLoaded: boolean): boolean => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (to.matched.some(record => record.meta.requiresWallet)) {//if route requires a inital wallet (by creating/restoring via passphrase), handle 
    if (!walletLoaded) {
      next({
        path: '/login',//keep user fixated at the login screen till a wallet is laoded
        query: { redirect: to.fullPath }
      });
    }
    else if (from.matched.some(currentPath => currentPath.path == "/login")) {
      next({ path: '/', query: { redirect: to.fullPath } });
    }
    else {
      next();
    }
    return true;
  }
  return false;//if false continue login in Router.beforeEach
};


export default route<Store<IRailgunStore>>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,//shape of the apps routes and there behaviour

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  //check authentication or user permissions before each route
  Router.beforeEach((to, from, next) => {
    const store: Store<IRailgunStore> = RailgunStore({ Vue });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (requiresWallet(to, from, next, store.getters['RailgunWallet/getWalletState'])) return;//check if a user has logged in via a passphrase thereby creating a wallet
    next();
  });

  return Router;
});
