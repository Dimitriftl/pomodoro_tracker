import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 1. Import Filler plugin
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // 1. Register Filler plugin
);
import "./hoursWorkedDetails.scss";
import Graph from "../graph/Graph";

type pageSelected = "week" | "month" | "year";

const HoursWorkedDetails = () => {
  const [pageSelected, setPageSelected] = useState<pageSelected>("week");

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours worked",
        data: [12, 19, 3, 5, 0, 3, 10, 8, 18, 5, 7, 9, 2, 1],
        borderColor: "#678bff",
        backgroundColor: (context) => {
          const bgColor = ["#617dd9b4", "#678aff1f"];

          if (!context.chart.chartArea) return null;
          const {
            ctx,
            data,
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
    // change the width of the graph
  };

  return (
    <>
      <div id="hoursWorkedDetailsHeader">
        <h2>Hours details</h2>
        <div id="hoursWorkedDetailsHeaderButtons">
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
        <div id="hoursWorkedDetailsWeekHandler">
          <button>Previous</button>
          <h3>Week 1</h3>
          <button>Next</button>
        </div>
      </div>
      <div id="hoursWorkedDetailsContent">
        <Graph graphOptions={graphOptions} data={data} />
      </div>
    </>
  );
};

export default HoursWorkedDetails;
