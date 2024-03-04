import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from './goodsApi';
import basketSlice from './slices/basketSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]:goodsApi.reducer,
        basket: basketSlice,
        user:userSlice
        // [tmdbApi.reducerPath]:tmdbApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(goodsApi.middleware)
})