import request from "@/utils/request";

export const getDeatil = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getDeatilList = ({ goodsId }) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: 2
    }
  })
}