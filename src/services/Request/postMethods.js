import qs from 'qs';
import {clearNull} from "../../utils/util";
import {type} from "../../utils/util";

export function initPostMethods(Request) {
  [{method: 'post'}, {method: 'put'}, {method: 'patch'}, {
    method: 'upload',
    httpMethod: 'post',
    autoFormat: false,
    handleData(data) {
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      return formData;
    }
  }].forEach(({method, httpMethod, autoFormat = true, handleData}) => {
    Request.prototype[method] = function (url, data, config = {}) {
      let isFormat = type(config.isFormat) === 'boolean' ? config.isFormat : false;

      data = clearNull(data);
      if (autoFormat && isFormat) {
        data = qs.stringify(data);
      }

      if (handleData) {
        data = handleData(data);
      }

      return this.request({...config, method: httpMethod || method, url, data});
    }
  });
}

let postUpload = function (url, data, config) {
  const formData = new FormData(data);
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  let headers = config.headers = config.headers || {};
  headers['Content-Type'] = 'multipart/form-data';

  return axios.post(url, formData, config);

};
