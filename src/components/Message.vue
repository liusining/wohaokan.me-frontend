<template>
  <div class="message vertical-align" :style="{
       display: isShow ? 'block' : 'none'
  }">
    <div class="message__inner">
      <div class="message__icon" :style="{
        backgroundImage: `url(${typeMapper.icon})`
      }">
      </div>
      <div class="message__message">{{message}}</div>
    </div>
  </div>
</template>

<script>
  const PROMPT_TYPE_MAPPER = {
    success: {
      icon: require('../assets/images/ico_chenggong@2x.png')
    },
    error: {
      icon: require('../assets/images/ico_shibai@2x.png')
    }
  };

  export default {
    name: 'Message',
    data() {
      return {
        // 消息的文本
        message: '',
        type: 'success',
        isShow: false,
        hideTimeoutCode: null
      }
    },
    computed: {
      typeMapper() {
        return PROMPT_TYPE_MAPPER[this.type];
      }
    },
    methods: {
      show(type, message) {
        Object.assign(this, {
          type,
          message,
          isShow: true
        });

        // 每次显示都会重置隐藏的时间
        this.autoHide();
      },
      autoHide() {
        this.hideTimeoutCode && clearTimeout(this.hideTimeoutCode);

        this.hideTimeoutCode = setTimeout(() => {
          this.isShow = false;
          this.hideTimeoutCode = null;
        }, 2000);
      },
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .message {
    z-index: 2000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.5s;
    text-align: center;
    pointer-events: none;

    &__inner {
      display: inline-block;
      padding: 20px 0;
      min-width: 240px;
      background-color: rgba(0, 0, 0, 0.6);
      vertical-align: middle;
      border-radius: $border-radius;
    }

    &__icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &__message {
      margin-top: 10px;
      color: $white-color;
      text-align: center;
      font-weight: 300;
    }
  }
</style>