import { useState } from "react";
import TextField from "@mui/material/TextField";

import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

import { emailReg } from "../Services/regrex";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { GButton } from "../Components/Global/GButton";
import { login } from "../Redux/LoginReducer";
import moment from "moment";
import { DATE_FORMAT } from "../Services/auth";
import { Loader } from "../Components/Global/Loader";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginForm = (props) => {
  const navigate = useNavigate(); // Importing useNavigate hook from React Router to handle navigation
  const dispatch = useDispatch(); // Importing useDispatch hook from React Redux to dispatch actions

  const { loading } = useSelector((state) => state.login); // Retrieving the 'loading' state from the 'login' slice of the Redux store

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  }); // Initializing state for login details

  const [showpassword, setShowpassword] = useState(false); // Initializing state for password visibility toggle

  const [error, setError] = useState({}); // Initializing state for form errors

  function submitHandler() {
    // Function to handle form submission
    if (
      loginDetails.email.length === 0 ||
      !loginDetails.email.match(emailReg)
    ) {
      setError({ email: "Invalid Email" });
    } else if (loginDetails.password.length === 0) {
      setError({ password: "Please Enter password" });
    } else {
      dispatch(login(loginDetails)) // Dispatching the 'login' action with login details
        .unwrap()
        .then((res) => {
          setError({}); // Clearing the form errors
          navigate("/"); // Navigating to the home page upon successful login
        })
        .catch((error) => {
          toast.error(error.message); // Displaying an error toast in case of login failure
        });
    }
  }

  return (
    <>
      {loading && <Loader />}{" "}
      {/* Displaying a loader if the 'loading' state is true */}
      <div className="h-100 d-flex justify-content-center  align-items-center ">
        <div className="mx-2">
          <div className="title text-center">
            <h2 className="text-center formhead">
              Welcome to <span className="formspan">website-Learners</span>{" "}
            </h2>
            <p className="text-center formpara">Sing In</p>
          </div>

          {/* Input field for email */}
          <TextField
            margin="normal"
            className="my-3 mt-0"
            fullWidth
            value={loginDetails.email}
            type={"email"}
            label={"Enter Registered Email*"}
            onChange={(e) => {
              setLoginDetails({
                ...loginDetails,
                email: e.target.value,
              });
            }}
            error={error.email ? true : false}
            helperText={error.email}
          />

          {/* Input field for password */}
          <TextField
            margin="normal"
            className="my-3 mt-0"
            fullWidth
            value={loginDetails.password}
            type={showpassword ? "text" : "password"}
            label={"Password*"}
            onChange={(e) => {
              setLoginDetails({
                ...loginDetails,
                password: e.target.value,
              });
            }}
            error={error.password ? true : false}
            helperText={error.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* Password visibility toggle button */}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowpassword(!showpassword)}
                  >
                    {showpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Button to submit the form */}
          <GButton
            label="Next"
            variant="standard"
            buttonClassName="mt-3 mb-2"
            onSubmitHandler={() => {
              submitHandler();
            }}
          />

          <h5 className="text-center mt-2 my-2 formfoot1">
            Don't have user ? {/* Link to the signup page */}
            <Link to="/signup" className="text-decoration-none formfoot2">
              Signup
            </Link>{" "}
          </h5>
        </div>
      </div>
    </>
  );
};

export default function Login() {
  // Retrieve the 'common' state from the Redux store
  const common = useSelector((state) => state.common);

  // Parse the session expiration time using the DATE_FORMAT constant
  const tokenExpireTime = moment(common.sessionExpireTime, DATE_FORMAT);

  // Check if the user is logged in and the token has not expired
  if (common.isLoggedIn && !tokenExpireTime.isBefore(moment())) {
    // Redirect the user to the home page if logged in and token is valid
    return <Navigate to="/" />;
  }

  // Render the login form if the user is not logged in or token has expired
  return (
    <>
      <section className="login-section">
        <div className="row w-100 h-100  m-0">
          <div className="col-md-6 mx-auto d-flex align-items-center ">
            <div className="loginForm position-relative h-75 m-auto rounded">
              {/* Define routes for login related components */}
              <Routes>
                <Route index element={<LoginForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
