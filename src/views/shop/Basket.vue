<template>
  <!-- 蒙层 -->
  <div v-if="isShow" class="mask" @click="handleBasketShowChange"></div>
  <!-- 购物车详情 -->
  <div class="basket">
    <!-- 详情信息 -->
    <div v-if="isShow" class="basket_detail">
      <div class="basket_detail_header">
        <div class="basket_detail_header_left">
          <div
            v-if="allChecked"
            class="basket_detail_header_left_checked_iconfont"
            @click="setAllChecked(shopId)"
          >
            &#xe722;
          </div>
          <div
            v-else
            class="basket_detail_header_left_unchecked_iconfont"
            @click="setAllChecked(shopId)"
          >
            &#xe720;
          </div>
          <div class="basket_detail_header_left_text">全选</div>
        </div>
        <div class="basket_detail_header_right" @click="clearBasket(shopId)">
          清空购物车
        </div>
      </div>
      <div class="basket_detail_content">
        <div
          v-for="item of itemList"
          :key="item.id"
          class="basket_detail_content_item"
        >
          <div class="basket_detail_content_item_left">
            <div
              v-if="item.checked"
              class="basket_detail_content_item_left_checked_iconfont"
              @click="changeItemChecked(shopId, item.id)"
            >
              &#xe722;
            </div>
            <div
              v-else
              class="basket_detail_content_item_left_unchecked_iconfont"
              @click="changeItemChecked(shopId, item.id)"
            >
              &#xe720;
            </div>
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="basket_detail_content_item_right">
            <div class="basket_detail_content_item_right_top">
              {{ item.name }}
            </div>
            <div class="basket_detail_content_item_right_bottom">
              <div class="basket_detail_content_item_right_bottom_price">
                <div class="promotion">￥{{ item.promotionPrice }}</div>
                <div class="original">￥{{ item.originalPrice }}</div>
              </div>
              <div class="basket_detail_content_item_right_bottom_count">
                <span
                  v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                  class="minus_iconfont"
                  @click="changeItemToCart(shopId, shopName, item.id, item, -1)"
                  >&#xed8a;</span
                >
                <span
                  v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                  class="number"
                >
                  {{ cartData?.[shopId]?.itemList?.[item.id]?.["count"] }}
                </span>
                <span
                  class="plus_iconfont"
                  @click="changeItemToCart(shopId, shopName, item.id, item, 1)"
                  >&#xe623;</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShow && JSON.stringify(itemList) === '{}'" class="basket_null">
      购物车空无一物<br />快去挑选喜欢的商品吧<br />༼ つ ◕_◕ ༽つ
    </div>
    <!-- 总计信息 -->
    <div class="basket_count">
      <div class="basket_count_left">
        <div class="basket_count_left_icon" @click="handleBasketShowChange">
          <span class="basket_count_left_icon_iconfont">&#xe748;</span>
          <span class="basket_count_left_icon_number">{{ total }}</span>
        </div>
        <div class="basket_count_left_count">
          总计：<span class="basket_count_left_count_price"
            >￥{{ sumPrice }}</span
          >
        </div>
      </div>
      <router-link :to="total ? { path: `/order-confirm/${shopId}` } : ''">
        <div class="basket_count_right">去结算</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "@/effects/commonCartEffect";
const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  // 获取店铺id
  const shopId = route.params.id;
  // 获取购物车数据
  const cartData = store.state.cartData;
  // 定义计算属性
  // 计算总数
  const total = computed(() => {
    // 获取店铺的所有商品
    const itemList = cartData[shopId]?.itemList || {};
    let count = 0;
    // 如果没有数量记录，就直接返回
    if (itemList) {
      for (const key in itemList) {
        count += itemList[key].count;
      }
    }
    return count;
  });
  // 计算总价
  const sumPrice = computed(() => {
    // 获取店铺的所有商品
    const itemList = cartData[shopId]?.itemList || {};
    let sum = 0.0;
    if (itemList) {
      for (const key in itemList) {
        // 当商品为选中状态时才算入总价中
        if (itemList[key].checked) {
          sum += itemList[key].count * itemList[key].promotionPrice;
        }
      }
    }
    return sum.toFixed(2);
  });
  // 计算购物车列表
  const itemList = computed(() => {
    const itemList = cartData[shopId]?.itemList || {};
    return itemList;
  });
  // 计算全选
  const allChecked = computed(() => {
    // 获取所有商品信息
    const itemList = cartData[shopId]?.itemList || {};
    // 定义状态，默认全选
    let checked = true;
    if (itemList) {
      for (const key in itemList) {
        if (!itemList[key].checked) {
          checked = false;
        }
      }
    }
    return checked;
  });
  return { shopId, total, sumPrice, itemList, allChecked };
};
const useBasketShowEffect = () => {
  const isShow = ref(false);
  const handleBasketShowChange = () => {
    isShow.value = !isShow.value;
  };
  return { isShow, handleBasketShowChange };
};
export default {
  name: "Basket",
  props: ["shopName"],
  setup() {
    const { shopId, total, sumPrice, itemList, allChecked } = useCartEffect();
    const { isShow, handleBasketShowChange } = useBasketShowEffect();
    const {
      cartData,
      changeItemToCart,
      changeItemChecked,
      setAllChecked,
      clearBasket,
    } = useCommonCartEffect();
    return {
      shopId,
      total,
      sumPrice,
      itemList,
      allChecked,
      isShow,
      handleBasketShowChange,
      cartData,
      changeItemToCart,
      changeItemChecked,
      setAllChecked,
      clearBasket,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  background-color: rgba($color: #000, $alpha: 0.4);
}
.basket {
  box-shadow: 0 -1rem 3rem 0 #eee;
  &_detail {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49rem;
    background-color: #fff;
    &_header {
      box-sizing: border-box;
      padding: 0 18rem;
      width: 100%;
      height: 50rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      &_left {
        display: flex;
        align-items: center;
        &_checked_iconfont {
          font-size: 19rem;
          margin-right: 9rem;
          color: #0091ff;
        }
        &_unchecked_iconfont {
          font-size: 19rem;
          margin-right: 9rem;
          color: #666;
        }
        &_text {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333;
        }
      }
      &_right {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333;
      }
    }
    &_content {
      width: 100%;
      max-height: 240rem;
      overflow-y: auto;
      &_item {
        margin: 13rem 17rem;
        display: flex;
        &_left {
          margin-right: 16rem;
          display: flex;
          &_checked_iconfont {
            font-size: 19rem;
            margin-right: 16rem;
            color: #0091ff;
            line-height: 46rem;
          }
          &_unchecked_iconfont {
            font-size: 19rem;
            margin-right: 16rem;
            color: #666;
            line-height: 46rem;
          }
          img {
            width: 46rem;
            height: 46rem;
          }
        }
        &_right {
          flex-grow: 1;
          &_top {
            @include ellipsis;
            width: 180rem;
            font-family: PingFangSC-Medium;
            font-size: 14rem;
            color: #333;
            margin-bottom: 8rem;
          }
          &_bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &_price {
              display: flex;
              align-items: center;
              .promotion {
                font-family: PingFangSC-Semibold;
                font-size: 14rem;
                color: #e93b3b;
                line-height: 20rem;
                margin-right: 8rem;
                &::first-letter {
                  font-size: 12rem;
                }
              }
              .original {
                font-family: PingFangSC-Regular;
                font-size: 10rem;
                color: #999;
                line-height: 20rem;
                &::first-letter {
                  font-size: 12rem;
                }
              }
            }
            &_count {
              display: flex;
              align-items: center;
              .minus_iconfont {
                color: #666;
                font-size: 20rem;
              }
              .number {
                font-family: PingFangSC-Regular;
                font-size: 14rem;
                color: #333;
                margin: 0 10rem;
              }
              .plus_iconfont {
                color: #0091ff;
                font-size: 20rem;
              }
            }
          }
        }
      }
    }
  }
  &_null {
    height: 100rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49rem;
    background-color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 16rem;
    color: #333;
    text-align: center;
    line-height: 30rem;
  }
  &_count {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49rem;
    display: flex;
    justify-content: space-between;
    &_left {
      display: flex;
      align-items: center;
      &_icon {
        position: relative;
        margin: 0 32rem 0 24rem;
        &_iconfont {
          font-size: 30rem;
          color: #1fa4fc;
        }
        &_number {
          display: block;
          font-size: 8rem;
          min-width: 10rem;
          height: 10rem;
          background-color: #e93b3b;
          border-radius: 50%;
          font-family: PingFangSC-Regular;
          color: #fff;
          text-align: center;
          line-height: 10rem;
          padding: 1rem;
          position: absolute;
          top: 0rem;
          left: 24rem;
        }
      }
      &_count {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333;
        &_price {
          font-family: PingFangSC-Regular;
          font-size: 18rem;
          color: #e93b3b;
        }
      }
    }
    &_right {
      width: 98rem;
      height: 49rem;
      background-color: #1fa4fc;
      font-family: PingFangSC-Regular;
      font-size: 15rem;
      color: #fff;
      text-align: center;
      line-height: 49rem;
      border-radius: 9rem;
    }
  }
}
</style>
