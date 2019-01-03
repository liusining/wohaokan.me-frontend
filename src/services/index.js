import {axios, config} from './Request';
import {getPath} from "./info";
import {getAuth} from "../utils/authorizationHelper";
import {showMessage} from "../base/initMessage";
import {showLoading, hideLoading} from "../base/loading";
import {authorization} from "./authorization";

let isOnLine = window.navigator.onLine;

window.addEventListener('online', () => {
  isOnLine = true;
});
window.addEventListener('offline', () => {
  isOnLine = false;
});

let offLineErrorMsg = '请检查网络是否已连接';

config({
  beforeRequest: function () {
    if (!isOnLine) {
      showMessage('error', offLineErrorMsg);
      return {
        msg: offLineErrorMsg
      }
    }
  },
  showError: function (message) {
    showMessage('error', message);
  },
  loading(status) {
    if (status) {
      showLoading();
    } else {
      hideLoading();
    }
  }
});

axios.defaults.baseURL = getPath();
axios.interceptors.request.use(function (config) {
  config.withCredentials = typeof config.withCredentials === 'boolean' ? config.withCredentials : true;

  if (!config.noAuth) {
    config.headers = {
      ...(config.headers || {}),
      'X-Session-Key': getAuth()
    }
  }
  return config;
});

axios.interceptors.response.use(function (response) {
  const {data} = response;

  // status为700表示用户的session_key失效或者错误，需要用户重新授权
  // Todo 现在是直接跳转并重新登陆，更人性化的是有三秒的倒计时，告诉用户发生了什么
  if (data.status === 700) {
    authorization();
  }

  return response;
});