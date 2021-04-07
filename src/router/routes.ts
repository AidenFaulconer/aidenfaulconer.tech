import { RouteConfig } from 'vue-router';

import Error404Page from '../pages/404.vue';
import Index from '../pages/Index.vue';
import Scanner from '../pages/Scanner.vue';
import Settings from '../pages/Settings.vue';
import SendReceive from '../pages/SendReceive.vue';

import Login from '../pages/Login/Login.vue';
import RestoreWallet from '../pages/Login/RestoreWallet.vue';
import CreateWallet from '../pages/Login/CreateWallet.vue';

import AppLayout from '../layouts/AppLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';



const routes: RouteConfig[] = [
  //#region railgun wallet app (requiring the creation /restoration of a wallet via a passphrase)
  //dashboard
  {
    path: '/',
    component: AppLayout,//TODO: lazy-load w reference to webpackChunkName: "name"
    children: [
      { path: '', component: Index }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: true
    }
  },

  //scan qr code
  {
    path: '/scanner',
    component: AppLayout,//TODO: lazy-load w reference to webpackChunkName: "name"
    children: [
      { path: '', component: Scanner }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: true
    }
  },

  //railgun wallet settings
  {
    path: '/settings',
    component: AppLayout,//TODO: lazy-load w reference to webpackChunkName: "name"
    children: [
      { path: '', component: Settings }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: true
    }
  },

  //send/receive
  {
    path: '/send-receive',
    component: AppLayout,//TODO: lazy-load w reference to webpackChunkName: "name"
    children: [
      { path: '', component: SendReceive }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: true
    }
  },
  //#endregion railgun wallet app (requiring the creation /restoration of a wallet via a passphrase)


  //#region creation and restoration of railgun wallet via passphrase
  //create wallet
  {
    path: '/create-wallet',
    component: AppLayout,
    children: [
      { path: '', component: CreateWallet }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: false
    }
  },

  //restore wallet
  {
    path: '/restore-wallet',
    component: MainLayout,
    children: [
      { path: '', component: RestoreWallet }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: false
    }
  },

  //init (entry point if anonymous)
  {
    path: '/login',
    component: MainLayout,
    children: [
      { path: '', component: Login }
    ],
    caseSensitive: false,
    meta: {
      requiresWallet: false
    }
  },
  //#endregion creation and restoration of railgun wallet via passphrase


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    children: [
      { path: '', component: Error404Page }
    ],
    component: MainLayout,
    caseSensitive: false,
  }
];
export default routes;
