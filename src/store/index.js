import { createStore } from "vuex";

// 把购物车信息放入缓存
const setLocalCartData = (state) => {
  const { cartData } = state;
  localStorage.cartData = JSON.stringify(cartData);
};

// 从缓存中取出购物车信息
const getLocalCartData = () => {
  let result = {};
  if (localStorage.cartData) {
    result = JSON.parse(localStorage.cartData);
  }
  return result;
};

export default createStore({
  state: {
    // 获取缓存购物车信息
    cartData: getLocalCartData(),
  },
  getters: {},
  mutations: {
    // 添加商品到购物车
    changeItemToCart(state, payload) {
      const { shopId, shopName, itemId, itemInfo, num } = payload;
      let shopInfo = {};
      if (state.cartData[shopId]) {
        shopInfo = state.cartData[shopId];
      } else {
        shopInfo.shopName = shopName;
        shopInfo.itemList = {};
      }
      let item = null;
      if (shopInfo.itemList[itemId]) {
        item = shopInfo.itemList[itemId];
      } else {
        item = itemInfo;
        item.count = 0;
      }
      // 数量改变
      item.count += num;
      // 如果数量为0，将商品移出购物车
      if (item.count === 0) {
        // 从shopInfo中删除item
        delete shopInfo.itemList[itemId];
      } else {
        // 将勾选状态设为true
        item.checked = true;
        // 往shopInfo中添加item
        shopInfo.itemList[itemId] = item;
      }
      // 如果店铺中的购物车为空，将店铺移出购物车
      if (JSON.stringify(shopInfo.itemList) === {}) {
        // 从cartData中删除shopInfo
        delete state.cartData[shopId];
      } else {
        // 往cartData中添加shopInfo
        state.cartData[shopId] = shopInfo;
      }
      // 将购物车信息放入缓存
      setLocalCartData(state);
    },
    // 更改商品勾选状态
    changeItemChecked(state, payload) {
      const { shopId, itemId } = payload;
      const item = state.cartData[shopId].itemList[itemId];
      item.checked = !item.checked;
      setLocalCartData(state);
    },
    // 设置全选
    setAllChecked(state, payload) {
      const { shopId } = payload;
      for (const item in state.cartData[shopId].itemList) {
        state.cartData[shopId].itemList[item].checked = true;
      }
      setLocalCartData(state);
    },
    // 清空购物车
    clearCart(state, payload) {
      const { shopId } = payload;
      state.cartData[shopId].itemList = {};
      setLocalCartData(state);
    },
  },
  actions: {},
  modules: {},
});
