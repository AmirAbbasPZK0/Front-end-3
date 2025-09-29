import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Conversation {
    answer : string
    citations : {[id : number] : string[]}
    fact_check_data : any
    findora_message : any
    images : any
    module : string
    question : string
    videos : any
}

interface History {
    code : string
    title : string
    conversation : Conversation[]
}

interface initialStateType {
    isLogin : boolean
    data ?: {
        first_name ?: string
        last_name ?: string
        email ?: string
    }
    history ?: History[]
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
        removeHistory : (state , action) => {
            state.history = state.history?.filter(item => item.code !== action.payload)
        },
        editHistory: (state, action) => {
            const index = state.history?.findIndex(item => item.code === action.payload.code);

            if (index !== undefined && index !== -1 && state.history) {
                state.history[index] = {
                    ...state.history[index],
                    title: action.payload.title,
                };
            }
        },
        editUser : (state , action : PayloadAction<{first_name : string , last_name : string , email : string}>) => {
            state.data = action.payload
        }
    }
})

export const {loginHandler , historyHandler , removeHistory , editHistory , editUser} = userSlice.actions
export default userSlice.reducer