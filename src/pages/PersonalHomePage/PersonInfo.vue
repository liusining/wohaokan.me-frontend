<template>
  <div class="person-info">
    <div class="person-info__image">
      <input ref="uploadInput" style="display: none;" type="file" accept="image/*" @change="acceptImage"/>
      <my-button v-if="modify" :big="true" @click="uploadPhoto">点击更换照片</my-button>
      <image-frame :img="loginUserInfo.image"></image-frame>
    </div>

    <block-container>
      <photo-info :info="loginUserInfo"/>
    </block-container>

    <block-container v-if="modify">
      <div class="clear-both person-info__option">
        <span class="f-left">年龄</span>
        <input class="f-right" v-model="loginUserInfo.age"/>
      </div>
    </block-container>

    <block-container>
      <div class="clear-both person-info__option">
        <span class="f-left">昵称</span>
        <input class="f-right" v-if="modify" v-model="loginUserInfo.name"/>
        <span class="f-right" v-else>{{loginUserInfo.name}}</span>
      </div>
    </block-container>

    <block-container v-if="!modify">
      <div class="clear-both person-info__option">
        <span class="f-left">Mixin ID</span>
        <span class="f-right">{{loginUserInfo.mixin_id}}</span>
      </div>
    </block-container>

    <block-container>
      <div class="person-info__option">
        <div style="margin-bottom:6px;">个人简介</div>
        <textarea v-if="modify" v-model="loginUserInfo.description" rows="2"></textarea>
        <div v-else>{{loginUserInfo.description}}</div>
      </div>
    </block-container>
  </div>
</template>

<script>
  import ImageFrame from "../../components/ImageFrame";
  import BlockContainer from "../../components/BlockContainer";
  import PhotoInfo from "../../components/PhotoInfo";
  import MyButton from "../../components/MyButton";
  import {mapState} from 'vuex';

  /**
   * 个人信息的页面，包括个人照片、照片信息、昵称、Mixin ID和个人简介
   */
  export default {
    name: 'PersonInfo',
    components: {MyButton, PhotoInfo, BlockContainer, ImageFrame},
    props: {
      modify: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapState('user', ['loginUserInfo'])
    },
    methods: {
      uploadPhoto() {
        const {uploadInput} = this.$refs;
        uploadInput.click();
      },
      acceptImage(e) {
        let file = e.target.files[0];

        if (file) {
          this.$store.dispatch('user/uploadImage', {
            image: file,
            isUpload: false
          }).then(({beauty, gender, age}) => {
            this.loginUserInfo = {
              ...this.loginUserInfo,
              image: URL.createObjectURL(file),
              beauty,
              gender,
              age
            };

            this.$refs.uploadInput.value = '';
            this.$message({
              message: '照片更换成功'
            });
          });
        }
      },
      getPersonInfo() {
        return {
          ...this.loginUserInfo
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/variables";

  .person-info {
    > * {
      margin-bottom: 10px;
    }

    &__image {
      position: relative;

      .my-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__option {
      color: $prompt-color;
    }

    input, textarea {
      border: none;
      outline: none;
      background: transparent;
      color: $prompt-color;
    }

    input {
      text-align: right;
    }

    textarea {
      resize: none;
    }
  }
</style>