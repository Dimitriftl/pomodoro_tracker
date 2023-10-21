import { useState, useContext,useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

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
      <h1>TEST</h1>
      <ThemeContext.Provider value={themeColor}>
        <Navbar setThemeColor={setThemeColor} themeColor={themeColor} />
        {/* <Routes></Routes> */}
      </ThemeContext.Provider>
    </>
  );
}

export default App;
