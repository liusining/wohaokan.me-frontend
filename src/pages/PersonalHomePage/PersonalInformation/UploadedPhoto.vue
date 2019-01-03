<template>
  <div class="uploaded-photo">
    <person-info></person-info>

    <div class="uploaded-photo__btns">
      <my-button @click="updateInfo">更新资料</my-button>
      <my-button :plain="true" @click="switchDisplay">{{displayImage ? '下架我的照片' : '上架我的照片'}}</my-button>
    </div>
  </div>
</template>

<script>
  import ImageFrame from "../../../components/ImageFrame";
  import BlockContainer from "../../../components/BlockContainer";
  import MyButton from "../../../components/MyButton";
  import PhotoInfo from "../../../components/PhotoInfo";
  import PersonInfo from "../PersonInfo";
  import {mapState} from 'vuex';

  /**
   * 已经上传照片后的个人主页
   */
  export default {
    name: 'UploadedPhoto',
    components: {PersonInfo, PhotoInfo, MyButton, BlockContainer, ImageFrame},
    computed: {
      ...mapState('user', ['loginUserInfo']),
      displayImage() {
        return this.loginUserInfo.display_image;
      }
    },
    methods: {
      updateInfo() {
        this.$router.push('/updateInfo');
      },
      switchDisplay() {
        this.$store.dispatch('user/switchDisplay').then((result) => {
          let message;
          if (result) {
            message = '照片已上架成功';
          } else {
            message = '照片已下架成功';
          }

          this.$message({
            message
          });
        });
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