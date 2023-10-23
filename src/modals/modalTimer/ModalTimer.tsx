import { Dispatch, SetStateAction, useContext } from "react";
import "./modalTimer.scss";
import { AutoStartPomodoroContext } from "../../views/App";
import Switch from "../../components/Switch/Switch";

interface ModalThemeProps {
  setOpenModal: Dispatch<SetStateAction<boolean | undefined>>;

  minutesSetForFocus: number;
  setMinutesSetForFocus: Dispatch<SetStateAction<number>>;

  minutesSetForBreak: number;
  setMinutesSetForBreak: Dispatch<SetStateAction<number>>;

  minutesSetForLongBreak: number;
  setMinutesSetForLongBreak: Dispatch<SetStateAction<number>>;

  setInitinialTimerValue: Dispatch<SetStateAction<number>>;
}

const ModalTimer: React.FC<ModalThemeProps> = ({
  setOpenModal,
  minutesSetForFocus,
  setMinutesSetForFocus,
  minutesSetForBreak,
  setMinutesSetForBreak,
  minutesSetForLongBreak,
  setMinutesSetForLongBreak,
  setInitinialTimerValue,
}) => {
  const { autoStartPomodoro, setAutoStartPomodoro } = useContext(
    AutoStartPomodoroContext
  );

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return "";
    }

    setMinutesSetForFocus(result);
    setInitinialTimerValue(result); // to set an initial value to the progress bar
  };

  const handleChangeBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return "";
    }

    setMinutesSetForBreak(result);
    setInitinialTimerValue(result); // to set an initial value to the progress bar
  };

  const handleChangeLongBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return "";
    }

    setMinutesSetForLongBreak(result);
    setInitinialTimerValue(result); // to set an initial value to the progress bar
  };

  function resultToMinutes() {
    setMinutesSetForFocus(minutesSetForFocus * 60);
    setMinutesSetForBreak(minutesSetForBreak * 60);
    setMinutesSetForLongBreak(minutesSetForLongBreak * 60);
  }

  return (
    <div>
      <div className="overlay">
        <div className="modalContent">
          <div className="modalTitle">
            <h3 className="settingTitle">Settings</h3>
          </div>
          <form>
            <div className="inputSettings">
              <div className="firstInput">
                <p>Focus</p>
                <input
                  type="text"
                  className="input"
                  name="Focus"
                  onChange={handleChange}
                  value={minutesSetForFocus}
                />
              </div>
              <div className="secondInput">
                <p>Break</p>
                <input
                  type="string"
                  className="input"
                  name="Break"
                  onChange={handleChangeBreak}
                  value={minutesSetForBreak}
                />
              </div>
              <div className="thirdInput">
                <p>Long break</p>
                <input
                  type="string"
                  className="input"
                  name="LongBreak"
                  onChange={handleChangeLongBreak}
                  value={minutesSetForLongBreak}
                />
              </div>
            </div>
          </form>
          <Switch
            autoStartPomodoro={autoStartPomodoro}
            setAutoStartPomodoro={setAutoStartPomodoro}
          />
          {/* <div className="autoPlayContainer">
            <p className="auto-start">Auto start Pomodoros ?</p>
            <Switch
              autoPlayTimer={autoPlayTimer}
              setAutoPlayTimer={setAutoPlayTimer}
            />
          </div> */}
          <div className="btnCloseModalContainer">
            <button
              className="btn-close-modal"
              onClick={() => {
                setOpenModal(false), resultToMinutes();
              }}>
              <p>Ok</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTimer;
