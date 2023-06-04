import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./LoginReducer";
import * as authService from "../Services/auth";
import { AdminServices } from "../Services/Services";
import errorHandling from "../Services/errorHandling";
import { customEncode } from "../Services/helpers";

export const initializeSession = createAsyncThunk(
  "initializeSession",
  async () => {
    return await authService.getUserProfie();
  }
);

export const getBlogs = createAsyncThunk("blogs/get", async () => {
  try {
    return await AdminServices("get", "blogs/get", null, null);
  } catch (err) {
    throw new Error(errorHandling(err));
  }
});

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

export const updateComment = createAsyncThunk(
  "blogs/comments",
  async (value) => {
    try {
      return await AdminServices("post", "blogs/comment", value, null);
    } catch (err) {
      throw new Error(errorHandling(err));
    }
  }
);

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

const initialState = {
  isLoggedIn: false,
  userProfile: null,
  sessionExpireTime: null,
  blogList: [],
  comments: [],
  loading: false,
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    userSelector: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initializeSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload.user;
        state.isLoggedIn = true;
        state.sessionExpireTime = action.payload.session_expire_time;
      }
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload.user;
        state.isLoggedIn = true;
      }
    });

    builder.addCase(blogManager.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(blogManager.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(blogManager.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getBlogs.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogList = action.payload;
      state.loading = false;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateComment.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getComments.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userProfile = null;
    });
  },
});

export const { userSelector } = CommonSlice.actions;

export default CommonSlice.reducer;
