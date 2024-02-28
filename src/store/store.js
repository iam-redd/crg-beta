import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";
import basketSlice from './slices/basketSlice'
export const store = configureStore({
    reducer:{
        [goodsApi.reducerPath] : goodsApi.reducer,
        basket:basketSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware)
})