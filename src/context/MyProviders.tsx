import { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";

// theme types
type Theme = "light" | "dark" | "system";

type MyProvidersProps = {
  children: React.ReactNode;
  themeColor: Theme;
  setThemeColor?: Dispatch<SetStateAction<Theme>>;
};

// theme context -------------------------------------

// context creation
const ThemeContext = createContext<Theme | undefined>("dark");

// auto start pomodoro context -------------------------------------
// Types
type AutoStartPomodoroContextType = {
  autoStartPomodoro: boolean;
  setAutoStartPomodoro: (autoStartPomodoro: boolean) => void;
};
// context creation
const AutoStartPomodoroContext = createContext<
  AutoStartPomodoroContextType | boolean
>(false);

// tasks Context -------------------------------------
// Types
type TasksContextType = {
  tasks: [];
  setTasks: (tasks: []) => void;
};

// context creation
const TasksContext = createContext<TasksContextType | undefined>(undefined);

const MyProviders: React.FC<MyProvidersProps> = ({ children, themeColor }) => {
  // theme context states

  // auto start pomodoro context states
  const [autoStartPomodoro, setAutoStartPomodoro] =
    useState<AutoStartPomodoroContextType["autoStartPomodoro"]>(false);

  let autoStartPomodoroStorage = localStorage.getItem("autoStartPomodoro");

  console.log(typeof autoStartPomodoroStorage);
  
  useEffect(() => {
    autoStartPomodoroStorage !== null &&
      setAutoStartPomodoro(autoStartPomodoroStorage === "true" ? true : false);
  }, []);

  // tasks context states
  const [tasks, setTasks] = useState<TasksContextType["tasks"]>([]);

  return (
    <ThemeContext.Provider value={{ themeColor }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <AutoStartPomodoroContext.Provider
          value={{ autoStartPomodoro, setAutoStartPomodoro }}
        >
          {children}
        </AutoStartPomodoroContext.Provider>
      </TasksContext.Provider>
    </ThemeContext.Provider>
  );
};

export default MyProviders;
export { AutoStartPomodoroContext, ThemeContext, TasksContext };
