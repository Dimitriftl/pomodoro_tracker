import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./modalTimer.scss";
import { AutoStartPomodoroContext } from "../../../../context/MyProviders";
import Switch from "../../../../components/Switch/Switch";

interface ModalThemeProps {
  setOpenModal: Dispatch<SetStateAction<boolean | undefined>>;

  minutesSetForFocus: number;
  setMinutesSetForFocus: Dispatch<SetStateAction<number>>;

  minutesSetForBreak: number;
  setMinutesSetForBreak: Dispatch<SetStateAction<number>>;

  minutesSetForLongBreak: number;
  setMinutesSetForLongBreak: Dispatch<SetStateAction<number>>;

  setInitinialTimerValue: Dispatch<SetStateAction<number>>;

  countdowntimeInitialValue: React.MutableRefObject<number>;
}

const ModalTimer: React.FC<ModalThemeProps> = ({
  setOpenModal,
  minutesSetForFocus,
  setMinutesSetForFocus,
  minutesSetForBreak,
  setMinutesSetForBreak,
  minutesSetForLongBreak,
  setMinutesSetForLongBreak,
  countdowntimeInitialValue,
}) => {
  const { autoStartPomodoro, setAutoStartPomodoro } = useContext(
    AutoStartPomodoroContext
  );

  const [localMinutesSetForFocus, setLocalMinutesSetForFocus] =
    useState<number>(minutesSetForFocus);
  const [localMinutesSetForBreak, setLocalMinutesSetForBreak] =
    useState<number>(minutesSetForBreak);
  const [localMinutesSetForLongBreak, setLocalMinutesSetForLongBreak] =
    useState<number>(minutesSetForLongBreak);



  console.log(autoStartPomodoro);
  


  useEffect(() => {
    localStorage.setItem("autoStartPomodoro", autoStartPomodoro);
  }, [autoStartPomodoro]);

  // changer la logique pour modifier les timers, il faut que ceux-ci se modifie au onClick du bouton valider

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }
    setLocalMinutesSetForFocus(result);
  };

  const handleChangeBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }

    setLocalMinutesSetForBreak(result);
  };

  const handleChangeLongBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }
    setLocalMinutesSetForLongBreak(result);
  };

  // convert minutes to seconds
  function resultToMinutes() {
    setMinutesSetForFocus(localMinutesSetForFocus * 60);
    setMinutesSetForBreak(localMinutesSetForBreak * 60);
    setMinutesSetForLongBreak(localMinutesSetForLongBreak * 60);
    countdowntimeInitialValue.current = localMinutesSetForFocus * 60;
  }

  return (
    <div>
      <div className="overlay">
        <div className="modalContent background">
          <div className="modalTitle">
            <h3 className="settingTitle">Pomodoro settings</h3>
          </div>

          <div className="inputSettings">
            <div className="inputsTitle">
              <p>
                Time <span>(minutes)</span>
              </p>
            </div>
            <div className="inputContainer">
              <div className="firstInput">
                <p>Focus</p>
                <input
                  type="text"
                  className="input inputBackground"
                  name="Focus"
                  onChange={handleChange}
                  value={localMinutesSetForFocus}
                />
              </div>
              <div className="secondInput">
                <p>Break</p>
                <input
                  type="string"
                  className="input inputBackground"
                  name="Break"
                  onChange={handleChangeBreak}
                  value={localMinutesSetForBreak}
                />
              </div>
              <div className="thirdInput">
                <p>Long break</p>
                <input
                  type="string"
                  className="input inputBackground"
                  name="LongBreak"
                  onChange={handleChangeLongBreak}
                  value={localMinutesSetForLongBreak}
                />
              </div>
            </div>
          </div>
          <div className="autoPlayContainer">
            <p className="auto-start">Auto start Pomodoros</p>
            <Switch
              autoStartPomodoro={autoStartPomodoro}
              setAutoStartPomodoro={setAutoStartPomodoro}
            />
          </div>
          <div className="btnCloseModalContainer">
            <button
              className="ValidateButton backgroundBlue  "
              onClick={() => {
                setOpenModal(false), resultToMinutes();
              }}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTimer;
