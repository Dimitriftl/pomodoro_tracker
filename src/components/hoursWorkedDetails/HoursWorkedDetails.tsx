import React, { FC, useEffect, useState } from "react";
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
  // const [labels, setLabels] = useState<Array<string>>([
  //   "Mon",
  //   "Tue",
  //   "Wed",
  //   "Thu",
  //   "Fri",
  //   "Sat",
  //   "Sun",
  // ]);
  const defaultChartData = {
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
  const [chartData, setChartData] = useState(defaultChartData);

  // console.log(currentDate, "currentDate");

  useEffect(() => {
    organizeDataByTime();
  }, [data, pageSelected]);

  // console.log("DATA => ", data)

  const organizeDataByTime = () => {
    const organizedData = {
      days: {},
      weeks: {},
      months: {},
    };

    const filteredData = data.filter((task) => {
      const taskDate = new Date(task.creationDate);

      switch (pageSelected) {
        case "days":
          return isSameWeek(currentDate, taskDate);

        case "weeks":
          return isSameMonth(currentDate, taskDate) === true;
        case "months":
          return isSameYear(currentDate, taskDate) === true;
        default:
          // Logique par défaut (par exemple, jours)
          return isSameWeek(currentDate, taskDate);
      }
    });

    if (pageSelected === "days") {
      organizedData.days = filteredData.map((task) => {
        return task.timeSpend;
      });
    } else if (pageSelected === "weeks") {
      organizedData.weeks = filteredData.map((task) => {
        return task.timeSpend;
      });
    } else if (pageSelected === "months") {
      organizedData.months = filteredData.map((task) => {
        return task.timeSpend;
      });
    }

    console.log("initialData => ", data);
    console.log("filteredData => ", filteredData);

    // console.log(filteredData, "filteredData");
    let selectedData;
    let labels;

    filteredData.forEach((task) => {
      const date = new Date(task.creationDate);
      const dayKey = date.toISOString().split("T")[0];
      const weekNumber = getWeekNumber(date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Les mois commencent à 0
      const yearKey = date.getFullYear();

      // console.log(data, "data");
      // console.log(dayKey, "dayKey");
      // console.log(weekNumber, "weekNumber");
      // console.log(monthKey, "monthKey");
      // console.log(yearKey, "yearKey");

      // Incrémenter le temps travaillé en fonction de la page sélectionnée

      switch (pageSelected) {
        case "days":
          selectedData = organizedData.days;
          labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          break;
        case "weeks":
          selectedData = organizedData.weeks;
          labels = ["week 1", "week 2", "week 3", "week 4"];
          break;
        case "months":
          selectedData = organizedData.months;
          labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          break;
        default:
          selectedData = organizedData.days;
          labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          break;
      }

      if (!selectedData[dayKey]) {
        selectedData[dayKey] = 0;
      }
      selectedData[dayKey] += task.timeSpend / 60; // Convertir en heures

      if (!selectedData[weekNumber]) {
        selectedData[weekNumber] = 0;
      }
      selectedData[weekNumber] += task.timeSpend / 60;

      if (!selectedData[monthKey]) {
        selectedData[monthKey] = 0;
      }
      selectedData[monthKey] += task.timeSpend / 60;

      if (!selectedData[yearKey]) {
        selectedData[yearKey] = 0;
      }
      selectedData[yearKey] += task.timeSpend / 60;
    });

    setChartData({
      labels: labels
        ? labels
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: `time worked in minutes`,
          data:
            pageSelected === "days"
              ? Object.values(organizedData.days)
              : pageSelected === "weeks"
              ? Object.values(organizedData.weeks)
              : Object.values(organizedData.months),
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
          borderColor: "#678bff",
          borderWidth: 1,
          fill: true,
        },
      ],
    });

    return organizedData;
  };

  function getWeekNumber(date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  }

  const graphOptions = {
    responsive: true,
    tension: 0.4,
    aspectRatio: 0,
    // change the width of the graph
  };

  // /used to check if two dates are in the same week
  function isSameWeek(date1, date2) {
    const week1 = getWeekNumber(date1);
    const week2 = getWeekNumber(date2);
    return week1 === week2 && date1.getFullYear() === date2.getFullYear();
  }

  // /used to check if two dates are in the same month
  function isSameMonth(date1, date2) {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  //used to check if two dates are in the same year
  function isSameYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear();
  }

  // used to check if two dates are the same
  function isSameDay(date1, date2) {
    return (
      date1.toISOString().split("T")[0] === date2.toISOString().split("T")[0]
    );
  }

  // used to displau the previous date
  const handlePrevious = () => {
    switch (pageSelected) {
      case "days":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() - 7
            )
        );
        break;
      case "weeks":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() - 1,
              prevDate.getDate()
            )
        );
        break;
      case "months":
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
        // Logique par défaut (par exemple, jours)
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() - 1
            )
        );
    }
  };

  // used to display the next date
  const handleNext = () => {
    switch (pageSelected) {
      case "days":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() + 7
            )
        );
        break;
      case "weeks":
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth() + 1,
              prevDate.getDate()
            )
        );
        break;
      case "months":
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
        // Logique par défaut (par exemple, jours)
        setCurrentDate(
          (prevDate) =>
            new Date(
              prevDate.getFullYear(),
              prevDate.getMonth(),
              prevDate.getDate() + 7
            )
        );
    }
  };

  // used for the header to display the current date selected
  const displayCurrentDateSelected = () => {
    switch (pageSelected) {
      case "days":
        return currentDate.toISOString().split("T")[0];
      case "weeks":
        return `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1}`;
      case "months":
        return `${currentDate.getFullYear()}`; // Les mois commencent à 0
      default:
        return currentDate.toISOString().split("T")[0];
    }
  };

  return (
    <>
      <div id="hoursWorkedDetailsHeader">
        <h2>Hours details</h2>
        <div id="hoursWorkedDetailsHeaderButtons">
          <button
            onClick={() => {
              setPageSelected("days"), organizeDataByTime();
            }}
            className={pageSelected === "days" ? "active" : ""}>
            Week
          </button>
          <button
            onClick={() => {
              setPageSelected("weeks"), organizeDataByTime();
            }}
            className={pageSelected === "weeks" ? "active" : ""}>
            Month
          </button>
          <button
            onClick={() => {
              setPageSelected("months"), organizeDataByTime();
            }}
            className={pageSelected === "months" ? "active" : ""}>
            Year
          </button>
        </div>
        <div id="hoursWorkedDetailsWeekHandler">
          <button onClick={() => handlePrevious()}>Previous</button>
          <h3>{displayCurrentDateSelected()}</h3>
          <button onClick={() => handleNext()}>Next</button>
        </div>
      </div>
      <div id="hoursWorkedDetailsContent">
        <Graph graphOptions={graphOptions} data={chartData} />
      </div>
    </>
  );
};

export default HoursWorkedDetails;
