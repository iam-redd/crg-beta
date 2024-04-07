import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import url from '../default.json'
export const goodsApi = createApi({
    reducerPath:"goodsApi",
    baseQuery:fetchBaseQuery({baseUrl:`${url.backendUrl}/`}),
    endpoints:(build)=> ({
        getAllGoods: build.query({
            query:()=> `post/getAll`
        })
    })
})

export const {useGetAllGoodsQuery} = goodsApi;