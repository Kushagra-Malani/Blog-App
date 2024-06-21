import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false, // status = false means user is not authenticated
    userData: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.status = false
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer