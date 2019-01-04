import 'normalize.css';
import '../styles';
import Vue from 'vue';
import {initRouter} from "../router";
import {initStore} from "../store";
import {initPrompt} from "./initPrompt";
import {configVue} from "../utils/configVue";
import {initToVue} from "./loading";
import {initMessage} from "./initMessage";

// 根Vue实例
let rootVue;

/**
 * 初始化界面
 */
export function initRoot(status, userInfo) {
  configVue(Vue);
  initPrompt(Vue);
  initMessage(Vue);
  initToVue(Vue);

  let store = initStore(Vue);
  store.commit('user/saveUserInfo', userInfo);

  let router = initRouter(Vue);

  rootVue = new Vue({
    data: {
      status
    },
    router,
    store,
    template: `
      <div id="root">
        <keep-alive include="MainPage">
          <router-view/>
        </keep-alive>
      </div>
    `
  }).$mount();

  document.body.appendChild(rootVue.$el);
}