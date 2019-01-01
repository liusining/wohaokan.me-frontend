<template>
  <div class="image-frame">
    <div :style="{
        backgroundImage: `url('${img}')`
      }">
    </div>
  </div>
</template>

<script>
  /**
   * 保证图片的显示是正方形的
   */
  export default {
    name: 'ImageFrame',
    props: {
      img: String
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .image-frame {
    display: flex;
    flex: 1;

    > div {
      width: 100%;
      padding-top: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: $border-radius;
      margin: auto;
    }
  }
</style>