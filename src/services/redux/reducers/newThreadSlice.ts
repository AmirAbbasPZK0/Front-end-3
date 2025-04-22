import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAllowed : true
}

const newThreadSlice = createSlice({
    name : "new-thread",
    initialState,
    reducers : {

        makeItFalse : (state) => {
            state.isAllowed = false
        },

        makeItTrue : (state) => {
            state.isAllowed = true
        }
    }
})

export const {makeItFalse , makeItTrue} = newThreadSlice.actions
export default newThreadSlice.reducer