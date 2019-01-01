<template>
  <div class="smart-prompt">
    <div class="smart-prompt__img">
      <slot></slot>
    </div>
    {{title}}
  </div>
</template>

<script>
  /**
   * 用于显示性别、已获赞数的小控件
   */
  export default {
    name: 'SmartPrompt',
    props: {
      title: String
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .smart-prompt {
    display: inline-block;
    font-size: $extra-small-font-size;
    background: #4A4846;
    border-radius: 100px;
    padding: 4px 7px;
    color: $prompt-color;
    vertical-align: middle;

    &__img {
      display: inline-block;
      > * {
        height: $extra-small-font-size;
        vertical-align: middle;
      }
    }
  }
</style>