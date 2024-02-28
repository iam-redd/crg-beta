import { createSlice } from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: [],
        allProductsId: [],
    },
    reducers: {
        addTooBasket(state, { payload }) {
            if(payload.property){
                const index = state.allProductsId.indexOf(payload.id)
                if(state.basket[index].weight === payload.weight){
                    state.basket[index].amount = state.basket[index].amount + payload.amount
                }else{
                    
                }
            }else{
                state.basket.push(payload)
                state.allProductsId.push(payload.id)
            }
        },
    },
})

export const { addTooBasket } = basketSlice.actions;
export default basketSlice.reducer