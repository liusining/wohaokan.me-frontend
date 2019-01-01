<template>
  <div class="reward-detail">
    <page-header title="好看" :show-back="false"></page-header>

    <image-frame style="padding:20px;" :img="currImg"></image-frame>

    <div class="reward-detail__info">
      <div class="reward-detail__info-title">
        Hi，我是Daisy
        <smart-prompt title="21">
          <img src="../assets/images/nv@2x.png"/>
        </smart-prompt>
        <smart-prompt title="27">
          <img src="../assets/images/zan@2x.png"/>
        </smart-prompt>
      </div>

      <div class="reward-detail__info-content">
        我喜欢哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
    </div>

    <div class="shadow-btns-container">
      <template v-if="!isRewardSuccess">
        <my-button class="my-button__circle" :plain="true" @click="backToHome"><img
            src="../assets/images/fanhui@2x.png"/></my-button>
        <my-button class="reward-detail__big-btn my-button--big" @click="reward">
          <div class="reward-detail__big-btn__eos">0.1 EOS</div>
          <div class="reward-detail__info-text">打赏并获取交友信息</div>
        </my-button>
        <my-button class="my-button__circle" :plain="true"><img src="../assets/images/shoucang@2x.png"/>
        </my-button>
      </template>

      <template v-else>
        <my-button class="my-button--big" :plain="true" @click="backToHome">查看其他人</my-button>
        <my-button class="reward-detail__copy-btn my-button--big" @click="copyMixinID" :plain="true">
          <div class="reward-detail__copy-btn__mixin">Mixin ID 37892734</div>
          <div class="reward-detail__info-text">点击复制</div>
        </my-button>
      </template>
    </div>
  </div>
</template>

<script>
  import PageHeader from "../components/PageHeader";
  import MyButton from "../components/MyButton";
  import SmartPrompt from "../components/SmartPrompt";
  import ImageFrame from "../components/ImageFrame";

  export default {
    name: 'RewardDetailPage',
    components: {
      ImageFrame,
      SmartPrompt,
      MyButton,
      PageHeader,
    },
    data() {
      return {
        currImg: require('../assets/images/1.jpg'),
        // Todo 如果已打赏该人，则再次进入时，应该直接为打赏成功的状态吧？
        // 是否打赏成功
        isRewardSuccess: false
      }
    },
    watch: {
      isRewardSuccess() {
        const {isRewardSuccess} = this;
        let prompt = {
          content: isRewardSuccess ? '打赏成功，已将对方名片发送给您' : '打赏失败，请重试',
          button: '知道了'
        };

        this.$prompt(prompt);
      }
    },
    methods: {
      // 打赏eos
      reward() {
        this.isRewardSuccess = true;
      },
      // 复制mixin ID
      copyMixinID() {
        this.$prompt({
          content: 'Mixin ID已复制到剪切板',
          button: '知道了'
        });
      },
      backToHome() {
        this.$router.push('/main');
      }
    }
  };
</script>

<style lang="scss">
  @import "../styles/variables";

  .reward-detail {
    &__info {
      background-color: $prompt-bg-color;
      margin: 0 $common-padding;
      padding: $common-padding;
      border-radius: $border-radius;
      color: $white-color;

      &-title {
        font-size: $large-font-size;

        .smart-prompt:first-child {
          margin-left: 15px;
        }

        .smart-prompt:last-child {
          margin-left: 3px;
        }
      }

      &-content {
        color: $prompt-color;
        margin-top: 10px;
        line-height: 20px;
      }
    }

    &__info-text {
      font-size: $extra-small-font-size;
      line-height: $extra-small-font-size;
    }

    &__big-btn {
      flex: 1;
      margin: 0 $common-padding;

      &__eos {
        font-size: 20px;
        line-height: 20px;
      }
    }

    &__copy-btn {
      flex: 1;
      margin-left: 20px;

      &__mixin {
        color: $white-color;
        font-size: $small-font-size;
        line-height: 18px;
      }
    }
  }
</style>