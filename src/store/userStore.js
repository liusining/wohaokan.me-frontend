import {uploadImage, updateImage, getUser, updateUser, getAuthInfo, getLikeUser} from "../services/user";

/**
 * 当前登陆用户的信息
 */
export const user = {
  namespaced: true,
  state: {
    // 登陆的用户信息
    loginUserInfo: null,
    // 已上传的本地照片
    localUploadedPhoto: null,
    // 临时用户信息，用于存储首次上传照片时的信息
    temporaryUserInfo: {},
    // 当用户从face++跳转回来之后，会将认证后的信息保存在该对象中
    authInfo: {},
    // 喜欢的用户
    likeUser: {}
  },
  getters: {},
  mutations: {
    saveLocalPhotoInfo(state, image) {
      state.localUploadedPhoto = image;
    },
    saveUserInfo(state, userInfo) {
      state.loginUserInfo = {
        ...state.loginUserInfo,
        ...userInfo
      };
    },
    saveTemporaryUserInfo(state, info) {
      state.temporaryUserInfo = {
        ...state.temporaryUserInfo,
        ...info
      };
    },
    saveAuthInfo(state, info) {
      state.authInfo = {
        ...state.authInfo,
        ...info
      };
    },
    saveLikeUser(state, likeUser) {
      state.likeUser = likeUser;
    }
  },
  actions: {
    getUser({commit}) {
      return getUser().then(({result}) => {
        commit('saveUserInfo', result);
      });
    },
    uploadImage({commit}, image) {
      return uploadImage(image).then(({result}) => {
        commit('saveTemporaryUserInfo', {
          ...result,
          url: URL.createObjectURL(image)
        });
      });
    },
    updateImage({commit, state}, {
      image,
      isUpload
    }) {
      return (isUpload ? uploadImage(image) : updateImage(image)).then(({result}) => {
        // Todo 不应该保存吧？
        commit('saveLocalPhotoInfo', image);

        commit('saveUserInfo', result);

        return result;
      });
    },
    updateUser({commit}, data) {
      return updateUser(data);
    },
    // 当用户从face++跳转回后，通过该方法获取认证的信息
    authUserPhoto({commit}, token) {
      return getAuthInfo(token).then(({result}) => {
        commit('saveAuthInfo', result);

        return result;
      });
    },
    // 获取喜欢的用户
    fetchLikeUser({commit}, {
      user_id,
      url
    }) {
      getLikeUser(user_id).then(({result}) => {
        commit('saveLikeUser', {
          ...result,
          url
        });
      });
    }
  }
};