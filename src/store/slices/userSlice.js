import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
    },
    reducers: {
        addData(state, { payload }) {
            console.log(payload)
            const token = payload.token
            state.userInfo = payload
            token && window.localStorage.setItem('token',token)
        },
        logout(state) {
            state.userInfo = null
            window.localStorage.removeItem('token')
        },
    },
})

export const { addData , logout} = userSlice.actions;
export default userSlice.reducer