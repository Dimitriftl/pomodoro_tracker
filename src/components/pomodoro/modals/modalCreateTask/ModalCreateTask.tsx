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
import ListOfHours from "./listOfHours/ListOfHours";

type modalProps = {
  modal: boolean;
  setMdoal: Dispatch<SetStateAction<boolean>>;
};

const hoursArray = [
  { time: "12:00am" },
  { time: "12:30am" },
  { time: "1:00am" },
  { time: "1:30am" },
  { time: "2:00am" },
  { time: "2:30am" },
  { time: "3:00am" },
  { time: "3:30am" },
  { time: "4:00am" },
  { time: "4:30am" },
  { time: "5:00am" },
  { time: "5:30am" },
  { time: "6:00am" },
  { time: "6:30am" },
  { time: "7:00am" },
  { time: "7:30am" },
  { time: "8:00am" },
  { time: "8:30am" },
  { time: "9:00am" },
  { time: "9:30am" },
  { time: "10:00am" },
  { time: "10:30am" },
  { time: "11:00am" },
  { time: "11:30am" },
  { time: "12:00pm" },
  { time: "12:30pm" },
  { time: "1:00pm" },
  { time: "1:30pm" },
  { time: "2:00pm" },
  { time: "2:30pm" },
  { time: "3:00pm" },
  { time: "3:30pm" },
  { time: "4:00pm" },
  { time: "4:30pm" },
  { time: "5:00pm" },
  { time: "5:30pm" },
  { time: "6:00pm" },
  { time: "6:30pm" },
  { time: "7:00pm" },
  { time: "7:30pm" },
  { time: "8:00pm" },
  { time: "8:30pm" },
  { time: "9:00pm" },
  { time: "9:30pm" },
  { time: "10:00pm" },
  { time: "10:30pm" },
  { time: "11:00pm" },
  { time: "11:30pm" },
];

const ModalCreateTask = ({ modal, setModal }) => {
  // context state
  const { themeColor } = useContext(ThemeContext);
  const areaMaxLength = 120;
  // tasks states
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // date states
  const [taskDate, setTaskDate] = useState<string>("");
  const [taskStartTime, setTaskStartTime] = useState<string>("");
  const [taskEndTime, setTaskEndTime] = useState<string>("");



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

  // date
  // get current date, used for min date in input
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // format date
  const handleDateChange = (e) => {
    const result = e.target.value.split("-").reverse().join("-");

    setTaskDate(result);
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
        <form id="createTaskForm">
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            id="taskName"
            placeholder="Add a title"
          />
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
          <div id="dateInputsContainer">
            <ClockSvg theme={themeColor} />
            <div className="dateInput">
              <input
                type="date"
                name="date"
                id="date"
                min={`${year}-${month}-${day}`}
                onChange={(e) => handleDateChange(e)}
              />
            </div>
            <div className="hoursInputs">
              <div id="firstHourInput">
                <input
                  type="text"
                  readOnly={true}
                  name="startTime"
                  id="startTime"
                />
                <ListOfHours
                  hoursArray={hoursArray}
                  setTaskStartTime={setTaskStartTime}
                  setTaskEndTime={setTaskEndTime}
                />
              </div>
              <div id="secondHourInput">
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  readOnly={true}
                />
                 <ListOfHours
                  hoursArray={hoursArray}
                  setTaskStartTime={setTaskStartTime}
                  setTaskEndTime={setTaskEndTime}
                />
              </div>
            </div>
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
