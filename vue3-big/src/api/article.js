import request from '@/utils/request'

export const acticleChannelService = ()=>{
  return request.get('/my/cate/list')
}

export const acticleAddService = (cate_name,cate_alias)=>{
  return request.post('/my/cate/add',{
    cate_name,
    cate_alias
  })
}

export const acticleUpdateService = (id,cate_name,cate_alias)=>{
  return request.put('/my/cate/info',{
    id,
    cate_name,
    cate_alias
  })
}

export const acticleDeleteService = (id)=>{
  return request.delete('/my/cate/del',{
    params:{
      id
    }
  })  
}



export const getList = ({pagenum,pagesize,cate_id,state}) =>{
  return request.get('/my/article/list',{
    params:{
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

export const addArticleService =(obj)=>{
  return request.post('/my/article/add',obj)
} 