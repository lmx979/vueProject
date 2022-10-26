<template>
  <div class="header">我的购物车</div>
  <div class="cart">
    <div v-for="cartItem of cartList" :key="cartItem.id" class="cart_box">
      <div class="cart_box_shopname">{{ cartItem.shopName }}</div>
      <div class="cart_box_info">
        <div
          v-for="item of cartItem.itemList"
          :key="item.id"
          class="cart_box_info_item"
        >
          <div class="cart_box_info_item_left">
            <img :src="item.imgUrl" />
          </div>
          <div class="cart_box_info_item_right">
            <div class="name">{{ item.name }}</div>
            <div class="price">
              <div class="count">
                ￥{{ item.promotionPrice }} × {{ item.count }}
              </div>
              <div class="sum">
                ￥{{ (item.promotionPrice * item.count).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom"></div>
  <Dockers name="cart" />
</template>

<script>
import { ref } from "vue";
import { get } from "@/utils/request";
import Dockers from "@/components/Dockers.vue";
const useCartListEffect = () => {
  const cartList = ref([]);
  // 获取购物车列表
  const getCartList = async () => {
    const result = await get("/cart");
    if (result.data.code === "0000") {
      cartList.value = result.data.data;
    } else {
      cartList.value = [];
    }
  };
  getCartList();
  return { cartList };
};
export default {
  name: "Cart",
  components: { Dockers },
  setup() {
    const { cartList } = useCartListEffect();
    return { cartList };
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 375rem;
  height: 45rem;
  font-family: PingFangSC-Regular;
  font-size: 16rem;
  color: #333;
  text-align: center;
  line-height: 45rem;
  box-shadow: 0 0 2rem 0 #f1f1f1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  top: 45rem;
  bottom: 49rem;
  background-color: #f8f8f8;
  overflow-y: auto;
  &_box {
    width: 339rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4rem;
    margin: 12rem auto;
    padding: 12rem 16rem;
    box-shadow: 0 0 2rem 0 #eee;
    &_shopname {
      font-family: PingFangSC-Medium;
      font-size: 16rem;
      color: #333;
      margin-bottom: 12rem;
    }
    &_info {
      &_item {
        display: flex;
        margin-top: 8rem;
        &_left {
          img {
            width: 46rem;
            height: 46rem;
            margin-right: 16rem;
          }
        }
        &_right {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name {
            font-size: 14rem;
            color: #333;
            font-family: PingFangSC-Medium;
          }
          .price {
            display: flex;
            justify-content: space-between;
            font-size: 14rem;
            font-family: PingFingSC-Regular;
            .count {
              color: #e93b3b;
              &::first-letter {
                font-size: 12rem;
              }
            }
            .sum {
              color: #000;
              &::first-letter {
                font-size: 12rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
 