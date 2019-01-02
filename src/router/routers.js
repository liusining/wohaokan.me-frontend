import VueRouter from 'vue-router';
import {initRouterFilter} from "./filters";
import {
  MainPage,
  RewardDetailPage,
  PersonalHomePage,
  PersonalInformation,
  RewardRecord,
  UploadPhotoSuccess,
  UpdatePersonInfo
} from '../pages';

const routes = [{
  path: '',
  redirect: '/main'
}, {
  path: '/main',
  component: MainPage,
  meta: {title: '我好看么'}
}, {
  path: '/reward',
  component: RewardDetailPage,
  meta: {title: '打赏一下'}
}, {
  path: '/uploadSuccess',
  component: UploadPhotoSuccess,
  meta: {title: '上传成功'}
}, {
  path: '/uploadSuccess/auth',
  component: UploadPhotoSuccess,
  meta: {title: '上传成功'}
}, {
  path: '/updateInfo',
  component: UpdatePersonInfo,
  meta: {title: '更新资料'}
}, {
  path: '/personalHome',
  component: PersonalHomePage,
  children: [{
    path: '',
    redirect: 'info'
  }, {
    path: 'info',
    component: PersonalInformation,
    meta: {title: '个人资料'}
  }, {
    path: 'reward',
    component: RewardRecord,
    meta: {title: '打赏记录'}
  }]
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