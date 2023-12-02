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

type modalProps = {
  modal: boolean;
  setMdoal: Dispatch<SetStateAction<boolean>>;
};

const arrayOfHours = [
  { id: 1, time: "12:00am" },
  { id: 2, time: "12:30am" },
  { id: 3, time: "1:00am" },
  { id: 4, time: "1:30am" },
  { id: 5, time: "2:00am" },
  { id: 6, time: "2:30am" },
  { id: 7, time: "3:00am" },
  { id: 8, time: "3:30am" },
  { id: 9, time: "4:00am" },
  { id: 10, time: "4:30am" },
  { id: 11, time: "5:00am" },
  { id: 12, time: "5:30am" },
  { id: 13, time: "6:00am" },
  { id: 14, time: "6:30am" },
  { id: 15, time: "7:00am" },
  { id: 16, time: "7:30am" },
  { id: 17, time: "8:00am" },
  { id: 18, time: "8:30am" },
  { id: 19, time: "9:00am" },
  { id: 20, time: "9:30am" },
  { id: 21, time: "10:00am" },
  { id: 22, time: "10:30am" },
  { id: 23, time: "11:00am" },
  { id: 24, time: "11:30am" },
  { id: 25, time: "12:00pm" },
  { id: 26, time: "12:30pm" },
  { id: 27, time: "1:00pm" },
  { id: 28, time: "1:30pm" },
  { id: 29, time: "2:00pm" },
  { id: 30, time: "2:30pm" },
  { id: 31, time: "3:00pm" },
  { id: 32, time: "3:30pm" },
  { id: 33, time: "4:00pm" },
  { id: 34, time: "4:30pm" },
  { id: 35, time: "5:00pm" },
  { id: 36, time: "5:30pm" },
  { id: 37, time: "6:00pm" },
  { id: 38, time: "6:30pm" },
  { id: 39, time: "7:00pm" },
  { id: 40, time: "7:30pm" },
  { id: 41, time: "8:00pm" },
  { id: 42, time: "8:30pm" },
  { id: 43, time: "9:00pm" },
  { id: 44, time: "9:30pm" },
  { id: 45, time: "10:00pm" },
  { id: 46, time: "10:30pm" },
  { id: 47, time: "11:00pm" },
  { id: 48, time: "11:30pm" },
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
  const [arrayFiltered, setArrayFiltered] = useState<
    { id: number; time: string }[]
  >([]);

  // hours list modals
  const [isStartTimeOpen, setIsStartTimeOpen] = useState<boolean>(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState<boolean>(false);

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
  const month = date.getMonth() + 1; // +1 because month start at 0
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
            <div id="dateInput">
              <ClockSvg theme={themeColor} />
              <input
                type="date"
                name="date"
                id="date"
                min={`${year}-${month}-${day}`}
                onChange={(e) => handleDateChange(e)}
              />
            </div>
            <div id="hoursInputs">
              <div id="firstHourInput">
                <input
                  type="text"
                  readOnly={true}
                  value={taskStartTime}
                  name="startTime"
                  id="startTime"
                  onClick={() => {
                    setIsStartTimeOpen(!isStartTimeOpen),
                      setIsEndTimeOpen(false);
                  }}
                />
                {isStartTimeOpen && (
                  <ListOfHoursStart
                    arrayOfHours={arrayOfHours}
                    setTaskStartTime={setTaskStartTime}
                    setArrayFiltered={setArrayFiltered}
                    setIsStartTimeOpen={setIsStartTimeOpen}
                  />
                )}
              </div>
              <span>-</span>
              <div id="secondHourInput">
                <input
                  type="text"
                  value={taskEndTime}
                  name="endTime"
                  id="endTime"
                  readOnly={true}
                  onClick={() => {
                    arrayFiltered.length > 0 &&
                      setIsEndTimeOpen(!isEndTimeOpen),
                      setIsStartTimeOpen(false);
                  }}
                />
                {isEndTimeOpen && (
                  <ListOfHoursEnd
                    arrayFiltered={arrayFiltered}
                    setTaskEndTime={setTaskEndTime}
                    setIsEndTimeOpen={setIsEndTimeOpen}
                  />
                )}
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
