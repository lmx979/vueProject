<template>
  <div class="container">
    <div class="container_header">
      <div class="container_header_back_iconfont" @click="handleBack">
        &#xe6e6;
      </div>
      <div class="container_header_text">确认订单</div>
    </div>
    <div class="container_receiver">
      <div class="container_receiver_title">收货地址</div>
      <div class="container_receiver_content">
        <div class="container_receiver_content_left">
          <div class="address">北京理工大学国防科技园2号楼10层</div>
          <div class="info">
            <div class="name">瑶妹（先生）</div>
            <div class="phone">18723131387</div>
          </div>
        </div>
        <div class="container_receiver_content_right_iconfont">&#xe6e7;</div>
      </div>
    </div>
    <div class="container_order">
      <div class="container_order_shopname">{{ shopName }}</div>
      <div class="container_order_info" id="info">
        <div
          v-for="item of itemList"
          :key="item.id"
          class="container_order_info_item"
        >
          <div class="container_order_info_item_left">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="container_order_info_item_right">
            <div class="name">{{ item.name }}</div>
            <div class="price">
              <div class="num">
                ￥{{ item.promotionPrice }} × {{ item.count }}
              </div>
              <div class="sum">
                ￥{{ (item.promotionPrice * item.count).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container_order_more" @click="handleMore">
        <span v-if="!showMore" class="container_order_more_text"
          >共计 {{ sumNumber }} 件</span
        >
        <span v-else class="container_order_more_text">收起更多</span>
        <span v-if="!showMore" class="container_order_more_iconfont"
          >&#xe6e9;</span
        >
        <span v-else class="container_order_more_iconfont">&#xe6e8;</span>
      </div>
    </div>
    <div class="container_bottom">
      <div class="container_bottom_left">
        <div class="text">实付金额</div>
        <div class="price">￥{{ sumPrice }}</div>
      </div>
      <div class="container_bottom_right" @click="handleSubmit">提交订单</div>
    </div>
    <div v-if="alertShow" class="container_alert">
      <div class="container_alert_mask" @click="closePanel"></div>
      <div v-if="!isPay" class="container_alert_panel">
        <div class="container_alert_panel_title">确认要离开收银台？</div>
        <div class="container_alert_panel_content">
          请尽快完成支付，否则订单将被取消
        </div>
        <div class="container_alert_panel_button">
          <button class="cancel" @click="closePanel">再看看</button>
          <button class="continue" @click="comfirmPay">确认支付</button>
        </div>
      </div>
      <div v-else class="container_alert_notice">
        <div class="container_alert_notice_close_iconfont" @click="closePanel">
          &#xe610;
        </div>
        <div class="container_alert_notice_success_iconfont">&#xe7f8;</div>
        <div class="container_alert_notice_text">支付成功，等待配送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useBackRouterEffect } from "../../effects/backEffect";
const useOrderEffect = () => {
  const store = useStore();
  const route = useRoute();
  // 获取店铺id
  const shopId = route.params.shopId;
  // 获取购物车数据
  const cartData = store.state.cartData;
  // 店铺名称
  const shopName = cartData[shopId].shopName;
  // 购物车商品列表
  const itemList = cartData[shopId].itemList;
  // 计算总价和总量
  let sumPrice = 0.0;
  let sumNumber = 0;
  for (const key in itemList) {
    sumPrice += itemList[key].promotionPrice * itemList[key].count;
    sumNumber += itemList[key].count;
  }
  sumPrice = sumPrice.toFixed(2);
  // 返回数据
  return { shopName, itemList, sumPrice, sumNumber };
};
const useShowMoreEffect = () => {
  let showMore = ref(false);
  const handleMore = () => {
    showMore.value = !showMore.value;
    const orderInfo = document.getElementById("info");
    if (showMore.value) {
      orderInfo.style.maxHeight = "230rem";
      orderInfo.style.overflowY = "auto";
    } else {
      orderInfo.style.maxHeight = "108rem";
      orderInfo.style.overflowY = "hidden";
      orderInfo.scrollTop = 0;
    }
  };
  return { showMore, handleMore };
};
const useSubmitEffect = () => {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  // 获取店铺id
  const shopId = route.params.shopId;
  // 提示弹框
  let alertShow = ref(false);
  // 支付完成弹框
  let isPay = ref(false);
  // 提交订单
  const handleSubmit = () => {
    alertShow.value = true;
  };
  // 确认支付
  const comfirmPay = () => {
    alertShow.value = true;
    isPay.value = true;
  };
  // 关闭弹框面板
  const closePanel = () => {
    // 订单提交后，要清空购物车
    alertShow.value = false;
    if (isPay.value) {
      store.commit("clearCart", { shopId });
      router.push({ name: "Order" });
    }
  };
  return { alertShow, isPay, handleSubmit, closePanel, comfirmPay };
};
export default {
  name: "OrderConfirm",
  setup() {
    const { shopName, itemList, sumPrice, sumNumber } = useOrderEffect();
    const handleBack = useBackRouterEffect();
    const { showMore, handleMore } = useShowMoreEffect();
    const { alertShow, isPay, handleSubmit, closePanel, comfirmPay } =
      useSubmitEffect();
    return {
      shopName,
      itemList,
      sumPrice,
      sumNumber,
      handleBack,
      showMore,
      handleMore,
      alertShow,
      isPay,
      handleSubmit,
      closePanel,
      comfirmPay,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &_header {
    height: 139rem;
    background: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
    background-repeat: no-repeat;
    &_back_iconfont {
      font-size: 22rem;
      color: #fff;
      position: absolute;
      top: 18rem;
      left: 18rem;
    }
    &_text {
      text-align: center;
      padding-top: 20rem;
      font-family: PingFangSC-Regular;
      font-size: 18rem;
      color: #fff;
    }
  }
  &_receiver {
    width: 340rem;
    height: 110rem;
    background-color: #fff;
    border-radius: 4rem;
    margin: 0 auto;
    padding: 16rem;
    position: relative;
    top: -70rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.06);
    &_title {
      font-family: PingFangSC-Medium;
      font-size: 18rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rem;
    }
    &_content {
      display: flex;
      justify-content: space-between;
      &_left {
        .address {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333;
          margin-bottom: 8rem;
        }
        .info {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #666;
          display: flex;
          .name {
            margin-right: 6rem;
          }
        }
      }
      &_right_iconfont {
        font-size: 18rem;
        line-height: 36rem;
        color: #666;
      }
    }
  }
  &_order {
    width: 339rem;
    border-radius: 4rem;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    top: -58rem;
    padding: 16rem;
    padding-bottom: 6rem;
    box-sizing: border-box;
    &_shopname {
      font-family: PingFangSC-Medium;
      font-size: 16rem;
      color: #333;
      margin-bottom: 16rem;
    }
    &_info {
      max-height: 108rem;
      overflow-y: hidden;
      &_item {
        display: flex;
        margin-bottom: 6rem;
        &_left {
          img {
            width: 46rem;
            height: 46rem;
            margin-right: 16rem;
          }
        }
        &_right {
          flex-grow: 1;
          .name {
            margin-top: 2rem;
            font-family: PingFangSC-Medium;
            font-size: 14rem;
            color: #333;
            margin-bottom: 8rem;
          }
          .price {
            display: flex;
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            font-size: 14rem;
            .num {
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
    &_more {
      width: 307rem;
      height: 28rem;
      background-color: #f5f5f5;
      font-size: 14rem;
      color: #999;
      text-align: center;
      line-height: 28rem;
      &_text {
        font-family: PingFangSC-Light;
        margin-right: 8rem;
      }
    }
  }
  &_bottom {
    width: 375rem;
    height: 49rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -1rem 3rem 0 #eee;
    &_left {
      display: flex;
      margin-left: 24rem;
      color: #333;
      .text {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 20rem;
        margin-right: 5rem;
      }
      .price {
        font-family: PingFangSC-Medium;
        font-size: 16rem;
        line-height: 22rem;
      }
    }
    &_right {
      width: 98rem;
      height: 49rem;
      background-color: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 15rem;
      color: #fff;
      text-align: center;
      line-height: 49rem;
    }
  }
  &_alert {
    &_mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba($color: #000, $alpha: 0.4);
    }
    &_panel {
      width: 300rem;
      height: 150rem;
      background-color: #fff;
      border-radius: 4rem;
      box-sizing: border-box;
      padding: 24rem;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 3rem 0 #f1f1f1;
      &_title {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        margin-bottom: 14rem;
      }
      &_content {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        text-align: center;
        color: #333;
        margin-bottom: 26rem;
      }
      &_button {
        width: 184rem;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        button {
          width: 80rem;
          height: 32rem;
          border: 1rem solid #4fb0f9;
          border-radius: 16rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          line-height: 32rem;
          text-align: center;
          &.cancel {
            color: #0091ff;
            background-color: #fff;
          }
          &.continue {
            color: #fff;
            background-color: #4fb0f9;
          }
        }
      }
    }
    &_notice {
      width: 300rem;
      height: 150rem;
      background-color: #fff;
      border-radius: 4rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &_close_iconfont {
        font-size: 20rem;
        color: #666;
        position: absolute;
        top: 10rem;
        right: 12rem;
      }
      &_success_iconfont {
        font-size: 56rem;
        color: #11c361;
        text-align: center;
        margin-top: 26rem;
      }
      &_text {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        color: #333;
        text-align: center;
        margin-top: 8rem;
      }
    }
  }
}
</style>
