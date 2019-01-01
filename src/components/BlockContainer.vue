<template>
  <div class="block-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'BlockContainer'
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .block-container {
    background-color: $prompt-bg-color;
    border-radius: $border-radius;
    padding: $common-padding
  }
</style>