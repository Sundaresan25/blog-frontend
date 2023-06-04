import axios from "../axios-client";
import moment from "moment";
import { customDecode, customEncode } from "./helpers";

const baseUrl = process.env.REACT_APP_BASE_URL;
export const DATE_FORMAT = "YYYY-MM-DD hh:mm:ss A";

// Retrieves the user profile from local storage
export async function getUserProfie() {
  const token = localStorage.getItem("token");
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
  const userProfileStr = customDecode(localStorage.getItem("qcz") || "");

  if (!token || !tokenExpiresAt || !userProfileStr) {
    return null;
  }

  if (moment(tokenExpiresAt, DATE_FORMAT).isBefore(moment())) {
    return null;
  }

  let userProfile;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  try {
    userProfile = JSON.parse(userProfileStr || "");
  } catch (error) {
    return null;
  }
  if (!userProfile) {
    return null;
  }

  return {
    user: userProfile,
    session_expire_time: tokenExpiresAt,
  };
}

// Initializes the user session with the provided token, expiration time, and user profile
export async function initSession({ token, expires_in, user_profile }) {
  const tokenExpiresAt = moment(expires_in).format(DATE_FORMAT);
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiresAt", tokenExpiresAt);
  localStorage.setItem("qcz", customEncode(JSON.stringify(user_profile)));
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Logs in the user by sending a login request and initializing the session
export async function login(values) {
  const { headers, data } = await axios.post(`${baseUrl}/auth/login`, values);
  const accessToken = headers["access_token"];
  const expiresIn = headers["expires_in"];

  if (data && accessToken && expiresIn) {
    initSession({
      user_profile: data,
      token: accessToken,
      expires_in: expiresIn,
    });
  }
  return {
    user: data,
    session_expire_time: moment(expiresIn).format(DATE_FORMAT),
  };
}

// Logs out the user by clearing local storage and removing the Authorization header
export async function logout() {
  // Commented out the code related to logout API endpoint
  // try {
  //   await axios.post(`${baseUrl}/authentication/logout/`);
  // } catch (err) {
  //   // do nothing
  // }
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
}
