import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./LoginReducer";
import * as authService from "../Services/auth";
import { AdminServices } from "../Services/Services";
import errorHandling from "../Services/errorHandling";
import { customEncode } from "../Services/helpers";

// Async thunk for initializing the session
export const initializeSession = createAsyncThunk(
  "initializeSession",
  async () => {
    return await authService.getUserProfie();
  }
);

// Async thunk for getting blogs
export const getBlogs = createAsyncThunk("blogs/get", async () => {
  try {
    return await AdminServices("get", "blogs/get", null, null);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

// Async thunk for managing blogs
export const blogManager = createAsyncThunk("blogs/manager", async (value) => {
  try {
    return await AdminServices(
      value?.method,
      "blogs/" + value.url,
      value.data,
      null
    );
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

// Async thunk for getting comments
export const getComments = createAsyncThunk(
  "blogs/getComments",
  async (value) => {
    try {
      return await AdminServices("get", "blogs/comment/" + value, null, null);
    } catch (err) {
      throw new Error(errorHandling(err));
    }
  }
);

// Async thunk for updating comments
export const updateComment = createAsyncThunk(
  "blogs/comments",
  async (value) => {
    try {
      return await AdminServices(
        value?.method,
        "blogs/comment",
        value?.data,
        null
      );
    } catch (err) {
      throw new Error(errorHandling(err));
    }
  }
);

// Async thunk for updating the user profile
export const updateUserProfile = createAsyncThunk(
  "common/updateUser",
  async (value) => {
    try {
      return await AdminServices("put", "user/update/user", value, null);
    } catch (err) {
      throw new Error(errorHandling(err));
    }
  }
);

// Initial state for the common slice
const initialState = {
  isLoggedIn: false,
  userProfile: null,
  sessionExpireTime: null,
  blogList: [],
  comments: [],
  loading: false,
};

// Create the common slice
export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    userSelector: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers(builder) {
    // Reducer for the fulfilled state of the initializeSession async thunk
    builder.addCase(initializeSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload.user;
        state.isLoggedIn = true;
        state.sessionExpireTime = action.payload.session_expire_time;
      }
    });

    // Reducer for the fulfilled state of the login async thunk
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload.user;
        state.isLoggedIn = true;
      }
    });

    // Reducer for the pending state of the blogManager async thunk
    builder.addCase(blogManager.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the blogManager async thunk
    builder.addCase(blogManager.fulfilled, (state, action) => {
      state.loading = false;
    });

    // Reducer for the rejected state of the blogManager async thunk
    builder.addCase(blogManager.rejected, (state, action) => {
      state.loading = false;
    });

    // Reducer for the pending state of the getBlogs async thunk
    builder.addCase(getBlogs.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the getBlogs async thunk
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogList = action.payload;
      state.loading = false;
    });

    // Reducer for the rejected state of the getBlogs async thunk
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
    });

    // Reducer for the pending state of the updateComment async thunk
    builder.addCase(updateComment.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the updateComment async thunk
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
    });

    // Reducer for the rejected state of the updateComment async thunk
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
    });

    // Reducer for the pending state of the getComments async thunk
    builder.addCase(getComments.pending, (state, action) => {
      state.loading = true;
    });

    // Reducer for the fulfilled state of the getComments async thunk
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    // Reducer for the rejected state of the getComments async thunk
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
    });

    // Reducer for the rejected state of the login async thunk
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });

    // Reducer for the fulfilled state of the logout async thunk
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userProfile = null;
    });
  },
});

export const { userSelector } = CommonSlice.actions;

export default CommonSlice.reducer;
