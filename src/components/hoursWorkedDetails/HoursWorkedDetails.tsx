import React, { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 1. Import Filler plugin
} from "chart.js";

ChartJS.register(
  TimeScale,
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
import { taskType } from "../../utils/types/globalTypes";

type pageSelectedType = "days" | "weeks" | "months";

type HoursWorkedDetailsProps = {
  data: Array<taskType>;
};

interface organizedData {
  weeks: object;
  days: object;
  years: object;
}

const HoursWorkedDetails: FC<HoursWorkedDetailsProps> = ({ data }) => {
  const [pageSelected, setPageSelected] = useState<pageSelectedType>("days");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chartData, setChartData] = useState({
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
  });

  useEffect(() => {}, [data, pageSelected]);

  // console.log("DATA => ", data)

  const graphOptions = {
    responsive: true,
    tension: 0.4,
    aspectRatio: 0, // change the width of the graph
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div id="hoursWorkedDetailsHeader">
        <h2>Hours details</h2>

        <div>
          <div id="hoursWorkedDetailsHeaderButtons">
            <button
              onClick={() => {
                // setPageSelected("days"), organizeDataByTime();
              }}
              className={pageSelected === "days" ? "active" : ""}>
              Week
            </button>
            <button
              onClick={() => {
                // setPageSelected("weeks"), organizeDataByTime();
              }}
              className={pageSelected === "weeks" ? "active" : ""}>
              Month
            </button>
            <button
              onClick={() => {
                // setPageSelected("months"), organizeDataByTime();
              }}
              className={pageSelected === "months" ? "active" : ""}>
              Year
            </button>
          </div>
          <div id="hoursWorkedDetailsWeekHandler">
            <button onClick={() => {}}>Previous</button>
            <h3>YEAH</h3>
            <button onClick={() => {}}>Next</button>
          </div>
        </div>
      </div>
      <div id="hoursWorkedDetailsContent">
        <Graph graphOptions={graphOptions} data={chartData} />
      </div>
    </>
  );
};

export default HoursWorkedDetails;
