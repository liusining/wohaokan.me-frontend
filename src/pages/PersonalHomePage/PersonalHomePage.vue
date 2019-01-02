<template>
  <div class="personal-home">
    <div class="personal-home__header">
      <div class="personal-home__header-title clear-both">
        <img src="../../assets/images/cha@2x.png" @click="backToMainPage"/>
        HI，{{loginUserInfo.name}}
      </div>

      <div class="personal-home__options">
        <my-button :plain="!isInfoPage" @click="changeHomeOption(INFO_KEY)">个人信息</my-button>
        <my-button :plain="isInfoPage" style="margin-left:20px;" @click="changeHomeOption(REWARD_KEY)">打赏记录</my-button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import MyButton from "../../components/MyButton";
  import {mapState} from 'vuex';

  /**
   * 个人主页
   */
  export default {
    name: 'PersonalHomePage',
    components: {MyButton},
    data() {
      const INFO_KEY = 'info';
      const REWARD_KEY = 'reward';

      return {
        INFO_KEY,
        REWARD_KEY,
      }
    },
    computed: {
      ...mapState('user', ['loginUserInfo']),
      // 当前显示页是否是个人信息页，用于页签切换
      isInfoPage() {
        return this.$route.path.indexOf(this.INFO_KEY) !== -1;
      }
    },
    methods: {
      changeHomeOption(option) {
        this.$router.push(`/personalHome/${option}`);
      },
      backToMainPage() {
        this.$router.push('/main');
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