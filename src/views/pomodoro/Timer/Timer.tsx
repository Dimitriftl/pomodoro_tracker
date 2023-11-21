import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
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

  initialValuesArray: number[];
  setInitialValuesArray: Dispatch<SetStateAction<number[]>>;
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
  initialValuesArray,
  setInitialValuesArray,
}) => {
  const { autoStartPomodoro } = useContext(AutoStartPomodoroContext);

  // states
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { themeColor } = useContext(ThemeContext);

  const startTimer = () => {
    setIsTimerRunning(true);

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

  useEffect(() => {
    if (countdownTime < 0) {
      percentage = 100;
      if (!autoStartPomodoro) {
        stopTimer();
      }
      if (timerfocus) {
        setTimerFocus(false);
        if (numberOfPomodoroDoneGlobaly < 3) {
          setNumberOfPomodoroDoneGlobaly(
            (numberOfPomodoroDoneGlobaly) => numberOfPomodoroDoneGlobaly + 1
          );
          setCountdownTime(minutesSetForBreak);
          setTimerBreak(true);
        } else {
          setNumberOfPomodoroDoneGlobaly(0);
          setTimerLongBreak(true);
          setCountdownTime(minutesSetForLongBreak);
        }
      } else if (timerBreak) {
        setTimerBreak(false);
        setTimerFocus(true);
        setCountdownTime(minutesSetForFocus);
      } else {
        setTimerLongBreak(false);
        setTimerFocus(true);
        setCountdownTime(minutesSetForFocus);
      }
    }
  }, [countdownTime]);

  function resultToMinutes() {
    setMinutesSetForFocus(minutesSetForFocus / 60);
    setMinutesSetForBreak(minutesSetForBreak / 60);
    setMinutesSetForLongBreak(minutesSetForLongBreak / 60);
  }

  // countdownTime decrease every second

  const percentageFocus = Math.round(
    (countdownTime / initialValuesArray[0]) * 100
  );
  const percentageBreak = Math.round(
    (countdownTime / initialValuesArray[1]) * 100
  );
  const percentageLongBreak = Math.round(
    (countdownTime / initialValuesArray[2]) * 100
  );

  // }, [timerfocus, timerBreak, timerLongBreak]);

  return (
    <div className="timerContainer">
      <div className="circle timerBackground">
        <div className="progressBarContainer">
          <CircularProgressbar
            value={
              timerfocus
                ? percentageFocus
                : timerBreak
                ? percentageBreak
                : percentageLongBreak
            }
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
          initialValuesArray={initialValuesArray}
          setInitialValuesArray={setInitialValuesArray}
          setOpenModal={setOpenModal}
          minutesSetForFocus={minutesSetForFocus}
          setMinutesSetForFocus={setMinutesSetForFocus}
          minutesSetForBreak={minutesSetForBreak}
          setMinutesSetForBreak={setMinutesSetForBreak}
          minutesSetForLongBreak={minutesSetForLongBreak}
          setMinutesSetForLongBreak={setMinutesSetForLongBreak}
        />
      )}
    </div>
  );
};

export default Timer;
