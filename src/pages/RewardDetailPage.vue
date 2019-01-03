<template>
  <div class="reward-detail">
    <page-header title="好看" :show-back="false"></page-header>

    <image-frame style="padding:20px;" :img="likeUser.url"></image-frame>

    <div class="reward-detail__info">
      <div class="reward-detail__info-title">
        Hi，我是{{likeUser.name}}
        <div style="display: flex;">
          <smart-prompt :title="likeUser.age">
            <img v-if="likeUser.gender === 'Female'" src="../assets/images/nv@2x.png"/>
            <img v-else src="../assets/images/nan@2x.png"/>
          </smart-prompt>
          <smart-prompt :title="likeUser.likes">
            <img src="../assets/images/zan@2x.png"/>
          </smart-prompt>
        </div>
      </div>

      <div class="reward-detail__info-content">{{likeUser.description || "暂无"}}</div>
    </div>

    <div class="shadow-btns-container">
      <template v-if="payStatus !== PAY_STATUS.PAY_SUCCESS">
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
        <input id="rewardDetailPageCopyInput" type="text" :value="likeUserMinID"
               style="position:fixed;top:9999px;left:9999px;z-index:10000;"/>
        <my-button class="reward-detail__copy-btn my-button--big" :plain="true"
                   data-clipboard-target="#rewardDetailPageCopyInput" data-clipboard-action="copy">
          <div class="reward-detail__copy-btn__mixin">Mixin ID {{likeUserMinID}}</div>
          <div class="reward-detail__info-text">点击复制
          </div>
        </my-button>
      </template>
    </div>

    <my-button v-if="canCancel" :plain="true" class="reward-detail__abort-pay" @click="abortPay">取消支付</my-button>

    <pay-page v-if="isPay" @paid="payBack"></pay-page>
  </div>
</template>

<script>
  import PageHeader from "../components/PageHeader";
  import MyButton from "../components/MyButton";
  import SmartPrompt from "../components/SmartPrompt";
  import ImageFrame from "../components/ImageFrame";
  import ClipboardJS from 'clipboard';
  import {mapState} from 'vuex';
  import PayPage from "./PayPage";
  import {PAY_STATUS} from "../utils/constants";

  export default {
    name: 'RewardDetailPage',
    components: {
      PayPage,
      ImageFrame,
      SmartPrompt,
      MyButton,
      PageHeader,
    },
    data() {
      return {
        PAY_STATUS,
        // Todo 收藏状态，只是做了一个前端的假状态，因为可能没时间做，如果有时间再优化
        collect: false,
        clipboard: null,
        // Todo 如果已打赏该人，则再次进入时，应该直接为打赏成功的状态吧？
        // 打赏的支付状态
        payStatus: PAY_STATUS.NON_PAY,
        // 是否正在支付
        isPay: false,
        // 是否可以取消支付
        canCancel: false
      }
    },
    computed: {
      ...mapState('user', ['likeUser', 'likeUserMinID', 'payInfo'])
    },
    watch: {
      payStatus(newVal) {
        if (newVal !== PAY_STATUS.NON_PAY) {
          let content;

          if (newVal === PAY_STATUS.PAY_SUCCESS) {
            content = '打赏成功，已将对方名片发送给您';
            this.initClipboard();
          } else {
            content = '打赏失败，请重试';
          }

          this.$prompt({
            content
          });
        }
      },
      isPay(newVal) {
        if (newVal) {
          this.$loading.show();
        } else {
          this.$loading.hide();
        }
      }
    },
    methods: {
      // 打赏eos
      reward() {
        this.$store.dispatch('user/likeOthers', this.likeUser.user_id).then(() => {
          this.canCancel = true;
          this.isPay = true;
        }).catch(({unKnowError, msg}) => {
          if (unKnowError) {
            this.$message({
              type: 'error',
              message: '跳转打赏页失败，请重试'
            });
          } else {
            this.$prompt({
              content: msg
            });
          }
        });
      },
      payBack() {
        this.canCancel = false;

        this.$store.dispatch('user/checkOrder', this.payInfo.trace_id).then(() => {
          this.endPay(PAY_STATUS.PAY_SUCCESS);
        }).catch(() => {
          this.endPay(PAY_STATUS.PAY_DEFEAT);
        });
      },
      // 结束支付
      endPay(status) {
        this.isPay = false;
        this.payStatus = status;
      },
      abortPay() {
        this.canCancel = false;
        this.isPay = false;
      },
      initClipboard() {
        let clipboard = this.clipboard = this.clipboard || new ClipboardJS('.reward-detail__copy-btn');

        clipboard.on('success', (e) => {
          this.$prompt({
            content: 'Mixin ID已复制到剪切板',
          });
          e.clearSelection();
        });

        clipboard.on('error', (e) => {
          this.$prompt({
            content: '复制失败，请手动记录',
          });
        });
      },
      destroyClipcoard() {
        this.clipboard && this.clipboard.destroy();
      },
      backToHome() {
        this.$router.push('/main');
      }
    },
    created() {
      const {likeUser} = this;

      if (!likeUser || !likeUser.user_id) {
        this.$message({
          type: 'error',
          message: '未找到打赏用户，返回首页'
        });

        this.backToHome();
      }
    },
    destroyed() {
      this.destroyClipcoard();
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
        display: flex;
        font-size: $large-font-size;

        .smart-prompt:first-child {
          margin-left: 15px;
        }

        .smart-prompt:last-child {
          margin-left: 5px;
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
      width: 100%;
      white-space: nowrap;
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

    &__abort-pay {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2500;
    }
  }
</style>