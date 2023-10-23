import "./switch.scss";
import { Dispatch, SetStateAction } from "react";

interface SwitchProps {
  autoStartPomodoro: boolean;
  setAutoStartPomodoro: Dispatch<SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({
  autoStartPomodoro,
  setAutoStartPomodoro,
}) => {
  const toggleAutoPlay = () => {
    setAutoStartPomodoro((current) => !current);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={toggleAutoPlay}
        checked={autoStartPomodoro}
      />

      <span className="slider rounded" />
    </label>
  );
};

export default Switch;
