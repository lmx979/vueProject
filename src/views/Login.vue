<template>
  <div class="container">
    <div class="container_icon">
      <img
        src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png"
        alt=""
        class="container_icon_img"
      />
    </div>
    <div class="container_form">
      <input type="text" placeholder="请输入手机号" v-model="phone" />
      <input type="password" placeholder="请输入密码" v-model="password" />
      <button @click="handleLogin">登录</button>
    </div>
    <div class="container_content">
      <a href="javascript:;" @click="handleRegister">立即注册</a>
      <span> | </span>
      <a href="javascript:;">忘记密码</a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "@/utils/request";
import Toast, { showToastEffect } from "@/components/Toast.vue";
// 登录逻辑封装
const userLoginEffect = (showToast) => {
  const data = reactive({
    phone: "",
    password: "",
  });
  const router = useRouter();
  const handleLogin = async () => {
    try {
      if (data.phone === "" || data.password === "") {
        showToast("手机号和密码不能为空");
        return;
      }
      const result = await post("/user/login", {
        phone: data.phone,
        password: data.password,
      });
      if (result.data.code === "0000") {
        showToast("登录成功");
        localStorage.setItem("isLogin", "true");
        router.push({ name: "Home" });
      } else {
        showToast("手机号或密码不正确");
      }
    } catch (error) {
      showToast("发送请求失败");
    }
  };
  const { phone, password } = toRefs(data);
  return {
    phone,
    password,
    handleLogin,
  };
};
// 注册逻辑封装
const userRegisterEffect = () => {
  const router = useRouter();
  const handleRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleRegister };
};
// 执行流程
export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { isShow, toastMessage, showToast } = showToastEffect();
    const { phone, password, handleLogin } = userLoginEffect(showToast);
    const { handleRegister } = userRegisterEffect();
    return {
      handleLogin,
      handleRegister,
      phone,
      password,
      isShow,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  &_icon {
    margin: 120rem 0 40rem;
    text-align: center;
    &_img {
      width: 80rem;
      height: 80rem;
    }
  }
  &_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16rem;
    input {
      width: 295rem;
      height: 48rem;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 16rem;
      border: 1rem solid rgba(0, 0, 0, 0.1);
      border-radius: 6rem;
      padding-left: 16rem;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      &:focus {
        border: 1rem solid #000;
      }
    }
    button {
      width: 295rem;
      height: 48rem;
      text-align: center;
      font-size: 16rem;
      color: #fff;
      background-color: #0091ff;
      box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
      border-radius: 4px;
      margin: 16rem 0;
    }
  }

  &_content {
    margin: 0 auto;
    width: 139rem;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a,
    span {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: rgba(0, 0, 0, 0.5);
    }

    a:hover {
      color: #000;
    }
  }
}
</style>
