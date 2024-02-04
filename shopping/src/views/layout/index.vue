<template>
  <div>
    <router-view></router-view>
      <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="apps-o">标签</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">个人</van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "LayoutIndex",
 data(){
   return {
     active:0
   }
 }
};
</script>
<style>
</style>