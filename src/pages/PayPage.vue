<template>
  <iframe class="pay-page" :class="payPageClass" :src="payInfo.pay_url"></iframe>
</template>

<script>
  import {mapState} from 'vuex';
  import {checkPayStatus} from "../services/order";

  /**
   * 支付页面
   */
  export default {
    name: 'PayPage',
    data() {
      return {
        payPageClass: '',
        loopTime: 1000,
        timeoutId: null,
        abort: false
      }
    },
    computed: {
      ...mapState('user', ['payInfo'])
    },
    methods: {
      // 轮询检测订单是否成功
      checkPayStatusLoop() {
        const {amount, asset_id, opponent_id, trace_id} = this.payInfo;
        this.timeoutId = setTimeout(() => {
          if (this.abort) {
            return;
          }

          checkPayStatus({amount, asset_id, opponent_id, trace_id}).then(({data}) => {
            let {status} = data.data;

            if (status === 'paid') {
              this.$emit('paid');
            } else if (status === 'pending') {
              this.checkPayStatusLoop();
            }
          }).catch(() => {
            this.checkPayStatusLoop();
          })
        }, this.loopTime);
      }
    },
    mounted() {
      this.checkPayStatusLoop();
    },
    beforeDestroy() {
      clearTimeout(this && this.timeoutId);
      this.abort = true;
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .pay-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    z-index: 2000;
  }
</style>