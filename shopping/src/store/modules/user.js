import { setInfo,getInfo } from "@/utils/storage"

export default {
  namespaced:true,
  state: {
    userInfo:getInfo()
  },
  getters: {
  },
  mutations: {
    getUserInfo(state,Info){
      state.userInfo = Info
      setInfo(Info)

    }
  },
  actions: {

  }
}
