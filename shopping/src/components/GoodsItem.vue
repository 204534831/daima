<template>
  <div class="all" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="star">{{item.goods_name}}</p>
        <p class="count">已售{{item.goods_sales}}件</p>
        <p>
          <span class="oldprice">￥{{item.goods_price_min}}</span>
          <span class="newprice">￥{{item.line_price_max}}</span>
        </p>
    </div>
  </div>
</template>
<script>

export default {
props:{
  item:{
    type:Object
  }
}
}
</script>

<style lang="less" scoped>
  .all{
    height: 148px;
    display: flex;
    justify-content: space-between;
    .left{
      width: 127px;
      img{
        width: 100%;
      }
    }
    .right{
      display: flex;
      flex:1;
      padding: 10px;
      font-size: 14px;
      flex-direction:column;
      justify-content: space-evenly;
    }
    .count{
      color: #8a8888;
    }
    .oldprice{
      font-size: 24px;
      color: red;
    }
    .newprice{
      text-decoration-line:line-through;
      color: #8a8888;
    }
  }
</style>