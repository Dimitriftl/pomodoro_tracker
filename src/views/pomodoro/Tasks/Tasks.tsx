import React, { useContext, useEffect, useState } from "react";
import "./tasks.scss";
import CreateTaskButton from "../Button/createTaskButton/CreateTaskButton";
import ModalCreateTask from "../../../components/pomodoro/modals/modalCreateTask/ModalCreateTask";
import {
  PlusSvg,
  ArrowSvg,
  BinSvg,
  EditSvg,
  LittleClockSvg,
} from "../../../assets/svg/svg.jsx";
import { ThemeContext } from "../../../context/MyProviders.js";
import axios from "axios";
import Cookies from "js-cookie";
import ConfirmModal from "../../../components/pomodoro/modals/confirmModal/ConfirmModal.js";

type typeOfModalTypes = "delete" | "done" | null;

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [tasksArray, setTasksArray] = useState([]);
  const { themeColor } = useContext(ThemeContext);
  const [taskId, setTaskId] = useState<string | null>(null); // used for dropdown the proper task
  const [openTask, setOpenTask] = useState<boolean>(false);
  const [taskIdFocused, setTaskIdFocused] = useState<string | null>(null); // used to focus the pomodoro
  const [typeOfModal, setTypeOfModal] = useState<typeOfModalTypes>(null); //used for confirm modals
  const [editTask, setEditTask] = useState<boolean>(false); // used to edit the task
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  useEffect(() => {
    console.log("useEffect");

    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    setTasksArray(userDataObject.tasks || []);
  }, [localStorage.getItem("userData")]);

  console.log(new Date(), "messages");

  // get date with the format 2021-08-25 00:00:00
  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // return current hour
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    } ${hour < 10 ? `0${hour}` : hour}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  console.log(getTodayDate(), "getTodayDate");

  const deleteTask = async (id: string) => {
    const headers = {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    };

    await axios
      .delete(`http://localhost:3000/api/tasks/${id}`, { headers })
      .then((res) => {
        console.log(res.data, "delete task response");

        // delete task from the local storage
        const localUserData = localStorage.getItem("userData");
        const userDataObject = JSON.parse(localUserData || "{}");
        const newTasksArray = userDataObject.tasks.filter(
          (task) => task._id !== id
        );
        userDataObject.tasks = newTasksArray;
        localStorage.setItem("userData", JSON.stringify(userDataObject));
        setTasksArray(newTasksArray);
        setTypeOfModal(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTaskFunction = async (task) => {
    console.log("edit task id =>", task);
    const headers = {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    };

    const data = {
      ...task,
      description: taskDescription,
      taskName: taskName,
    };

    await axios
      .put("http://localhost:3000/api/tasks/", data, { headers })
      .then((res) => {
        console.log(res.data, "edit Response");
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  const filtredData = tasksArray.filter(
    (task) => task._id === "65c60133514e6769cc8e737c"
  );

  return (
    <div className="tasksContainer ">
      <h2>Task to focus on.</h2>
      <button onClick={() => setModal(!modal)} id="openModalButton">
        <PlusSvg theme={themeColor} />
      </button>
      {tasksArray.map((task, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setTaskIdFocused(task._id);
              setTaskName(task.taskName);
            }}
            className={
              openTask && taskId === task._id
                ? "taskContainer taskDropDowned"
                : "taskContainer"
            }>
            <div className="taskHeader">
              {editTask && taskId === task._id ? (
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  max={200}
                  id="taskNameInput"
                />
              ) : (
                <p>{task?.taskName}</p>
              )}
              <div className="taskHeaderRight">
                <p>
                  {task?.numberOfpomodoroDone} /{task?.numberOfPomodoroSet}
                </p>
                <button
                  onClick={() => {
                    setTaskId(task._id), setOpenTask(!openTask);
                  }}
                  id="arrowButton">
                  <ArrowSvg theme={themeColor} />
                </button>
              </div>
            </div>
            <div className="taskDropDownContainer">
              {editTask ? (
                <>
                  <div className="taskMain">
                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      max={200}
                      className="taskDescInput"
                    />
                  </div>
                  <div className="taskFooter">
                    <>
                      <button
                        id="cancelButton"
                        onClick={() => setEditTask(false)}>
                        Cancel
                      </button>
                      <button
                        id="editButton"
                        onClick={() => editTaskFunction(task)}>
                        <EditSvg color="#FFF" />
                        Save
                      </button>
                    </>
                  </div>
                </>
              ) : (
                <>
                  <div className="taskMain">
                    <p className="taskDesc">{task?.description}</p>
                  </div>
                  <div className="taskFooter">
                    {openTask ? (
                      <>
                        <button
                          id="deleteButton"
                          onClick={() => setTypeOfModal("delete")}>
                          <BinSvg color="var(--color-red)" />
                          Delete
                        </button>
                        <button
                          id="editButton"
                          onClick={() => {
                            setEditTask(true),
                              setTaskDescription(task.description),
                              setTaskName(task.taskName);
                          }}>
                          <EditSvg color="#FFF" />
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        id="editButton"
                        onClick={() => setTypeOfModal("done")}>
                        <LittleClockSvg color="#FFF" />
                        Done
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      {modal && <ModalCreateTask modal={modal} setModal={setModal} />}
      {(typeOfModal === "done" || typeOfModal === "delete") && (
        <ConfirmModal
          typeOfModal={typeOfModal}
          setTypeOfModal={setTypeOfModal}
          deleteTask={deleteTask}
          taskId={taskId}
          taskName={taskName}
          setOpenTask={setOpenTask}
        />
      )}
    </div>
  );
};

export default Tasks;
