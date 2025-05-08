import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateInterface {
    isAllowed : boolean
    history : boolean
}

const initialState = {
    isAllowed : true,
    history : false
}

const newThreadSlice = createSlice({
    name : "new-thread",
    initialState,
    reducers : {

        checkHistory : (state , action : PayloadAction<boolean>) => {
            state.history = action.payload
        },

        makeItFalse : (state) => {
            state.isAllowed = false
        },

        makeItTrue : (state) => {
            state.isAllowed = true
        }
    }
})

export const {makeItFalse , makeItTrue , checkHistory} = newThreadSlice.actions
export default newThreadSlice.reducer