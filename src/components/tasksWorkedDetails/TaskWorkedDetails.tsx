import React, { useState } from "react";
import "./taskWorkedDetails.scss";

type pageSelected = "week" | "month" | "year";

const TaskWorkedDetails = () => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");

  return (
    <>
      <div id="tasksWorkedDetailsHeader">
        <h2>Tasks details</h2>
        <div id="tasksWorkedDetailsHeaderButtons">
          <button
            onClick={() => setPageSelected("week")}
            className={pageSelected === "week" ? "active" : ""}
          >
            Week
          </button>
          <button
            onClick={() => setPageSelected("month")}
            className={pageSelected === "month" ? "active" : ""}
          >
            Month
          </button>
          <button
            onClick={() => setPageSelected("year")}
            className={pageSelected === "year" ? "active" : ""}
          >
            Year
          </button>
        </div>
        <div id="tasksWorkedDetailsWeekHandler">
          <button>Previous</button>
          <h3>Week 1</h3>
          <button>Next</button>
        </div>
      </div>
      <div id="tasksWorkedDetailsContent"></div>
    </>
  );
};

export default TaskWorkedDetails;
