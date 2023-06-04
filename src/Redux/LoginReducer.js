import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../Services/auth";
import errorHandling from "../Services/errorHandling";

// Async thunk for logging in
export const login = createAsyncThunk("login/login", async (value) => {
  try {
    return await authService.login(value);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

// Async thunk for logging out
export const logout = createAsyncThunk("logout", async () => {
  return await authService.logout();
});

// Initial state for the login slice
const initialState = {
  loading: false,
  isTimedOut: false,
  salt: null,
  status: "NOT-VERIFIED",
};

// Create the login slice
export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {}, // No additional reducers defined
  extraReducers(builder) {
    // Reducer for the pending state of the login async thunk
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the login async thunk
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "VERIFIED";
    });

    // Reducer for the rejected state of the login async thunk
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    // Reducer for the rejected state of the logout async thunk
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.status = "NOT-VERIFIED";
    });
  },
});

export default LoginSlice.reducer;
