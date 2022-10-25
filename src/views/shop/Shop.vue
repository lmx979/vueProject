<template>
  <div class="container">
    <div class="container_header">
      <div class="container_header_left">
        <span @click="handleBack" class="container_header_left_iconfont"
          >&#xe6e6;</span
        >
      </div>
      <div class="container_header_right">
        <span class="container_header_right_iconfont">&#xe60f;</span>
        <input
          type="text"
          class="container_header_right_input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :showBorder="false" v-if="item.imgUrl" />
    <Content :shopName="item.title" />
    <Cart :shopName="item.title" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { get } from "../../utils/request";
import { useBackRouterEffect } from "../../effects/backEffect";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";
// 获取店铺信息
const useShopInfoEffect = () => {
  const router = useRoute();
  const item = ref({});
  const getItem = async () => {
    const result = await get(`/shop/${router.params.id}`);
    item.value = result.data.data;
  };
  return { item, getItem };
};
export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItem } = useShopInfoEffect();
    const handleBack = useBackRouterEffect();
    getItem();
    return { item, handleBack };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 18rem;
  &_header {
    width: 100%;
    height: 32rem;
    margin: 16rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_left_iconfont {
      color: #888;
      font-size: 20rem;
    }
    &_right {
      position: relative;
      &_iconfont {
        color: #888;
        font-size: 18rem;
        position: absolute;
        top: 6rem;
        left: 16rem;
      }
      &_input {
        width: 310rem;
        height: 32rem;
        background-color: #f5f5f5;
        border-radius: 16rem;
        padding: 0 45rem;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
    }
  }
}
</style>
