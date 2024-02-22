import React, { FC, useState } from "react";
import "./taskWorkedDetails.scss";
import Graph from "../graph/Graph";
import { taskType } from "../../utils/types/globalTypes";
import { RightArrowSvg } from "../../assets/svg/svg.jsx";

type TaskWorkedDetailsPorps = {
  tasks: Array<taskType>;
};

type pageSelected = "week" | "month" | "year";

const TaskWorkedDetails: FC<TaskWorkedDetailsPorps> = ({ tasks }) => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");

  console.log(tasks, "tasks");

  const reduceMinute = (time: number) => {
    const minutes = time / 60;
    const minutesReduced = minutes.toFixed(0);
    return minutesReduced;
  };

  return (
    <>
      <div id="tasksWorkedDetailsHeader">
        <h2>Tasks details</h2>
        <div id="tasksWorkedDetailsHeaderButtons">
          <div id="tasksWorkedDetailsDateButtons">
            <button
              onClick={() => setPageSelected("week")}
              className={pageSelected === "week" ? "active" : ""}>
              Week
            </button>
            <button
              onClick={() => setPageSelected("month")}
              className={pageSelected === "month" ? "active" : ""}>
              Month
            </button>
            <button
              onClick={() => setPageSelected("year")}
              className={pageSelected === "year" ? "active" : ""}>
              Year
            </button>
          </div>
          <div id="tasksWorkedDetailsWeekHandler">
            <button className="arrowButton reverse">
              {" "}
              <RightArrowSvg />
            </button>
            <h3>Week 1</h3>
            <button className="arrowButton">
              <RightArrowSvg />
            </button>
          </div>
        </div>
      </div>
      <div id="tasksWorkedDetailsContainer">
        {tasks.map((task) => {
          return (
            <div className="taskWorkedDetailsCard">
              <div className="taskNameContainer">
                <span className="bubbleInfo">{task.description}</span>

                <p>{task.taskName}</p>
              </div>
              <div className="taskDescriptionContainer">
                <span className="bubbleInfo">{task.description}</span>
                <p className="taskDescription">{task.description}</p>
              </div>

              <div className="taskTimeSpendContainer">
                <p>{reduceMinute(task.timeSpend)} min</p>
              </div>
              <div className="taskPomodoroContainer">
                <p>
                  {task.numberOfPomodoroDone} / {task.numberOfPomodoroSet}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TaskWorkedDetails;
