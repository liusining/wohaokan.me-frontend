<template>
  <div class="page-title">
    <img v-if="showBack" src="../assets/images/fanhui@2x.png"/>
    {{title}}
  </div>
</template>

<script>
  export default {
    name: 'PageHeader',
    props: {
      showBack: {
        type: Boolean,
        default: true
      },
      title: String
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .page-title {
    text-align: center;
    background-color: $prompt-bg-color;
    padding: 20px;
    font-size: $large-font-size;
    color: $white-color;

    img {
      float: left;
      display: inline-block;
      width: 17px;
    }
  }
</style>