import axios from 'axios';
import {getPath} from "./info";
import {getAuth} from "../utils/authorizationHelper";

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