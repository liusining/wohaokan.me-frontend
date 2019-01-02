<template>
  <div class="my-button" :class="{
    'my-button--special': !plain,
    'my-button--so-big': big
  }" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyButton',
    props: {
      plain: {
        type: Boolean,
        default: false
      },
      big: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss">
  @import '../styles/variables';

  .my-button {
    display: inline-block;
    font-size: 14px;
    padding: 10px 22px;
    cursor: pointer;
    border-radius: 100px;
    background: #4F4F4F;
    color: $prompt-color;
    text-align: center;

    &--special {
      background-image: linear-gradient(135deg, #E53F24 0%, $primary-color 100%);
      box-shadow: 0 2px 6px 0 rgba(255, 128, 48, 0.20);
      color: $white-color;
    }

    &--so-big {
      padding: 12px 35px;
    }
  }

  .my-button__shadow {
    padding: 0;
    width: 50px;
    height: 50px;
    line-height: 60px;
    text-align: center;
    border: 8px solid hsl(0, 0%, 18%);
  }

  .my-button__circle {
    @extend .my-button__shadow;

    img {
      display: inline-block;
      width: 20px;
    }
  }

  .my-button--big {
    @extend .my-button__shadow;

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 76px;
    line-height: initial;
    box-shadow: none;
    box-sizing: border-box;
    padding: 0 22px;
    min-width: 160px;

    img {
      width: 28px;
    }
  }
</style>