import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import List from "@mui/material/List";

import { useForm } from "react-hook-form";

import { emailReg } from "../Services/regrex";

import { toast } from "react-hot-toast";
import { GButton } from "../Components/Global/GButton";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Redux/SignupReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Loader } from "../Components/Global/Loader";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.signup);
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    user_name: "",

    user_password: "",

    new_password: "",
    confirm_password: "",
  });

  const [showNewpassword, setShowNewpassword] = useState(false);
  const [showConfirmpassword, setShowConfirmpassword] = useState(false);
  const [error, setError] = useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignupDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function signupHandler() {
    if (signupDetails.new_password !== signupDetails.confirm_password) {
      setError({
        confirm_password: "Confirm Password and Password Doesn,t match",
        new_password: "Confirm Password and Password Doesn,t match",
      });
    } else {
      let data = {
        email: signupDetails.email,
        name: signupDetails.user_name,

        password: signupDetails.confirm_password,
      };
      dispatch(signupUser(data))
        .unwrap()
        .then((res) => {
          setError({});
          navigate("/login");
          setSignupDetails({});
          toast.success("Successfully registered");
        })
        .catch((error) => {
          let err = JSON.parse(error.message);
          setError(err);
        });
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="">
        <form onSubmit={handleSubmit(signupHandler)} className="">
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              margin: "10px auto",
              // scrollbarWidth:"thin",
              maxHeight: 400,
              "& ul": { padding: 0 },
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "3px",
              },
            }}
          >
            <div className="mx-2">
              <h6 className="mb-0" style={{ color: "black" }}>
                Enter email
              </h6>
              <TextField
                margin="normal"
                className="mb-2 mt-0"
                fullWidth
                label={true}
                value={signupDetails.email}
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
                {...register("email", {
                  onChange: (e) => {
                    onChangeHandler(e);
                  },
                  required: "Email is required.",
                  pattern: {
                    value: emailReg,
                    message: "Invalid Email",
                  },
                })}
                error={error.email || errors?.email ? true : false}
                helperText={
                  error.email ? error.email : errors.email?.message?.toString()
                }
              />
              <h6 className="mb-0" style={{ color: "black" }}>
                Name
              </h6>
              <TextField
                label={false}
                className="mb-4 mt-0 "
                fullWidth
                placeholder="Enter Name*"
                value={signupDetails.user_name}
                {...register("user_name", {
                  onChange: (e) => {
                    onChangeHandler(e);
                  },
                  required: "Name is required.",
                })}
                error={
                  error.user_name || errors.user_name?.message ? true : false
                }
                helperText={
                  error.user_name
                    ? error.user_name
                    : errors.user_name?.message?.toString()
                }
              />

              <div className="row m-0">
                <div className="col-md-6 p-0 pr-md-1">
                  <h6 className="mb-0" style={{ color: "black" }}>
                    Password
                  </h6>
                  <TextField
                    id={"new_password"}
                    fullWidth
                    className="my-2"
                    label={false}
                    value={signupDetails.new_password}
                    type={showNewpassword ? "text" : "password"}
                    {...register(
                      "new_password",

                      {
                        onChange: (e) => {
                          onChangeHandler(e);
                        },
                        required: "New Password is Required",
                        minLength: {
                          value: 6,
                          message: "Atleast type more than 6 letters",
                        },
                      }
                    )}
                    inputProps={{
                      maxLength: 20,
                    }}
                    error={
                      error.new_password
                        ? error.new_password
                        : errors.new_password?.message
                    }
                    helperText={
                      error.new_password
                        ? error.new_password
                        : errors.new_password?.message
                    }
                    placeholder="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewpassword(!showNewpassword)}
                          >
                            {showNewpassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-md-6 p-0 pl-md-1">
                  <h6 className="mb-0" style={{ color: "black" }}>
                    Confirm Password
                  </h6>
                  <TextField
                    id={"confirm_password"}
                    fullWidth
                    className="my-2"
                    label={false}
                    value={signupDetails.confirm_password}
                    type={showConfirmpassword ? "text" : "password"}
                    {...register(
                      "confirm_password",

                      {
                        onChange: (e) => {
                          onChangeHandler(e);
                        },
                        required: "New Password is Required",
                        minLength: {
                          value: 6,
                          message: "Atleast type more than 6 letters",
                        },
                      }
                    )}
                    inputProps={{
                      maxLength: 20,
                    }}
                    error={
                      error.confirm_password
                        ? error.confirm_password
                        : errors.confirm_password?.message
                    }
                    helperText={
                      error.confirm_password
                        ? error.confirm_password
                        : errors.confirm_password?.message
                    }
                    placeholder="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setShowConfirmpassword(!showConfirmpassword);
                            }}
                          >
                            {showConfirmpassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </List>
          <GButton label="Register" type="submit" variant="standard" />
        </form>
      </div>
    </>
  );
};

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <section className="login-section">
        <div className="row w-100 h-100 m-0">
          <div className="col-md-6 mx-auto d-flex align-items-center ">
            <div className="loginForm  position-relative h-75 m-auto rounded">
              <div className="text-center"> </div>

              <h4
                className="text-center text-md-left"
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#7F265B",
                }}
              >
                "Welcome to Website-Learners"
              </h4>
              <p
                className="text-center text-md-left"
                style={{ color: "#52575e" }}
              >
                "Post your thoughts"
              </p>

              <Routes>
                <Route path={`/`} element={<SignupForm />} />
              </Routes>

              <h5 style={{ fontWeight: "700" }} className="text-center my-3">
                Already a user ?{" "}
                <Link
                  to="/login"
                  className="text-decoration-none"
                  style={{ color: "#7F265B", cursor: "pointer" }}
                >
                  Login
                </Link>{" "}
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
