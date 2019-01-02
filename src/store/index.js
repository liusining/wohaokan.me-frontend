import Vuex from 'vuex';
import {mainPage} from "./mainPageStore";
import {user} from "./userStore";

const storeConfig = {
  modules: {
    mainPage,
    user
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