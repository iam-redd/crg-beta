import { createSlice } from "@reduxjs/toolkit";


const forAdminSlice = createSlice({
    name: 'service',
    initialState: {
        allUsers:[]
    },
    reducers: {
        editAllUsers(state,{payload}){
            state.allUsers = payload
        }
    }
})

export const { editAllUsers } = forAdminSlice.actions;
export default forAdminSlice.reducer