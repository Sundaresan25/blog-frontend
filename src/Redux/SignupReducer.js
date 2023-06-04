import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../Services/Services";
import errorHandling from "../Services/errorHandling";

// Async thunk for signing up a user
export const signupUser = createAsyncThunk("singup/user", async (value) => {
  try {
    return await AdminServices("post", "auth/register", value, null);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

// Initial state for the signup slice
const initialState = {
  loading: false,
};

// Create the signup slice
export const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {}, // No additional reducers defined
  extraReducers(builder) {
    // Reducer for the pending state of the signupUser async thunk
    builder.addCase(signupUser.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the signupUser async thunk
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
    });

    // Reducer for the rejected state of the signupUser async thunk
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default SignupSlice.reducer;
