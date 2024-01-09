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
import {
  PauseSvg,
  PlaySvg,
  PomodoroSettingsSvg,
  ResetSvg,
  SkipSvg,
  Blop,
} from "../../../assets/svg/svg";
import "./timer.scss";
import ModalTimer from "../../../components/pomodoro/modals/modalTimer/ModalTimer";
import {
  AutoStartPomodoroContext,
  ThemeContext,
} from "../../../context/MyProviders";
import Button from "../../../components/pomodoro/Button/TimerButton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const Timer: React.FC<TimerProps> = ({
  isTimerRunning,
  setIsTimerRunning,
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
  minutesWithoutZero,
  minutes,
  seconds,
  numberOfPomodoroDoneGlobaly,
  setNumberOfPomodoroDoneGlobaly,
}) => {
  const { autoStartPomodoro } = useContext(AutoStartPomodoroContext);

  // states
  const [openModal, setOpenModal] = useState<boolean>(false);

  let countdowntimeInitialValue = useRef<number>(countdownTime); // initial value of the timer used for the percentage of the progress bar

  const { themeColor } = useContext(ThemeContext);

  const startTimer = () => {
    setIsTimerRunning(true);
    countdowntimeInitialValue.current = countdownTime;
    interval = window.setInterval(() => {
      setCountdownTime((countdownTime) => countdownTime - 1);
    }, 100);

    return () => window.clearInterval(interval);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    clearInterval(interval);
  };

  const resetTimer = () => {
    setCountdownTime(minutesSetForFocus);
    setIsTimerRunning(false);
    clearInterval(interval);
  };

  const skipTimer = () => {
    clearInterval(interval);
    setIsTimerRunning(false);
    setTimerFocus(true);
    setTimerBreak(false);
    setCountdownTime(minutesSetForFocus);
    startTimer();
  };

  const handleSetting = () => {
    setOpenModal(true), resultToMinutes(), stopTimer();
  };

  const handleNewTimerValue = (value: number) => {
    setCountdownTime(value);
    countdowntimeInitialValue.current = value;
  };

  // handle the end of the timer et set the new timer
  useEffect(() => {
    if (countdownTime < 0) {
      if (!autoStartPomodoro) {
        stopTimer();
      }
      if (timerfocus) {
        setTimerFocus(false);
        if (numberOfPomodoroDoneGlobaly < 3) {
          setNumberOfPomodoroDoneGlobaly(
            (numberOfPomodoroDoneGlobaly) => numberOfPomodoroDoneGlobaly + 1
          );
          // setCountdownTime(minutesSetForBreak);
          handleNewTimerValue(minutesSetForBreak);
          setTimerBreak(true);
          toast("Focus is over well done!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: themeColor === "light" ? "light" : "dark",
          });
        } else {
          setNumberOfPomodoroDoneGlobaly(0);
          setTimerLongBreak(true);
          handleNewTimerValue(minutesSetForLongBreak);
        }
      } else if (timerBreak) {
        setTimerBreak(false);
        setTimerFocus(true);
        handleNewTimerValue(minutesSetForFocus);
        toast("Break is over!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: themeColor === "light" ? "light" : "dark",
        });
      } else {
        setTimerLongBreak(false);
        setTimerFocus(true);
        handleNewTimerValue(minutesSetForFocus);
      }
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
                  ? themeColor === "dark"
                    ? "#FFDE67"
                    : "#f0cd20"
                  : timerfocus
                  ? themeColor === "dark"
                    ? "#678bff"
                    : "#2A72F1"
                  : null,
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
              <Button func={startTimer}>
                <PlaySvg theme={themeColor} />
              </Button>
            </div>
          )}

          <Button func={handleSetting} isTimerRunning={isTimerRunning}>
            <PomodoroSettingsSvg theme={themeColor} />
          </Button>

          {timerBreak ? (
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
