import request from '@/utils/request'
export const geSearchtList=({categoryId,goodsName})=>{
  return request.get('/goods/list',{
    params:{
      sortType:'all',
      sortPrice:0,
      categoryId,
      goodsName,
      page:1
    }
  })
}
