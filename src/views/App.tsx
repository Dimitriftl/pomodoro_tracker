import {
  useState,
  useContext,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Pomodoro from "./pomodoro/index/index.tsx";
import Dashboard from "./dashboard/index/index.tsx";
import MyProviders from "../context/MyProviders.tsx";
import Calendar from "./calendar/index/index.tsx";
import SignIn from "./connexion/SignIn.tsx";
import SignUp from "./connexion/SignUp.tsx";
import { useLocation } from "react-router-dom";
import Account from "./account/Account.tsx";

type Theme = "light" | "dark" | "system";

function App() {
  const location = useLocation();

  console.log(location.pathname);

  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");
  let localTheme = localStorage.getItem("theme") as Theme;
  let autoStartPomodoro = localStorage.getItem("autoStartPomodoro");

  // local storage
  useEffect(() => {
    localTheme !== null && setThemeColor(localTheme);
    autoStartPomodoro === null &&
      localStorage.setItem("autoStartPomodoro", "false");
  }, []);

  useEffect(() => {
    document.body.className = themeColor;
  }, [themeColor]);

  return (
    <>
      <MyProviders themeColor={themeColor} setThemeColor={setThemeColor}>
        {location.pathname !== "/signin" && location.pathname !== "/signup" && (
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
    </>
  );
}

export default App;
