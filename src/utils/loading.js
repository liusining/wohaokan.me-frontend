let loadingDOM;

export function initLoading() {
  loadingDOM = document.querySelector('.loading');
}

export function initToVue(Vue) {
  Vue.mixin({
    beforeCreate() {
      this.$loading = {
        show: showLoading,
        hide: hideLoading
      }
    }
  })
}

export function showLoading() {
  loadingDOM.style.display = 'flex';
}

export function hideLoading() {
  loadingDOM.style.display = 'none';
}