<template>
  <div :class="{ shop_info: true, shop_info_border: showBorder }">
    <div class="shop_info_left">
      <img :src="item.imgUrl" alt="" />
    </div>
    <div class="shop_info_right">
      <div class="shop_info_right_title">
        {{ item.title }}
      </div>
      <div class="shop_info_right_tags">
        <div
          v-for="(tagItem, tagIndex) of item.tags"
          :key="tagIndex"
          class="shop_info_right_tags_item"
        >
          {{ tagItem }}
        </div>
      </div>
      <div class="shop_info_right_notice">
        {{ item.notice }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item", "showBorder"],
};
</script>

<style lang="scss" scoped>
.shop_info {
  display: flex;
  margin-bottom: 12rem;
  &_border {
    border-bottom: 1rem solid #f1f1f1;
  }
  &_left {
    margin-right: 16rem;
    img {
      width: 56rem;
      height: 56rem;
    }
  }
  &_right {
    flex-grow: 1;
    &_title {
      color: #333;
      margin-bottom: 8rem;
    }
    &_tags {
      margin-bottom: 8rem;
      display: flex;
      &_item {
        color: #333;
        margin-right: 16rem;
      }
    }
    &_notice {
      color: #e93b3b;
      margin-bottom: 12rem;
    }
  }
}
</style>
