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
        first_name : string
        last_name : string
        email : string
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
            localStorage.setItem("history" , JSON.parse("history"))
        },
        editHistory : (state , action) => {
            let target = state.history?.find(item => item.code === action.payload.code)
            state.history = state.history?.filter(item => item.code !== action.payload.code)
            if(target){
                target.title = action.payload.title
                state.history = [...(state.history ?? []), target]
            }
        },
        editUser : (state , action : PayloadAction<{first_name : string , last_name : string , email : string}>) => {
            state.data = action.payload
        }
    }
})

export const {loginHandler , historyHandler , removeHistory , editHistory , editUser} = userSlice.actions
export default userSlice.reducer