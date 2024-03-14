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
        getProductsFromLocalStorage(state, { payload }) {
            state.basket = payload.basket
            state.allProductsId = payload.allProductsId
        },
        incrementProduct(state, { payload }) {
            state.basket[payload].amount++
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        decrementProduct(state, { payload }) {
            state.basket[payload].amount--
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        removeProductFromBasket(state, { payload }) {
            state.basket.splice(payload, 1)
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        cancelBasket(state) {
            state.basket = []
            state.allProductsId = []
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        }
    },
})

export const { addTooBasket,
    getProductsFromLocalStorage,
    incrementProduct,
    decrementProduct,
    removeProductFromBasket,
    cancelBasket } = basketSlice.actions;
export default basketSlice.reducer