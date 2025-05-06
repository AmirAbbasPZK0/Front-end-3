import { createSlice } from "@reduxjs/toolkit";

interface initialStateType { 
    isLogin : boolean
    data ?: {
        first_name : string
        last_name : string
        email : string
    }
    history ?: any
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
        },
        historyHandler : (state , action) => {
            state.history = action.payload
        },
        addHistory : (state , action) => {
            let target_history = action.payload
            
        }
    }
})

export const {loginHandler , historyHandler} = userSlice.actions
export default userSlice.reducer