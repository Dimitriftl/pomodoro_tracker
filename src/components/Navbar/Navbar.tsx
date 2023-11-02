import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// svgs imports
import {
  AccountSvg,
  CalendarSvg,
  DashboardSvg,
  LogOutSvg,
  PtLogo,
  RightArrowSvg,
  TimerSvg,
  Moon,
  Sun,
} from "../../assets/svg/svg";
import userAccountPlaceholder from "../../assets/images/pt_account_logo.png";

import "./Navbar.scss";

type theme = "light" | "dark" | "system";
interface NavbarProps {
  themeColor: theme;
  setThemeColor: Dispatch<SetStateAction<theme>>;
}

const Navbar: React.FC<NavbarProps> = ({ setThemeColor, themeColor }) => {
  // Location
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname
  );
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  // class that depends on theme color
  const navbarClasses: {
    container: string;
    switchThemeContainer: string;
    rightArrowContainer: string;
    accountSquareContainer: string;
    linkContent: string;
    logout: string;
  } = {
    container: "navbarContainer" + " " + themeColor,
    switchThemeContainer: "switchThemeContainer" + " " + themeColor,
    rightArrowContainer: "rightArrowContainer" + " " + themeColor,
    accountSquareContainer: "accountSquareContainer" + " " + themeColor,
    linkContent: "linkContent" + " " + themeColor,
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
          <RightArrowSvg />
        </div>

        <div className="linkContainer">
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
                  ? "selectedPage active"
                  : "selectedPage"
              }></div>
            <div className="svg">
              <AccountSvg />
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
                  ? "selectedPage active"
                  : "selectedPage"
              }></div>
            <div className="svg">
              <DashboardSvg />
            </div>
            <p>Dashboard</p>
          </Link>

          <Link
            className={
              currentLocation === "/calendar"
                ? `${navbarClasses.linkContent} linkContentActive`
                : navbarClasses.linkContent
            }
            to="/calendar">
            <div
              className={
                currentLocation === "/calendar"
                  ? "selectedPage active"
                  : "selectedPage"
              }></div>
            <div className="svg">
              <CalendarSvg />
            </div>
            <p>Calendar</p>
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
                currentLocation === "/" ? "selectedPage active" : "selectedPage"
              }></div>
            <div className="svg">
              <TimerSvg />
            </div>
            <p>Pomodoro</p>
          </Link>

          <div className={navbarClasses.logout}>
            <div className="svg">
              <LogOutSvg />
            </div>
            <p>Disconnect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
