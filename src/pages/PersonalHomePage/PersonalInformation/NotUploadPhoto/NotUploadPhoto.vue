<template>
  <div class="not-upload">
    <div class="not-upload__logo">
      <img src="../../../../assets/images/logo2@2x.png"/>
      <div class="not-upload__logo-slogan">欢迎来到我好看么</div>
    </div>

    <div class="not-upload__info">
      <div class="not-upload__info-btn">
        <input ref="uploadInput" style="display: none;" type="file" accept="image/*" @change="acceptImage"/>
        <my-button @click="uploadPhoto">上传我的照片</my-button>
      </div>
      <div style="margin-bottom:6px;">
        请尽量使用个人正面人像；
      </div>
      <div style="margin-bottom:6px;">
        不要使用过度美化的照片；
      </div>
      <div>
        我们会检查的哦。
      </div>
    </div>
  </div>
</template>

<script>
  import MyButton from "../../../../components/MyButton";
  import {LIMIT_SIZE_OF_IMAGE} from "../../../../utils/constants";

  /**
   * 未上传照片的个人主页
   */
  // Todo 在多个组件中都使用了文件上传的功能，但是在尝试将上传组件封装为单个组件时，无法触发上传的功能，不知道是为什么，所以，只能在所有地方拷贝代码，之后再处理这个问题吧。
  export default {
    name: 'NotUploadPhoto',
    components: {MyButton},
    data() {
      return {
        // 上传照片后的回传信息
        photoInfo: {}
      }
    },
    methods: {
      uploadPhoto() {
        const {uploadInput} = this.$refs;
        uploadInput.click();
      },
      acceptImage(e) {
        let file = e.target.files[0];

        if (file) {
          if (file.size > LIMIT_SIZE_OF_IMAGE) {
            this.$prompt({
              content: '图片过大，不可超过2M',
            });
          } else {
            this.$store.dispatch('user/uploadImage', file).then(() => {
              this.$refs.uploadInput.value = '';
              this.$router.push('/uploadSuccess');
            });
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "../../../../styles/variables";

  .not-upload {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;

      img {
        width: 100px;
      }

      &-slogan {
        text-align: center;
        width: 75%;
        font-size: $medium-font-size;
        color: #FFFFFF;
        margin-top: 40px;
        letter-spacing: 15px;
      }
    }

    &__info {
      $padding: 30px;

      color: $prompt-color;
      font-size: $extra-small-font-size;
      padding: 0 $padding $padding;
      text-align: center;

      &-btn {
        padding: 0 #{$padding * 2} $padding;
      }

      .my-button {
        width: 100%;
        box-sizing: border-box;
        padding: 14px 22px;
      }
    }
  }
</style>