import {take} from "./Request";

/**
 * 该方法用于检测mixin的支付状态
 */
export function checkPayStatus(data) {
  return take.post('https://api.mixin.one/payments', data, {
    raw: true,
    autoError: false,
    withCredentials: false,
    noAuth: true
  });
}

export function checkOrder(trace_id) {
  return take.post('/check_order', {trace_id}, {
    autoError: false
  })
}