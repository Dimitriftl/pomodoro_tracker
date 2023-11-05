import React, { useState } from "react";
import "./tasks.scss";
import CreateTaskButton from "../Button/createTaskButton/CreateTaskButton";
import ModalCreateTask from "../../../modals/modalCreateTask/ModalCreateTask";
import { PlusSvg } from "../../../assets/svg/svg.jsx";

const Tasks = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="taskContainer">
      <h2>Task to focus on.</h2>

      <button onClick={() => setModal(!modal)} id="openModalButton">
        <PlusSvg />
      </button>
      {modal && <ModalCreateTask modal={modal} setModal={setModal} />}
    </div>
  );
};

export default Tasks;
