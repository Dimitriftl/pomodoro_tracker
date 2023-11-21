import { Dispatch, SetStateAction, useContext, useState } from "react";
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

  initialValuesArray: number[];
  setInitialValuesArray: Dispatch<SetStateAction<number[]>>;
}

const ModalTimer: React.FC<ModalThemeProps> = ({
  setOpenModal,
  minutesSetForFocus,
  setMinutesSetForFocus,
  minutesSetForBreak,
  setMinutesSetForBreak,
  minutesSetForLongBreak,
  setMinutesSetForLongBreak,
  initialValuesArray,
}) => {
  const { autoStartPomodoro, setAutoStartPomodoro } = useContext(
    AutoStartPomodoroContext
  );

  // what we want to do here is to set the inputs values as the new values for the initialValuesArray

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }

    // const newArray = [...initialValuesArray];
    // newArray[0] = result;
    // setArray(newArray);
    setMinutesSetForFocus(result);
  };

  const handleChangeBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }

    // const newArray = [...initialValuesArray];
    // newArray[1] = result;
    // setArray(newArray);
    setMinutesSetForBreak(result);
  };

  const handleChangeLongBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }

    // const newArray = [...initialValuesArray];
    // newArray[2] = result;
    // setArray(newArray);
    setMinutesSetForLongBreak(result);
  };

  function resultToMinutes() {
    setMinutesSetForFocus(minutesSetForFocus * 60);
    setMinutesSetForBreak(minutesSetForBreak * 60);
    setMinutesSetForLongBreak(minutesSetForLongBreak * 60);
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
                  value={minutesSetForFocus}
                />
              </div>
              <div className="secondInput">
                <p>Break</p>
                <input
                  type="string"
                  className="input inputBackground"
                  name="Break"
                  onChange={handleChangeBreak}
                  value={minutesSetForBreak}
                />
              </div>
              <div className="thirdInput">
                <p>Long break</p>
                <input
                  type="string"
                  className="input inputBackground"
                  name="LongBreak"
                  onChange={handleChangeLongBreak}
                  value={minutesSetForLongBreak}
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
              }}>
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTimer;
