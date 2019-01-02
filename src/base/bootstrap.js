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
export function initRoot(status) {
  configVue(Vue);
  initPrompt(Vue);
  initMessage(Vue);
  initToVue(Vue);

  rootVue = new Vue({
    data: {
      status
    },
    router: initRouter(Vue),
    store: initStore(Vue),
    template: `
      <div id="root">
        <router-view/>
      </div>
    `
  }).$mount();

  document.body.appendChild(rootVue.$el);
}