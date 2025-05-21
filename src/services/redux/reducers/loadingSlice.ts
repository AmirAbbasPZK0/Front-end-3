import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingSlice {
  loading: boolean;
}

const initialState: LoadingSlice = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    SET_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {SET_LOADING} = loadingSlice.actions;

const userReducer = loadingSlice.reducer;
export default userReducer;
