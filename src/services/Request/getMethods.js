import {clearNull} from "../../utils/util";

export function initGetMethods(Request) {
  ['delete', 'get', 'head', 'options'].forEach((method) => {
    Request.prototype[method] = function (url, config = {}) {
      config.params = clearNull(config.params);
      return this.request({...config, method, url});
    }
  });
}