export function no() {
}

// 该方法用于将data对象中的属性对应值为undefined、null或者空字符串''的属性移除
let class2type = [];
let toString = Object.prototype.toString;

/**
 * 判断目标参数的类型，返回相应类型的字符串表示。
 */
export let type = function () {
  "Boolean Number String Function Array Date RegExp Object Error Symbol FormData".split(" ").forEach(
    function (name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );

  return function (obj) {
    if (obj == null) {
      return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  }
}();

export function clearNull(data) {
  if (type(data) === 'formdata') {
    return data;
  }

  return type(data) === 'object' ? Object.keys(data || {}).reduce((result, key) => {
    if (!(data[key] === undefined || data[key] === null || data[key] === '')) {
      result[key] = data[key];
    }

    return result;
  }, {}) : {};
}