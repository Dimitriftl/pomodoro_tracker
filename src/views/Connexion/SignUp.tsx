import React, { useState } from "react";
import "./signUp.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";
import { useNavigate } from "react-router-dom";
import { EyeSvg, EyeOffSvg } from "../../assets/svg/svg";
import { useBackendRoute } from "../../hooks/UseBackendRoute";

const SignUp = () => {
  interface FormElements {
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirmPassword: HTMLInputElement;
  }
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

  const { apiCall, error, errorMessage } = useBackendRoute();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<FormElements>) => {
    e.preventDefault();
    const formElements = e.currentTarget;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      confirmedPassword: formElements.confirmPassword.value,
    };
    await apiCall("signUp", data, () => navigate("/signin"));
  };

  const navigate = useNavigate();
  return (
    <div id="signUpContainer">
      <div id="signUpContent">
        <div id="signUpLeftPart">
          <img
            id="rightCornerShape"
            src={rightCornerShape}
            alt="random shape"
          />
          <img id="leftCornerShape" src={leftCornerShape} alt="random shape" />
          <img id="bigCircle" src={bigCircle} alt="circle" />
          <img id="mediumCircle" src={mediumCircle} alt="circle" />
          <img id="tinyCircle" src={tinyCircle} alt="circle" />
          <div id="signUpPageText">
            <h1>Hello There !</h1>
            <h2>welcome to Pomodoro Tracker</h2>
          </div>
        </div>
        <div id="signUpRightPart">
          {error && <p id="errorMessage">{errorMessage}</p>}
          <div id="signUpHeader">
            <h2>Sign up</h2>
          </div>
          <form
            onSubmit={(e: any) => {
              handleSubmit(e);
            }}>
            <input
              type="text"
              required
              autoFocus
              placeholder="Name"
              name="name"
            />
            <input type="text" required placeholder="Email" name="email" />
            <div id="passwordContainer">
              <input
                type={isPasswordVisible ? "text" : "password"}
                required
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder="Password"
                name="password"
              />

              <span
                className="displayPasswordContainer"
                onClick={() => handlePasswordVisibility()}>
                {isPasswordVisible ? (
                  <EyeSvg color="#383838" />
                ) : (
                  <EyeOffSvg color="#383838" />
                )}
              </span>
            </div>
            <div id="confirmPasswordContainer">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                required
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                placeholder="Confirm password"
                name="confirmPassword"
              />
              <span
                className="displayPasswordContainer"
                onClick={() => handleConfirmPasswordVisibility()}>
                {isConfirmPasswordVisible ? (
                  <EyeSvg color="#383838" />
                ) : (
                  <EyeOffSvg color="#383838" />
                )}
              </span>
            </div>
            <button
              type="submit"
              disabled={
                passwordValue === confirmPasswordValue && passwordValue !== ""
                  ? false
                  : true
              }>
              Sign Up
            </button>
          </form>
          <div id="signUpFooter">
            <p>
              Already have an account ?
              <span onClick={() => navigate("/signin")}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
