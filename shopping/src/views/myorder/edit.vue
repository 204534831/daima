<template>
  <div class="all">
    <van-nav-bar title="编辑收货地址" left-arrow @click-left="$router.go(-1)" />
    <div class="body">
      <div class="top">
        <p>收货地址</p>
      </div>
      <div class="from">
        <van-form validate-first>
          <van-field
            label="用户名"
            placeholder="请输入收货人姓名"
            :rules="[{ required: true }]"
            v-model="username"
          />
          <van-field
            label="电话"
            placeholder="请输入收货人手机号"
            :rules="[{ validator, message: '请输入正确手机号' }]"
            v-model="phone"
          />
          <van-field
            class="sel"
            readonly
            clickable
            name="area"
            :value="value"
            @click="isShow"
            label="地区选择"
            style="
              ::placeholder {
                color: red;
              }
            "
            placeholder="请选择省/市/区"
          />
          <van-popup  v-model="show" position="bottom">
            <div class="pop">
              内容
            </div>
          </van-popup>
          <van-field
            v-model="address"
            :rules="[{ required: true }]"
            label="详细地址"
            placeholder="街道门牌、楼层等信息"
          />

          <div class="bottem" >
            <div class="btn">保存</div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      value: "",
      show: false,
      username: "",
      phone: "",
      address: "",
      areaList,
    };
  },

  methods: {
    isShow(){
        return this.show = !this.show
    },
    validator(val) {
      return /^1[3-9]\d{1}$/.test(val);
    }
  }
};
</script>
<style lang="less" scoped>
.all {
  background-color: rgb(240, 240, 240);
}
.body {
  margin: 0 20px;
  min-height: 100vh;
  .top {
    height: 60px;
    line-height: 60px;
  }
  .van-field {
    height: 70px;
    font-size: 16px;
    align-items: center;
  }
  .pop{
    height: 300px;
  }
  .sel {
    ::placeholder {
      color: black;
    }
  }
  .bottem {
    height: 80px;
    text-align: center;
    position: fixed;
    bottom: 1px;
    width: 100%;
    .btn {
      position: fixed;
      left: 10%;
      bottom: 15px;
      height: 50px;
      line-height: 50px;
      width: 80%;
      border-radius: 40px;
      text-align: center;
      background: linear-gradient(to right, blue, pink);
      color: white;
    }
  }
}
</style>