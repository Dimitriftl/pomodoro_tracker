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

type Theme = "light" | "dark" | "system";

function App() {
  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");

  useEffect(() => {
    document.body.className = themeColor;
  }, [themeColor]);

  return (
    <>
      <MyProviders themeColor={themeColor} setThemeColor={setThemeColor}>
        <Navbar setThemeColor={setThemeColor} themeColor={themeColor} />
        <Routes>
          <Route path="/" element={<Pomodoro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MyProviders>
    </>
  );
}

export default App;
