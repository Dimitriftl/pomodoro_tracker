import React, { useState } from "react";
import "./SignIn.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";

type currentPageType = "signIn" | "SignUp";

const SignIn = () => {
  const [currentPage, setCurrentPage] = useState<currentPageType>("signIn");

  return (
    <div id="signInContainer">
      <div id="signInContent">
        <div id="signInLeftPart">
          <img
            id="rightCornerShape"
            src={rightCornerShape}
            alt="random shape"
          />
          <img id="leftCornerShape" src={leftCornerShape} alt="random shape" />
          <img id="bigCircle" src={bigCircle} alt="circle" />
          <img id="mediumCircle" src={mediumCircle} alt="circle" />
          <img id="tinyCircle" src={tinyCircle} alt="circle" />
          <div id="signInPageText">
            <h1>Hello There !</h1>
            <h2>welcome back to Pomodoro Tracker</h2>
          </div>
        </div>
        <div id="signInRightPart">
          <div id="signInHeader">
            <h2>connection</h2>
          </div>
          <form action="">
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <button type="submit">Sign In</button>
          </form>
          <div id="signInFooter">
            <p>
              Don't have an account yet ?{" "}
              <span onClick={() => setCurrentPage("SignUp")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
