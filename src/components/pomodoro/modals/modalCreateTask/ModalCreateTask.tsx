import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./modalCreateTask.scss";
import { ThemeContext } from "../../../../context/MyProviders";
import { CrossSvg, ClockSvg } from "../../../../assets/svg/svg";
import ListOfHoursStart from "./listOfHoursStart/ListOfHours";
import ListOfHoursEnd from "./listOfHoursEnd/ListOfHoursEnd";
import axios from "axios";
import Cookies from "js-cookie";

type modalProps = {
  modal: boolean;
  setMdoal: Dispatch<SetStateAction<boolean>>;
};

const ModalCreateTask = ({ modal, setModal }) => {
  // context state
  const { themeColor } = useContext(ThemeContext);
  const areaMaxLength = 200;
  // tasks states
  const [taskName, setTaskName] = useState<string>("travailler projet d'ecole");
  const [description, setDescription] = useState<string>(
    "Tasks créée depuis le front"
  );
  const [numberOfPomodoro, setNumberOfPomodoro] = useState<number | undefined>(
    3
  );
  const token = Cookies.get("accessToken");
  // hours list modals

  // handle la fermerture du modal avec la touche escape / esc
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setModal(!modal);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (!modal) {
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [modal]);

  const handlePomodoroInputChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result === "0") {
      return null;
    }
    setNumberOfPomodoro(result);
  };

  const updateLocalStorage = (data: any) => {
    const localUserData = localStorage.getItem("userData");
    const userDataObject = JSON.parse(localUserData || "{}");
    const tasksArray = userDataObject.tasks || [];
    const newAtasksArray = [...tasksArray, data];
    // Met à jour la propriété "tasks"
    userDataObject.tasks = newAtasksArray;
    const newUserDataString = JSON.stringify(userDataObject);
    // Met à jour le contenu du localStorage
    localStorage.setItem("userData", newUserDataString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskName, description, numberOfPomodoro);
    const data = {
      taskName: taskName,
      description: description,
      numberOfPomodoroSet: numberOfPomodoro,
    };

    axios
      .post("http://localhost:3000/api/tasks/", data, {
        headers: {
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data, "create task response");
        updateLocalStorage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="overlay" onClick={() => setModal(!modal)}></div>
      <div className="modalCreateTaskContent background">
        <div id="modalHeader">
          <h2>Create a new task.</h2>
          <button id="closeModal" onClick={() => setModal(!modal)}>
            <CrossSvg theme={themeColor} />
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} id="createTaskForm">
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            id="taskName"
            placeholder="Add a title"
          />
          <div id="numberOfPomodoroContainer">
            <input
              placeholder="Number of pomodoro"
              type="text"
              value={numberOfPomodoro}
              onChange={(e) => handlePomodoroInputChange(e)}
            />
          </div>
          <div id="textareaContainer">
            <textarea
              maxLength={areaMaxLength}
              name="taskDesciption"
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <p id="numberOfCarac">
              {description.length}/{areaMaxLength}
            </p>
          </div>

          <div id="modalFooter">
            <button id="validate" className="backgroundBlue" type="submit">
              valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalCreateTask;
