import React from "react";
import { PlusSvg } from "../../../assets/svg/svg";
import "./header.scss";

type Props = {};

const Header = () => {
  return (
    <header>
      <h2>Calendar</h2>
      <button id="headerButton" className="backgroundBlue">
        <PlusSvg width={16} height={16} />
        Create a new task
      </button>
    </header>
  );
};

export default Header;
