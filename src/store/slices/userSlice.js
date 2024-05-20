import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        register: null,
        authConfirm: false,
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
        setRegister(state, { payload }) {
            state.register = payload
        },
        setAuthConfirm(state, { payload }) {
            state.authConfirm = payload
        }
    },
})

export const { addData, logout, setRegister, setAuthConfirm } = userSlice.actions;
export default userSlice.reducer