import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import "./confirmModal.scss";
import {
  WarningSvg,
  LittleClockSvg,
  TimerSvg,
} from "../../../../assets/svg/svg.jsx";
import { ThemeContext } from "../../../../context/MyProviders.js";

type typeOfModalTypes = "delete" | "done" | null;

interface ConfirmModalProps {
  typeOfModal: typeOfModalTypes;
  setTypeOfModal: Dispatch<SetStateAction<typeOfModalTypes>>;
  deleteTask?: (id: string) => void;
  taskId: string | null;
  taskName: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  typeOfModal,
  setTypeOfModal,
  deleteTask,
  taskId,
  taskName,
}) => {
  const { themeColor } = useContext(ThemeContext);

  return (
    <>
      <div id="overlay" onClick={() => setTypeOfModal(null)}>
        {" "}
      </div>
      <div id="confirmModalContainer">
        {typeOfModal === "delete" ? (
          <>
            <div className="confirmModalHeader">
              <WarningSvg />
              <h2 style={{ color: "var(--color-red)" }}>Delete task</h2>
            </div>
            <div className="confirmModalContent">
              <p>
                You're about to{" "}
                <span style={{ color: "var(--color-red)", fontWeight: "500" }}>
                  delete
                </span>{" "}
                your task “<span style={{ fontWeight: "500" }}>{taskName}</span>
                ” . <br />
                Are you sure this is what you wanted to do ?{" "}
              </p>
            </div>
            <div className="confirmModalFooter">
              <button
                className="confirmModalCancelButton"
                onClick={() => setTypeOfModal(null)}>
                Cancel
              </button>
              <button
                id="confirmModalDeleteButton"
                onClick={() => deleteTask(taskId)}>
                Delete
              </button>
            </div>
          </>
        ) : typeOfModal === "done" ? (
          <>
            <div className="confirmModalHeader">
              <TimerSvg theme={themeColor} />
              <h2>Task Done</h2>
            </div>
            <div className="confirmModalContent">
              <p>
                You’re about to set your task your task “
                <span style={{ fontWeight: "500" }}>{taskName}</span>” on{" "}
                <span style={{ fontWeight: "500", color: "var(--color-blue)" }}>
                  Done
                </span>{" "}
                . <br />
                The task will disappear from your tasks to focus on and will be
                added to your dashboard are you sure you want to continue ?{" "}
              </p>
            </div>
            <div className="confirmModalFooter">
              <button
                className="confirmModalCancelButton"
                onClick={() => setTypeOfModal(null)}>
                Cancel
              </button>
              <button
                id="confirmModalDoneButton"
                onClick={() => console.log("done")}>
                <LittleClockSvg color="#FFF" />
                Done
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ConfirmModal;
