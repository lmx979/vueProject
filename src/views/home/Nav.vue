<template>
  <div class="container_nav">
    <div
      class="container_nav_item"
      v-for="(item, index) of navItems"
      :key="index"
    >
      <img :src="item.imgUrl" class="container_nav_item_img" />
      <span class="container_nav_item_text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  setup() {
    const navItems = [
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png",
        text: "超市便利",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843550.png",
        text: "菜市场",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843505.png",
        text: "水果店",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843412.png",
        text: "鲜花绿植",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844276.png",
        text: "医药健康",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844145.png",
        text: "家居时尚",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844545.png",
        text: "烘焙蛋糕",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844072.png",
        text: "签到",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844735.png",
        text: "大牌免运",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844286.png",
        text: "红包套餐",
      },
    ];
    return { navItems };
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
  &_nav {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16rem;
    &_item {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16rem;
      &_img {
        width: 40rem;
        height: 40rem;
        margin-bottom: 6rem;
      }
      &_text {
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
