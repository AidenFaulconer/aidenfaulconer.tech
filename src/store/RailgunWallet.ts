
import { providers, Wallet, Contract, Signer, VoidSigner, ContractTransaction } from "ethers";
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { IStore } from './index';


//encryption 
import VuexPersistence from 'vuex-persist';
import Crypto from 'crypto-js';
import Cookie from 'js-cookie';
import uuid from 'uuid';
import { hexlify } from "ethers/utils";

const cookieName = 'railgun-session';

const storageKey = 'storageKey';//passphrase

// Get the encryption token from cookie or generate a new one.
// const encryptionToken = Cookie.get(cookieName) || uuid.v4();

// Store the encryption token in a secure cookie.
// Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });


const vuexLocal = new VuexPersistence({
  storage: {
    getItem: () => {
      // Get the store from local storage.
      const store = window.localStorage.getItem(storageKey);

      if (store) {
        try {
          // Decrypt the store retrieved from local storage
          // using our encryption token stored in cookies.
          const bytes = Crypto.AES.decrypt(store, encryptionToken);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return JSON.parse(bytes.toString(Crypto.enc.Utf8));
        } catch (e) {
          // The store will be reset if decryption fails.
          window.localStorage.removeItem(storageKey);
        }
      }

      return null;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/require-await
    setItem: async (key: string, value: any) => {
      // Encrypt the store using our encryption token stored in cookies.
      const store = Crypto.AES.encrypt(value, encryptionToken).toString();

      // Save the encrypted store in local storage.
      return window.localStorage.setItem(storageKey, store);
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    removeItem: async () => window.localStorage.removeItem(storageKey),
  },
});



// var transaction = {
//   nonce: 0,
//   gasLimit: 21000,
//   gasPrice: utils.bigNumberify("20000000000"),

//   to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",

//   value: utils.parseEther("1.0"),
//   data: "0x",

//   // This ensures the transaction cannot be replayed on different networks
//   chainId: providers.networks.homestead.chainId

// };

export interface IRailgunWallet {
  walletSynced: boolean,
  passphrase: string;
  walletLoaded: boolean,
  Wallet: Wallet,//provides most basic functionality of a wallet, anything else in the store simply supplements it
  myEthNode: Record<string, any>,
  ethNodes: Record<string, any>,
  transactions: [Record<string, any>];
  cached: [];
}

function state(): IRailgunWallet {
  return {
    Wallet: new Wallet(`0x0123456789012345678901234567890123456789012345678901234567890123`),//will be replaced on login, requires a dummy private key for initialization
    walletLoaded: true,
    walletSynced: false,
    passphrase: '',
    myEthNode: {},
    ethNodes: {},
    transactions: [
      {
        address: '',
        amount: 0,
        pending: false,
      },
    ],

    cached: [],
  };
};

export const actions: ActionTree<IRailgunWallet, IStore> = {
  async findTransactions({ commit, dispatch, getters, state }, { }) {
    return await new Promise().then();
  },
  async syncWallet({ commit, dispatch, getters, state }, { }) {
    return await new Promise().then();
  },
  async findNodes({ commit, dispatch, getters, state }, { }) {
    return await new Promise().then();
  },
  async generatePassphrase({ commit, dispatch, getters, state }, { privateKey }) {
    return commit("SET_WALLET", new Wallet(privateKey));
  },
  async importPassphrase({ commit, dispatch, getters, state }, { privateKey }) {
    return commit("SET_WALLET", new Wallet(privateKey));
  },
};


export const getters: GetterTree<IRailgunWallet, IStore> = {
  async getTransactions({ transactions }) {
    return transactions;
  },
  async getWallet({ Wallet }) {
    return Wallet;
  },
  getWalletState({ walletLoaded }) {
    return walletLoaded;
  },
  async getSyncState({ walletSynced }) {
    return walletSynced;
  },
  async getNodes({ ethNodes }) {
    return ethNodes;
  },
};;

export const mutations: MutationTree<IRailgunWallet> = {
  async SET_TRANSACTIONS() {
    return await new Promise().then();
  },
  async SET_SYNC_STATE() {
    return await new Promise().then();
  },
  async SET_WALLET({ Wallet, }, newWallet) {
    Wallet = newWallet;
  },
  async SET_NODES() {
    return await new Promise().then();
  },
};;

export const RailgunWallet: Module<IRailgunWallet, IStore> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

