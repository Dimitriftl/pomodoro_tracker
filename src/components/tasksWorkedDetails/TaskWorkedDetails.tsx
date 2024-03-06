import React, { FC, useEffect, useState } from "react";
import "./taskWorkedDetails.scss";
import Graph from "../graph/Graph";
import { taskType } from "../../utils/types/globalTypes";
import { RightArrowSvg } from "../../assets/svg/svg.jsx";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  getWeek,
  getMonth,
  getYear,
} from "date-fns";

type TaskWorkedDetailsPorps = {
  tasks: Array<taskType>;
};

type pageSelected = "week" | "month" | "year";

const TaskWorkedDetails: FC<TaskWorkedDetailsPorps> = ({ tasks }) => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfWeekDate = startOfWeek(currentDate);
  const endOfWeekDate = endOfWeek(currentDate);
  const [headerDate, setHeaderDate] = useState<any>(
    `${startOfWeekDate.getDate()}/${
      startOfWeekDate.getMonth() + 1
    }/${startOfWeekDate.getFullYear()} - ${endOfWeekDate.getDate()}/${
      endOfWeekDate.getMonth() + 1
    }/${endOfWeekDate.getFullYear()}`
  );

  const reduceMinute = (time: number) => {
    const minutes = time / 60;
    const minutesReduced = minutes.toFixed(0);
    return minutesReduced;
  };

  const handlePrevious = () => {
    // Logique pour passer à la période précédente
    // Mettre à jour chartData avec les nouvelles données
    switch (pageSelected) {
      case "week":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() - 7
            )
        );

        break;
      case "month":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() - 1,
              prevDate.getDate()
            )
        );
        break;
      case "year":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() - 1,
              prevDate.getDate()
            )
        );
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (pageSelected) {
      case "week":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() + 7
            )
        );
        break;
      case "month":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() + 1,
              prevDate.getDate()
            )
        );
        break;
      case "year":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() + 1,
              prevDate.getDate()
            )
        );
        break;
      default:
        break;
    }
  };

  // useEffect update current date
  useEffect(() => {
    switch (pageSelected) {
      case "week": {
        setHeaderDate(
          `${startOfWeekDate.getDate()}/${
            startOfWeekDate.getMonth() + 1
          }/${startOfWeekDate.getFullYear()} - ${endOfWeekDate.getDate()}/${
            endOfWeekDate.getMonth() + 1
          }/${endOfWeekDate.getFullYear()}`
        );
        break;
      }
      case "month": {
        const monthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );

        setHeaderDate(
          `${monthDate.getDate()}/${
            monthDate.getMonth() + 1
          }/${monthDate.getFullYear()}`
        );
        break;
      }
      case "year": {
        const startOfYearDate = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYearDate = new Date(currentDate.getFullYear(), 11, 31);

        setHeaderDate(
          `${startOfYearDate.getDate()}/${
            startOfYearDate.getMonth() + 1
          }/${startOfYearDate.getFullYear()} - ${endOfYearDate.getDate()}/${
            endOfYearDate.getMonth() + 1
          }/${endOfYearDate.getFullYear()}`
        );
        break;
      }
      default:
        setHeaderDate(getWeek(currentDate));
        break;
    }
  }, [currentDate]);

  const filteredTask = () => {
    const targetWeek = getWeekNumber(new Date(currentDate));
    const targetMonth = new Date(currentDate).getMonth();
    const targetYear = new Date(currentDate).getFullYear();
    switch (pageSelected) {
      case "week":
        return tasks.filter((task) => {
          const taskWeek = getWeekNumber(new Date(task.creationDate));
          return taskWeek === targetWeek;
        });

      case "month":
        return tasks.filter((task) => {
          const taskMonth = new Date(task.creationDate).getMonth();
          return taskMonth === targetMonth;
        });

      case "year":
        return tasks.filter((task) => {
          const taskYear = new Date(task.creationDate).getFullYear();
          return taskYear === targetYear;
        });

      default:
        return tasks;
    }
  };

  // Fonction pour obtenir le numéro de semaine
  const getWeekNumber = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
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
            <button
              onClick={() => handlePrevious()}
              className="arrowButton reverse">
              {" "}
              <RightArrowSvg />
            </button>
            <h3>{headerDate}</h3>
            <button onClick={() => handleNext()} className="arrowButton">
              <RightArrowSvg />
            </button>
          </div>
        </div>
      </div>
      <div id="tasksWorkedDetailsContainer">
        {filteredTask().length > 0 ? (
          filteredTask().map((task) => {
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
          })
        ) : (
          <h2 id="noTaskFounded">No task founded</h2>
        )}
      </div>
    </>
  );
};

export default TaskWorkedDetails;
