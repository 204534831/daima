<template>
  <div class="home">
    <div class="title">
      智慧商城
    </div>
    <van-search @click="$router.push('/search')" shape= round  placeholder="请输入搜索关键词" />
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in list_swipe" :key="item.imgName">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    </div>
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <div class="list">
      <van-grid square column-num = "5" icon-size="40px">
      <van-grid-item 
      v-for="item in list_nav" 
      :key="item.imgUrl"
      :icon="item.imgUrl"
       :text="item.text" />
      </van-grid>
    </div>
    <div class="live">
      <p>————猜你喜欢————</p>
    </div>
    <div>
      <GoodsItem v-for="item in list_goods" :key="item.goods_id" :item = item>

      </GoodsItem>
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/components/GoodsItem.vue'
import {getHomeData}from '@/api/home'
export default {
  data(){
    return{
       list_nav:[],
       list_goods:[],
       list_swipe:[]
    }
  },
  components:{
    GoodsItem
  },
  async created(){
    const res = await getHomeData()
    this.list_swipe = res.data.pageData.items[1].data
    this.list_nav = res.data.pageData.items[4].data
    this.list_goods = res.data.pageData.items[6].data
    console.log(this.list_swipe);
    console.log(this.list_nav);
    console.log(this.list_goods);
  }

}
</script>
<style lang="less" scoped>
.home{
  padding-top: 10px;
  padding-bottom: 100px;
}
.title{
  background:red;
  height: 42px;
  color: aliceblue;
  line-height: 42px;
  text-align: center;
  z-index: 999;
}
.van-swipe,.van-swipe-item,img{
  height: 185px;
  width: 100%;
}
.main,.main img{
  height: 135px;
  width: 100%;
}
.live p{
  text-align: center;
}

</style>
