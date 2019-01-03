<template>
  <div v-show="show" class="prompt">
    <div class="prompt__shadow"></div>
    <div class="prompt__container">
      <div class="prompt__title">{{title}}</div>
      <div class="prompt__content">{{content}}</div>
      <my-button style="padding: 10px 40px;" @click="hide">{{button}}</my-button>
    </div>
  </div>
</template>

<script>
  import MyButton from "./MyButton";

  export default {
    name: 'Prompt',
    components: {MyButton},
    props: {
      show: Boolean,
      // 标题
      title: {
        type: String,
        default: "温馨提示"
      },
      // 内容的信息
      content: String,
      // 按钮的文本
      button: {
        type: String,
        default: '知道了'
      }
    },
    methods: {
      hide() {
        this.$emit('update:show', false);
        this.$emit('callback');
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .prompt {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;

    &__shadow {
      opacity: 0.5;
      background: $black-color;
      width: 100%;
      height: 100%;
    }

    &__container {
      background-color: $prompt-bg-color;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: $border-radius $border-radius 0 0;
    }

    &__title {
      font-size: $large-font-size;
      color: $prompt-color;
      padding: 20px 0;
    }

    &__content {
      color: $white-color;
      font-size: $small-font-size;
    }

    .my-button {
      font-size: $medium-font-size;
      margin: 25px 0;
    }
  }
</style>