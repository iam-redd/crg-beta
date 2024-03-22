import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
    },
    reducers: {
        addData(state, { payload }) {
            const token = payload.token
            state.userInfo = payload 
            window.localStorage.setItem('token',token)
        },
        logout(state) {
            state.userInfo = null
            window.localStorage.removeItem('token')
        },
    },
})

export const { addData , logout} = userSlice.actions;
export default userSlice.reducer