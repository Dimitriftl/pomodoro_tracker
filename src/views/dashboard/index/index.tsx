import React, { useState } from "react";
import "./index.scss";
import HoursWorkedDetails from "../../../components/hoursWorkedDetails/HoursWorkedDetails";

type detailsDisplayed = "hours" | "tasks";

const Dashboard = () => {
  const [detailsDisplayed, setDetailsDisplayed] =
    useState<detailsDisplayed>("hours");

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
            onClick={() => setDetailsDisplayed("hours")}
          >
            <h2>Total hours worked</h2>
          </div>
          <div
            className={
              detailsDisplayed === "tasks"
                ? "cardTotalInfo cardSelected"
                : "cardTotalInfo"
            }
            onClick={() => setDetailsDisplayed("tasks")}
          >
            <h2>Total Tasks worked</h2>
          </div>
        </div>
        <div id="dashboardDetailsContainer">
          {detailsDisplayed === "hours" ? (
            <>
              <HoursWorkedDetails />
            </>
          ) : (
            <h2>tasks details</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
