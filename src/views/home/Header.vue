<template>
  <div class="container_header">
    <div class="container_header_left">
      <span class="container_header_left_iconfont">&#xe619;</span>
      <span class="container_header_left_text"
        >北京理工大学国防科技园2号楼10层</span
      >
    </div>
    <div class="container_header_right">
      <span class="container_header_right_iconfont">&#xe629;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  overflow-y: auto;
  &_header {
    font-size: 18rem;
    display: flex;
    justify-content: space-between;
    padding: 16rem;
    &_left {
      width: 260rem;
      @include ellipsis;
      &_text {
        font-family: PingFangSC-Regular;
        color: #333;
        font-size: 16rem;
        margin-left: 8.5rem;
      }
    }
  }
}
</style>
