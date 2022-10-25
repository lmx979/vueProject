import { useStore } from "vuex";
import { toRefs } from "vue";
export const useCommonCartEffect = () => {
  const store = useStore();
  const { cartData } = toRefs(store.state);
  const changeItemToCart = (shopId, shopName, itemId, itemInfo, num) => {
    store.commit("changeItemToCart", {
      shopId,
      shopName,
      itemId,
      itemInfo,
      num,
    });
  };
  const changeItemChecked = (shopId, itemId) => {
    store.commit("changeItemChecked", { shopId, itemId });
  };
  const setAllChecked = (shopId) => {
    store.commit("setAllChecked", { shopId });
  };
  const clearCart = (shopId) => {
    store.commit("clearCart", { shopId });
  };
  return {
    cartData,
    changeItemToCart,
    changeItemChecked,
    setAllChecked,
    clearCart,
  };
};
