const AUTH_SUCCESS_CODE = '__AUTH_SUCCESS_CODE';

// 判断用户是否已授权
export function isAuth() {
  return getAuth() && getAuth().toString().toLowerCase() !== "undefined";
}

// 保存登陆信息
export function saveAuth(sessionKey) {
  localStorage.setItem(AUTH_SUCCESS_CODE, sessionKey);
}

// 获得登陆信息
export function getAuth() {
  return localStorage.getItem(AUTH_SUCCESS_CODE);
}