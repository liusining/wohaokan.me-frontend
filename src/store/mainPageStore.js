import {fetchImages} from "../services/images";
import {EVENT_NAME, eventManager} from "../utils/eventManager";
import {IMAGE_LOAD_STATUS} from "../utils/constants";

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
    setImageLoadStatus(state, {
      index,
      loadStatus
    }) {
      state.imageList[index].loadStatus = loadStatus;
    }
  },
  actions: {
    /**
     * 获取images url列表
     * @param state
     * @param commit
     * @param shouldLoading 是否应该显示loading图
     */
    fetchImageURLList({state: {imageLoadingInfo: {isLoadingImage, currPage}}, commit}, {shouldLoading} = {}) {
      if (isLoadingImage) {
        return Promise.resolve({
          isLoading: true
        });
      } else {
        commit('setImageLoadingInfo', {
          currPage: currPage + 1,
          isLoadingImage: true
        });

        return fetchImages(currPage, shouldLoading).then(({result: {images}}) => {
          commit('setImageLoadingInfo', {
            isLoadingImage: false
          });

          commit('setImageList', images.map((image) => {
            return {
              ...image,
              loadStatus: IMAGE_LOAD_STATUS.INIT
            }
          }));
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

      // Todo 是否应该允许一次加载多个图片？
      if (!isLoadingRealImage) {
        commit('setImageLoadingInfo', {
          isLoadingRealImage: true,
          currLoadedIndex: currLoadedIndex + amount
        });

        state.imageList.slice(currLoadedIndex, currLoadedIndex + amount).forEach((image, i) => {
          let index = i + currLoadedIndex;

          commit('setImageLoadingInfo', {
            isLoadingRealImage: false
          });

          commit('setImageLoadStatus', {
            index: index,
            loadStatus: IMAGE_LOAD_STATUS.LOADING
          });

          let imageOb = new Image();
          let timeoutId;
          let isTimeout = false;
          imageOb.src = image.url;

          // 如果图片已经在缓存中存在，则直接标记为成功
          if (imageOb.complete) {
            dispatch('fetchImageSuccess', {
              index,
              image
            });
          } else {
            imageOb.onload = function () {
              if (!isTimeout) {
                clearTimeout(timeoutId);
                dispatch('fetchImageSuccess', {
                  index,
                  image
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
     * @param image
     */
    fetchImageSuccess({commit}, {index, image}) {
      commit('setImageLoadStatus', {
        index,
        loadStatus: IMAGE_LOAD_STATUS.LOADED
      });
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, index, image, false)
    },
    /**
     * 抓取真实图片失败后的回调函数
     *
     * @param commit
     * @param index
     */
    fetchImageError({commit}, {index}) {
      commit('setImageLoadStatus', {
        index,
        loadStatus: IMAGE_LOAD_STATUS.ERROR
      });
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, index, '', true);
    }
  }
};