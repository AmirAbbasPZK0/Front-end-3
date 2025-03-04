import { createSlice } from "@reduxjs/toolkit";

const initialState : {urlInputs : string[]} = {
    urlInputs : [""]
}

const urlInputSlice = createSlice({
    name : "urlInputs",
    initialState,
    reducers : {
        addUrlToInputArray : (state) => {
            state.urlInputs = [...state.urlInputs , ""]
        },
        editUrl : (state , action) => {
            const newInputs = [...state.urlInputs]
            newInputs[action.payload.index] = action.payload.value
            state.urlInputs = newInputs
        },
        filterTheUrls : (state , action) => {
            const newUrlInputs = state.urlInputs.filter((_, i) => i !== action.payload.index)
            state.urlInputs = newUrlInputs
        },
        removeAllUrls : (state) => {
            state.urlInputs = [""]
        }
    }
})

export const {addUrlToInputArray , editUrl , filterTheUrls , removeAllUrls} = urlInputSlice.actions
export default urlInputSlice.reducer