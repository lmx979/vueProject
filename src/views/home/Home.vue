<template>
  <!-- 主体部分 -->
  <div class="container">
    <Header />
    <Search />
    <Banner />
    <Nav />
    <div class="container_gap"></div>
    <Nearby />
  </div>
  <Docker name="home" />
</template>

<script>
import Header from "./Header.vue";
import Search from "./Search.vue";
import Banner from "./Banner.vue";
import Nav from "./Nav.vue";
import Nearby from "./Nearby.vue";
import Docker from "@/components/Dockers.vue";
export default {
  name: "Home",
  components: { Header, Search, Banner, Nav, Nearby, Docker },
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
  &_gap {
    width: 375rem;
    height: 10rem;
  }
}
</style>
