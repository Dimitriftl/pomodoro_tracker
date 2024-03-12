import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Pomodoro from "./views/pomodoro/index/index.tsx";
import Dashboard from "./views/dashboard/index/index.tsx";
import MyProviders from "./context/MyProviders.tsx";
import SignIn from "./views/Connexion/SignIn.tsx";
import SignUp from "./views/Connexion/SignUp.tsx";
import { useLocation } from "react-router-dom";
import Account from "./views/account/Account.tsx";
import Loading from "./views/loading/Loading.tsx";
import Cookies from "js-cookie";
import useVerifyToken from "./hooks/useVerifyToken.ts";
import { MenuSvg } from "./assets/svg/svg.jsx";

// import { IsUserLoggedInTypes } from "./utils/types/globalTypes.ts";

type Theme = "light" | "dark" | "system";

function App() {
  const location = useLocation();
  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");
  const localTheme = localStorage.getItem("theme") as Theme;
  const autoStartPomodoro = localStorage.getItem("autoStartPomodoro");
  const [loading, setLoading] = useState<boolean>(true); // this laoding is used to check if the user is connected on page load
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  const tokenExpired = useVerifyToken(token);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [navbarActive, setNavbarActive] = useState<boolean>(false);

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
      if (token !== undefined && tokenExpired === false) {
        // we stay on current page
        if (
          location.pathname !== "/dashbord" &&
          location.pathname !== "/account" &&
          location.pathname !== "/"
        ) {
          navigate("/");
        }
        setIsUserLoggedIn(true);
        setLoading(false);
      } else {
        setIsUserLoggedIn(false);
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

  // used to update the theme color
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
              <>
                {navbarActive && (
                  <div
                    onClick={() => setNavbarActive(false)}
                    id="overlay"></div>
                )}
                <button
                  id="openNavbarButton"
                  onClick={() => setNavbarActive(true)}>
                  <MenuSvg color={"var(--color-text)"} />
                </button>
                <Navbar
                  navbarActive={navbarActive}
                  setThemeColor={setThemeColor}
                  themeColor={themeColor}
                />
              </>
            )}

          <Routes>
            <Route path="/" element={<Pomodoro />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* path"*" allows to redirect to the home page if the path is unknown */}
            <Route path="*" element={<Pomodoro />} />
          </Routes>
        </MyProviders>
      )}
    </>
  );
}

export default App;
