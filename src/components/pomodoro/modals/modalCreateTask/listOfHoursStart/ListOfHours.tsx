import React from "react";
import "./listOfHours.scss";

type props = {
  arrayOfHours: { id: number; time: string }[];
  setTaskStartTime: React.Dispatch<React.SetStateAction<string>>;
};

const ListOfHoursStart: React.FC<props> = ({
  arrayOfHours,
  setTaskStartTime,
}) => {
  return (
    <div id="listStartContainer" className="background">
      {arrayOfHours.map((hour) => {
        return (
          <p key={hour.id} onClick={() => setTaskStartTime(hour.time)}>
            {hour.time}
          </p>
        );
      })}
    </div>
  );
};

export default ListOfHoursStart;
