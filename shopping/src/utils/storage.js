//登录本地存储
export const setInfo=(obj)=>{
  localStorage.setItem('User_Info',JSON.stringify(obj))
}

export const getInfo=()=>{
  const result = localStorage.getItem('User_Info')
  return result ? JSON.parse(result) : {token:'',userId:''}
}

export const removeInfo=()=>{
  localStorage.removeItem('User_Info')
}


//搜索本地存储
export const setSearch = (obj)=>{
  localStorage.setItem('Search_Info',JSON.stringify(obj))
}
export const getSearch = ()=>{
  const search_data = localStorage.getItem('Search_Info')
  return search_data ? JSON.parse(search_data):[]
}
export const removeSearch=()=>{
  localStorage.removeItem('Search_Info')
}

//购物车数量
export const setCartGoods=(obj)=>{
  localStorage.setItem('Cart_Goods',JSON.stringify(obj))
}

export const getCartGoods = ()=>{
  const cart_num = localStorage.getItem('Cart_Goods')
  return cart_num ? JSON.parse(cart_num):0
}