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
      <input type="password" placeholder="确认密码" v-model="confirmPassword" />
      <button @click="handleRegister">注册</button>
    </div>
    <div class="container_content">
      <a href="javascript:;" @click="handleLogin">已有账号去登陆</a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
  
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../utils/request";
import Toast, { showToastEffect } from "../components/Toast.vue";
// 注册逻辑封装
const userRegisterEffect = (showToast) => {
  const data = reactive({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleRegister = async () => {
    try {
      if (
        data.phone === "" ||
        data.password === "" ||
        data.confirmPassword === ""
      ) {
        showToast("手机号和密码不能为空");
        return;
      }
      if (data.password !== data.confirmPassword) {
        showToast("密码不一致");
        return;
      }
      const result = await post("/user/register", {
        phone: data.phone,
        password: data.password,
      });
      if (result.data.code === "0000") {
        showToast("注册成功，请先登录");
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (error) {
      showToast("发送请求失败");
    }
  };
  const { phone, password, confirmPassword } = toRefs(data);
  return { phone, password, confirmPassword, handleRegister };
};
// 登录逻辑封装
const userLoginEffect = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleLogin };
};
// 执行流程
export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { isShow, toastMessage, showToast } = showToastEffect();
    const { phone, password, confirmPassword, handleRegister } =
      userRegisterEffect(showToast);
    const { handleLogin } = userLoginEffect();
    return {
      handleLogin,
      handleRegister,
      phone,
      password,
      confirmPassword,
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
    width: 100rem;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: rgba(0, 0, 0, 0.5);
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
