<template>
  <div class="personal-info">
    <uploaded-photo v-if="isUploadPhoto"></uploaded-photo>
    <not-upload-photo v-else></not-upload-photo>
  </div>
</template>

<script>
  import NotUploadPhoto from "./NotUploadPhoto/NotUploadPhoto";
  import UploadedPhoto from "./UploadedPhoto";

  export default {
    name: 'PersonalInformation',
    components: {UploadedPhoto, NotUploadPhoto},
    computed: {
      // 是否已经上传照片
      isUploadPhoto() {
        return this.$store.state.user.loginUserInfo.has_image;
        // return true
      }
    }
  }
</script>

<style lang="scss">
  .personal-info {
    flex: 1;
  }
</style>