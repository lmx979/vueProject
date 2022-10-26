import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    // 异步加载路由
    component: () => import("@/views/home/Home"),
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === "true") {
        next({ name: "Home" });
      } else {
        next();
      }
    },
  },
  // 注册页
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === "true") {
        next({ name: "Home" });
      } else {
        next();
      }
    },
  },
  // 店铺详情页
  {
    // 跳转时携带参数id
    path: "/shop/:id",
    name: "Shop",
    component: () => import("@/views/shop/Shop"),
  },
  // 订单确认页
  {
    path: "/order-confirm/:shopId",
    name: "OrderConfirm",
    component: () => import("@/views/order/OrderConfirm"),
  },
  // 订单页
  {
    path: "/order",
    name: "Order",
    component: () => import("@/views/order/Order"),
  },
  // 用户页
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/user/User"),
  },
  // 我的地址页
  {
    path: "/myAddress/:userId",
    name: "MyAddress",
    component: () => import("@/views/user/MyAddress"),
  },
  // 编辑地址页
  {
    path: "/myAddress/edit/:addressId",
    name: "EditAddress",
    component: () => import("@/views/user/EditAddress"),
  },
  // 新建地址页
  {
    path: "/myAddress/create/:userId",
    name: "CreateAddress",
    component: () => import("@/views/user/CreateAddress"),
  },
  // 购物车页
  {
    path: "/cart/",
    name: "Cart",
    component: () => import("@/views/shop/Cart"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    localStorage.isLogin === "true" ||
    to.name === "Login" ||
    to.name === "Register"
  ) {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
