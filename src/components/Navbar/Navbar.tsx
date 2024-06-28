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
  LogOutSvg,
  TimerSvg,
  Moon,
  Sun,
} from "../../assets/svg/svg";

import "./Navbar.scss";
import { IsUserLoggedInContext, TimerContext } from "../../context/MyProviders";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Theme, TimerContextType } from "../../utils/types/contextsTypes";
interface NavbarProps {
  themeColor: Theme;
  setThemeColor: Dispatch<SetStateAction<Theme>>;
  navbarActive: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  setThemeColor,
  themeColor,
  navbarActive,
}) => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(
    IsUserLoggedInContext
  );

  // Location
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname
  );

  const { isTimerRunning } = useContext<TimerContextType | undefined>(
    TimerContext
  );

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("theme", themeColor);
  }, [themeColor]);

  return (
    <nav
      className={
        navbarActive
          ? "navbarContainer navbarContainerActive"
          : "navbarContainer"
      }>
      <div className="navbarContent">
        {/* <div className="Logo">
          <PtLogo />
        </div> */}
        <div
          className="switchThemeContainer"
          onClick={() =>
            themeColor === "dark"
              ? setThemeColor("light")
              : setThemeColor("dark")
          }>
          {themeColor === "dark" ? <Moon /> : <Sun />}
        </div>
        <div className="linkContainer">
          {isUserLoggedIn && !isTimerRunning ? (
            <>
              <Link
                className={
                  currentLocation === "/account"
                    ? `linkContent linkContentActive`
                    : "linkContent"
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
                    ? `linkContent linkContentActive`
                    : "linkContent"
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
                    ? `linkContent linkContentActive`
                    : "linkContent"
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
                    ? `linkContent linkContentActive`
                    : "linkContent"
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
      {isUserLoggedIn && (
        <div
          className="logoutContainer"
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
      )}
    </nav>
  );
};

export default Navbar;
