import { configureStore } from "@reduxjs/toolkit";
import CommonReducer from "./CommonReducer";
import LoginReducer from "./LoginReducer";
import SignupReducer from "./SignupReducer";

export default configureStore({
  reducer: {
    login: LoginReducer,
    common: CommonReducer,
    signup: SignupReducer,
  },
});
