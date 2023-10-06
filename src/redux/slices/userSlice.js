import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../api/AuthApi";

const initialState = {
  userDetails: null,
  isLoading: false,
  error: null,
};

export const logIn = createAsyncThunk("user/logIn", async (data) => {
  const res = await AuthApi.signIn(data);
  const userData = await res.data.data;
  return userData;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
