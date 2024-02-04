import request from '@/utils/request'

export const getaddressList=()=>{
  return request.get('/address/list')
}

export const delAddress=(addressId)=>{
  return request.post('/address/remove',{
    addressId
  })
}

export const defaultAddress=(addressId)=>{
  return request.post('/address/setDefault',{
    addressId
  })
}

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...obj
  })
}

