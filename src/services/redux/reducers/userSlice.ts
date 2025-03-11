import { createSlice } from "@reduxjs/toolkit";

interface initialStateType { 
    isLogin : boolean
    data ?: {
        name : string
        email : string
    }
}

const initialState : initialStateType = {
    isLogin : false,
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginHandler : (state , action) => {
            state.isLogin = true,
            state.data = action.payload
        }
    }
})

export const {loginHandler} = userSlice.actions
export default userSlice.reducer