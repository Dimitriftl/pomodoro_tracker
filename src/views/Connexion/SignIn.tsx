import React, { useContext, useEffect, useState } from "react";
import "./SignIn.scss";
import rightCornerShape from "../../assets/svg/loginPage/loginRightCornerShape.svg";
import leftCornerShape from "../../assets/svg/loginPage/loginLeftCornerShape.svg";
import bigCircle from "../../assets/svg/loginPage/BigCircle.svg";
import mediumCircle from "../../assets/svg/loginPage/mediumCircle.svg";
import tinyCircle from "../../assets/svg/loginPage/timyCircle.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../context/MyProviders";
import Loader from "../../components/loader/Loader";

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
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const handleSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (error) {
      setError(false);
    }
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };
    axios
      .post("http://localhost:3000/api/users/login", data)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data.token);
        console.log(res.data.data.user);
        console.log(res.data.data.user.tasks);

        const token = res.data.data.token;
        Cookies.set("accessToken", token, { expires: 7 });
        let data = {
          user: {
            email: res.data.data.user.email,
            name: res.data.data.user.name,
            id: res.data.data.user.id,
          },
          tasks: res.data.data.user.tasks,
        };
        localStorage.setItem("userData", JSON.stringify(data));
        setIsLoading(false);
      })
      .then(() => {
        navigate("/");
      })
      .catch(function (error) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
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
            <h2>connection</h2>
          </div>
          {error && <p id="errorMessage">{errorMessage}</p>}
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              className={error ? "warning" : ""}
              type="text"
              name="email"
              required
              autoFocus
              placeholder="Email"
              onClick={() => setError(false)}
            />
            <input
              className={error ? "warning" : ""}
              type="password"
              required
              name="password"
              placeholder="Password"
              onClick={() => setError(false)}
            />
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
