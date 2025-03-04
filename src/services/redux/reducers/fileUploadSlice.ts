import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileType {
    url : string
    name : string
}

interface FileUploadSliceType {
    uploadedFilesUrl : FileType[]
    urlsOfFiles : string[]
}

const initialState : FileUploadSliceType = {
    uploadedFilesUrl : [],
    urlsOfFiles : []
}

const fileUploadsSlice = createSlice({
    name : "fileUpload",
    initialState,
    reducers : {
        addUrl : (state : FileUploadSliceType , action : PayloadAction<FileType>) => {
            state.uploadedFilesUrl = [...state.uploadedFilesUrl , {name : action.payload.name , url : action.payload.url}]
            state.urlsOfFiles = [...state.urlsOfFiles , action.payload.url]
        },
        removeFile : (state : FileUploadSliceType , action : PayloadAction<FileType>) => {
            state.uploadedFilesUrl = state.uploadedFilesUrl.filter(item => item.name !== action.payload.name)
            state.urlsOfFiles = state.urlsOfFiles.filter(item => item !== action.payload.url)
        },
        removeAllFiles : (state : FileUploadSliceType) => {
            state.uploadedFilesUrl = []
            state.urlsOfFiles = []
        }
    }
})

export const {addUrl , removeFile , removeAllFiles} = fileUploadsSlice.actions
export default fileUploadsSlice.reducer