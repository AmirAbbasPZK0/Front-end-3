import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateInterface {
    isAllowed : boolean
    history : boolean
    counter : number
}

const initialState = {
    isAllowed : true,
    history : false,
    counter : 0
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
        },

        increaseCounter : (state) => {
            state.counter += 1
        },

        setCounterToZero : (state , action : PayloadAction<number>) => {
            state.counter = action.payload
        }
        
    }
})

export const {makeItFalse , makeItTrue , checkHistory , increaseCounter , setCounterToZero} = newThreadSlice.actions
export default newThreadSlice.reducer