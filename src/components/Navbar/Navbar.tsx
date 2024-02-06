import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
// svgs imports
import {
  AccountSvg,
  DashboardSvg,
  CalendarSvg,
  LogOutSvg,
  PtLogo,
  RightArrowSvg,
  TimerSvg,
  Moon,
  Sun,
} from "../../assets/svg/svg";
import userAccountPlaceholder from "../../assets/images/pt_account_logo.png";

import "./Navbar.scss";
import { IsUserLoggedInContext, TasksContext } from "../../context/MyProviders";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useVerifyToken from "../../hooks/useVerifyToken";

type theme = "light" | "dark" | "system";
interface NavbarProps {
  themeColor: theme;
  setThemeColor: Dispatch<SetStateAction<theme>>;
}

const Navbar: React.FC<NavbarProps> = ({ setThemeColor, themeColor }) => {
  const { tasks } = useContext(TasksContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(
    IsUserLoggedInContext
  );

  console.log(isUserLoggedIn, "isUserLoggedIn");

  // Location
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname
  );
  const token = Cookies.get("accessToken");
  const tokenExpired = useVerifyToken(token);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("theme", themeColor);
  }, [themeColor]);

  // class that depends on theme color
  const navbarClasses: {
    container: string;
    switchThemeContainer: string;
    rightArrowContainer: string;
    linkContent: string;
    pageMarker: string;
    logout: string;
  } = {
    container: "navbarContainer" + " " + "navbarBackground",
    switchThemeContainer: "switchThemeContainer" + " " + themeColor,
    rightArrowContainer: "rightArrowContainer" + " " + "backgroundBlue",
    linkContent: "linkContent",
    pageMarker: "pageMarker" + " " + themeColor,
    logout: "linkContent logout" + " " + themeColor,
  };

  return (
    <div className={navbarClasses.container}>
      <div className="navbarContent">
        {/* <div className="Logo">
          <PtLogo />
        </div> */}
        <div
          className={navbarClasses.switchThemeContainer}
          onClick={() =>
            themeColor === "dark"
              ? setThemeColor("light")
              : setThemeColor("dark")
          }>
          {themeColor === "dark" ? <Moon /> : <Sun />}
        </div>
        <div className={navbarClasses.rightArrowContainer}>
          <RightArrowSvg theme={themeColor} />
        </div>
        <div className="linkContainer">
          {isUserLoggedIn ? (
            <>
              <Link
                className={
                  currentLocation === "/account"
                    ? `${navbarClasses.linkContent} linkContentActive`
                    : navbarClasses.linkContent
                }
                to="/account">
                <div
                  className={
                    currentLocation === "/account"
                      ? "pageMarker active backgroundBlue"
                      : "pageMarker"
                  }></div>
                <div className="svg">
                  <AccountSvg theme={themeColor} />
                </div>
                <p>Account</p>
              </Link>
              <Link
                className={
                  currentLocation === "/dashboard"
                    ? `${navbarClasses.linkContent} linkContentActive`
                    : navbarClasses.linkContent
                }
                to="/dashboard">
                <div
                  className={
                    currentLocation === "/dashboard"
                      ? "pageMarker active"
                      : "pageMarker"
                  }></div>
                <div className="svg">
                  <DashboardSvg theme={themeColor} />
                </div>
                <p>Dashboard</p>
              </Link>
              <Link
                className={
                  currentLocation === "/"
                    ? `${navbarClasses.linkContent} linkContentActive`
                    : navbarClasses.linkContent
                }
                to="/">
                <div
                  className={
                    currentLocation === "/" ? "pageMarker active" : "pageMarker"
                  }></div>
                <div className="svg">
                  <TimerSvg theme={themeColor} />
                </div>
                <p>Pomodoro</p>
              </Link>

              <div
                className={navbarClasses.logout}
                onClick={() => {
                  Cookies.remove("accessToken");
                  window.localStorage.removeItem("userData");
                  setIsUserLoggedIn(false);
                  navigate("/");
                }}>
                <div className="svg">
                  <LogOutSvg theme={themeColor} />
                </div>
                <p>Disconnect</p>
              </div>
            </>
          ) : (
            <>
              <div className="disabledLink">
                <div className="svg">
                  <AccountSvg
                    color="var(--color-placeholder)"
                    theme={themeColor}
                  />
                </div>
                <p>Account</p>
              </div>
              <div className="disabledLink">
                <div className="svg">
                  <DashboardSvg
                    color="var(--color-placeholder)"
                    theme={themeColor}
                  />
                </div>
                <p>Dashboard</p>
              </div>

              <Link
                className={
                  currentLocation === "/"
                    ? `${navbarClasses.linkContent} linkContentActive`
                    : navbarClasses.linkContent
                }
                to="/">
                <div
                  className={
                    currentLocation === "/" ? "pageMarker active" : "pageMarker"
                  }></div>
                <div className="svg">
                  <TimerSvg theme={themeColor} />
                </div>
                <p>Pomodoro</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
