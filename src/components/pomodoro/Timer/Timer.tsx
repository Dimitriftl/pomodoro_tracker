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
import ModalTimer from "../../../modals/modalTimer/ModalTimer";
import { AutoStartPomodoroContext } from "../../../context/MyProviders";
import Button from "../Button/Button";
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

  initialTimerValue: number;
  setInitinialTimerValue: Dispatch<SetStateAction<number>>;

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
  initialTimerValue,
  setInitinialTimerValue,
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

  const startTimer = () => {
    setTimerBreak(false);
    setTimerLongBreak(false);
    setTimerFocus(true);
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
    setTimerBreak(false);
    setCountdownTime(minutesSetForFocus);
    startTimer();
  };

  const handleSetting = () => {
    setOpenModal(true), resultToMinutes(), stopTimer();
  };

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

  const percentage = Math.round((minutesWithoutZero / countdownTime) * 100);

  return (
    <>
      <div className="circle">
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
        {isTimerRunning ? (
          <div className="button">
            <Button func={stopTimer}>
              <PauseSvg />
            </Button>
          </div>
        ) : (
          <div className="button">
            <Button func={startTimer}>
              <PlaySvg />
            </Button>
          </div>
        )}

        <Button func={handleSetting}>
          <PomodoroSettingsSvg />
        </Button>

        {timerBreak ? (
          <Button func={skipTimer}>
            <SkipSvg />
          </Button>
        ) : (
          <Button func={resetTimer}>
            <ResetSvg />
          </Button>
        )}
      </div>
      {openModal && (
        <ModalTimer
          setOpenModal={setOpenModal}
          setInitinialTimerValue={setInitinialTimerValue}
          minutesSetForFocus={minutesSetForFocus}
          setMinutesSetForFocus={setMinutesSetForFocus}
          minutesSetForBreak={minutesSetForBreak}
          setMinutesSetForBreak={setMinutesSetForBreak}
          minutesSetForLongBreak={minutesSetForLongBreak}
          setMinutesSetForLongBreak={setMinutesSetForLongBreak}
        />
      )}
    </>
  );
};

export default Timer;
