import { useContext, useEffect, useState } from "react";
import "./modalCreateTask.scss";
import { ThemeContext } from "../../../../context/MyProviders";
import { CrossSvg } from "../../../../assets/svg/svg";
import { useBackendRoute } from "../../../../hooks/UseBackendRoute";

const ModalCreateTask = ({ modal, setModal }) => {
  // context state
  const { themeColor }: any = useContext(ThemeContext);
  const areaMaxLength = 200;
  // tasks states
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numberOfPomodoro, setNumberOfPomodoro] = useState<number | undefined>(
    undefined
  );
  const { apiCall } = useBackendRoute();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      taskName: taskName,
      description: description,
      numberOfPomodoroSet: numberOfPomodoro,
    };

    await apiCall("createTask", data, () => {
      setModal(!modal);
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
