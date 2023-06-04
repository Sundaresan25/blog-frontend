import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { Home } from "./Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSession } from "../Redux/CommonReducer";

export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeSession()); // Dispatching the 'initializeSession' action when the component mounts
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login/*" element={<Login />} />

        {/* Route for the signup page */}
        <Route path="/signup/*" element={<Signup />} />

        {/* Route for the home page */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}
