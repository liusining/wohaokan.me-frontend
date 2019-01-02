import {take} from "./Request";

/**
 * 获取当前登陆用户的信息
 */
export function getUser() {
  return take.get('/get_user', {
    errorMessage: '获取用户信息失败'
  });
}

/**
 * 上传图片获得颜值等信息
 * @param image
 */
export function uploadImage(image) {
  return take.upload('/upload_image', {image}, {
    errorMessage: '上传图片失败'
  })
}

/**
 * 在个人主页更新图片并获得颜值等信息
 * @param image
 */
export function updateImage(image) {
  return take.upload('/update_image', {image}, {
    errorMessage: '更新图片失败'
  })
}

/**
 * 更新用户信息
 * @param data
 */
export function updateUser(data) {
  return take.post('/update_info', data, {
    errorMessage: '更新资料失败'
  })
}

/**
 * 获取当前用户是否已经通过face++的认证
 */
export function getAuthInfo(token) {
  return take.get(`/get_verify_result?biz_token=${token}`, {
    autoError: false
  });
}

/**
 * 查看喜欢的用户
 */
export function getLikeUser(user_id) {
  return take.get(`/users/${user_id}`, {
    errorMessage: '获取用户失败'
  })
}