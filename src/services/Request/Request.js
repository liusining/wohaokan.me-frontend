import axios from 'axios';
import {initDefault} from "./default";
import {initGetMethods} from "./getMethods";
import {initPostMethods} from "./postMethods";

function Request() {
}

/**
 * 真正发起请求的方法。
 * @param config 除了axios相关的配置外，还提供了额外的配置选项：
 * ignoreCancel：Boolean类型，默认为true。是否忽略取消请求时的错误，axios可以通过CancelToken进行取消。为true时，表示会忽略Cancel错误。
 * autoError：Boolean类型，默认为true。是否自动处理后端返回的错误。自动处理时，需要配置Request.showError方法或者Request.handleError方法，统一处理错误
 */
Request.prototype.request = function (config) {
  let resolveFn;
  let rejectFn;

  let beforeRequestError;

  if (Request.beforeRequest && (beforeRequestError = Request.beforeRequest(config))) {
    return Promise.reject(beforeRequestError);
  }

  const resultPromise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  // 是否自动处理错误，默认为true
  let autoError = typeof config.autoError === 'boolean' ? config.autoError : true;

  // 自动处理错误
  if (autoError) {
    resultPromise.catch((data) => {
      Request.handleError(data, config);
    });
  }

  const shouldLoading = typeof config.shouldLoading === 'boolean' ? config.shouldLoading : true;

  if (shouldLoading) {
    Request.loading(true);
  }

  axios.request(config).then((response) => {
    if (shouldLoading) {
      Request.loading(false);
    }

    if (config.raw) {
      resolveFn(response);
    } else {
      let data = response.data;
      if (data.status === 200) {
        resolveFn({
          ...data,
          rawResponse: response
        });
      } else {
        rejectFn({
          ...data,
          rawError: response
        });
      }
    }

  }).catch((error) => {
    Request.loading(false);

    if (config.raw) {
      rejectFn(error);
    } else {
      let data = (error && error.response && error.response.data) || {};

      rejectFn({
        unKnowError: true,
        ...data,
        rawError: error
      });
    }
  });

  return resultPromise;
};

initDefault(Request);
initGetMethods(Request);
initPostMethods(Request);

export const take = new Request();

/**
 * 对同一个接口发起请求时，有时可能希望一旦发起一次请求，之前的请求可以自动取消，防止
 * 发生竞态的情况。而使用takeLast进行请求时，会自动取消之前的请求。
 */
export const takeLast = new Request(true);

export {
  axios
};

/**
 * 可以配置的选项有：
 * 1）beforeRequest: 类型Function，在请求之前被调用，如果返回false，则不会发送请求
 * 2）handleError：自动处理错误的方法
 * 3）showError：显示错误消息的方法
 * 4）loading：显示或隐藏loading，接受一个Boolean类型的参数，用于指示是否显示Loading
 * @param co
 */
export function config(co) {
  Object.assign(Request, co);
}