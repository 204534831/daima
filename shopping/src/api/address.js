import request from '@/utils/request'

export const addAddress=(name,phone,region)=>{
  return request.post('/address/add',{
    form:{
      name,
      phone,
      region
    }
  })
}
