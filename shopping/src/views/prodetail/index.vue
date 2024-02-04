<template>
  <div class="all">
    <van-nav-bar title="商品详情页" left-arrow />
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in list.goods_images" :key="item.file_id">
          <img :src="item.external_url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="star">
      <div class="title">
        <div class="left">
          <p>
            <span class="new">￥{{ list.goods_price_min }}</span>
            <span class="old">￥{{ list.goods_price_max }}</span>
          </p>
        </div>
        <div class="right">
          <p class="count">已售{{ list.goods_sales }}件</p>
        </div>
      </div>
      <div class="font">
        <p>{{ list.goods_name }}</p>
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="commit">
        <div class="commit-title">
          <div class="left-commit">
            <p>商品评价（{{ commit.total }}条）</p>
          </div>
          <div class="right-commit">
            <span>查看更多</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div
          class="commit-item"
          v-for="item in commit.list"
          :key="item.commit_id"
        >
          <div class="commit-item-top">
            <img :src="item.user.avatar_url" alt="" />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="24"
              :value="5"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="commit-item-body">
            <p>{{ item.content }}</p>
          </div>
          <div class="commit-item-bottem">{{ item.create_time }}</div>
        </div>
      </div>
      <div class="good">商品描述</div>
      <div class="desc" v-html="list.content"></div>
      <div class="footer">
        <div class="icon-home">
          <van-icon name="wap-home-o" size="36px" />
          <span>首页</span>
        </div>
        <div class="icon-cart" @click="$router.push('/cart')">
          <span class="num">{{cartTotal}}</span>
          <van-icon  name="shopping-cart-o" size="36px" />
          <span>购物车</span>
        </div>
        <div class="btn-add" @click="addFn">加入购物车</div>
        <div class="btn-buy" @click="buyFn" >立刻购买</div>
      </div>
    </div>
 <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
  <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="list.goods_image" alt="">
      </div>
      <div class="right">
        <div class="price">
          <span>¥</span>
          <span class="nowprice">{{ list.goods_price_min }}</span>
        </div>
        <div class="count">
          <span>库存</span>
          <span>{{ list.stock_total }}</span>
        </div>
      </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <CountBox v-model="value"></CountBox>
    </div>
    <div class="showbtn" v-if="list.stock_total > 0">
      <div class="btn" v-if="mode === 'cart'" @click="addCart">加入购物车</div>
      <div class="btn now" v-if="mode === 'buyNow'" @click="toOrder">立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>
  
</van-action-sheet>

  </div>
</template>
<script>
import { getDeatil, getDeatilList } from "@/api/prodetail";
import {setCartGoods,getCartGoods} from '@/utils/storage'
import CountBox from '@/components/CountBox.vue';
import {addCartGoods} from '@/api/cart'
export default {
  components:{
    CountBox,
  },
  computed: {
    goodsId() {
      return this.$route.params.id;
    },
  },
  methods: {
    toOrder(){
      return this.$router.push({
        path:'/myorder',
        query:{
          mode:this.mode,
          goodsId:this.goodsId,
          goodsSkuId:this.list.skuList[0].goods_sku_id,
          goodsNum: this.value
        }
      })
    },
    addFn () {
  this.mode = 'cart'
  this.showPannel = true
},
buyFn () {
  this.mode = 'buyNow'
  this.showPannel = true
},

async addCart(){
  const token = this.$store.getters.token
  if(!token){
    this.$dialog.alert({
     title: '提示',
     message: '您还没有登录，是否去登录',
     showCancelButton:'true',
    confirmButtonText:'去登录',
    cancelButtonText:'再逛逛'
})
  .then(() => {
   this.$router.replace({path:'/login',
   query:{
     baseUrl:this.$route.fullPath
   }})
   
  })
  .catch(() => {
    return
    });
  }
  else{
    const res = await addCartGoods(this.goodsId, this.value, this.list.skuList[0].goods_sku_id)
    this.cartTotal = res.data.cartTotal
    setCartGoods(this.cartTotal)
    this.$toast('加入成功')
  }
}
  },

  async created() {
   
    const res = await getDeatil(this.goodsId);
    this.list = res.data.detail;
    const res1 = await getDeatilList({ goodsId: this.goodsId });
    this.commit = res1.data;
    console.log(res);
     console.log(res1);
  },
  data() {
    return {
      list: [],
      commit: [],
      showPannel: false,
      mode:'',
      value:1,
      cartTotal:getCartGoods()
    };
  },
};
</script>
<style lang="less" scoped>
.all {
  .swipe img {
    height: 440px;
    width: 100%;
  }
  .star {
    padding: 5px 10px;
    .title {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .new {
        color: red;
        font-size: 28px;
      }
      .old {
        color: #8a8888;
        text-decoration-line: line-through;
        margin-left: 5px;
      }
      .count {
        color: #8a8888;
        position: relative;
      }
    }
    .font {
      font-size: 18px;
      line-height: 24px;
      margin: 10px 0;
    }
    .service {
      display: flex;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      .left-words {
        span {
          margin-right: 10px;
        }
        .van-icon {
          margin-right: 4px;
          color: #fa2209;
        }
      }
    }
    .commit {
      .commit-title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        .left-commit {
          font-size: 18px;
        }
        .right-commit {
          color: rgb(116, 116, 116);
        }
      }
      .commit-item {
        margin: 0 10px;
        font-size: 16px;
        .commit-item-top {
          display: flex;
          align-items: center;
          img {
            height: 42px;
          }
          .name {
            line-height: 60px;
            margin: 0 10px;
          }
        }
        .commit-item-bottem {
          color: #999;
          margin: 16px 0;
        }
      }
    }
    .good {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      margin-left: 10px;
    }
    .desc {
      width: 100%;
    }
    .footer {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      height: 64px;
      width: 100%;
      background-color: whitesmoke;
      align-items: center;
      .icon-home,
      .icon-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 20px;
        .num{
          background-color: red;
          position: fixed;
          bottom: 48px;
          left: 128px;
          width:18px;
          border-radius: 20px;
          text-align: center;
          color: white;
        }
      }
      .btn-add,
      .btn-buy {
        font-size: 18px;
        background: #ffa900;
        height: 52px;
        margin-left: 10px;
        width: 120px;
        text-align: center;
        line-height: 52px;
        border-radius: 40px;
        color: #fff;
      }
      .btn-buy {
        background-color: #fe5630;
      }
    }
  }
 .product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

}
</style>

