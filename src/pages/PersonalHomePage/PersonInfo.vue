<template>
  <div class="person-info">
    <div class="person-info__image">
      <input ref="uploadInput" style="display: none;" type="file" accept="image/*" @change="acceptImage"/>
      <my-button v-if="modify" :big="true" @click="uploadPhoto">点击更换照片</my-button>
      <image-frame :img="currLoginUser.image"></image-frame>
    </div>

    <block-container>
      <photo-info :info="currLoginUser"/>
    </block-container>

    <block-container v-if="modify">
      <div class="clear-both person-info__option">
        <span class="f-left">年龄</span>
        <input class="f-right" v-model="currLoginUser.age"/>
      </div>
    </block-container>

    <block-container>
      <div class="clear-both person-info__option">
        <span class="f-left">昵称</span>
        <input class="f-right" v-if="modify" v-model="currLoginUser.name"/>
        <span class="f-right" v-else>{{currLoginUser.name}}</span>
      </div>
    </block-container>

    <block-container v-if="!modify">
      <div class="clear-both person-info__option">
        <span class="f-left">Mixin ID</span>
        <span class="f-right">{{currLoginUser.mixin_id}}</span>
      </div>
    </block-container>

    <block-container>
      <div class="person-info__option">
        <div style="margin-bottom:6px;">个人简介</div>
        <textarea v-if="modify" v-model="currLoginUser.description" rows="2"></textarea>
        <div v-else>{{currLoginUser.description}}</div>
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
  import {LIMIT_SIZE_OF_IMAGE} from "../../utils/constants";
  import {updateImage} from "../../services/user";

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
    data() {
      return {
        currLoginUser: {}
      }
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
          if (file.size > LIMIT_SIZE_OF_IMAGE) {
            this.$prompt({
              content: '图片过大，不可超过2M'
            });
          } else {
            updateImage(file).then(({result: {beauty, gender, age}}) => {
              this.currLoginUser = {
                ...this.currLoginUser,
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
        }
      },
      getPersonInfo() {
        return {
          ...this.currLoginUser
        }
      }
    },
    created() {
      // 创建loginUserInfo的副本，这样在本页中的修改就不会影响当前登陆用户真正的信息，
      // 这样，当前用户取消更新时，数据还是之前的数据，也就是说，在本页中一直在操作副本数据。
      this.currLoginUser = {
        ...this.loginUserInfo
      };
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
      width: 100%;
    }
  }
</style>