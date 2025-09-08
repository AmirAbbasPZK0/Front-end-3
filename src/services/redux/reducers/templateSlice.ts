import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    data : any,
    form : any
}

const initialState : InitialState = {
    data : [],
    form : null
}

const templateSlice = createSlice({
    name : "template",
    initialState,
    reducers : {
        updateData : (state , action: PayloadAction<any>) => {
            state.data = action.payload
        },
        addToData : (state , action: PayloadAction<any>) => {
            state.data = [...state.data , action.payload]
            state.data = state.data.sort()
        },
        removeFromCart : (state , action : PayloadAction<any>) => {
            const filteredData = state.data.filter((item : any) => item.name !== action.payload)
            state.data = filteredData
        },
        insertToForm : (state , action) => {
            state.form = action.payload
        }
    }
})


export const {addToData , updateData , removeFromCart , insertToForm} = templateSlice.actions
export default templateSlice.reducer