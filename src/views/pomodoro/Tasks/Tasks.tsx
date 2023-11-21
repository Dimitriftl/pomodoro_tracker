import React, { useContext, useState } from "react";
import "./tasks.scss";
import CreateTaskButton from "../Button/createTaskButton/CreateTaskButton";
import ModalCreateTask from "../../../components/pomodoro/modals/modalCreateTask/ModalCreateTask";
import { PlusSvg } from "../../../assets/svg/svg.jsx";
import { ThemeContext } from "../../../context/MyProviders.js";

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const { themeColor } = useContext(ThemeContext);

  return (
    <div className="tasksContainer">
      <h2>Task to focus on.</h2>

      <button onClick={() => setModal(!modal)} id="openModalButton">
        <PlusSvg theme={themeColor} />
      </button>
      {modal && <ModalCreateTask modal={modal} setModal={setModal} />}
    </div>
  );
};

export default Tasks;
