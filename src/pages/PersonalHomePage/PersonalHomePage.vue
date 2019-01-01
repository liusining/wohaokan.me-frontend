<template>
  <div class="personal-home">
    <div class="personal-home__header">
      <div class="personal-home__header-title clear-both">
        <img src="../../assets/images/cha@2x.png"/>
        HI，{{user.name}}
      </div>

      <div class="personal-home__options">
        <my-button @click="changeHomeOption('info')">个人信息</my-button>
        <my-button style="margin-left:20px;" :plain="true" @click="changeHomeOption('reward')">打赏记录</my-button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import MyButton from "../../components/MyButton";

  /**
   * 个人主页
   */
  export default {
    name: 'PersonalHomePage',
    components: {MyButton},
    data() {
      return {
        user: {
          name: 'Daisy'
        }
      }
    },
    methods: {
      changeHomeOption(option) {
        this.$router.push(`/personalHome/${option}`);
      }
    }
  };
</script>

<style lang="scss">
  @import "../../styles/variables";

  .personal-home {
    &__header {
      background-color: $prompt-bg-color;
      padding: $common-padding;
      color: $white-color;
      font-size: $large-font-size;

      &-title {
        position: relative;
        text-align: center;
        margin-bottom: $common-padding;

        img {
          height: 20px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }

    &__options {
      text-align: center;
    }
  }
</style>