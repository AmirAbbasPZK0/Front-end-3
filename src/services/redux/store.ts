import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
// import userReducer from './reducers/userSlice';
import loadingReducer from './reducers/loadingSlice';
import globalReducer from './reducers/globalSlice';
import fileUploadsSlice from './reducers/fileUploadSlice'
import resourceSlice from "./reducers/resourceSlice"
import urlInputSlice from "./reducers/urlInputSlice"
import userSlice from "./reducers/userSlice"
import newThreadSlice from "./reducers/newThreadSlice"

const rootReducer = combineReducers({
  // userReducer,
  loadingReducer,
  globalReducer,
  fileUploadsSlice,
  resourceSlice,
  urlInputSlice,
  userSlice,
  newThreadSlice
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
