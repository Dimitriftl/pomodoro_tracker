import React, { useContext, useEffect, useState } from "react";
import "./tasks.scss";
import ModalCreateTask from "../../../components/pomodoro/modals/modalCreateTask/ModalCreateTask";
import {
  PlusSvg,
  ArrowSvg,
  BinSvg,
  EditSvg,
  LittleClockSvg,
} from "../../../assets/svg/svg.jsx";
import {
  IsUserLoggedInContext,
  ThemeContext,
  TimerContext,
} from "../../../context/MyProviders.js";
import axios from "axios";
import Cookies from "js-cookie";
import ConfirmModal from "../../../components/pomodoro/modals/confirmModal/ConfirmModal.js";
import {
  IsUserLoggedInTypes,
  ThemeContextTypes,
  Theme,
  TimerContextType,
} from "../../../utils/types/contextsTypes.ts";

type typeOfModalTypes = "delete" | "done" | null;
type taskType = {
  _id: string;
  taskName: string;
  description: string;
  numberOfPomodoroSet: number;
  numberOfPomodoroDone: number;
  taskDone: boolean;
  timeSpend?: number;
};

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [tasksArray, setTasksArray] = useState<Array<taskType | []>>([]);
  const { themeColor } = useContext<ThemeContextTypes | Theme>(ThemeContext);
  const [taskId, setTaskId] = useState<string | null>(null); // used for dropdown the proper task
  const [openTask, setOpenTask] = useState<boolean>(false);
  const [taskIdFocused, setTaskIdFocused] = useState<string | null>(null); // used to focus the pomodoro
  const [typeOfModal, setTypeOfModal] = useState<typeOfModalTypes>(null); //used for confirm modals
  const [editTask, setEditTask] = useState<boolean>(false); // used to edit the task
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { isUserLoggedIn } = useContext<IsUserLoggedInTypes>(
    IsUserLoggedInContext
  );
  const { isTimerOver, isTimerRunning } = useContext<
    TimerContextType | undefined
  >(TimerContext);

  useEffect(() => {
    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    setTasksArray(userDataObject.tasks || []);
  }, [localStorage.getItem("userData")]);

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
          (task: taskType) => task._id !== id
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

  const editTaskFunction = async (task: taskType) => {
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
        console.log(res.data, "res");
        const newTasksArray: Array<taskType | []> = tasksArray.map(
          (item: taskType | []) => {
            // check type to excude empty arrays (used for error handling ts)
            if (Array.isArray(item)) {
              return item;
            }
            if (task._id === item._id) {
              return {
                ...task,
                taskName: taskName,
                description: taskDescription,
              };
            }
            return item;
          }
        );
        setTasksArray(newTasksArray);
        const localUserData = localStorage.getItem("userData");
        const userDataObject = JSON.parse(localUserData || "{}");
        userDataObject.tasks = newTasksArray;
        localStorage.setItem("userData", JSON.stringify(userDataObject));
        setEditTask(false);
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  useEffect(() => {
    if (isTimerOver) {
      updateNumberOfPomodoro(taskIdFocused);
    }
  }, [isTimerOver]);

  const updateNumberOfPomodoro = async (id: string | null) => {
    const task = tasksArray.find((task: taskType | []) => {
      if (Array.isArray(task)) {
        return null;
      }
      return task._id === id;
    });

    if (task === undefined) {
      return;
    }
    const headers = {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    };

    let data = {
      ...task,
      numberOfPomodoroDone: task.numberOfPomodoroDone + 1,
    };

    if (data.numberOfPomodoroDone >= data.numberOfPomodoroSet) {
      data = {
        ...data,
        taskDone: true,
      };
    }

    await axios
      .put("http://localhost:3000/api/tasks/", data, { headers })
      .then((res) => {
        console.log(res.data, "res");
        const newTasksArray: Array<taskType | []> = tasksArray.map(
          (item: taskType | []) => {
            // check type to excude empty arrays (used for error handling ts)
            if (Array.isArray(item)) {
              return item;
            }
            if (task._id === item._id) {
              return data;
            }
            return item;
          }
        );
        setTasksArray(newTasksArray);
        const localUserData = localStorage.getItem("userData");
        const userDataObject = JSON.parse(localUserData || "{}");
        userDataObject.tasks = newTasksArray;
        localStorage.setItem("userData", JSON.stringify(userDataObject));
        setEditTask(false);
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  return (
    <div className="tasksContainer ">
      <h2>Task to focus on.</h2>
      {isUserLoggedIn ? (
        <button onClick={() => setModal(!modal)} id="openModalButton">
          <PlusSvg theme={themeColor} />
        </button>
      ) : (
        <button id="openModalButtonDisabled">
          <p>Please connect to create tasks</p>
        </button>
      )}
      {tasksArray.map((task: taskType | [], index: number) => {
        // check type to excude empty arrays (used for error handling ts)
        if (Array.isArray(task)) {
          return null;
        }
        return (
          <div
            key={index}
            onClick={() => {
              task._id === taskIdFocused
                ? setTaskIdFocused(null)
                : setTaskIdFocused(task._id);
              setTaskName(task.taskName);
            }}
            className={
              openTask && taskId === task._id
                ? "taskContainer taskDropDowned"
                : "taskContainer"
            }>
            {task.taskDone === true && (
              <div className="activePastille DonePastille"></div>
            )}
            {taskIdFocused === task._id && task.taskDone === false && (
              <div className="activePastille"></div>
            )}
            <div
              className="taskHeader"
              style={{
                paddingLeft:
                  taskIdFocused === task._id || task.taskDone === true
                    ? "1.8rem"
                    : "1rem",
              }}>
              {editTask && taskId === task._id ? (
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  max={200}
                  id="taskNameInput"
                />
              ) : (
                <p>{task?.taskName}</p>
              )}
              <div className="taskHeaderRight">
                <p>
                  {task?.numberOfPomodoroDone}/{task?.numberOfPomodoroSet}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(),
                      setTaskId(task._id),
                      setOpenTask(!openTask);
                  }}
                  id="arrowButton">
                  <ArrowSvg theme={themeColor} />
                </button>
              </div>
            </div>
            <div
              className="taskDropDownContainer"
              style={{
                paddingLeft:
                  taskIdFocused === task._id || task.taskDone === true
                    ? "1rem"
                    : "0",
              }}>
              {editTask ? (
                <>
                  <div className="taskMain">
                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      maxLength={200}
                      onClick={(e) => e.stopPropagation()}
                      className="taskDescInput"
                    />
                  </div>
                  <div className="taskFooter">
                    <>
                      <button
                        id="cancelButton"
                        onClick={(e) => {
                          e.stopPropagation(), setEditTask(false);
                        }}>
                        Cancel
                      </button>
                      <button
                        id="editButton"
                        onClick={(e) => {
                          e.stopPropagation(), editTaskFunction(task);
                        }}>
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
                    {task.taskDone === false ? (
                      <>
                        <button
                          id="deleteButton"
                          onClick={(e) => {
                            e.stopPropagation(), setTypeOfModal("delete");
                          }}>
                          <BinSvg color="var(--color-red)" />
                          Delete
                        </button>
                        <button
                          id="cancelButton"
                          onClick={(e) => {
                            e.stopPropagation(), updateNumberOfPomodoro(task);
                          }}>
                          add pomodoro
                        </button>
                        <button
                          id="editButton"
                          onClick={(e) => {
                            e.stopPropagation(),
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
                        onClick={(e) => {
                          e.stopPropagation(), setTypeOfModal("done");
                        }}>
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
