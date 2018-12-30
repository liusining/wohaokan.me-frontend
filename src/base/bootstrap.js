import Vue from 'vue';
import {initRouter} from "../router";

const router = initRouter(Vue);

// 根Vue实例
let rootVue;

document.addEventListener('DOMContentLoaded', function () {
  rootVue = new Vue({
    router,
  }).$mount('#root');
});