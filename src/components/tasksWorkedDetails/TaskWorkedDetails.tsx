import React, { useState } from "react";
import "./taskWorkedDetails.scss";
import Graph from "../graph/Graph";

type pageSelected = "week" | "month" | "year";

const TaskWorkedDetails = () => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours worked",
        data: [12, 19, 3, 5, 0, 3, 10],
        borderColor: "#678bff",
        backgroundColor: (context: any) => {
          const bgColor = ["#617dd9b4", "#678aff1f"];
          if (!context.chart.chartArea) return null;
          console.log(context.chart.chartArea);
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        fill: true,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    tension: 0,
    aspectRatio: 0,
  };

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
      <div id="tasksWorkedDetailsContent">
        <Graph graphOptions={graphOptions} data={data} />
      </div>
    </>
  );
};

export default TaskWorkedDetails;
