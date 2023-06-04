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
    dispatch(initializeSession());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login/*" element={<Login />}></Route>
        <Route path="/signup/*" element={<Signup />}></Route>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </>
  );
}
