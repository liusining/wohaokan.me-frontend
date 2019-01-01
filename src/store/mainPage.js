import {fetchImages} from "../services/images";
import {EVENT_NAME, eventManager} from "../utils/eventManager";

/**
 * 当前登陆用户的信息
 */
export const mainPage = {
  namespaced: true,
  state: {
    // 主页显示的图片列表
    imageList: [],
    imageLoadingInfo: {
      // 当前加载的图片的页数
      currPage: 1,
      // 是否正在加载图片url信息
      isLoadingImage: false,
      // 是否在加载真正的图片
      isLoadingRealImage: false,
      // 当前已加载的图片的下标
      currLoadedIndex: 0
    }
  },
  getters: {},
  mutations: {
    setImageLoadingInfo(state, info) {
      state.imageLoadingInfo = {
        ...state.imageLoadingInfo,
        ...info
      };
    },
    setImageList(state, newList) {
      state.imageList = [...state.imageList, ...newList];
    },
    setImageLoaded(state, {
      error,
      index
    }) {
      let copy = [...state.imageList];
      // 如果加载图片时出错，则直接删除图片
      if (error) {
        state.imageList = copy.splice(index, 1);
      } else {
        copy[index].isLoaded = true;
        state.imageList = copy;
      }
    }
  },
  actions: {
    /**
     * 获取images url列表
     * @param state
     * @param commit
     */
    fetchImageURLList({state: {imageLoadingInfo: {isLoadingImage, currPage}}, commit}) {
      // Todo isLoadingImage不可以这么处理，因为需要同时加载多张图片，比如在初始化时。
      if (isLoadingImage) {
        // Todo 现在只是简单的返回一个正在加载的状态
        return Promise.resolve({
          data: {
            isLoading: true
          }
        });
      } else {
        commit('setImageLoadingInfo', {
          currPage: currPage + 1,
          isLoadingImage: true
        });

        return fetchImages(currPage).then((result) => {
          commit('setImageLoadingInfo', {
            isLoadingImage: false
          });

          let images;

          if (result.status === 200) {
            images = result.data.result.images;
            commit('setImageList', images.map((image) => {
              return {
                ...image,
                isLoaded: false
              }
            }));
          }
        });
      }
    },
    /**
     * 该方法用于根据已获取的images url请求真正的图片
     *
     * @param state
     * @param commit
     * @param dispatch
     * @param amount
     */
    fetchImages({state, commit, dispatch}, {amount}) {
      const {currLoadedIndex, isLoadingRealImage} = state.imageLoadingInfo;

      if (!isLoadingRealImage) {
        commit('setImageLoadingInfo', {
          isLoadingRealImage: true,
          currLoadedIndex: currLoadedIndex + amount
        });

        state.imageList.slice(currLoadedIndex, currLoadedIndex + amount).forEach((image, i) => {
          commit('setImageLoadingInfo', {
            isLoadingRealImage: false
          });
          let imageOb = new Image();
          let index = i + currLoadedIndex;
          let timeoutId;
          let isTimeout = false;
          imageOb.src = image.url;

          // 如果图片已经在缓存中存在，则直接标记为成功
          if (imageOb.complete) {
            dispatch('fetchImageSuccess', {
              index,
              url: image.url
            });
          } else {
            imageOb.onload = function () {
              if (!isTimeout) {
                clearTimeout(timeoutId);
                dispatch('fetchImageSuccess', {
                  index,
                  url: image.url
                });
              }
            };

            imageOb.onerror = function () {
              if (!isTimeout) {
                clearTimeout(timeoutId);
                dispatch('fetchImageError', {
                  index
                });
              }
            };

            // 图片超时十秒后自动标记为失败
            timeoutId = setTimeout(() => {
              isTimeout = true;
              dispatch('fetchImageError', {
                index
              });
            }, 100000);
          }
        });
      }
    },
    /**
     * 抓取真实图片成功后的回调函数
     *
     * @param commit
     * @param index
     * @param url
     */
    fetchImageSuccess({commit}, {index, url}) {
      commit('setImageLoaded', {
        index,
        error: false
      });
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, index, url, false)
    },
    /**
     * 抓取真实图片失败后的回调函数
     *
     * @param commit
     * @param index
     */
    fetchImageError({commit}, {index}) {
      commit('setImageLoaded', {
        index,
        error: true
      });
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, index, '', true);
    }
  }
};