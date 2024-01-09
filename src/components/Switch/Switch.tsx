import { ThemeContext } from "../../context/MyProviders";
import "./switch.scss";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";

interface SwitchProps {
  autoStartPomodoro: boolean;
  setAutoStartPomodoro: Dispatch<SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({
  autoStartPomodoro,
  setAutoStartPomodoro,
}) => {
  const { themeColor } = useContext(ThemeContext);

  const classes = {
    switch: "switch" + " " + themeColor,
  };

  const toggleAutoPlay = () => {
    setAutoStartPomodoro((current) => !current);
  };

  return (
    <label className={classes.switch}>
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
