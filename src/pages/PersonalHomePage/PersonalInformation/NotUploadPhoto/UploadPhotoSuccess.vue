<template>
  <div class="upload-photo">
    <page-header title="上传照片" back-router="/personalHome/info"></page-header>

    <div class="upload-photo__info-container">
      <image-frame :img="imageURL"></image-frame>

      <block-container>
        <div class="upload-photo__success-icon">
          <img src="../../../../assets/images/ico_chenggong@2x.png"/>
        </div>

        <photo-info :info="temporaryUserInfo"></photo-info>

        <div class="upload-photo__btns">
          <input ref="uploadInput" style="display: none;" type="file" accept="image/*" @change="acceptImage"/>
          <my-button @click="uploadPhoto" :plain="true">重新上传</my-button>
          <my-button @click="authorization">去认证</my-button>
        </div>
      </block-container>
    </div>
  </div>
</template>

<script>
  import PageHeader from "../../../../components/PageHeader";
  import ImageFrame from "../../../../components/ImageFrame";
  import BlockContainer from "../../../../components/BlockContainer";
  import PhotoInfo from "../../../../components/PhotoInfo";
  import MyButton from "../../../../components/MyButton";
  import {resolveSearch} from "../../../../utils/browserHelper";
  import {LIMIT_SIZE_OF_IMAGE} from "../../../../utils/constants";
  import {isEmptyObj} from "../../../../utils/util";

  /**
   * 上传照片成功后的界面
   */
  // Todo 与UI设计的不一样，之后再改
  export default {
    name: 'UploadPhotoSuccess',
    components: {MyButton, PhotoInfo, BlockContainer, ImageFrame, PageHeader},
    computed: {
      temporaryUserInfo() {
        return this.$store.state.user.temporaryUserInfo;
      },
      imageURL() {
        let i;
        return (i = this.temporaryUserInfo) && (i = i.url);
      }
    },
    methods: {
      uploadPhoto() {
        this.$refs.uploadInput.click();
      },
      acceptImage(e) {
        let file = e.target.files[0];

        if (file) {
          if (file.size > LIMIT_SIZE_OF_IMAGE) {
            this.$prompt({
              content: '图片过大，不可超过2M'
            });
          } else {
            this.$store.dispatch('user/uploadImage', file).then(() => {
              this.$refs.uploadInput.value = '';
            });
          }
        }
      },
      authorization() {
        if (this.temporaryUserInfo) {
          window.location = this.temporaryUserInfo.verify_url;
        } else {
          this.$message({
            type: 'error',
            message: '照片未通过验证，请您重新上传'
          })
        }
      },
      checkAuthStatus() {
        // 当用户从face++跳回后的路径是/uploadSuccess/auth，此时需要从后端获取用户是否识别成功的信息
        const isAuth = this.$route.path.indexOf('auth') !== -1;
        let search = resolveSearch();
        if (isAuth && search.biz_token) {
          this.$store.dispatch('user/authUserPhoto', search.biz_token).then(() => {
            // 认证通过后抓取用户信息
            this.$store.dispatch('user/getUser').then(() => {
              this.$message({
                message: '认证成功'
              });
              this.$router.push('/personalHome/info');
            });
          }).catch(({unKnowError, result}) => {
            if (!unKnowError) {
              this.$store.commit('user/saveTemporaryUserInfo', result);
              this.$prompt({
                content: '认证失败，请重试',
                button: '知道了'
              });
            } else {
              this.$message({
                type: 'error',
                message: '获取认证信息失败'
              })
            }

            this.$router.push('/uploadSuccess/auth');
          });
        } else if (isEmptyObj(this.temporaryUserInfo)) { // Todo 这里只是简单的跳到主页，但是更好的方式应该是从后端获取已上传的照片信息
          this.$message({
            type: 'error',
            message: '未找到已上传照片信息，返回首页'
          });
          this.$router.push('/main');
        }
      }
    },
    created() {
      this.checkAuthStatus();
    }
  }
</script>

<style lang="scss">
  @import "../../../../styles/variables";

  .upload-photo {
    &__success-icon {
      text-align: center;

      img {
        width: 50px;
      }
    }

    &__info-container {
      display: flex;
      flex-direction: column;
      padding: 0 $common-padding #{$common-padding * 2};
      height: 100%;
    }

    &__btns {
      text-align: center;
      margin-top: 10px;
    }
  }
</style>