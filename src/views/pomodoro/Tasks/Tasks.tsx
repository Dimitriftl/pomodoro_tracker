import React, { useContext, useEffect, useState } from "react";
import "./tasks.scss";
import CreateTaskButton from "../Button/createTaskButton/CreateTaskButton";
import ModalCreateTask from "../../../components/pomodoro/modals/modalCreateTask/ModalCreateTask";
import { PlusSvg } from "../../../assets/svg/svg.jsx";
import { ThemeContext } from "../../../context/MyProviders.js";

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [tasksArray, setTasksArray] = useState([]);
  const { themeColor } = useContext(ThemeContext);

  useEffect(() => {
    console.log("useEffect");

    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    setTasksArray(userDataObject.tasks || []);
  }, [localStorage.getItem("userData")]);

  const deleteTask = (id) => {
    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    const newTasksArray = userDataObject.tasks.filter(
      (task) => task._id !== id
    );
    userDataObject.tasks = newTasksArray;
    localStorage.setItem("userData", JSON.stringify(userDataObject));
    setTasksArray(newTasksArray);
  };

  return (
    <div className="tasksContainer">
      <h2>Task to focus on.</h2>

      <button onClick={() => setModal(!modal)} id="openModalButton">
        <PlusSvg theme={themeColor} />
      </button>
      {tasksArray.map((task, index) => {
        return (
          <div key={index} className="taskContainer">
            <p>{task?.taskName}</p>
            <button onClick={() => deleteTask(task._id)} id="deleteTaskButton">
              X
            </button>
          </div>
        );
      })}
      {modal && <ModalCreateTask modal={modal} setModal={setModal} />}
    </div>
  );
};

export default Tasks;
