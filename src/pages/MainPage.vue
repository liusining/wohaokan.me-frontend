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

    <div class="main-page__img vertical-align">
      <img :src="currImage"/>
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
  import {LOAD_STATUS} from "../utils/constants";
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
        currImage: '',
        // 当前下标的位置
        currImageIndex: 0
      }
    },
    computed: {
      status() {
        return this.$root.status;
      },
      mainPageImageList() {
        return this.$store.state.mainPage.imageList;
      }
    },
    methods: {
      // 下一张照片
      nextImage() {
        this.currImageIndex++;
        this.getImage();
      },
      // 前一张照片
      preImage() {
        this.currImageIndex--;
        this.getImage();
      },
      getImage() {
        let {currImageIndex, mainPageImageList} = this;
        let targetImage = mainPageImageList[currImageIndex];

        // 如果图片少于PRELOAD_AMOUNT指定的值时，则抓取更多的图片
        if (mainPageImageList.length - currImageIndex <= PRELOAD_AMOUNT && this.status !== LOAD_STATUS.ERROR) {
          this.getMoreImageList();
        }

        if (targetImage && targetImage.isLoaded) {
          this.currImage = targetImage.url;
        } else {
          this.$loading.show();
          eventManager.$on(EVENT_NAME.TARGET_IMAGE_LOADED, (returnIndex, url, error) => {
            if (error || currImageIndex === returnIndex) {
              eventManager.$off(EVENT_NAME.TARGET_IMAGE_LOADED);
              if (error) {
                this.nextImage();
              } else {
                this.$loading.hide();
                this.currImage = url;
              }
            }
          });
        }
      },
      getMoreImageList() {
        this.$store.dispatch('mainPage/fetchImageURLList').then((result) => {
          if (!result || !result.isLoading) {
            this.$store.dispatch('mainPage/fetchImages', {
              amount: 10
            });
          }
        });
      },
      likeYou() {
        this.$router.push('/reward');
      },
      // 进入个人主页
      enterPersonalHomePage() {
        this.$router.push('/personalHome');
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

            this.getImage();
          });
        } else {
          if (this.status === LOAD_STATUS.AUTH) {
            this.$prompt({
              content: '授权成功',
              button: '知道了'
            });
          }

          // Todo 这里的性能比较低，应该是同时加载三次就对了，但是为了防止异步造成的添加图片的乱序，
          // Todo 先简单这样处理，之后再想办法。
          this.$store.dispatch('mainPage/fetchImageURLList').then(() => {
            this.$store.dispatch('mainPage/fetchImages', {
              amount: 10
            });

            this.$store.dispatch('mainPage/fetchImageURLList').then(() => {
              this.getImage();
            });
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
      margin: auto;
      overflow: hidden;
      text-align: center;
      flex: 1;

      img {
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        border-radius: $border-radius;
      }
    }

    &__big-btn {
      flex: 1;
      margin: 0 $common-padding;
    }
  }
</style>