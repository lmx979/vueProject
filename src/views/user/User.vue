<template>
  <div class="header">
    <div class="header_edit_iconfont">&#xe6ea;</div>
  </div>
  <div class="info">
    <img
      src="https://img2.woyaogexing.com/2021/03/07/0490fcd985194c2ea3b0a58e2dbbafdb!400x400.jpeg"
      alt=""
    />
    <div class="info_user">
      <div class="info_user_name">热心市民李先生</div>
      <div class="info_user_id">ID：1069643013</div>
    </div>
    <div class="info_have">
      <div class="info_have_item">
        <div class="info_have_item_name">红包</div>
        <div class="info_have_item_number">218</div>
      </div>
      <div class="info_have_item">
        <div class="info_have_item_name">优惠券</div>
        <div class="info_have_item_number">12张</div>
      </div>
      <div class="info_have_item">
        <div class="info_have_item_name">京东豆</div>
        <div class="info_have_item_number">88</div>
      </div>
      <div class="info_have_item">
        <div class="info_have_item_name">白条</div>
        <div class="info_have_item_number">1000</div>
      </div>
    </div>
  </div>
  <div class="relevant">
    <div class="relevant_item">
      <div class="relevant_item_text">我的钱包</div>
      <div class="relevant_item_iconfont">&#xe6e7;</div>
    </div>
    <router-link :to="{ path: `/myAddress` }">
      <div class="relevant_item">
        <div class="relevant_item_text">我的地址</div>
        <div class="relevant_item_iconfont">&#xe6e7;</div>
      </div>
    </router-link>
    <div class="relevant_item">
      <div class="relevant_item_text">客服与帮助</div>
      <div class="relevant_item_iconfont">&#xe6e7;</div>
    </div>
  </div>
  <Dockers name="user" />
</template>

<script>
import Dockers from "@/components/Dockers.vue";
export default {
  name: "User",
  components: { Dockers },
};
</script>

<style lang="scss" scoped>
.header {
  width: 375rem;
  height: 250rem;
  background: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
  &_edit_iconfont {
    font-size: 26rem;
    position: absolute;
    top: 40rem;
    right: 20rem;
    color: #fff;
  }
}
.info {
  width: 339rem;
  height: 200rem;
  position: absolute;
  top: 85rem;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 8rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  margin: 0 18rem;
  padding: 0 28rem;
  img {
    width: 94rem;
    height: 94rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  &_user {
    border-bottom: 1rem solid #fafafa;
    font-family: PingFangSC-Regular;
    text-align: center;
    &_name {
      font-size: 24rem;
      color: #262628;
      line-height: 36rem;
      margin: 59rem 0 3rem;
    }
    &_id {
      font-size: 14rem;
      color: #c1c0c9;
      margin-bottom: 12rem;
    }
  }
  &_have {
    display: flex;
    justify-content: space-between;
    margin-top: 15rem;
    &_item {
      font-family: PingFangSC-Regular;
      text-align: center;
      &_name {
        font-size: 12rem;
        color: #c1c0c9;
      }
      &_number {
        font-size: 18rem;
        color: #262628;
        margin-top: 5rem;
      }
    }
  }
}
.relevant {
  width: 339rem;
  height: 145rem;
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-sizing: border-box;
  margin: 0 18rem;
  padding: 16rem;
  position: relative;
  top: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_item {
    display: flex;
    justify-content: space-between;
    &_text {
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      color: #262626;
    }
    &_iconfont {
      font-size: 14rem;
      color: #c2c4ca;
    }
  }
}
</style>
