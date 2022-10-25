<template>
  <div class="container_search">
    <span class="container_search_iconfont">&#xe60f;</span>
    <input
      type="search"
      class="container_search_input"
      placeholder="山姆会员商店优惠商品"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
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
  &_search {
    text-align: center;
    position: relative;
    color: #888;
    &_iconfont {
      font-size: 16rem;
      position: absolute;
      left: 34rem;
      top: 6rem;
    }
    &_input {
      width: 339rem;
      height: 32rem;
      background-color: #f5f5f5;
      border-radius: 16rem;
      box-sizing: border-box;
      padding-left: 45rem;
      &::-webkit-input-placeholder {
        font-size: 14rem;
        font-family: PingFangSC-Regular;
      }
      &:-moz-placeholder {
        font-size: 14rem;
        font-family: PingFangSC-Regular;
      }
      &::-moz-placeholder {
        font-size: 14rem;
        font-family: PingFangSC-Regular;
      }
      &:-ms-input-placeholder {
        font-size: 14rem;
        font-family: PingFangSC-Regular;
      }
    }
  }
}
</style>
