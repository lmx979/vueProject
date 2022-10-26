<template>
  <div class="header">我的订单</div>
  <div class="order">
    <div v-for="item of orderList" :key="item.shopId" class="order_item">
      <div class="order_item_top">
        <div class="order_item_top_shop">
          <div class="order_item_top_shop_iconfont">&#xe61a;</div>
          <div class="order_item_top_shop_name">{{ item.shopName }}</div>
        </div>
        <div class="order_item_top_status">已取消</div>
      </div>
      <div class="order_item_bottom">
        <div class="order_item_bottom_products">
          <img
            v-for="productItem of item.itemList"
            :key="productItem.id"
            :src="productItem.imgUrl"
          />
        </div>
        <div class="order_item_bottom_price">
          <div class="order_item_bottom_price_sum">
            ￥{{ calcSum(item.itemList) }}
          </div>
          <div class="order_item_bottom_price_count">
            共 {{ calcCount(item.itemList) }} 件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dockers name="order" />
</template>

<script>
import { ref } from "vue";
import { get } from "@/utils/request";
import Dockers from "@/components/Dockers.vue";
const useOrderListEffect = () => {
  const orderList = ref([]);
  // 获取选中的订单列表
  const getOrderList = async () => {
    const result = await get("/order");
    if (result.data.code === "0000") {
      orderList.value = result.data.data;
    } else {
      orderList.value = [];
    }
  };
  getOrderList();
  // 计算总价
  const calcSum = (productList) => {
    let sum = 0.0;
    productList.forEach((e) => {
      sum += e.promotionPrice * e.count;
    });
    return sum.toFixed(2);
  };
  // 计算总量
  const calcCount = (productList) => {
    let count = 0;
    productList.forEach((e) => {
      count += e.count;
    });
    return count;
  };
  return { orderList, calcSum, calcCount };
};
export default {
  name: "Order",
  components: { Dockers },
  setup() {
    const { orderList, calcSum, calcCount } = useOrderListEffect();
    return { orderList, calcSum, calcCount };
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
}
.order {
  position: absolute;
  left: 0;
  right: 0;
  top: 45rem;
  bottom: 49rem;
  background-color: #f8f8f8;
  overflow-y: auto;
  &_item {
    width: 339rem;
    height: 100rem;
    margin: 16rem auto;
    overflow: hidden;
    border-radius: 4rem;
    padding: 12rem;
    box-sizing: border-box;
    box-shadow: 0 0 2rem 1rem #eee;
    &_top {
      height: 20rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rem;
      &_shop {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 16rem;
        &_name {
          font-family: PingFangSC-Medium;
          margin-left: 8rem;
        }
      }
      &_status {
        font-family: PingFangSC-Medium;
        font-size: 14rem;
        color: #999;
      }
    }
    &_bottom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      &_products {
        img {
          width: 40rem;
          height: 40rem;
          margin-right: 12rem;
        }
      }
      &_price {
        &_sum {
          font-family: PingFangSC-Regulae;
          font-size: 14rem;
          color: #e93b3b;
          margin-bottom: 4rem;
          line-height: 20rem;
          text-align: right;
        }
        &_count {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333;
          line-height: 14rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
