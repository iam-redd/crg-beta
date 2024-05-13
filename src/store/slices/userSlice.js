import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
    },
    reducers: {
        addData(state, { payload }) {
            state.userInfo = payload
        },
        logout(state) {
            state.userInfo = null
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('data')
        },
    },
})

export const { addData , logout} = userSlice.actions;
export default userSlice.reducer