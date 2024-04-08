import { createSlice } from "@reduxjs/toolkit";


const serviceData = createSlice({
    name: 'service',
    initialState: {
        searchValue: null,
        allProducts: null,
        selectedProducts:null
    },
    reducers: {
        setSearchValue(state, { payload }) {
            state.searchValue = payload.trim().toLowerCase()
            state.selectedProducts = state.allProducts.filter((product)=> !product.name.trim().toLowerCase().search(state.searchValue))
        },
        setAllProducts(state, { payload }) {
            state.allProducts = payload
        },
        setSelectedProducts(state, { payload }) {
            if(state.searchValue === ''){
                cancelSelectedProducts()
            }else{
                state.selectedProducts = payload
            }
        },
        cancelSelectedProducts(state,{ payload }) {
            if(payload){
                state.selectedProducts = payload
            }else{
                state.selectedProducts = state.allProducts
            }
        }
    },
})

export const { setSearchValue ,setAllProducts ,setSelectedProducts , cancelSelectedProducts} = serviceData.actions;
export default serviceData.reducer