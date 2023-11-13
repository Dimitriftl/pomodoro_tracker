import React from "react";
import "./button.scss";

type ButtonProps = {
  children: React.ReactNode;
  func: () => void;
  isTimerRunning: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, func, isTimerRunning }) => {
  return (
    <button
      disabled={isTimerRunning && isTimerRunning}
      className="timerButton neumorphismShadow"
      onClick={() => func()}>
      {children}
    </button>
  );
};

export default Button;
