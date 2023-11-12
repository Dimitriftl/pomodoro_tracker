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
  PtLogo,
  RightArrowSvg,
  TimerSvg,
  Moon,
  Sun,
} from "../../assets/svg/svg";
import userAccountPlaceholder from "../../assets/images/pt_account_logo.png";

import "./Navbar.scss";
import { TasksContext } from "../../context/MyProviders";
import { useTaskCreation } from "../../hooks/useTaskCreation";

type theme = "light" | "dark" | "system";
interface NavbarProps {
  themeColor: theme;
  setThemeColor: Dispatch<SetStateAction<theme>>;
}

const Navbar: React.FC<NavbarProps> = ({ setThemeColor, themeColor }) => {
  const { tasks } = useContext(TasksContext);

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
    linkContent: string;
    logout: string;
  } = {
    container: "navbarContainer" + " " + "navbarBackground",
    switchThemeContainer: "switchThemeContainer" + " " + themeColor,
    rightArrowContainer: "rightArrowContainer" + " " + "backgroundBlue",
    linkContent: "linkContent",
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
                  ? "selectedPage active"
                  : "selectedPage"
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
                currentLocation === "/" ? "selectedPage active" : "selectedPage"
              }></div>
            <div className="svg">
              <TimerSvg theme={themeColor} />
            </div>
            <p>Pomodoro</p>
          </Link>

          <div className={navbarClasses.logout}>
            <div className="svg">
              <LogOutSvg theme={themeColor} />
            </div>
            <p>Disconnect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
