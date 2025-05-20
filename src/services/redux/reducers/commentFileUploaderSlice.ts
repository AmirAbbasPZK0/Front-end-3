import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileType {
    url : string
    name : string
}

interface CommentFileUploaderSlice {
    uploadedFiles : FileType[]
    fileUrls : string[]
}

const initialState : CommentFileUploaderSlice = {
    uploadedFiles : [],
    fileUrls : []
}

const commentFileUploaderSlice = createSlice({
    name : "comment_file_uploader",
    initialState,
    reducers : {
        addUrl : (state : CommentFileUploaderSlice , action : PayloadAction<FileType>) => {
            state.uploadedFiles = [...state.uploadedFiles , {name : action.payload.name , url : action.payload.url}]
            state.fileUrls = [...state.fileUrls , action.payload.url]
        },
        removeFile : (state : CommentFileUploaderSlice , action : PayloadAction<FileType>) => {
            state.uploadedFiles = state.uploadedFiles.filter(item => item.name !== action.payload.name)
            state.fileUrls = state.fileUrls.filter(item => item !== action.payload.url)
        },
        removeAllFiles : (state : CommentFileUploaderSlice) => {
            state.uploadedFiles = []
            state.fileUrls = []
        }
    }
})

export const {addUrl , removeFile , removeAllFiles} = commentFileUploaderSlice.actions
export default commentFileUploaderSlice.reducer