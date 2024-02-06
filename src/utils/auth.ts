import jwtDecode from "jwt-decode";

export const getUserData = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};
