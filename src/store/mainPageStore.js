import {fetchImages} from "../services/images";
import {EVENT_NAME, eventManager} from "../utils/eventManager";
import {IMAGE_LOAD_STATUS} from "../utils/constants";
import {getUUID, updateUUID} from "./UUIDContainer";

const defaultImageLoadingInfo = {
  // 当前加载的图片的页数
  currPage: 1,
  // 是否正在加载图片url信息
  isLoadingImage: false,
  // 当前已加载的图片的下标的下一个未加载的下标
  currLoadedIndex: 0
};

/**
 * 当前登陆用户的信息
 */
export const mainPage = {
  namespaced: true,
  state: {
    // 主页显示的图片列表
    imageList: [],
    imageLoadingInfo: {
      ...defaultImageLoadingInfo
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
    setImageList(state, {
      list,
      append // 如果为false，则会重置列表
    }) {
      state.imageList = append ? [...state.imageList, ...list] : [];
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
     * 重置图片列表的状态
     */
    resetStatus({commit}) {
      updateUUID();

      commit('setImageList', {
        append: false
      });
      commit('setImageLoadingInfo', {
        ...defaultImageLoadingInfo
      });

      return Promise.resolve();
    },
    /**
     * 获取images url列表
     * @param state
     * @param commit
     * @param shouldLoading 是否应该显示loading图
     * @param gender
     */
    fetchImageURLList({state, commit}, {shouldLoading, gender} = {}) {
      const {imageLoadingInfo: {isLoadingImage, currPage}} = state;
      const uuid = getUUID();

      if (isLoadingImage) {
        return Promise.resolve({
          isLoading: true
        });
      } else {
        commit('setImageLoadingInfo', {
          isLoadingImage: true
        });

        return fetchImages({
          page: currPage,
          gender
        }, shouldLoading).then(({result: {images}}) => {
          // Todo 对于ajax请求，最好的取消方式应该使用axios的Cancellation
          const currUUID = getUUID();

          if (currUUID !== uuid) {
            return Promise.reject();
          }

          commit('setImageLoadingInfo', {
            isLoadingImage: false
          });

          // Todo 防止没有图片返回时，无限的增加page，这只是权宜之计，最终的方式应该是将页数存储在后端
          if (images.length > 0) {
            commit('setImageLoadingInfo', {
              currPage: currPage + 1,
            });
          }

          commit('setImageList', {
            append: true,
            list: images.map((image) => {
              return {
                ...image,
                loadStatus: IMAGE_LOAD_STATUS.INIT
              }
            })
          });
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
    fetchRealImages({state, commit, dispatch}, {amount}) {
      const {imageLoadingInfo} = state;
      const {currLoadedIndex} = imageLoadingInfo;

      const uuid = getUUID();

      commit('setImageLoadingInfo', {
        currLoadedIndex: currLoadedIndex + amount
      });

      // currLoadedIndex的含义是当前已下载的图片的下标的下一个下标
      state.imageList.slice(currLoadedIndex, currLoadedIndex + amount).forEach((image, i) => {
        let index = i + currLoadedIndex;

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
            const currUUID = getUUID();

            if (currUUID !== uuid) {
              dispatch('fetchImagesAbort', {
                index,
                uuid
              });
              return;
            }

            if (!isTimeout) {
              clearTimeout(timeoutId);
              dispatch('fetchImageSuccess', {
                index,
                image
              });
            }
          };

          imageOb.onerror = function () {
            const currUUID = getUUID();

            if (currUUID !== uuid) {
              dispatch('fetchImagesAbort', {
                index,
                uuid
              });
              return;
            }

            if (!isTimeout) {
              clearTimeout(timeoutId);
              dispatch('fetchImageError', {
                index
              });
            }
          };

          // 图片超时十秒后自动标记为失败
          timeoutId = setTimeout(() => {
            const currUUID = getUUID();

            if (currUUID !== uuid) {
              dispatch('fetchImagesAbort', {
                index,
                uuid
              });
              return;
            }

            isTimeout = true;
            dispatch('fetchImageError', {
              index
            });
          }, 100000);
        }
      });
    },
    /**
     * 取消uuid对应的镜像的事件监听
     * @param uuid
     * @param index
     */
    fetchImagesAbort({}, {uuid, index}) {
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, {
        abort: true,
        uuid,
        returnIndex: index
      })
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
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, {
        returnIndex: index,
        image,
        error: false
      })
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
      eventManager.$emit(EVENT_NAME.TARGET_IMAGE_LOADED, {
        returnIndex: index,
        error: true
      });
    }
  }
};