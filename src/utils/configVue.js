export function configVue(Vue) {
  const isProduction = process.env.NODE_ENV === 'production';
  Vue.config.silent = !isProduction;
  Vue.config.productionTip = !isProduction;
  Vue.config.devtools = !isProduction;
}