<template>
  <div class="update-info">
    <page-header class="clear-both">
      <span class="update-info__btn f-left" @click="cancel">取消</span>
      更新资料
      <span class="update-info__btn f-right" @click="submit">提交</span>
    </page-header>

    <person-info ref="personInfo" class="update-info__list" :modify="true"></person-info>
  </div>
</template>

<script>
  import PageHeader from "../../../components/PageHeader";
  import PersonInfo from "../PersonInfo";

  /**
   * 更新用户的信息
   */
  export default {
    name: 'UpdatePersonInfo',
    components: {PersonInfo, PageHeader},
    methods: {
      cancel() {
        this.$router.push('/personalHome/info');
      },
      submit() {
        const personInfo = this.$refs.personInfo.getPersonInfo();
        const {name, age, description} = personInfo;

        this.$store.dispatch('user/updateUser', {name, age, description}).then(() => {
          // 修改完成后重新获取用户信息
          this.$store.dispatch('user/getUser').then(() => {
            this.$message({
              message: '更新成功'
            });

            this.$router.push('/personalHome/info');
          });
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/variables";

  .update-info {
    height: auto !important;
    background-color: $background-color;

    &__btn {
      color: $primary-color;
      font-size: $large-font-size;
    }

    &__list {
      padding: $common-padding;
    }
  }
</style>