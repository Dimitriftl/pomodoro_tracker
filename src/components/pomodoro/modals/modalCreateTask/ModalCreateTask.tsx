import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./modalCreateTask.scss";
import { ThemeContext } from "../../../../context/MyProviders";
import { CrossSvg } from "../../../../assets/svg/svg";

type modalProps = {
  modal: boolean;
  setMdoal: Dispatch<SetStateAction<boolean>>;
};

const ModalCreateTask = ({ modal, setModal }) => {
  // context state
  const { themeColor } = useContext(ThemeContext);
  const [description, setDescription] = useState<string>("");
  const areaMaxLength = 120;

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
            id="taskName"
            placeholder="Add a title"
          />
          <div id="textareaContainer">
            {/* créer un conteur de caractères */}
            <textarea
              maxLength={areaMaxLength}
              name="taskDesciption"
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <p id="caracCounter">
              {description.length}/{areaMaxLength}
            </p>
          </div>
          <div id="modalFooter">
            <button id="validate" className="backgroundBlue" type="submit">
              <p>valider</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalCreateTask;
