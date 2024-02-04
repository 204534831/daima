<template>
  <div class="all">
    <van-nav-bar title="收货地址" left-arrow @click-left="$router.go(-1)" />
    <div class="box" v-for="item in addressList" :key="item.address_id">
      <div class="top">
        <span class="name">{{item.name}}</span>
        <span class="phone">{{item.phone}}</span>
      </div>
      <div class="body">
        <span class="one">{{item.region.province}}</span>
        <span>{{item.region.city}}</span>
        <span>{{item.region.region}}</span>
        <span>{{item.detail}}</span>
      </div>
      <hr />
      <div class="footer">
          <van-checkbox
            style="font-size:22px" 
             :value="item.isChecked"
             @click="handel(item.address_id)"
              >默认</van-checkbox>
        <div>
          <span>编辑</span>
          <span @click="del(item.address_id)">删除</span>
        </div>
      </div>
    </div>

    <div class="bottem" @click="$router.push('/add')">
      <div class="btn">
        添加新地址
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
    }
  },

   created(){
    this.$store.dispatch('address/getListAsy')
   },
   computed:{
       ...mapState("address", ["addressList"]),
   },
   methods:{
     handel(addressId){
       this.$store.commit('address/getChecked',addressId)
     },
     del(addressId){
       this.$store.dispatch('address/delAddress',addressId)
     }
   }
}
   
</script>
<style lang="less" scoped>
.all {
  background-color: rgb(240, 240, 240);
   min-height:100vh;
  .box {
    background-color: white;
    margin:20px;
    padding:20px;
    border-radius: 10px;
    span {
      font-size: 20px;
    }
    .top {
      height: 30px;
      line-height: 30px;
      .name {
        padding-right:12px;
      }
    }
    .body {
      margin: 10px 0;
      span {
        margin-right: 5px;
      }
    }
    hr{
      background-color:rgb(219, 219, 219);
      height: 1px;
      border:none;
    }
    .footer{
      display: flex;
      justify-content: space-between;
      height: 60px;
      align-items: center;
      span{
        margin-right: 10px;
      }
    }
  }
  .bottem{
    height: 80px;
    text-align: center;
    position:fixed;
    bottom: 1px;
    width: 100%;
    .btn{
      position:fixed;
      left:10%;
      bottom:15px;
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