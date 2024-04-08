import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from './goodsApi';
import basketSlice from './slices/basketSlice'
import userSlice from './slices/userSlice'
import serviceDataSlice from "./slices/serviceDataSlice";
import forAdmin from "./slices/forAdmin";

export const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]:goodsApi.reducer,
        basket: basketSlice,
        user:userSlice,
        service:serviceDataSlice,
        forAdmin:forAdmin
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(goodsApi.middleware)
})