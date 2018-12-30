import VueRouter from 'vue-router';
import {initRouterFilter} from "./filters";
import {MainPage} from '../pages/MainPage';

const routes = [{
  path: '',
  redirect: '/main'
}, {
  path: '/main',
  component: MainPage,
  meta: {title: '我好看么？'}
}];


let router;

export function initRouter(Vue) {
  Vue.use(VueRouter);
  router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {selector: to.hash}
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0}
      }
    },
    routes
  });

  initRouterFilter(router);

  return router;
}

export function getRouter() {
  return router;
}