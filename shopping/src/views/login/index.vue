<template>
  <div>
    <van-nav-bar title="会员登陆" left-arrow />
    <div class="all">
      <div class="header">
        <h3>手机号登录</h3>
        <p>未注册的手机号登陆后自动注册</p>
      </div>
      <div class="from">
        <div class="form-item">
          <input
            class="inp"
            v-model="mobile"
            placeholder="请输入手机号"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            v-model="picCode"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" @click="getPicCode" :src="picUrl" alt="" />
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text" />
          <button class="btn" @click="getCode">
            {{ newtime === alltime ? "获取验证码" : `${newtime}秒后重新获取` }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="goLogin">登录</div>
    </div>
  </div>
</template>
<script>
import { getPicCode,getMsgCode,goLogin } from "@/api/login";
import{Toast}from 'vant'
import { mapMutations} from 'vuex';
export default {
  name: "LoginIndex",
  data() {
    return {
      picCode: "",
      mobile: "",
      picKey: "",
      picUrl: "",
      alltime: 3,
      newtime: 3,
      i: "",
      msgCode:''
    };
  },
  async created() {
    this.getPicCode();
  },
  methods: {

    async getPicCode() {
      const res = await getPicCode();
      this.picUrl = res.data.base64;
      this.picKey = res.data.key;
    },

    validFn() {
      if (!/^1[3-9]\d{1}$/.test(this.mobile)) {
        Toast('请输入正确手机号')
        return false;
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('请输入正确验证码')
        return false;
      }
      return true;
    },


    async getCode() {
      if (this.validFn()) {
        const res = await getMsgCode(this.picCode,this.picKey,this.mobile)
        console.log(res);
        if (!this.i && this.alltime === this.newtime) {
          this.i = setInterval(() => {
            this.newtime--;
            if (this.newtime < 1) {
              clearInterval(this.i);
              this.i = null;
              this.newtime = this.alltime;
            }
          }, 1000);
        }
      }
    },

      ...mapMutations('user',['getUserInfo']),
    async goLogin(){
      if(!/^\d{6}$/.test(this.msgCode))
      {
        Toast('请输入正确短信验证码')
      }
     const res = await goLogin(this.mobile,this.msgCode)
     this.getUserInfo(res.data)
     console.log(res);
      Toast('登陆成功')
      const url = this.$route.query.baseUrl || '/'
      this.$router.replace(url)
    },

    destroyed() {
      clearInterval(this.timer);
    },
  },
};
</script>
<style lang="less" scoped>
.all {
  padding: 20px;
  .header {
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      color: rgb(133, 139, 139);
    }
  }
  .from {
    .form-item {
      line-height: 42px;
      display: flex;
      justify-content: space-between;
      margin-top: 42px;
      border-bottom: 1px rgb(223, 220, 220) solid;
      .inp {
        display: block;
        border: none;
        height: 32px;
        font-size: 16px;
        flex: 1;
      }
      img {
        width: 94px;
        height: 31px;
      }
      .btn {
        border: none;
        background-color: transparent;
        color: rgba(192, 190, 77, 0.877);
        font-size: 14px;
      }
    }
  }
  .login-btn {
    height: 50px;
    display: block;
    line-height: 50px;
    text-align: center;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    margin: 0 auto;
    color: white;
    border-radius: 50px;
    margin-top: 34px;
  }
}
</style>

