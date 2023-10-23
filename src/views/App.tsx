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
import Pomodoro from "../views/pomodoro/Pomodoro.tsx";
import Agenda from "./agenda/Agenda.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";

// theme context
// Types
type Theme = "light" | "dark" | "system";
// context creation
const ThemeContext = createContext<Theme | undefined>(undefined);

// auto start pomodoro context
// Types
type AutoStartPomodoroContextType = {
  autoStartPomodoro: boolean;
  setAutoStartPomodoro: (autoStartPomodoro: boolean) => void;
};
// context creation
const AutoStartPomodoroContext = createContext<
  AutoStartPomodoroContextType | boolean
>(false);

function App() {
  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");
  // auto start pomodoro context states
  const [autoStartPomodoro, setAutoStartPomodoro] =
    useState<AutoStartPomodoroContextType["autoStartPomodoro"]>(false);

  useEffect(() => {
    document.body.className = themeColor;
  }, [themeColor]);

  return (
    <>
      <ThemeContext.Provider value={themeColor}>
        <AutoStartPomodoroContext.Provider
          value={{ autoStartPomodoro, setAutoStartPomodoro }}>
          <Navbar setThemeColor={setThemeColor} themeColor={themeColor} />
          <Routes>
            <Route path="/" element={<Pomodoro />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AutoStartPomodoroContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
export { AutoStartPomodoroContext };
export { ThemeContext };
export default App;
