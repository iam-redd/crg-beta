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
            state.basket[state.basket.length - 1].index = state.basket.length - 1
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
            state.allProductsId.splice(payload, 1)
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        cancelBasket(state) {
            state.basket = []
            state.allProductsId = []
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
            window.localStorage.setItem('allProductsId', JSON.stringify(state.allProductsId))
        },
        updateStopList(state, { payload }) {
            state.basket.map((product,index)=> product.stopList = payload[index])
            window.localStorage.setItem('basket', JSON.stringify(state.basket))
        },
    },
})

export const { addTooBasket,
    getProductsFromLocalStorage,
    incrementProduct,
    decrementProduct,
    removeProductFromBasket,
    cancelBasket,
    updateStopList } = basketSlice.actions;
export default basketSlice.reducer