import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "../../service/authService";

const initialState = {
  isLoading: false,
  isError: "",
  token: localStorage.getItem("token") || null,
  user: null,
};

const { register, login } = AuthService();

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (user, thungAPI) => {
    try {
      const res = await register(user);
      return res.data;
    } catch (error) {
      console.log(error.response.data.msg);
      return thungAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (user, thungAPI) => {
    try {
      const res = await login(user);
      return res.data;
    } catch (error) {
      console.log(error.response.data.msg);
      return thungAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const { setError, setToken } = authSlice.actions;
export default authSlice.reducer;
