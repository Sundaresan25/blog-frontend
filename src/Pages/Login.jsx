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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.login);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setShowpassword] = useState(false);

  const [error, setError] = useState({});
  function submitHandler() {
    if (
      loginDetails.email.length === 0 ||
      !loginDetails.email.match(emailReg)
    ) {
      setError({ email: "Invalid Email" });
    } else if (loginDetails.password.length === 0) {
      setError({ password: "Please Enter password" });
    } else {
      dispatch(login(loginDetails))
        .unwrap()
        .then((res) => {
          setError({});
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="h-100 d-flex justify-content-center  align-items-center ">
        <div className="mx-2">
          <div className="title text-center">
            <h2 className="text-center formhead">
              Welcome to <span className="formspan">website-Learners</span>{" "}
            </h2>
            <p className="text-center formpara">Sing In</p>
          </div>

          <TextField
            margin="normal"
            className="my-3 mt-0"
            fullWidth
            value={loginDetails.email}
            type={"email"}
            InputProps={{
              inputProps: {
                maxLength: 100,
              },
              onInput: (e) => {
                // enforce the maximum length
                e.target.value = e.target.value.slice(0, 100);
              },
            }}
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

          <TextField
            margin="normal"
            className="my-3 mt-0"
            fullWidth
            value={loginDetails.password}
            type={showpassword ? "text" : "password"}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
              onInput: (e) => {
                // enforce the maximum length
                e.target.value = e.target.value.slice(0, 20);
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowpassword(!showpassword)}
                  >
                    {showpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={"Password*"}
            onChange={(e) => {
              setLoginDetails({
                ...loginDetails,
                password: e.target.value,
              });
            }}
            error={error.password ? true : false}
            helperText={error.password}
          />

          <GButton
            label="Next"
            variant="standard"
            buttonClassName="mt-3 mb-2"
            onSubmitHandler={() => {
              submitHandler();
            }}
          />

          <h5 className="text-center mt-2 my-2 formfoot1">
            Don't have user ?{" "}
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
  const common = useSelector((state) => state.common);
  const tokenExpireTime = moment(common.sessionExpireTime, DATE_FORMAT);

  if (common.isLoggedIn && !tokenExpireTime.isBefore(moment())) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="login-section">
        <div className="row w-100 h-100  m-0">
          <div className="col-md-6 mx-auto d-flex align-items-center ">
            <div className="loginForm position-relative h-75 m-auto rounded">
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
