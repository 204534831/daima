import { defineStore } from 'pinia'
import {getuserInfoService} from '@/api/user.js'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const user=ref({})
    const getUser = async()=>{
      const res = await getuserInfoService()
      user.value = res.data.data
    }

    return { token, setToken, user, getUser }
  },
  {
    persist: {
      paths:["token"],
      storage: localStorage,
    } // 持久化
  }
)

