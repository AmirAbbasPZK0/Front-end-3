import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingSlice';
import globalReducer from './reducers/globalSlice';
import fileUploadsSlice from './reducers/fileUploadSlice'
import resourceSlice from "./reducers/resourceSlice"
import urlInputSlice from "./reducers/urlInputSlice"
import userSlice from "./reducers/userSlice"
import newThreadSlice from "./reducers/newThreadSlice"
import commentFileUploaderSlice from "./reducers/commentFileUploaderSlice"
import templateSlice from "./reducers/templateSlice"

const rootReducer = combineReducers({
  loadingReducer,
  globalReducer,
  fileUploadsSlice,
  resourceSlice,
  urlInputSlice,
  userSlice,
  newThreadSlice,
  commentFileUploaderSlice,
  templateSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
