import { getCartList, changeCount,deleteCart } from '@/api/cart'
export default {
  namespaced: true,
  state: {
    cartList: []
  },
  getters: {
    cartTotal(state) {
      return state.cartList.reduce((prev, item) => prev + item.goods_num, 0)
    },
    selCartList(state) {
      return state.cartList.filter(item => {
        return item.isChecked == true
      })
    },
    selCount(state, getters) {
      return getters.selCartList.reduce((prev, item) => prev + item.goods_num, 0)
    },
    selPrice(state, getters) {
      return getters.selCartList.reduce((prev, item) => {
        return prev + item.goods_num * item.goods.goods_price_min
      }, 0)
    },
    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked)
    },
  },
  mutations: {
    setCartList(state, newList) {
      state.cartList = newList
    },

    isOneChecked(state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id == goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck(state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getcartList(context) {
      const res = await getCartList()
      console.log(res.data.list);
      res.data.list.forEach(item => {
        item.isChecked = true
      });
      context.commit('setCartList', res.data.list)
    },
  async changeCountAction (context, obj) {
        const { goodsId, value, skuId } = obj
        context.commit('changeCount', {
          goodsId,
          value
        })
        await changeCount(goodsId, value, skuId)
    },
  
    async delSelect(context){
      const delCartList = context.getters.selCartList
      const cartIds = delCartList.map(item=>item.id)
      const res = await deleteCart(cartIds)
      context.dispatch('getcartList')
    }
  
  }


}