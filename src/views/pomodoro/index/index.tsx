import { useContext, useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import "./index.scss";
import Tasks from "../Tasks/Tasks";
import { IsUserLoggedInContext } from "../../../context/MyProviders";
import { useNavigate } from "react-router-dom";

const Pomodoro = () => {
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);

  const navigate = useNavigate();

  // states
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false); // start the timer if it's true
  const [timerfocus, setTimerFocus] = useState<boolean>(true); // display the time and the color for the focus time
  const [timerBreak, setTimerBreak] = useState<boolean>(false); // display the time and the color for the break time
  const [timerLongBreak, setTimerLongBreak] = useState<boolean>(false); // display the time and the color for the long break time
  // States to set the differents time for each timer in the modal setting
  const [minutesSetForFocus, setMinutesSetForFocus] = useState<number>(1500);
  const [minutesSetForBreak, setMinutesSetForBreak] = useState<number>(300);
  const [minutesSetForLongBreak, setMinutesSetForLongBreak] =
    useState<number>(900);
  const [countdownTime, setCountdownTime] =
    useState<number>(minutesSetForFocus); // timer value that will be decreased
  const minutesWithoutZero: number = Math.floor(countdownTime / 60);
  const secondsWithoutZero: number = Math.floor(countdownTime % 60);
  const minutes: number | string =
    minutesWithoutZero < 10 ? `0${minutesWithoutZero}` : minutesWithoutZero; // time that will be display in the htmx
  const seconds: number | string =
    secondsWithoutZero < 10 ? `0${secondsWithoutZero}` : secondsWithoutZero; // timer that will be display on the timer
  const [numberOfPomodoroDoneGlobaly, setNumberOfPomodoroDoneGlobaly] =
    useState<number>(0); // use to set the long break

  // initial values of the timers, used for the progress bar poucentage

  useEffect(() => {
    setCountdownTime(minutesSetForFocus);
  }, [minutesSetForFocus]);

  return (
    <div className="pomodoroContainer">
      {!isUserLoggedIn && (
        <div id="logButtonsContainer">
          <button id="signInButton" onClick={() => navigate("/signin")}>
            Sign In
          </button>
          <button id="signUpButton" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      )}
      <Timer
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        timerfocus={timerfocus}
        setTimerFocus={setTimerFocus}
        timerBreak={timerBreak}
        setTimerBreak={setTimerBreak}
        timerLongBreak={timerLongBreak}
        setTimerLongBreak={setTimerLongBreak}
        minutesSetForFocus={minutesSetForFocus}
        setMinutesSetForFocus={setMinutesSetForFocus}
        minutesSetForBreak={minutesSetForBreak}
        setMinutesSetForBreak={setMinutesSetForBreak}
        minutesSetForLongBreak={minutesSetForLongBreak}
        setMinutesSetForLongBreak={setMinutesSetForLongBreak}
        countdownTime={countdownTime}
        setCountdownTime={setCountdownTime}
        minutesWithoutZero={minutesWithoutZero}
        minutes={minutes}
        seconds={seconds}
        numberOfPomodoroDoneGlobaly={numberOfPomodoroDoneGlobaly}
        setNumberOfPomodoroDoneGlobaly={setNumberOfPomodoroDoneGlobaly}
      />
      <Tasks />
    </div>
  );
};

export default Pomodoro;
