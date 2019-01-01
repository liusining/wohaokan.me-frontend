<template>
  <div class="not-upload">
    <div class="not-upload__logo">
      <img src="../../../../assets/images/logo2@2x.png"/>
      <div class="not-upload__logo-slogan">欢迎使用我好看么</div>
    </div>

    <div class="not-upload__info">
      <div class="not-upload__info-btn">
        <my-button>上传我的照片</my-button>
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

  /**
   * 未上传照片的个人主页
   */
  export default {
    name: 'NotUploadPhoto',
    components: {MyButton}
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
        text-align-last: justify;
        text-align: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
        width: 75%;
        font-size: $medium-font-size;
        color: #FFFFFF;
        margin-top: 40px;
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