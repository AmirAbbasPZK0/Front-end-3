import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


interface IGlobalSlice {
  postCategories: any[];
  colors: any[];
}

const initialState: IGlobalSlice = {
  postCategories: [],
  colors: []
};
export const posts = createAsyncThunk('Posts/fetchPosts', async () => {
  // return await api(urls.posts, {});
});

export const colors = createAsyncThunk('Color/fetchColors', async () => {
  // return await api(urls.colors, {});
});

const GlobalSlice = createSlice({
  name: 'GlobalSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action) => {
      state.postCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(posts.fulfilled, (state, action) => {
      // if (action.payload.code === 200) {
      //   state.postCategories = action.payload.data;
      // }
    }).addCase(colors.fulfilled, (state, action) => {
      // if (action.payload.code === 200) {
      //   state.colors = action.payload.data;
      // }
    });
  },
});

export const {SET_DATA} = GlobalSlice.actions;

const GlobalReducer = GlobalSlice.reducer;
export default GlobalReducer;
