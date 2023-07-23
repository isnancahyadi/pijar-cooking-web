import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_GET_USER);
    return data?.payload[0];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload;
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.auth = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "error";
    });
  },
});

export const { addAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
