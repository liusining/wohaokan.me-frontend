<template>
  <div class="uploaded-photo">
    <image-frame :img="currImg"></image-frame>

    <block-container class="uploaded-photo__info">
      <div class="uploaded-photo__title">照片参数</div>
      <div class="uploaded-photo__detail">
        <div>
          <label>颜值：</label>
          <span>98</span>
        </div>

        <div>
          <label>性别：</label>
          <span>女生</span>
        </div>

        <div>
          <label>年龄：</label>
          <span>23</span>
        </div>
      </div>
    </block-container>

    <block-container v-for="(info, i) in information" :key="i">
      <div class="clear-both uploaded-photo__option">
        <span class="f-left">{{info.name}}</span>
        <span class="f-right">{{info.value}}</span>
      </div>
    </block-container>

    <div class="uploaded-photo__btns">
      <my-button>更新资料</my-button>
      <my-button :plain="true">下架我的照片</my-button>
    </div>
  </div>
</template>

<script>
  import ImageFrame from "../../../components/ImageFrame";
  import BlockContainer from "../../../components/BlockContainer";
  import MyButton from "../../../components/MyButton";

  /**
   * 已经上传照片后的个人主页
   */
  export default {
    name: 'UploadedPhoto',
    components: {MyButton, BlockContainer, ImageFrame},
    data() {
      return {
        currImg: require('../../../assets/images/1.jpg'),
        information: [{
          name: '昵称',
          value: 'Daisy'
        }, {
          name: 'Mixin ID',
          value: 'Daisy'
        }, {
          name: '个人简介',
          value: '暂无'
        }]
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

    > * {
      margin-bottom: 10px;
    }

    &__title {
      color: $white-color;
      font-size: $large-font-size;
      text-align: center;
      margin-bottom: 10px;
    }

    &__detail {
      display: flex;
      justify-content: space-around;
      color: $small-font-size;

      label {
        color: $prompt-color;
      }

      span {
        color: $white-color;
      }
    }

    &__option {
      color: $prompt-color;
    }

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