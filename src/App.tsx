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

type Theme = "light" | "dark" | "system";

function App() {
  const location = useLocation();

  console.log(location.pathname);

  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");
  let localTheme = localStorage.getItem("theme") as Theme;
  let autoStartPomodoro = localStorage.getItem("autoStartPomodoro");
  const [loading, setLoading] = useState<boolean>(true);
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();

  // local storage
  useEffect(() => {
    localTheme !== null && setThemeColor(localTheme);
    autoStartPomodoro === null &&
      localStorage.setItem("autoStartPomodoro", "false");

    setTimeout(() => {
      if (token) {
        setLoading(false);
      } else {
        navigate("/signin");
        setLoading(false);
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
        <MyProviders themeColor={themeColor} setThemeColor={setThemeColor}>
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
