import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../Services/auth";

import errorHandling from "../Services/errorHandling";

export const login = createAsyncThunk("login/login", async (value) => {
  try {
    return await authService.login(value);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

export const logout = createAsyncThunk("logout", async () => {
  return await authService.logout();
});

const initialState = {
  loading: false,
  isTimedOut: false,
  salt: null,
  status: "NOT-VERIFIED",
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "VERIFIED";
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.status = "NOT-VERIFIED";
    });
  },
});

export default LoginSlice.reducer;
