import { useState, useContext, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Pomodoro from "../views/pomodoro/Pomodoro.tsx";
import Agenda from "./agenda/Agenda.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";

// theme context
type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme | undefined>(undefined);

function App() {
  // theme context states
  const [themeColor, setThemeColor] = useState<Theme>("dark");

  useEffect(() => {
    document.body.className = themeColor;
  }, [themeColor]);

  return (
    <>
      <ThemeContext.Provider value={themeColor}>
        <Navbar setThemeColor={setThemeColor} themeColor={themeColor} />
        <Routes>
          <Route path="/" element={<Pomodoro />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
