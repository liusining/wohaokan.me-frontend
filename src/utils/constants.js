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

/**
 * 当前图片的加载状态
 */
export const IMAGE_LOAD_STATUS = {
  // 初始化状态
  INIT: 'init',
  // 加载中状态
  LOADING: 'loading',
  // 加载成功的状态
  LOADED: 'loaded',
  // 加载失败的状态
  ERROR: 'error'
};

// 照片大小的限制为2M
export const LIMIT_SIZE_OF_IMAGE = 2 * 1024 * 1024;

// 支付状态
export const PAY_STATUS = {
  NON_PAY: 'nonPay', // 未支付
  PAY_SUCCESS: 'paySuccess', // 支付成功
  PAY_DEFEAT: 'payDefeat' // 支付失败
};