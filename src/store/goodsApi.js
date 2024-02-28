import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
    reducerPath:"goodsApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:4444/"}),
    endpoints:(build)=> ({
        getAllGoods: build.query({
            query:()=> `post/getAll`
        })
    })
})

export const {useGetAllGoodsQuery} = goodsApi;