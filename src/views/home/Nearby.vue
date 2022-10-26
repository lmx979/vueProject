<template>
  <div class="container_nearby">
    <div class="container_nearby_title">附近店铺</div>
    <router-link
      :to="`/shop/${item.id}`"
      v-for="item of nearbyItems"
      :key="item.id"
    >
      <ShopInfo :item="item" :showBorder="true" v-if="item.imgUrl" />
    </router-link>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>

<script>
import { ref } from "vue";
import { get } from "@/utils/request";
import Toast, { showToastEffect } from "@/components/Toast.vue";
import ShopInfo from "@/components/ShopInfo.vue";
const useNearbyEffect = (showToast) => {
  const nearbyItems = ref({});
  const getNearbyItems = async () => {
    try {
      const result = await get("/home/nearby");
      if (result.data.code === "0000") {
        nearbyItems.value = result.data.data;
      } else {
        showToast("数据为空");
      }
    } catch (error) {
      showToast("获取数据失败");
    }
  };
  getNearbyItems();
  return { nearbyItems };
};
export default {
  name: "Nearby",
  components: { Toast, ShopInfo },
  setup() {
    const { isShow, toastMessage, showToast } = showToastEffect();
    const { nearbyItems } = useNearbyEffect(showToast);
    return { isShow, toastMessage, nearbyItems };
  },
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
  &_nearby {
    padding: 16rem 18rem;
    &_title {
      font-family: PingFangSC-Regular;
      font-size: 18rem;
      color: #333;
      margin-bottom: 14rem;
    }
  }
}
</style>
