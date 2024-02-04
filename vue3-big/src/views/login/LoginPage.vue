<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import {userRegisterService,useLoginService} from '@/api/login'
import { ref, watch } from "vue";
import {useUserStore} from '@/stores'
import {useRouter}from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const data = ref({
  username: "",
  password: "",
  repassword: ""
});
const checked = ref(false)
const isLogin = ref(true)
const form = ref()
const rules = {
  username: [
    { required: true, message: "用户名不可为空", trigger: "blur" },
    { min: 5, max: 10, message: "用户名需要5-10位的字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不可为空", trigger: "blur" },
    { pattern: /^\S{6,15}$/, message: "密码为6位非空字符", trigger: "blur" },
  ],
  repassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { pattern: /^\S{6,15}$/, message: "密码为6位非空字符", trigger: "blur" },
    {
      validator: (rules, value, callback) => {
        if (value != data.value.password) {
          callback(new Error("两次输入不同"));
        } else {
          callback();
        }
      },
      trigger:'blur'
    },
  ],
};
watch(isLogin,()=>{
  data.value={
     username: '',
    password: '',
    repassword: ''
  }
})

 const register = async()=>{
    await form.value.validate()
    const res = await userRegisterService(data.value)
 }
 
 const login = async()=>{
     await form.value.validate()
    const res = await useLoginService(data.value)
    alert('登录成功')
    userStore.setToken(res.data.token)
    router.push('/')
 }

</script>

<template>
  <!-- 登录 -->
  <el-row class="login-page">
    <el-col :span="12" class="bj"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form :model="data" :rules="rules" ref="form" v-if="isLogin">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="data.username"
            type="text"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="data.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox v-model="checked" label="记住我" size="small" />
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isLogin = false"
            >注册</el-link
          >
        </el-form-item>
      </el-form>

  <!-- 注册 -->
    <el-form :model="data" :rules="rules" ref="form" v-if="!isLogin">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="data.username"
            type="text"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="data.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="data.repassword"
            type="password"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isLogin = true"
            >返回</el-link
          >
        </el-form-item>
      </el-form>

          </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  .bj {
    background: url("@/assets/logo2.png") no-repeat 50% center/250px auto,
      url("@/assets/login_bg.jpg") no-repeat center/cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-input {
    font-size: 12px;
  }
  .el-link {
    font-size: 12px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .btn {
    width: 100%;
  }
}
</style>
