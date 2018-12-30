const DEFAULT_TITLE = '我好看吗';

export function initRouterFilter(router) {
  router.beforeEach((to, from, next) => {
    // 路由跳转之前根据to路由的元数据中的title属性设置浏览器的title
    document.title = (to && to.meta && to.meta.title) || DEFAULT_TITLE;
    next();
  });
}