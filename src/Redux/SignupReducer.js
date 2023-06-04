import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../Services/Services";
import errorHandling from "../Services/errorHandling";

export const signupUser = createAsyncThunk("singup/user", async (value) => {
  try {
    return await AdminServices("post", "auth/register", value, null);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

const initialState = {
  loading: false,
};

export const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signupUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default SignupSlice.reducer;
