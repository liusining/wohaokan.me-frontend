/**
 * 初次加载页面时，可能存在三种状态，分别是授权出错，
 * 授权成功以及之前已经授权成功，需要根据三个不同的状态执行不同的操作
 */
export const LOAD_STATUS = {
  // 授权失败
  ERROR: 'error',
  // 授权成功
  AUTH: 'auth',
  // 之前已经授权成功
  SUCCESS: 'success'
};