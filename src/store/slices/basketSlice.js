import {createSlice} from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        basket:[],
    },
    reducers:{
        addToBasket(state,{payload}){
            console.log(payload)
            return
        },
        removeFromToBasket(state,{payload}){

        },
    }
})

export const {addToBasket,removeFromToBasket} = basketSlice.actions;

export default basketSlice.reducer;