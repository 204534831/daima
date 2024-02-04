import request from '@/utils/request'

export const userRegisterService = ({username,password,repassword})=>{
  return request.post('/api/reg',{
    username,
    password,
    repassword
  })
}

export const useLoginService = ({username,password})=>{
  return request.post('/api/login',{
    username,
    password,
  })
}