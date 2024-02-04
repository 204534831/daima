import request from '@/utils/request'

export const getuserInfoService = ()=>{
  return request.get('/my/userinfo')
}