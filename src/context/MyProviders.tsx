import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  UserIsLoggedInContextType,
  Theme,
  ThemeContextTypes,
  TimerContextType,
} from "../utils/types/contextsTypes";

type MyProvidersProps = {
  children: React.ReactNode;
  themeColor: Theme;
  setThemeColor?: Dispatch<SetStateAction<Theme>>;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

// user context -------------------------------------

// user types

// context creation

const IsUserLoggedInContext = createContext<
  UserIsLoggedInContextType | undefined
>(undefined);

// theme context -------------------------------------

// context creation
const ThemeContext = createContext<ThemeContextTypes | Theme>("dark");

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

const TimerContext = createContext<boolean | undefined>(undefined);

const MyProviders: React.FC<MyProvidersProps> = ({
  children,
  themeColor,
  setIsUserLoggedIn,
  isUserLoggedIn,
}) => {
  // theme context states

  // auto start pomodoro context states
  const [autoStartPomodoro, setAutoStartPomodoro] =
    useState<AutoStartPomodoroContextType["autoStartPomodoro"]>(false);

  const autoStartPomodoroStorage = localStorage.getItem("autoStartPomodoro");

  useEffect(() => {
    autoStartPomodoroStorage !== null &&
      setAutoStartPomodoro(autoStartPomodoroStorage === "true" ? true : false);
  }, []);

  // tasks context states
  const [tasks, setTasks] = useState<TasksContextType["tasks"]>([]);

  // timer context

  const [isTimerOver, setIsTimerOver] = useState<boolean>(false);

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false); // used for timer context

  return (
    <ThemeContext.Provider value={{ themeColor }}>
      <IsUserLoggedInContext.Provider
        value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        <TasksContext.Provider value={{ tasks, setTasks }}>
          <TimerContext.Provider
            value={{
              isTimerOver,
              setIsTimerOver,
              isTimerRunning,
              setIsTimerRunning,
            }}>
            <AutoStartPomodoroContext.Provider
              value={{ autoStartPomodoro, setAutoStartPomodoro }}>
              {children}
            </AutoStartPomodoroContext.Provider>
          </TimerContext.Provider>
        </TasksContext.Provider>
      </IsUserLoggedInContext.Provider>
    </ThemeContext.Provider>
  );
};

export default MyProviders;
export {
  AutoStartPomodoroContext,
  ThemeContext,
  TasksContext,
  IsUserLoggedInContext,
  TimerContext,
};
