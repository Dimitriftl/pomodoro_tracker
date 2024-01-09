import React from "react";
import "./signUp.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
          <form action="">
            <input type="text" autoFocus placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button type="submit">Sign Up</button>
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
