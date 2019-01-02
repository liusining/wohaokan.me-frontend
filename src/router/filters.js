import {getStore} from '../store';

const DEFAULT_TITLE = '我好看吗';

function checkUser() {
  const {loginUserInfo} = getStore().state.user;

  // 主要为了防止用户刷新页面的情况
  if (loginUserInfo) {
    return Promise.resolve();
  } else {
    return getStore().dispatch('user/getUser');
  }
}

export function initRouterFilter(router) {
  router.beforeEach((to, from, next) => {
    checkUser().then(() => {
      // 路由跳转之前根据to路由的元数据中的title属性设置浏览器的title
      document.title = (to && to.meta && to.meta.title) || DEFAULT_TITLE;
      next();
    });
  });
}