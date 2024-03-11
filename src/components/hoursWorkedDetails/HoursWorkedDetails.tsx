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
  getWeekYear,
  startOfYear,
  endOfYear,
} from "date-fns";

import { RightArrowSvg } from "../../assets/svg/svg.jsx";

type pageSelectedType = "week" | "month" | "year";

type HoursWorkedDetailsProps = {
  data: Array<taskType>;
};

const HoursWorkedDetails: FC<HoursWorkedDetailsProps> = ({ data }) => {
  const [pageSelected, setPageSelected] = useState<pageSelectedType>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours worked",
        data: [12, 19, 3, 5, 0, 3, 10],
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
  const startOfWeekDate = startOfWeek(currentDate);
  const endOfWeekDate = endOfWeek(currentDate);
  const [chartHeaderDate, setChartHeaderDate] = useState<any>(
    `${startOfWeekDate.getDate()}/${
      startOfWeekDate.getMonth() + 1
    }/${startOfWeekDate.getFullYear()} - ${endOfWeekDate.getDate()}/${
      endOfWeekDate.getMonth() + 1
    }/${endOfWeekDate.getFullYear()}`
  );

  const compressedData: Array<
    { creationDate: string | Date; timeSpend: number } | []
  > = [];

  const dataCompression = () => {
    let i = 0;
    while (i < data.length) {
      const currentDate = new Date(data[i]?.creationDate);
      // Initial entry for the current date
      const compressedEntry = {
        creationDate: currentDate,
        timeSpend: data[i].timeSpend,
      };

      // Find consecutive entries with the same date
      let j = i + 1;
      while (
        j < data.length &&
        currentDate.getDate() === new Date(data[j]?.creationDate).getDate()
      ) {
        compressedEntry.timeSpend += data[j].timeSpend;
        j += 1;
      }
      // Update the main loop index
      i = j;
      compressedData.push(compressedEntry);
    }
  };

  const dataCompressionForYear = () => {
    let i = 0;
    while (i < data.length) {
      const currentDate = new Date(data[i]?.creationDate);
      // Initial entry for the current date
      const compressedEntry = {
        creationDate: currentDate,
        timeSpend: data[i].timeSpend,
      };

      // Find consecutive entries with the same date
      let j = i + 1;
      while (
        j < data.length &&
        currentDate.getMonth() === new Date(data[j]?.creationDate).getMonth()
      ) {
        compressedEntry.timeSpend += data[j].timeSpend;
        j += 1;
      }
      // Update the main loop index
      i = j;
      compressedData.push(compressedEntry);
    }
  };

  // useEffect update current date
  useEffect(() => {
    switch (pageSelected) {
      case "week": {
        setChartHeaderDate(
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

        setChartHeaderDate(
          `${monthDate.getDate()}/${
            monthDate.getMonth() + 1
          }/${monthDate.getFullYear()}`
        );
        break;
      }
      case "year": {
        const startOfYearDate = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYearDate = new Date(currentDate.getFullYear(), 11, 31);

        setChartHeaderDate(
          `${startOfYearDate.getDate()}/${
            startOfYearDate.getMonth() + 1
          }/${startOfYearDate.getFullYear()} - ${endOfYearDate.getDate()}/${
            endOfYearDate.getMonth() + 1
          }/${endOfYearDate.getFullYear()}`
        );
        break;
      }
      default:
        setChartHeaderDate(getWeek(currentDate));
        break;
    }
  }, [currentDate]);

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
              prevDate.getFullYear() - 1,
              prevDate.getMonth(),
              prevDate.getDate()
            )
        );
        break;
      default:
        break;
    }
  };

  console.log(currentDate, "currentDate");

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
              prevDate.getFullYear() + 1,
              prevDate.getMonth(),
              prevDate.getDate()
            )
        );
        break;
      default:
        break;
    }
  };

  const generateLabelsAndData = (compressedData) => {
    let labels: any[] = [];
    let filteredData = [];
    let filteredDataForYear = [];

    switch (pageSelected) {
      case "week":
        labels = eachDayOfInterval({
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate),
        });
        break;
      case "month":
        labels = eachDayOfInterval({
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        });
        break;
      case "year":
        labels = eachMonthOfInterval({
          start: startOfYear(currentDate),
          end: endOfYear(currentDate),
        });
        break;
      default:
        break;
    }

    filteredData = labels.map((date) => {
      const dataForDate =
        compressedData.length !== 0 &&
        compressedData.find(
          (item) =>
            item.creationDate.toLocaleDateString() === date.toLocaleDateString()
        );

      return dataForDate ? dataForDate.timeSpend : 0;
    });

    filteredDataForYear = labels.map((date) => {
      const dataForDate =
        compressedData.length !== 0 &&
        compressedData.find(
          (item) => item.creationDate.getMonth() === date.getMonth()
        );

      return dataForDate ? dataForDate.timeSpend : 0;
    });

    return { labels, filteredData, filteredDataForYear };
  };

  useEffect(() => {
    if (pageSelected === "year") {
      dataCompressionForYear();
    } else;
    dataCompression();
    const { labels, filteredData, filteredDataForYear } =
      generateLabelsAndData(compressedData);

    setChartData({
      labels: labels.map((label) => label.toLocaleDateString()), // Formatage de la date selon vos besoins
      datasets: [
        {
          label: "minutes worked",
          data:
            pageSelected === "year"
              ? filteredDataForYear.map((data) => Math.floor(data / 60))
              : filteredData.map((data) => Math.floor(data / 60)),
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
  }, [data, pageSelected, currentDate]);

  const graphOptions = {
    responsive: true,
    tension: 0.4,
    aspectRatio: 0, // change the width of the graph
    scales: {
      y: {
        beginAtZero: true, // Définit l'échelle Y pour commencer à zéro
      },
    },
  };

  return (
    <>
      <div id="hoursWorkedDetailsHeader">
        <h2>Hours details</h2>
        <div id="hoursWorkedDetailsHeaderButtons">
          <button
            onClick={() => {
              setPageSelected("week"),
                setChartHeaderDate(
                  `${startOfWeekDate.getDate()}/${
                    startOfWeekDate.getMonth() + 1
                  }/${startOfWeekDate.getFullYear()} - ${endOfWeekDate.getDate()}/${
                    endOfWeekDate.getMonth() + 1
                  }/${endOfWeekDate.getFullYear()}`
                );
            }}
            className={pageSelected === "week" ? "active" : ""}>
            Week
          </button>
          <button
            onClick={() => {
              setPageSelected("month"),
                setChartHeaderDate(
                  `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
                );
            }}
            className={pageSelected === "month" ? "active" : ""}>
            Month
          </button>
          <button
            onClick={() => {
              setPageSelected("year"),
                setChartHeaderDate(
                  `${currentDate.getDate()}/${
                    currentDate.getMonth() + 1
                  }/${currentDate.getFullYear()} - ${currentDate.getDate()}/${
                    currentDate.getMonth() + 1
                  }/${currentDate.getFullYear()}`
                );
            }}
            className={pageSelected === "year" ? "active" : ""}>
            Year
          </button>
        </div>
        <div id="hoursWorkedDetailsWeekHandler">
          <button
            className="arrowButton reverse"
            onClick={() => handlePrevious()}>
            {" "}
            <RightArrowSvg color={"var(--color-text)"} />
          </button>
          <h3>{chartHeaderDate}</h3>
          <button className="arrowButton" onClick={() => handleNext()}>
            {" "}
            <RightArrowSvg color={"var(--color-text)"} />
          </button>
        </div>
      </div>
      <div id="hoursWorkedDetailsContent">
        <Graph graphOptions={graphOptions} data={chartData} />
      </div>
    </>
  );
};

export default HoursWorkedDetails;
