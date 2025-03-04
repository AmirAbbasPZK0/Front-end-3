import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedResource : "web",
    isNew : true
}


const resourceSlice = createSlice({
    name : "resource",
    initialState : initialState,
    reducers : {
        addResource : (state , action) => {
            state.selectedResource = action.payload
            // localStorage.setItem('resources' , action.payload)
        },
        removeRecency : (state) => {
            state.isNew = false
        },
        addRecency : (state) => {
            state.isNew = true
        }
    }
})


export const {addResource , removeRecency , addRecency} = resourceSlice.actions
export default resourceSlice.reducer