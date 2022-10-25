<template>
  <div class="content">
    <div class="content_left">
      <div
        v-for="item of tabItems"
        :key="item.name"
        :class="{
          content_left_item: true,
          active: item.name === currentItemName,
        }"
        @click="handleItemChange(item.name)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="content_right">
      <div v-for="item of rightItems" :key="item.id" class="content_right_item">
        <div class="content_right_item_left">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="content_right_item_right">
          <div class="content_right_item_right_top">{{ item.name }}</div>
          <div class="content_right_item_right_middle">
            月售{{ item.sales }}件
          </div>
          <div class="content_right_item_right_bottom">
            <div class="content_right_item_right_bottom_price">
              <div class="promotion">￥{{ item.promotionPrice }}</div>
              <div class="original">￥{{ item.originalPrice }}</div>
            </div>
            <div class="content_right_item_right_bottom_count">
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
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { get } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/commonCartEffect";
const tabItems = [
  { name: "all", text: "全部商品" },
  { name: "seckill", text: "秒杀" },
  { name: "fruit", text: "新鲜水果" },
  { name: "snacks", text: "休闲食品" },
  { name: "vegetable", text: "时令蔬菜" },
  { name: "meat", text: "肉蛋家禽" },
];
// 切换tab
const useTabEffect = () => {
  const currentItemName = ref("all");
  const handleItemChange = (itemName) => {
    currentItemName.value = itemName;
  };
  return { currentItemName, handleItemChange };
};
// 请求内容区数据
const useContentEffect = (currentItemName) => {
  const router = useRoute();
  const shopId = router.params.id;
  const rightItems = ref([]);
  const getContent = async (shopId, currentTab) => {
    const result = await get(`/shop/${shopId}/tab/${currentTab}`);
    rightItems.value = result.data.data;
  };
  watchEffect(() => {
    getContent(shopId, currentItemName.value);
  });
  return { rightItems, shopId };
};
export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const { handleItemChange, currentItemName } = useTabEffect();
    const { rightItems, shopId } = useContentEffect(currentItemName);
    const { cartData, changeItemToCart } = useCommonCartEffect();
    return {
      currentItemName,
      tabItems,
      rightItems,
      handleItemChange,
      shopId,
      cartData,
      changeItemToCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.content {
  position: absolute;
  top: 146rem;
  bottom: 49rem;
  left: 0;
  right: 0;
  overflow-y: auto;
  display: flex;
  &_left {
    background-color: #f1f1f1;
    &_item {
      width: 76rem;
      height: 40rem;
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: #333;
      text-align: center;
      line-height: 40rem;
    }
    .active {
      background-color: #fff;
    }
  }
  &_right {
    flex-grow: 1;
    overflow-y: auto;
    &_item {
      margin: 0 18rem 12rem 16rem;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      &_left {
        margin-right: 16rem;
        img {
          width: 68rem;
          height: 68rem;
          margin-bottom: 12rem;
        }
      }
      &_right {
        flex-grow: 1;
        &_top {
          @include ellipsis;
          width: 180rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333;
          margin-bottom: 8rem;
        }
        &_middle {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333;
          line-height: 16rem;
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
              font-family: PingFangSC-Regular;
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
              font-size: 20rem;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
}
</style>
