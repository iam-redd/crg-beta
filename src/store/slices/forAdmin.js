import { createSlice } from "@reduxjs/toolkit";


const forAdminSlice = createSlice({
    name: 'service',
    initialState: {
        allUsers: [],
        selectedValue: null,
        selectedUsers: null,
        currentUser:null
    },
    reducers: {
        editAllUsers(state, { payload }) {
            state.allUsers = payload
            if (state.selectedValue === null) {
                state.selectedUsers = state.allUsers
            }
        },
        setSelectedValue(state, { payload }) {

        },
        setSelectedUsers(state, { payload }) {
            state.selectedUsers = payload
        },
        cancelSelectedUsers(state, { payload }) {

        },
        setCurrentUser(state, { payload }) {
            state.currentUser = payload
        },

    }
})

export const {
    editAllUsers,
    setSelectedValue,
    setSelectedUsers,
    cancelSelectedUsers,
    setCurrentUser
} = forAdminSlice.actions;
export default forAdminSlice.reducer