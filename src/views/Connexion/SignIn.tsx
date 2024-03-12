import React, { useContext, useEffect, useState } from "react";
import "./SignIn.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IsUserLoggedInContext } from "../../context/MyProviders";
import Loader from "../../components/loader/Loader";
import { useBackendRoute } from "../../hooks/UseBackendRoute";
import { EyeSvg, EyeOffSvg } from "../../assets/svg/svg";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SignIn = () => {
  const token = Cookies.get("accessToken");
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { apiCall, error, errorMessage } = useBackendRoute();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // if token exists, redirect to home page
  useEffect(() => {
    setTimeout(() => {
      if (token) {
        // push to home page
        navigate("/");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, 500);
  }, [token, isLoading]);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };
    await apiCall("signIn", data, () => {
      setIsUserLoggedIn(true);
      navigate("/");
    });
    setIsLoading(false);
  };

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
            <h2>Connection</h2>
          </div>
          {error && <p id="errorMessage">{errorMessage}</p>}
          <form onSubmit={(event: any) => handleSubmit(event)}>
            <input
              className={error ? "warning" : ""}
              type="text"
              name="email"
              required
              autoFocus
              placeholder="Email"
            />
            <div className="passwordContainer">
              <input
                className={error ? "warning" : ""}
                type={isPasswordVisible ? "text" : "password"}
                required
                name="password"
                placeholder="Password"
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
            <button
              disabled={isLoading}
              type="submit"
              className="backgroundBlue">
              {isLoading ? (
                <Loader
                  color="white"
                  svgWidth="40"
                  svgHeight="40"
                  cx="20"
                  cy="20"
                  r="15"
                  strokeWidth="3"
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div id="signInFooter">
            <p>
              Don't have an account yet ?{" "}
              <span onClick={() => navigate("/signup")}> Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
