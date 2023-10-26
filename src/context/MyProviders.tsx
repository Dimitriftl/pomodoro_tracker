import { useState, createContext, Dispatch, SetStateAction } from "react";

type MyProvidersProps = {
  children: React.ReactNode;
  themeColor: Theme;
  setThemeColor?: Dispatch<SetStateAction<Theme>>;
};

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

const MyProviders: React.FC<MyProvidersProps> = ({ children, themeColor }) => {
  // auto start pomodoro context states
  const [autoStartPomodoro, setAutoStartPomodoro] =
    useState<AutoStartPomodoroContextType["autoStartPomodoro"]>(false);

  return (
    <ThemeContext.Provider value={themeColor}>
      <AutoStartPomodoroContext.Provider
        value={{
          autoStartPomodoro,
          setAutoStartPomodoro,
        }}>
        {children}
      </AutoStartPomodoroContext.Provider>
    </ThemeContext.Provider>
  );
};

export default MyProviders;
export { AutoStartPomodoroContext };
export { ThemeContext };
