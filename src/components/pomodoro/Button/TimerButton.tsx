import React from "react";
import "./timerbutton.scss";

type ButtonProps = {
  children: React.ReactNode;
  func: () => void;
  isTimerRunning: boolean;
  startTimeWorked: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  func,
  isTimerRunning,
  startTimeWorked,
}) => {
  return (
    <button
      disabled={isTimerRunning && isTimerRunning}
      className="timerButton neumorphismShadow"
      onClick={() => {
        func(), startTimeWorked && startTimeWorked();
      }}>
      {children}
    </button>
  );
};

export default Button;
