<template>
  <div class="form">
    <div class="form_item">
      所在省市：<input type="text" placeholder="如北京市" />
    </div>
    <div class="form_item">
      具体地址：<input type="text" placeholder="如北理工大学国防科技园" />
    </div>
    <div class="form_item">
      门牌号：<input type="text" placeholder="如2号楼 10层 10-1" />
    </div>
    <div class="form_item">
      收货人：<input type="text" placeholder="请填写收货人的姓名" />
    </div>
    <div class="form_item">
      联系电话：<input type="text" placeholder="请填写收货人的手机号" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressForm",
};
</script>

<style lang="scss" scoped>
@import "../style/mixins.scss";
.form {
  width: 375rem;
  height: 225rem;
  margin-top: 12rem;
  padding: 12rem 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: PingFangSC-Regular;
  font-size: 15rem;
  color: #333;
  input {
    @include ellipsis;
    width: 210rem;
    height: 30rem;
    font-size: 14rem;
    color: #666;
    padding: 0 5rem;
  }
}
</style>
