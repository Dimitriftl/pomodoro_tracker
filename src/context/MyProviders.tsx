import { useState, createContext, Dispatch, SetStateAction } from "react";

type MyProvidersProps = {
  children: React.ReactNode;
  themeColor: Theme;
  setThemeColor?: Dispatch<SetStateAction<Theme>>;
};

// theme context -------------------------------------
// Types
type Theme = "light" | "dark" | "system";

// context creation
const ThemeContext = createContext<Theme | undefined>(undefined);

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
  // auto start pomodoro context states
  const [autoStartPomodoro, setAutoStartPomodoro] =
    useState<AutoStartPomodoroContextType["autoStartPomodoro"]>(false);

  // tasks context states
  const [tasks, setTasks] = useState<TasksContextType["tasks"]>([]);

  return (
    <ThemeContext.Provider value={themeColor}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <AutoStartPomodoroContext.Provider
          value={{
            autoStartPomodoro,
            setAutoStartPomodoro,
          }}>
          {children}
        </AutoStartPomodoroContext.Provider>
      </TasksContext.Provider>
    </ThemeContext.Provider>
  );
};

export default MyProviders;
export { AutoStartPomodoroContext, ThemeContext, TasksContext };
