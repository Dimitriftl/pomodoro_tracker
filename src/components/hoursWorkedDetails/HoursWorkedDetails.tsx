import React, { useState } from "react";
import "./hoursWorkedDetails.scss";

type pageSelected = "week" | "month" | "year";

const HoursWorkedDetails = () => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");

  return (
    <>
      <div id="hoursWorkedDetailsHeader">
        <h2>hours details</h2>
        <div id="hoursWorkedDetailsHeaderButtons">
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
        <div id="hoursWorkedDetailsWeekHandler">
          <button>Previous</button>
          <h3>Week 1</h3>
          <button>Next</button>
        </div>
      </div>
      <div id="hoursWorkedDetailsContent"></div>
    </>
  );
};

export default HoursWorkedDetails;
