//use this file to decalre a special global context object you can use to access from any place in the application
//read: https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
//its best practice to make sure the type definitions are clear when dealing with context, therefore we use typescript
//a typescript runtime is needed, so we need @nuxt/typescript-runtime and @nuxt/typescript-build to run this file, and the tsconfig.json file

declare module 'vue/types/vue' {
  // Vue instance this.$Railgun
  interface Vue {
    $Railgun: RailgunPlugin;
  }
}


declare module '@nuxt/types' {
  // NuxtAppOtions this.app.$Railgun
  interface NuxtAppOptions {
    $Railgun: RailgunPlugin;
  }
  // Accessible by Context
  interface Context {
    $Railgun: RailgunPlugin;
  }
}


declare module 'vuex/types/index' {
  // this.$Railgun inside Vuex stores
  interface Store<S> {
    $Railgun: RailgunPlugin;
  }
}

//interface is the way we declare types in typescript
enum RailgunEventTypes {
  onLogin = "onLogin",
  onRegister = "onRegister",
  onAuthenticationFail = "onAuthenticationFail",
  onAuthenticationSuccess = "onAuthenticationSuccess",
}

//reflection of the eventtypes used on the server
enum RailgunBackendEventTypes { }

enum RailgunCategoryTypes { }



//RailgunPlugin object scaffolding
interface RailgunPlugin {
  handleEvent(this: Vue, eventName: RailgunEventTypes, handler: Function): void,
  handleError(e: any): boolean,
  callEvent(this: Vue, eventName: RailgunEventTypes): void,

  encrypt(data: any): string,
  decrypt(cipher: string, secret: string): string,

  appVersion: "Railgun: 1.0 beta",
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//recovery vr plugin accessible from any context via this.${anything **injected** and referenced on the RailgunPlugin type}//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Vue from 'vue';
import { Context } from "@nuxt/types";
import cryptojs from "crypto-js";
import { isEmpty } from "lodash";
import defaultData from "~/store/default-data/default-data.json";
// import { Encoder } from '~/dist/_nuxt/0a87751';


//allowing events to be called in the store is important for containing store event calls to the store itself
//from https://stackoverflow.com/questions/64444511/how-to-emit-an-event-from-a-nuxt-plugin
//adding anything new to the plugin requires a complete rebuild when developing
export default function (_ctx: Context, inject: Function) {

  let vueInstance = new Vue();//we must use a consistent instance of vue to inject into
  let mockData = JSON.parse(JSON.stringify(defaultData));//transform JSON to object

  const encrypt = function (data: string) {
    let cipher = cryptojs.AES.encrypt(data, String(process.env.CRYPTO_PASSPHRASE)).toString();
    return cipher;
  };

  const decrypt = function (cipher: string, secret: string) {
    let bytes = cryptojs.AES.decrypt(cipher, secret);
    return bytes.toString();
  };

  const handleError = async function (e: any) {
    if (String(process.env.NODE_ENV === 'development'))
      if (!isEmpty(e)) alert(JSON.stringify(e, null, 2));
    console.log(JSON.stringify(e, null, 2));
    return false;
  };

  const callEvent = function (this: Vue, eventName: string) {
    this.$emit(eventName);//call vues event system
  }.bind(vueInstance);

  const handleEvent = function (this: Vue, eventName: string, handler: Function) {
    this.$on(eventName, handler);//call vues event system
  }.bind(vueInstance);

  //inject plugin methods into application (vue instance)
  inject('callEvent', callEvent);
  inject('handleEvent', handleEvent);
  inject('handleError', handleError);

  inject('encrypt', encrypt);
  inject('decrypt', decrypt);
}