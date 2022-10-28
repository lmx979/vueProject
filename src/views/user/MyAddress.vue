<template>
  <div class="header">
    <div class="header_back_iconfont" @click="handleBack">&#xe6e6;</div>
    <div class="header_text">管理收货地址</div>
    <router-link :to="{ path: `/myAddress/create` }">
      <div class="header_create">新建</div></router-link
    >
  </div>
  <div class="container">
    <div class="container_title">
      我的收货地址<span class="iconfont">&#xe619;</span>
    </div>
    <router-link :to="{ path: `/myAddress/edit` }">
      <div class="container_item">
        <div class="container_item_left">
          <div class="container_item_left_info">
            <div class="name">小慕</div>
            <div class="phone">18723131387</div>
          </div>
          <div class="container_item_left_address">
            北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层
          </div>
        </div>
        <div class="container_item_right_iconfont">&#xe6e7;</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useBackRouterEffect } from "@/effects/backEffect";
export default {
  name: "MyAddress",
  setup() {
    const handleBack = useBackRouterEffect();
    return { handleBack };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/address-header.scss";
@include top;
.container {
  &_title {
    font-family: PingFangSC-Regular;
    font-size: 16rem;
    color: #333;
    margin: 16rem 0 12rem 18rem;
    .iconfont {
      font-family: iconfont;
      margin-left: 8rem;
    }
  }
  &_item {
    width: 339rem;
    height: 105rem;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 5rem 0 #f1f1f1;
    border-radius: 4px;
    margin: 0 18rem;
    padding: 18rem 16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rem;
    &_left {
      &_info {
        display: flex;
        margin-bottom: 10rem;
        .name {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #666;
          margin-right: 66rem;
        }
        .phone {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #666;
        }
      }
      &_address {
        width: 260rem;
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333;
        line-height: 20rem;
      }
    }
    &_right_iconfont {
      font-size: 16rem;
      color: #666;
    }
  }
}
</style>
