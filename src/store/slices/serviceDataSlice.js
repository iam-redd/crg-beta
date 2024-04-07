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
                state.selectedProducts = state.allProducts
            }else{
                state.selectedProducts = payload
            }
        },
        cancelSelectedProducts(state) {
            state.selectedProducts = state.allProducts
        }
    },
})

export const { setSearchValue ,setAllProducts ,setSelectedProducts} = serviceData.actions;
export default serviceData.reducer