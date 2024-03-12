import { useEffect, useState } from "react";
import "./index.scss";
import HoursWorkedDetails from "../../../components/hoursWorkedDetails/HoursWorkedDetails";
import TaskWorkedDetails from "../../../components/tasksWorkedDetails/TaskWorkedDetails";
import { taskType } from "../../../utils/types/globalTypes";

type detailsDisplayed = "hours" | "tasks";

const Dashboard = () => {
  const [detailsDisplayed, setDetailsDisplayed] =
    useState<detailsDisplayed>("hours");
  const [tasks, setTasks] = useState<Array<taskType>>([]);
  const [totalHours, setTotalHours] = useState<string>("0");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setTasks(userData.tasks);
    const hours = userData.user.totalTimeSpend / 60 / 60;
    const hoursReduced = hours.toFixed(0);
    setTotalHours(hoursReduced);
  }, []);

  return (
    <div id="dashboardContainer">
      <div id="dashboardContent">
        <div id="dashboardCardsContainer">
          <div
            className={
              detailsDisplayed === "hours"
                ? "cardTotalInfo cardSelected"
                : "cardTotalInfo"
            }
            onClick={() => setDetailsDisplayed("hours")}>
            <h2>Total hours worked</h2>
            <h3>{totalHours}h</h3>
          </div>
          <div
            className={
              detailsDisplayed === "tasks"
                ? "cardTotalInfo cardSelected"
                : "cardTotalInfo"
            }
            onClick={() => setDetailsDisplayed("tasks")}>
            <h2>Total Tasks worked</h2>
            <h3>{tasks.length}</h3>
          </div>
        </div>
        <div id="dashboardDetailsContainer">
          {detailsDisplayed === "hours" ? (
            <>
              <HoursWorkedDetails data={tasks} />
            </>
          ) : (
            <TaskWorkedDetails tasks={tasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
