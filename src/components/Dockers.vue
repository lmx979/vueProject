<template>
  <div class="docker">
    <span
      v-for="item of dockerItems"
      :class="{ docker_item: true, active: item.name === name }"
      :key="item.name"
      @click="dockerItemChange(item.path)"
    >
      <span class="docker_item_iconfont" v-html="item.icon"></span>
      <span class="docker_item_text"> {{ item.text }} </span>
    </span>
  </div>
</template>
  
<script>
import { useRouter } from "vue-router";
export default {
  name: "Docker",
  props: ["name"],
  setup() {
    const router = useRouter();
    const dockerItems = [
      { name: "home", icon: "&#xe612;", text: "首页", path: "/" },
      { name: "cart", icon: "&#xe61b;", text: "购物车", path: "/cart" },
      { name: "order", icon: "&#xe626;", text: "订单", path: "/order" },
      { name: "user", icon: "&#xe615;", text: "我的", path: "/user" },
    ];
    const dockerItemChange = (path) => {
      router.push({ path: path });
    };
    return { dockerItems, dockerItemChange };
  },
};
</script>
  
<style lang="scss" scoped>
.docker {
  width: 375rem;
  height: 49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 -1rem 3rem 0 #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    &_iconfont {
      font-size: 26rem;
    }
    &_text {
      margin-top: 2rem;
      font-family: PingFangSC-Regular;
      font-size: 10rem;
    }
  }
  .active {
    color: #1fa4fc;
  }
}
</style>
