<template>
  <div class="main-page">
    <div ref="header" class="main-page__header">
      <div class="main-page__header__nav">
        <img src="../assets/images/logo@2x.png"/>
        <div>我好看么</div>
        <img @click="enterPersonalHomePage" src="../assets/images/touxiang.png"/>
      </div>
      <div class="main-page__header__btns">
        <my-button>随便看看</my-button>
        <my-button :plain="true">看看女生</my-button>
        <my-button :plain="true">翻翻男生</my-button>
      </div>
    </div>

    <div class="main-page__img">
      <div class="main-page__img-list">
        <img :style="{
          zIndex: (imagesList.length - index) * 10
        }" :class="addImageClass(index)" v-for="(img, index) in imagesList" :src="img.url"
             :key="index"/>
      </div>
    </div>
    <div ref="btns" class="shadow-btns-container">
      <my-button class="my-button__circle" :plain="true" @click="nextImage"><img
          src="../assets/images/buxihuan@2x.png"/></my-button>
      <my-button class="my-button--big main-page__big-btn" @click="likeYou"><img src="../assets/images/xihuan@2x.png"/>
      </my-button>
      <my-button class="my-button__circle" :plain="true" @click="preImage"><img
          src="../assets/images/shangyizhang@2x.png"/>
      </my-button>
    </div>
  </div>
</template>

<script>
  import Prompt from "../components/Prompt";
  import {authorization} from "../services/authorization";
  import MyButton from "../components/MyButton";
  import {LOAD_STATUS, IMAGE_LOAD_STATUS} from "../utils/constants";
  import {EVENT_NAME, eventManager} from "../utils/eventManager";

  const PRELOAD_AMOUNT = 20;

  /**
   * 首页
   */
  export default {
    name: 'MainPage',
    components: {MyButton, Prompt},
    data() {
      return {
        preAmount: 3,
        nextAmount: 3,
        imagesList: [],
        // 当前下标的位置
        currImageIndex: 0
      }
    },
    computed: {
      status() {
        return this.$root.status;
      },
      mainPage() {
        return this.$store.state.mainPage;
      },
      mainPageImageList() {
        return [...this.mainPage.imageList];
      },
      currImageData() {
        return this.mainPageImageList[this.currImageIndex];
      }
    },
    methods: {
      // 下一张照片
      nextImage() {
        if (this.currImageIndex === this.mainPageImageList.length - 1) {
          this.$message({
            type: 'error',
            message: '已经是最后一张了'
          });
        } else {
          this.currImageIndex++;
          this.getImageList();
        }
      },
      // 前一张照片
      preImage() {
        if (this.currImageIndex === 0) {
          this.$message({
            type: 'error',
            message: '已经是第一张了'
          });
        } else {
          this.currImageIndex--;
          this.getImageList();
        }
      },
      getImageList(isInit) {
        let {preAmount, nextAmount, currImageIndex, mainPageImageList} = this;
        let targetImage = mainPageImageList[currImageIndex];

        while (targetImage && targetImage.loadStatus === IMAGE_LOAD_STATUS.ERROR) {
          targetImage = mainPageImageList[++currImageIndex];
        }

        this.currImageIndex = currImageIndex;

        if (!isInit) {
          // 如果图片少于PRELOAD_AMOUNT指定的值时，则抓取更多的图片
          if (mainPageImageList.length - currImageIndex <= PRELOAD_AMOUNT && this.status !== LOAD_STATUS.ERROR) {
            this.getMoreImageList();
          } else if (this.mainPage.imageLoadingInfo.currLoadedIndex - currImageIndex <= 10) {
            this.fetchRealImage();
          }
        }

        // 图片的状态为：未加载 --> init --> loading -->loaded/error
        if (!targetImage || targetImage.loadStatus === IMAGE_LOAD_STATUS.INIT || targetImage.loadStatus === IMAGE_LOAD_STATUS.LOADING) {
          // 如果!targetImage，则是未加载状态，转换为init状态
          if (!targetImage) {
            this.getMoreImageList();
          } else if (targetImage.loadStatus === IMAGE_LOAD_STATUS.INIT && this.mainPage.imageLoadingInfo.isLoadingImage === false) { // 如果为init状态，则转换为loading状态
            // 如果this.mainPage.isLoadingImage为true，说明正在加载图片URL，则在加载完成后会自动触发一次fetchRealImage，所以无需再次触发。
            this.fetchRealImage();
          }

          this.$loading.show();

          // 无论是未加载、init或者loading状态，最终都会自动触发loaded状态
          eventManager.$on(EVENT_NAME.TARGET_IMAGE_LOADED, (returnIndex, image, error) => {
            if (currImageIndex === returnIndex) {
              eventManager.$off(EVENT_NAME.TARGET_IMAGE_LOADED);
              this.$loading.hide();
              if (error) {
                this.nextImage();
              } else {
                this.getImageList();
              }
            }
          });

        } else {
          let imagesList = [];

          for (let i = 1; imagesList.length < preAmount && currImageIndex - i >= 0; i++) {
            targetImage = mainPageImageList[currImageIndex - i];
            if (targetImage.loadStatus !== IMAGE_LOAD_STATUS.ERROR) {
              imagesList.push(targetImage);
            }
          }

          imagesList.reverse();

          imagesList.push(mainPageImageList[currImageIndex]);

          let nextTargetIndex;
          for (let i = 1; i <= nextAmount; i++) {
            targetImage = mainPageImageList[(nextTargetIndex = currImageIndex + i)];

            if (!targetImage || targetImage.loadStatus === IMAGE_LOAD_STATUS.INIT || targetImage.loadStatus === IMAGE_LOAD_STATUS) {
              break;
            } else if (targetImage.loadStatus === IMAGE_LOAD_STATUS.ERROR) {
              continue;
            }

            imagesList.push(targetImage);
          }

          this.imagesList = imagesList;
        }
      },
      getMoreImageList() {
        this.$store.dispatch('mainPage/fetchImageURLList', {
          shouldLoading: false
        }).then((result) => {
          if (!result || !result.isLoading) {
            this.fetchRealImage();
          }
        });
      },
      fetchRealImage(amount = 10) {
        this.$store.dispatch('mainPage/fetchImages', {
          amount
        });
      },
      addImageClass(index) {
        const {currImageIndex, preAmount} = this;
        let imageIndexInArr = Math.min(currImageIndex, preAmount);

        if (index < imageIndexInArr) {
          return 'main-page__img--pre';
        } else if (index > imageIndexInArr) {
          return 'main-page__img--next';
        }
      },
      likeYou() {
        const {user_id, url} = this.currImageData;
        this.$store.dispatch('user/fetchLikeUser', {
          user_id,
          url
        }).then(() => {
          this.$router.push('/reward');
        });
      },
      // 进入个人主页
      enterPersonalHomePage() {
        this.$router.push('/personalHome');
      },
      // 当首次通过mixin授权时，会在url之后出现code=xxxx形式的查询，
      // 该方法是为了删除这个查询，防止某些以外情况。比如，当授权成功后，用户直接刷新页面，
      // 则会当做首次授权（其实，已经授权成功了）而将code发往后端。
      deleteCodeQueryInUrl() {
        this.$router.push('/main');
      },
      promptAndFetchImages() {
        if (this.status === LOAD_STATUS.ERROR) {
          this.$prompt({
            content: '授权失败，请重试',
            button: '重新授权',
            callback: authorization
          });

          this.$store.dispatch('mainPage/fetchImageURLList').then(() => {
            this.$store.dispatch('mainPage/fetchImages', {
              amount: 1
            });

            this.getImageList();
          });

          this.deleteCodeQueryInUrl();
        } else {
          if (this.status === LOAD_STATUS.AUTH) {
            this.$prompt({
              content: '授权成功，请等待图片加载',
              button: '知道了'
            });

            this.deleteCodeQueryInUrl();
          }

          // Todo 先简单这样处理，之后再想办法。
          this.$store.dispatch('mainPage/fetchImageURLList').then(() => {
            this.fetchRealImage(5);
            this.getImageList(true);
            this.$store.dispatch('mainPage/fetchImageURLList');
          });
        }
      }
    },
    created() {
      this.promptAndFetchImages();
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .main-page {
    &__header {
      background-color: $prompt-bg-color;
      padding: $common-padding $common-padding 10px;

      &__nav {
        padding-bottom: 15px;
        font-size: $large-font-size;
        color: $white-color;
      }

      &__nav, &__btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      img {
        display: inline-block;
        width: 23px;
      }
    }

    &__img {
      padding: $common-padding;
      overflow: hidden;
      flex: 1;
      width: 100%;
      box-sizing: border-box;

      &-list {
        vertical-align: middle;
        width: 100%;
        height: 100%;
        position: relative;
      }

      &--pre {
        transform: translate(-1000px, 1000px) rotate(-60deg) !important;
      }

      &--next {
        opacity: 0 !important;
      }

      img {
        border-radius: $border-radius;
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__big-btn {
      flex: 1;
      margin: 0 $common-padding;
    }
  }
</style>