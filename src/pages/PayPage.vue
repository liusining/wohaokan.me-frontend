<template>
  <iframe class="pay-page" :src="pay_url"></iframe>
</template>

<script>
  /**
   * 支付页面
   */
  export default {
    name: 'PayPage',
    computed: {
      pay_url() {
        return decodeURIComponent(this.$route.query.pay_url);
      }
    }
  }
</script>

<style lang="scss">
  .pay-page {
    width: 100%;
    border: none;
  }
</style>