import {
  useState,
  useContext,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Pomodoro from "./views/pomodoro/index/index.tsx";
import Dashboard from "./views/dashboard/index/index.tsx";
import MyProviders from "./context/MyProviders.tsx";
import Calendar from "./calendar/index/index.tsx";
import SignIn from "./views/connexion/SignIn.tsx";
import SignUp from "./views/connexion/SignUp.tsx";
import { useLocation } from "react-router-dom";
import Account from "./views/account/Account.tsx";
import Loading from "./views/loading/Loading.tsx";
import Cookies from "js-cookie";
import { getUserData } from "./utils/auth.ts";
import useVerifyToken from "./hooks/useVerifyToken.ts";
// import { IsUserLoggedInTypes } from "./utils/types/globalTypes.ts";

type Theme = "light" | "dark" | "system";

function App() {
  const location = useLocation();
  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");
  let localTheme = localStorage.getItem("theme") as Theme;
  let autoStartPomodoro = localStorage.getItem("autoStartPomodoro");
  const [loading, setLoading] = useState<boolean>(true); // this laoding is used to check if the user is connected on page load
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  const tokenExpired = useVerifyToken(token);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  // local storage
  useEffect(() => {
    if (localTheme !== null) {
      setThemeColor(localTheme);
    }
    if (autoStartPomodoro === null) {
      localStorage.setItem("autoStartPomodoro", "false");
    }
    // if user is not connected, redirect to signin page
    setTimeout(() => {
      console.log(tokenExpired, "tokenExpired");

      if (token !== undefined && tokenExpired === false) {
        // we stay on current page
        setLoading(false);
      } else {
        setLoading(false);
        if (
          location.pathname !== "/signin" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/"
        ) {
          navigate("/");
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    document.body.className = themeColor;
  }, [themeColor]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MyProviders
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}>
          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" && (
              <Navbar setThemeColor={setThemeColor} themeColor={themeColor} />
            )}

          <Routes>
            <Route path="/" element={<Pomodoro />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MyProviders>
      )}
    </>
  );
}

export default App;
