/**
 * 该方法用于解析URL中的查询字段，将a=b&c=d形式转换为{a:'b', c:'d'}形式
 *
 * @returns {{}}
 */
export let resolveSearch = function () {
  let search = location.search;
  // location.href返回字符串的可能形式为'?a=b&c=d'
  let index = search.indexOf('?');

  if (~index) {
    search = search.substring(index + 1);
  }

  return search.split('&').reduce((result, keyValueMapper) => {
    let keyValueArr;

    if (keyValueMapper.trim() !== '') {
      keyValueArr = keyValueMapper.split('=');

      result[keyValueArr[0]] = keyValueArr[1];
    }

    return result;
  }, {});
};

/**
 * 获得浏览器视口的宽度和高度
 */
export function browserBox() {
  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;

  if (typeof pageWidth !== 'number') {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  }

  return {
    width: pageWidth,
    height: pageHeight
  };
}
