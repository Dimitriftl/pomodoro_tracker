import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// theme types
type Theme = "light" | "dark" | "system";

type MyProvidersProps = {
  children: React.ReactNode;
  themeColor: Theme;
  setThemeColor?: Dispatch<SetStateAction<Theme>>;
};

// user context -------------------------------------

// user types

interface userType {
  _id: "65aff1f37110ed3877deba42";
  name: "Dimitri";
  email: "test@dimitri.com";
  password: "$2b$10$UBWFJXMrLFHHQZw7Chm5GeOvZZT7D.O3FVxxGqjThSXdLVuicjPti";
  role: "user";
}

type UserContextType = {
  user: userType | null;
  setUser: (user: userType | null) => void;
};

// context creation

const UserContext = createContext<UserContextType | undefined>(undefined);

// theme context -------------------------------------

// context creation
const ThemeContext = createContext<Theme>("dark");

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
  const [user, setUser] = useState<UserContextType["user"] | null>(null);
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

  return (
    <ThemeContext.Provider value={{ themeColor }}>
      <UserContext.Provider value={{ user, setUser }}>
        <TasksContext.Provider value={{ tasks, setTasks }}>
          <AutoStartPomodoroContext.Provider
            value={{ autoStartPomodoro, setAutoStartPomodoro }}>
            {children}
          </AutoStartPomodoroContext.Provider>
        </TasksContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default MyProviders;
export { AutoStartPomodoroContext, ThemeContext, TasksContext, UserContext };
