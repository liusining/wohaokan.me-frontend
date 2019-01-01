<template>
  <div class="personal-info">
    <uploaded-photo v-if="user.isUploadPhoto"></uploaded-photo>
    <not-upload-photo v-else></not-upload-photo>
  </div>
</template>

<script>
  import NotUploadPhoto from "./NotUploadPhoto/NotUploadPhoto";
  import UploadedPhoto from "./UploadedPhoto";

  export default {
    name: 'PersonalInformation',
    components: {UploadedPhoto, NotUploadPhoto},
    data() {
      return {
        user: {
          // 是否已经上传照片
          isUploadPhoto: false
        }
      }
    }
  }
</script>

<style lang="scss">
  .personal-info {
    flex: 1;
  }
</style>