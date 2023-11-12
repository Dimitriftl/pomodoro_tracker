import React from "react";
import "./button.scss";

type ButtonProps = {
  children: React.ReactNode;
  func: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, func }) => {
  return (
    <button className="timerButton neumorphismShadow" onClick={() => func()}>
      {children}
    </button>
  );
};

export default Button;
