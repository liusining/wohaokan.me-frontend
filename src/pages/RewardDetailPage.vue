<template>
  <div class="reward-detail">
    <page-header title="好看" :show-back="false"></page-header>

    <image-frame style="padding:20px;" :img="likeUser.url"></image-frame>

    <div class="reward-detail__info">
      <div class="reward-detail__info-title">
        Hi，我是{{likeUser.name}}
        <smart-prompt :title="likeUser.age">
          <img v-if="likeUser.gender === 'Female'" src="../assets/images/nv@2x.png"/>
          <img v-else src="../assets/images/nan@2x.png"/>
        </smart-prompt>
        <smart-prompt :title="likeUser.likes">
          <img src="../assets/images/zan@2x.png"/>
        </smart-prompt>
      </div>

      <div class="reward-detail__info-content">{{likeUser.description || "暂无"}}</div>
    </div>

    <div class="shadow-btns-container">
      <template v-if="!isRewardSuccess">
        <my-button class="my-button__circle" :plain="true" @click="backToHome"><img
            src="../assets/images/fanhui@2x.png"/></my-button>
        <my-button class="reward-detail__big-btn my-button--big" @click="reward">
          <div class="reward-detail__big-btn__eos">0.1 EOS</div>
          <div class="reward-detail__info-text">打赏并获取交友信息</div>
        </my-button>
        <my-button class="my-button__circle" :plain="true" @click="collect = !collect"><img
            :src="collect ? require('../assets/images/shoucang2@2x.png') : require('../assets/images/shoucang@2x.png')"/>
        </my-button>
      </template>

      <template v-else>
        <my-button class="my-button--big" :plain="true" @click="backToHome">查看其他人</my-button>
        <!-- input不可隐藏，否则会无法复制成功 -->
        <input id="rewardDetailPageCopyInput" type="text" value="123456"
               style="position:fixed;top:9999px;left:9999px;z-index:10000;"/>
        <my-button class="reward-detail__copy-btn my-button--big" :plain="true"
                   data-clipboard-target="#rewardDetailPageCopyInput" data-clipboard-action="copy">
          <div class="reward-detail__copy-btn__mixin">Mixin ID 37892734</div>
          <div class="reward-detail__info-text">点击复制
          </div>
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
  import ClipboardJS from 'clipboard';
  import {mapState} from 'vuex';

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
        // Todo 收藏状态，只是做了一个前端的假状态，因为可能没时间做，如果有时间再优化
        collect: false,
        clipboard: null,
        // Todo 如果已打赏该人，则再次进入时，应该直接为打赏成功的状态吧？
        // 是否打赏成功
        isRewardSuccess: false
      }
    },
    computed: {
      ...mapState('user', ['likeUser'])
    },
    watch: {
      isRewardSuccess() {
        const {isRewardSuccess} = this;
        let prompt = {
          content: isRewardSuccess ? '打赏成功，已将对方名片发送给您' : '打赏失败，请重试',
        };

        this.$prompt(prompt);
      }
    },
    methods: {
      // 打赏eos
      reward() {
        this.$store.dispatch('user/likeOthers', this.likeUser.user_id).then((payUrl) => {
          this.$router.push(`/pay?pay_url=${encodeURIComponent(payUrl)}`);
        });

        // this.isRewardSuccess = true;
        // let clipboard = this.clipboard = this.clipboard || new ClipboardJS('.reward-detail__copy-btn');
        //
        // clipboard.on('success', (e) => {
        //   this.$prompt({
        //     content: 'Mixin ID已复制到剪切板',
        //   });
        //   e.clearSelection();
        // });
        //
        // clipboard.on('error', (e) => {
        //   this.$prompt({
        //     content: '复制失败，请手动记录',
        //   });
        // });
      },
      backToHome() {
        this.$router.push('/main');
      }
    },
    destroyed() {
      this.clipboard && this.clipboard.destroy();
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