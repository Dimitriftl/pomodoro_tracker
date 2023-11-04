import React, { useState } from "react";
import "./tasks.scss";
import CreateTaskButton from "../Button/createTaskButton/CreateTaskButton";
import ModalCreateTask from "../../../modals/modalCreateTask/ModalCreateTask";

const Task = () => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <h2>Task to focus on.</h2>
      <CreateTaskButton modal={modal} setModal={setModal} />
      {modal && <ModalCreateTask />}
    </div>
  );
};

export default Task;
