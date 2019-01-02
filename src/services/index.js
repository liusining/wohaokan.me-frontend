import {axios, config} from './Request';
import {getPath} from "./info";
import {getAuth} from "../utils/authorizationHelper";
import {showMessage} from "../base/initMessage";
import {showLoading, hideLoading} from "../base/loading";

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
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  if (!config.noAuth) {
    config.headers = {
      ...(config.headers || {}),
      'X-Session-Key': getAuth()
    }
  }
  return config;
});