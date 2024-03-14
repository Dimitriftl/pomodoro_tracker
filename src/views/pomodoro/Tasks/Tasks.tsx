import { useContext, useEffect, useState } from "react";
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
import ConfirmModal from "../../../components/confirmModal/ConfirmModal.js";
import {
  IsUserLoggedInTypes,
  ThemeContextTypes,
  Theme,
} from "../../../utils/types/contextsTypes.ts";
import { taskType } from "../../../utils/types/globalTypes.ts";
import { useBackendRoute } from "../../../hooks/UseBackendRoute.ts";

type typeOfModalTypes = "delete" | "done" | "giveUp" | null;

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [tasksArray, setTasksArray] = useState<Array<taskType | []>>([]);
  const { themeColor }: any = useContext<ThemeContextTypes | Theme>(
    ThemeContext
  );
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
  const { isTimerOver, timeFocused, setTimeFocused } = useContext(TimerContext);

  const { apiCall } = useBackendRoute();

  useEffect(() => {
    // get tasks from the local storage when the component is mounted
    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    setTasksArray(userDataObject.tasks || []);
  }, [localStorage.getItem("userData")]);

  useEffect(() => {
    if (isTimerOver && isUserLoggedIn) {
      updatePomodoroDoneAndTimeSpend(taskIdFocused); // update the number of pomodoro done, timeSpend of the user and time Spend on task when the timer  is over
    }
  }, [isTimerOver]);

  useEffect(() => {
    // update timeSpend when the timer is paused
    if (timeFocused > 0 && !isTimerOver && isUserLoggedIn) {
      updateTimeSpend(taskIdFocused);
    }
  }, [timeFocused]);

  const deleteTask = async (id: string) => {
    await apiCall(
      "deleteTask",
      null,
      () => {
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
      },
      id
    );
  };

  const editTaskFunction = async (task: taskType) => {
    const data = {
      ...task,
      description: taskDescription,
      taskName: taskName,
    };

    await apiCall("editTask", data, () => {
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
    });
  };

  const updateTimeSpend = async (id: string | null) => {
    //update user TotalTimeSpend in the database
    // get user data from local storage
    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    const user = userDataObject.user;

    const userData = {
      timeSpend: timeFocused,
    };

    await apiCall("updateTimeSpend", userData, () => {
      user.totalTimeSpend = user.totalTimeSpend + timeFocused;
      userDataObject.user = user;
      localStorage.setItem("userData", JSON.stringify(userDataObject));
    });

    // update task if it exists
    const task = tasksArray.find((task: taskType | []) => {
      return !Array.isArray(task) && task._id === id;
    });

    if (task === undefined || Array.isArray(task)) {
      // used to prevent ts errors
      return setTimeFocused(0);
    }

    const data = {
      ...task,
      timeSpend: task?.timeSpend + timeFocused,
    };

    await apiCall("updateTaskTimeSpend", data, () => {
      const newTasksArray: Array<taskType | []> = tasksArray.map(
        (item: taskType | []) => {
          // check type to excude empty arrays (used for error handling ts)
          if (Array.isArray(item)) {
            return item;
          }
          if (task._id === item._id) {
            return { ...item, timeSpend: item.timeSpend + timeFocused };
          }
          return item;
        }
      );
      setTasksArray(newTasksArray);
      userDataObject.tasks = newTasksArray;
      localStorage.setItem("userData", JSON.stringify(userDataObject));
      setEditTask(false);
    });
  };

  const updatePomodoroDoneAndTimeSpend = async (id: string | null) => {
    // get user data from local storage

    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    const user = userDataObject.user;

    const userData = {
      timeSpend: timeFocused,
    };

    apiCall("updateTimeSpend", userData, () => {
      user.totalTimeSpend = user.totalTimeSpend + timeFocused;
      userDataObject.user = user;
      localStorage.setItem("userData", JSON.stringify(userDataObject));
    });

    // update task if it exists
    const task = tasksArray.find((task: taskType | []) => {
      if (Array.isArray(task)) {
        return null;
      }
      return task._id === id;
    });
    if (task === undefined) {
      return setTimeFocused(0);
    }

    if (Array.isArray(task)) {
      return false;
      // this bloc prevent typescript's errors in data bellow, it verify if task is an array
    }

    const data = {
      ...task,
      timeSpend: task.timeSpend + timeFocused,
      numberOfPomodoroDone: task.numberOfPomodoroDone + 1,
    };

    await apiCall("updatePomodoroDoneAndTimeSpend", data, () => {
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
      userDataObject.tasks = newTasksArray;
      localStorage.setItem("userData", JSON.stringify(userDataObject));
      setEditTask(false);
    });
    setTimeFocused(0);
  };

  const handleTaskDone = async (id: string | null) => {
    const task = tasksArray.find((task: taskType | []) => {
      if (Array.isArray(task)) {
        return null;
      }
      return task._id === id;
    });

    if (task === undefined) {
      return;
    }
    const data = {
      ...task,
      taskDone: true,
    };

    await apiCall("taskDone", data, () => {
      const newTasksArray: Array<taskType | []> = tasksArray.map(
        (item: taskType | []) => {
          if (Array.isArray(task)) {
            return;
            // this bloc prevent typescript's errors in data bellow, it verify if task is an array
          }
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
    });
  };

  const handleTaskGiveUp = async (id: string | null) => {
    const task = tasksArray.find((task: taskType | []) => {
      if (Array.isArray(task)) {
        return task;
      }
      return task._id === id;
    });

    if (task === undefined) {
      return;
    }

    const data = {
      ...task,
      status: "gaveUp",
    };

    await apiCall("giveUpTask", data, () => {
      const newTasksArray: Array<taskType | []> = tasksArray.map(
        (item: taskType | []) => {
          // check type to excude empty arrays (used for error handling ts)
          if (Array.isArray(item)) {
            return item;
          }
          if (Array.isArray(task)) {
            return task;
            // this bloc prevent typescript's errors in data bellow, it verify if task is an array
          }

          // return the data
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
    });
  };

  const checkIfTaskIsDone = (task: taskType) => {
    if (task.numberOfPomodoroDone >= task.numberOfPomodoroSet) {
      return true;
    }
    return false;
  };

  return (
    <div className="tasksContainer">
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
      {tasksArray
        .filter(
          (task) =>
            !Array.isArray(task) &&
            task?.taskDone !== true &&
            task?.status !== "gaveUp"
        )
        .map((task: taskType | [], index: number) => {
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
                  : checkIfTaskIsDone(task) === true
                  ? null
                  : setTaskIdFocused(task._id);
                setTaskName(task.taskName);
              }}
              className={
                openTask && taskId === task._id
                  ? "taskContainer taskDropDowned"
                  : "taskContainer"
              }>
              {checkIfTaskIsDone(task) === true && (
                <div className="activePastille DonePastille"></div>
              )}
              {taskIdFocused === task._id &&
                checkIfTaskIsDone(task) === false && (
                  <div className="activePastille"></div>
                )}
              <div
                className="taskHeader"
                style={{
                  paddingLeft:
                    taskIdFocused === task._id ||
                    checkIfTaskIsDone(task) === true
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
                    taskIdFocused === task._id ||
                    checkIfTaskIsDone(task) === true
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
                      {checkIfTaskIsDone(task) === false ? (
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
                            id="giveUpButton"
                            onClick={(e) => {
                              e.stopPropagation(), setTypeOfModal("giveUp");
                            }}>
                            Give up
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
      {(typeOfModal === "done" ||
        typeOfModal === "delete" ||
        typeOfModal === "giveUp") && (
        <ConfirmModal
          typeOfModal={typeOfModal}
          setTypeOfModal={setTypeOfModal}
          deleteTask={deleteTask}
          handleTaskDone={handleTaskDone}
          handleTaskGiveUp={handleTaskGiveUp}
          taskId={taskId}
          taskName={taskName}
          setOpenTask={setOpenTask}
        />
      )}
    </div>
  );
};

export default Tasks;
