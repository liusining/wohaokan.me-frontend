<template>
  <div class="photo-info">
    <div class="photo-info__title">照片参数</div>
    <div class="photo-info__detail">
      <div>
        <label>颜值：</label>
        <span>{{info.beauty}}</span>
      </div>

      <div>
        <label>性别：</label>
        <span>{{info.gender === 'Female' ? '女生' : '男生'}}</span>
      </div>

      <div>
        <label>年龄：</label>
        <span class="photo-info__age">{{info.age}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PhotoInfo',
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  };
</script>

<style lang="scss">
  @import '../styles/variables';

  .photo-info {
    &__title {
      color: $white-color;
      font-size: $large-font-size;
      text-align: center;
      margin-bottom: 10px;
    }

    &__detail {
      display: flex;
      justify-content: space-around;
      color: $small-font-size;

      label {
        color: $prompt-color;
        vertical-align: middle;
      }

      span {
        color: $white-color;
        display: inline-block;
        vertical-align: middle;
      }

      &__age {
        max-width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>