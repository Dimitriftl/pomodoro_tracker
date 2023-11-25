import React, { useState } from "react";
import { PlusSvg } from "../../../assets/svg/svg";
import "./header.scss";
import ModalCreateTask from "../../../components/pomodoro/modals/modalCreateTask/ModalCreateTask";

type Props = {};

const Header = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <header>
        <h2>Calendar</h2>
        <button
          id="headerButton"
          className="backgroundBlue"
          onClick={() => setModal(!modal)}>
          <PlusSvg width={16} height={16} />
          Create a new task
        </button>
      </header>
      {modal && <ModalCreateTask modal={modal} setModal={setModal} />}
    </>
  );
};

export default Header;
