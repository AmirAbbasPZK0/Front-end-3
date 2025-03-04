// import endpoints from '@/config/endpoints';
// import restApi from '@/services/restApi';
// import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// interface IUserSlice {
//   data: any;
//   history: any[];
// }

// const initialState: IUserSlice = {
//   data: {
//     id: 0,
//     name: '',
//     lastName: '',
//     phoneNumber: '',
//     role: 'USER',
//     profilePic: { url: ''}
//   },
//   history: []
// };
// export const fetchHistory = createAsyncThunk('history/fetchHistory', async () => {
//   return await restApi(endpoints.history, true, true).get();
// });

// const userSlice = createSlice({
//   name: 'userSlice',
//   initialState,
//   reducers: {
//     user: (state, action: PayloadAction<any>) => {
//       state.data = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHistory.fulfilled, (state, action) => {
//         if (action.payload.code == 200) {
//           state.history = action.payload.data;
//         }
//       });
//   },
// });

// export const {user} = userSlice.actions;

// const userReducer = userSlice.reducer;
// export default userReducer;
