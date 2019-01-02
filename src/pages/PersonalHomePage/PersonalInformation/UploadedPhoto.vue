<template>
  <div class="uploaded-photo">
    <person-info></person-info>

    <div class="uploaded-photo__btns">
      <my-button @click="updateInfo">更新资料</my-button>
      <my-button :plain="true">下架我的照片</my-button>
    </div>
  </div>
</template>

<script>
  import ImageFrame from "../../../components/ImageFrame";
  import BlockContainer from "../../../components/BlockContainer";
  import MyButton from "../../../components/MyButton";
  import PhotoInfo from "../../../components/PhotoInfo";
  import PersonInfo from "../PersonInfo";

  /**
   * 已经上传照片后的个人主页
   */
  export default {
    name: 'UploadedPhoto',
    components: {PersonInfo, PhotoInfo, MyButton, BlockContainer, ImageFrame},
    methods: {
      updateInfo() {
        this.$router.push('/updateInfo');
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../styles/variables";

  .uploaded-photo {
    height: 100%;
    overflow: hidden auto;
    padding: $common-padding;
    box-sizing: border-box;
    background-color: $background-color;

    &__btns {
      padding: 0 60px;
      margin-bottom: 0;

      .my-button {
        width: 100%;
        box-sizing: border-box;
        padding: 14px 22px;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>