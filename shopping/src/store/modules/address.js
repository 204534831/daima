import {getaddressList,delAddress,defaultAddress } from '@/api/order'
export default {
  namespaced:true,
  state: {
    addressList: []
  },
  getters: {
    
  },
  mutations: {
     getList(state,newList){
      state.addressList = newList
    },
    getChecked(state,addressId){
     const address = state.addressList.find(item=>item.address_id == addressId)
     address.isChecked = !address.isChecked
    },
  },
  actions: {
    async getListAsy(context){
      const res = await getaddressList()
      res.data.list.forEach(item => {
        item.isChecked = false
    })
      context.commit('getList',res.data.list)
     },

     async delAddress(context,addressId){
      await delAddress(addressId)
      context.dispatch('getListAsy')
    },
    
    async defaultAddress(context,addressId){
      const res = await defaultAddress(addressId)
      console.log(res);
    }
    
  }
}
