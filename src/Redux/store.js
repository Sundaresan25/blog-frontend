import { configureStore } from "@reduxjs/toolkit";
import CommonReducer from "./CommonReducer";
import LoginReducer from "./LoginReducer";
import SignupReducer from "./SignupReducer";

export default configureStore({
  reducer: {
    login: LoginReducer, // Login reducer for managing login-related state
    common: CommonReducer, // Common reducer for managing shared/common state
    signup: SignupReducer, // Signup reducer for managing signup-related state
  },
});
