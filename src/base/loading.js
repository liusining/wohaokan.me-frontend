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

let currLoadingAmount = 0;

/**
 * 显示loading
 * @param direct 是否直接显示而不记录
 */
export function showLoading(direct) {
  !direct && currLoadingAmount++;
  loadingDOM.style.display = 'flex';
}

/**
 * 隐藏loading
 * @param direct 是否直接隐藏，而不记录
 */
export function hideLoading(direct) {
  if (direct || --currLoadingAmount === 0) {
    loadingDOM.style.display = 'none';
  }
}