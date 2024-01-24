import React, { useState } from "react";
import "./signUp.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const passwordRegex = `/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:"<>?/]).{8,}$/`;

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
          <div id="signUpHeader">
            <h2>Inscription</h2>
          </div>
          <form
            onSubmit={(event: React.FormEvent<FormElements>) => {
              event.preventDefault();
              const formElements = event.currentTarget;
              const data = {
                name: formElements.name.value,
                email: formElements.email.value,
                password: formElements.password.value,
                confirmedPassword: formElements.confirmPassword.value,
                role: "user",
              };
              axios
                .post("http://localhost:3000/api/users/signup", data)
                .then((res) => {
                  if (res.data.error) {
                    alert(res.data.error);
                  } else {
                    navigate("/");
                  }
                });
            }}>
            <input
              type="text"
              required
              autoFocus
              placeholder="name"
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
              <p
                style={{ color: "red" }}
                className="passwordVisibility"
                onClick={handlePasswordVisibility}>
                yes
              </p>
            </div>
            <div id="confirmPasswordContainer">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                required
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                placeholder="Confirm password"
                name="confirmPassword"
              />
              <p
                style={{ color: "red" }}
                className="passwordVisibility"
                onClick={handleConfirmPasswordVisibility}>
                yes
              </p>
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
