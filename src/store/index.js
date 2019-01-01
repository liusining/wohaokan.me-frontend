import Vuex from 'vuex';
import {mainPage} from "./mainPage";

const storeConfig = {
  modules: {
    mainPage,
  }
};

let store;

export function initStore(Vue) {
  Vue.use(Vuex);

  return store = new Vuex.Store(storeConfig)
}

export function getStore() {
  return store;
}