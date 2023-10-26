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
  const [openModal, setOpenModal] = useState<boolean>();

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
    setCountdownTime(1500);
    setIsTimerRunning(false);
    clearInterval(interval);
  };

  const skipTimer = () => {
    console.log("skipTImer");
  };

  const handleSetting = () => {
    setOpenModal(true), resultToMinutesTwo(), stopTimer();
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

  function resultToMinutesTwo() {
    setMinutesSetForFocus(minutesSetForFocus / 60);
    setMinutesSetForBreak(minutesSetForBreak / 60);
    setMinutesSetForLongBreak(minutesSetForLongBreak / 60);
  }

  const percentage = Math.round((minutesWithoutZero / countdownTime) * 100);

  return (
    <div
      className="circle"
      // style={{
      //   boxShadow: timerfocus
      //     ? "0px 0px 200px 1px rgba(0, 217, 255, 0.7)"
      //     : "0px 0px 200px 1px rgba(255, 255, 255, 0.40)",
      // }}
    >
      <div className="circleShadow"></div>
      <div className="blopContainer">
        <Blop />
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
        {isTimerRunning ? (
          <div className="button play">
            <Button func={stopTimer}>
              <PauseSvg />
            </Button>
          </div>
        ) : (
          <div className="button play">
            <Button func={startTimer}>
              <PlaySvg />
            </Button>
          </div>
        )}
        <div className="pourcentageCircle">
          <CircularProgressbar
            className="inPourcentageCircle"
            value={100}
            strokeWidth={2}
            counterClockwise={true}
            styles={buildStyles({
              pathColor: timerfocus ? "#24c8be" : "#fff",
              trailColor: timerfocus ? "#1e2d33" : "#37373e",
            })}
          />
        </div>
        <div className="button setting">
          <Button func={handleSetting}>
            <PomodoroSettingsSvg />
          </Button>
        </div>
        {timerBreak ? (
          <div className="button reset">
            <Button func={skipTimer}>
              <SkipSvg />
            </Button>
          </div>
        ) : (
          <div className="button reset">
            <Button func={resetTimer}>
              <ResetSvg />
            </Button>
          </div>
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
    </div>
  );
};

export default Timer;
