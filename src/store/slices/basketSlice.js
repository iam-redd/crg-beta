import { createSlice } from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: [],
        allProductsId: [],
    },
    reducers: {
        addTooBasket(state, { payload }) {
            state.basket.push(payload)
            state.allProductsId.push(payload.id)
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        getProductsInLocalStorage(state, { payload }) {
            state.allProductsId = payload.allProductsId
            state.basket = payload.basket
        },
        incrementProduct(state, { payload }) {
            console.log(payload)
            state.basket[payload].amount = state.basket[payload].amount + 1
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        decrementProduct(state, { payload }) {
            state.basket[payload].amount = state.basket[payload].amount - 1
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        removeProductFromBasket(state, { payload }) {
            state.basket.splice(payload,1)
            state.allProductsId.splice(payload,1)
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
    },
})

export const { addTooBasket,
    getProductsInLocalStorage,
    incrementProduct,
    decrementProduct,
    removeProductFromBasket} = basketSlice.actions;
export default basketSlice.reducer