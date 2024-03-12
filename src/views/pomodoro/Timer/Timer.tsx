import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useRef,
} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";
import checkSound from "../../../assets/check-sound.mp3";
import {
  PauseSvg,
  PlaySvg,
  PomodoroSettingsSvg,
  ResetSvg,
  SkipSvg,
} from "../../../assets/svg/svg";
import "./timer.scss";
import ModalTimer from "../../../components/pomodoro/modals/modalTimer/ModalTimer";
import {
  AutoStartPomodoroContext,
  ThemeContext,
  TimerContext,
} from "../../../context/MyProviders";
import Button from "../../../components/pomodoro/Button/TimerButton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AutoStartPomodoroContextType,
  Theme,
  ThemeContextTypes,
  TimerContextType,
} from "../../../utils/types/contextsTypes";
interface TimerProps {
  isTimerRunning: boolean;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;

  timerfocus: boolean;
  setTimerFocus: Dispatch<SetStateAction<boolean>>;

  timerBreak: boolean;
  setTimerBreak: Dispatch<SetStateAction<boolean>>;

  timerLongBreak: boolean;
  setTimerLongBreak: Dispatch<SetStateAction<boolean>>;

  minutesSetForFocus: number;
  setMinutesSetForFocus: Dispatch<SetStateAction<number>>;

  minutesSetForBreak: number;
  setMinutesSetForBreak: Dispatch<SetStateAction<number>>;

  minutesSetForLongBreak: number;
  setMinutesSetForLongBreak: Dispatch<SetStateAction<number>>;

  countdownTime: number;
  setCountdownTime: Dispatch<SetStateAction<number>>;

  minutesWithoutZero: number;

  // display in HTMX
  minutes: number | string;
  seconds: number | string;

  numberOfPomodoroDoneGlobaly: number;
  setNumberOfPomodoroDoneGlobaly: Dispatch<SetStateAction<number>>;
}

let interval: number;
let intervalTimeFocused: number;

const Timer: React.FC<TimerProps> = ({
  timerfocus,
  setTimerFocus,
  timerBreak,
  setTimerBreak,
  timerLongBreak,
  setTimerLongBreak,
  minutesSetForFocus,
  setMinutesSetForFocus,
  minutesSetForBreak,
  setMinutesSetForBreak,
  minutesSetForLongBreak,
  setMinutesSetForLongBreak,
  countdownTime,
  setCountdownTime,
  minutes,
  seconds,
  numberOfPomodoroDoneGlobaly,
  setNumberOfPomodoroDoneGlobaly,
}) => {
  const { autoStartPomodoro }: any = useContext<
    boolean | AutoStartPomodoroContextType
  >(AutoStartPomodoroContext);
  const [currentTimeWorked, setCurrentTimeWorked] = useState<number>(0); // used to add the time spent on the task

  // states
  const [openModal, setOpenModal] = useState<boolean>(false);

  const countdowntimeInitialValue = useRef<number>(countdownTime); // initial value of the timer used for the percentage of the progress bar

  const { themeColor }: any = useContext<Theme | ThemeContextTypes>(
    ThemeContext
  );

  const { isTimerRunning, setIsTimerRunning, setIsTimerOver, setTimeFocused } =
    useContext<TimerContextType | undefined>(TimerContext);

  const startTimer = () => {
    setIsTimerRunning(true);
    countdowntimeInitialValue.current = countdownTime;
    interval = window.setInterval(() => {
      setCountdownTime((countdownTime) => countdownTime - 1);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  };

  const startTimeWorked = () => {
    intervalTimeFocused = window.setInterval(() => {
      setCurrentTimeWorked((currentTimeWorked) => currentTimeWorked + 1);
    }, 1000);
    return () => {
      window.clearInterval(intervalTimeFocused);
    };
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimeFocused(currentTimeWorked); // used to add the time spent on the task
    setCurrentTimeWorked(0);
    clearInterval(interval);
    clearInterval(intervalTimeFocused);
  };

  const resetTimer = () => {
    setTimeFocused(currentTimeWorked);
    setCountdownTime(minutesSetForFocus);
    setCurrentTimeWorked(0);
    setIsTimerRunning(false);
    clearInterval(interval);
    clearInterval(intervalTimeFocused);
  };

  const skipTimer = () => {
    handleNewTimerValue(minutesSetForFocus);
    clearInterval(interval);
    setTimerFocus(true);
    setIsTimerRunning(false);
    setTimerBreak(false);
    setTimerLongBreak(false);
    startTimer();
    startTimeWorked();
    setIsTimerOver(false);
  };

  const handleSetting = () => {
    setOpenModal(true), resultToMinutes(), stopTimer();
  };

  const handleNewTimerValue = (value: number) => {
    setCountdownTime(value);
    countdowntimeInitialValue.current = value;
  };

  const [play] = useSound(checkSound);

  // handle the end of the timer et set the new timer
  useEffect(() => {
    if (countdownTime < 0) {
      play();
      if (!autoStartPomodoro) {
        stopTimer();
      }
      if (timerfocus) {
        clearInterval(intervalTimeFocused);
        setTimerFocus(false);
        setIsTimerOver(true); // used to implement the number of pomodoro done on the task selected and add the time spent on the task
        toast("focus time complete! 🏆", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: themeColor === "light" ? "light" : "dark",
        });
        if (numberOfPomodoroDoneGlobaly < 3) {
          // if the number of pomodoro done is less than 3, we set the break time
          setNumberOfPomodoroDoneGlobaly(
            (numberOfPomodoroDoneGlobaly) => numberOfPomodoroDoneGlobaly + 1
          );
          // setCountdownTime(minutesSetForBreak);
          handleNewTimerValue(minutesSetForBreak);
          setTimerBreak(true);
        } else {
          setNumberOfPomodoroDoneGlobaly(0);
          setTimerLongBreak(true);
          handleNewTimerValue(minutesSetForLongBreak);
        }
      } else if (timerBreak) {
        setIsTimerOver(false);
        setTimerBreak(false);
        setTimerFocus(true);
        startTimeWorked();
        handleNewTimerValue(minutesSetForFocus);
        toast("Back to work! 💻", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: themeColor === "light" ? "light" : "dark",
        });
      } else {
        // if the timer is a long break
        startTimeWorked();
        setIsTimerOver(false);
        setTimerFocus(true);
        setTimerLongBreak(false);
        handleNewTimerValue(minutesSetForFocus);
      }
    }
    if (isTimerRunning) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = `Pomodoro Timer`;
    }
  }, [countdownTime]);

  function resultToMinutes() {
    setMinutesSetForFocus(minutesSetForFocus / 60);
    setMinutesSetForBreak(minutesSetForBreak / 60);
    setMinutesSetForLongBreak(minutesSetForLongBreak / 60);
  }

  const percentage = Math.round(
    (countdownTime / countdowntimeInitialValue.current) * 100
  );

  return (
    <div className="timerContainer">
      <ToastContainer />
      <div className="circle timerBackground">
        <div className="progressBarContainer">
          <CircularProgressbar
            value={percentage}
            strokeWidth={3}
            styles={buildStyles({
              pathColor:
                timerBreak || timerLongBreak
                  ? "var(--color-yellow)"
                  : "var(--color-blue)",
              trailColor: "transparent",
            })}
          />
        </div>
        <div className="circleContent">
          <div className="time">
            <p>
              {" "}
              {minutes} : {seconds}
            </p>
          </div>
          <div className="session">
            {timerBreak ? (
              <p>Break time.</p>
            ) : timerLongBreak ? (
              <p> Long break</p>
            ) : (
              <p>Focus time</p>
            )}
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        <div className="buttonsContent">
          {isTimerRunning ? (
            <div className="button">
              <Button func={stopTimer}>
                <PauseSvg theme={themeColor} />
              </Button>
            </div>
          ) : (
            <div className="button">
              <Button func={startTimer} startTimeWorked={startTimeWorked}>
                <PlaySvg theme={themeColor} />
              </Button>
            </div>
          )}

          <Button func={handleSetting} isTimerRunning={isTimerRunning}>
            <PomodoroSettingsSvg theme={themeColor} />
          </Button>

          {timerBreak || timerLongBreak ? (
            <Button func={skipTimer}>
              <SkipSvg theme={themeColor} />
            </Button>
          ) : (
            <Button func={resetTimer}>
              <ResetSvg theme={themeColor} />
            </Button>
          )}
        </div>
      </div>
      {openModal && (
        <ModalTimer
          setOpenModal={setOpenModal}
          minutesSetForFocus={minutesSetForFocus}
          setMinutesSetForFocus={setMinutesSetForFocus}
          minutesSetForBreak={minutesSetForBreak}
          setMinutesSetForBreak={setMinutesSetForBreak}
          minutesSetForLongBreak={minutesSetForLongBreak}
          setMinutesSetForLongBreak={setMinutesSetForLongBreak}
          countdowntimeInitialValue={countdowntimeInitialValue}
        />
      )}
    </div>
  );
};

export default Timer;
