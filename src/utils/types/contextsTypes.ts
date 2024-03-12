export type IsUserLoggedInTypes = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Theme = "light" | "dark" | "system";

export type ThemeContextTypes = {
  themeColor: Theme;
  setThemeColor: React.Dispatch<React.SetStateAction<Theme>>;
};

export type TimerContextType = {
  isTimerOver?: boolean;
  setIsTimerOver?: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerRunning?: boolean;
  setIsTimerRunning?: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeFocused?: React.Dispatch<React.SetStateAction<number>>;
  timeFocused?: number;
};

export type AutoStartPomodoroContextType = {
  autoStartPomodoro: boolean;
  setAutoStartPomodoro: (autoStartPomodoro: boolean) => void;
};
