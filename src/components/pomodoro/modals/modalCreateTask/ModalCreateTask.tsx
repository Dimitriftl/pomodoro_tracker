import React, { Dispatch, SetStateAction } from "react";
import "./modalCreateTask.scss";

type modalProps = {
  modal: boolean;
  setMdoal: Dispatch<SetStateAction<boolean>>;
};

const ModalCreateTask = ({ modal, setModal }) => {
  return (
    <>
      <div className="overlay" onClick={() => setModal(!modal)}></div>
      <div className="modalContent">
        <h2>modal</h2>
      </div>
    </>
  );
};

export default ModalCreateTask;
