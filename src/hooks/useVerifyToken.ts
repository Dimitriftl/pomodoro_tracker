import React from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useVerifyToken = (token: string) => {
  // if token does not exist
  if (typeof token !== "string" || !token) {
    localStorage.removeItem("userData");
    return true;
  }
  // if token is expired, remove it from cookies and remove local storage
  const decodedToken = jwtDecode(token);
  const isTokenExpired = decodedToken.exp < Date.now() / 1000;
  if (isTokenExpired) {
    Cookies.remove("accessToken");
    localStorage.removeItem("userData");
    return true;
  } else {
    return false; // token is valid
  }
};

export default useVerifyToken;
