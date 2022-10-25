<template>
  <div class="container_banner">
    <img
      src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202191609589.png"
      alt=""
      class="container_banner_img"
    />
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  overflow-y: auto;
  &_banner {
    text-align: center;
    margin-top: 12rem;
    height: 88rem;
    &_img {
      width: 339rem;
      height: 86rem;
    }
  }
}
</style>
