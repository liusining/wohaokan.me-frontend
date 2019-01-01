<template>
  <div class="reward-record">
    <block-container>
      <div class="reward-record__data">
        <div>
          <div class="reward-record__data-result">45</div>
          <label>当前排名</label>
        </div>

        <div>
          <div class="reward-record__data-result">0.0</div>
          <label>收到打赏(EOS)</label>
        </div>
      </div>
    </block-container>

    <block-container class="reward-record__imgs-container">
      <div class="reward-record__list-title">
        <span>已经打赏 5 人</span>
        <span>（3位小哥哥，2位小姐姐）</span>
      </div>
      <div class="reward-record__imgs-list">
        <div class="reward-record__imgs-list__row clear-both">
          <image-frame :img="currImg" class="f-left"></image-frame>
          <image-frame :img="currImg" class="f-right"></image-frame>
        </div>
        <div class="reward-record__imgs-list__row clear-both">
          <image-frame :img="currImg" class="f-left"></image-frame>
          <image-frame :img="currImg" class="f-right"></image-frame>
        </div>
        <div class="reward-record__imgs-list__row clear-both">
          <image-frame :img="currImg" class="f-left"></image-frame>
          <image-frame :img="currImg" class="f-right"></image-frame>
        </div>
      </div>
    </block-container>
  </div>
</template>

<script>
  import BlockContainer from "../../components/BlockContainer";
  import ImageFrame from "../../components/ImageFrame";

  // Todo 是否需要显示当前用户被打赏的次数以及打赏人的信息？
  export default {
    name: 'RewardRecord',
    components: {ImageFrame, BlockContainer},
    data() {
      return {
        currImg: require('../../assets/images/1.jpg')
      }
    }
  };
</script>

<style lang="scss">
  @import "../../styles/variables";

  .reward-record {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: $common-padding;

    &__data {
      display: flex;
      justify-content: space-around;
      text-align: center;

      &-result {
        font-size: 30px;
        color: $white-color;
      }

      label {
        color: $prompt-color;
      }
    }

    &__imgs-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-top: $common-padding;
    }

    &__list-title {
      margin-bottom: 20px;

      span:first-child {
        color: $white-color;
      }

      span:last-child {
        color: $prompt-color;
      }
    }

    &__imgs-list {
      flex: 1;
      overflow: hidden auto;

      &__row {
        margin-bottom: 10px;

        > * {
          width: calc(50% - 5px);
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>