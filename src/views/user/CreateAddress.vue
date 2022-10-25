<template>
  <div class="header">
    <div class="header_back_iconfont" @click="handleBack">&#xe6e6;</div>
    <div class="header_text">新建收货地址</div>
    <div class="header_create">保存</div>
  </div>
  <AddressForm />
</template>

<script>
import { useBackRouterEffect } from "../../effects/backEffect";
import AddressForm from "../../components/AddressForm.vue";
export default {
  name: "CreateAddress",
  components: { AddressForm },
  setup() {
    const handleBack = useBackRouterEffect();
    return { handleBack };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/address-header.scss";
@include top;
</style>
