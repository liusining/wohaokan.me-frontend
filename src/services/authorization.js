import {take} from "./Request";

/**
 * mixin授权
 * @param returnTo 期望授权之后的返回值
 */
export function authorization(returnTo = "") {
  window.location = `https://mixin.one/oauth/authorize?client_id=faf9c343-677e-4f84-89cd-4c5688f22f7c&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=${returnTo}`;
}

/**
 * 授权成功后，将mixin返回的code传入后端
 */
export function saveAuthCode(code) {
  return take.post(`/login`, {
    code
  }, {
    noAuth: true
  });
}