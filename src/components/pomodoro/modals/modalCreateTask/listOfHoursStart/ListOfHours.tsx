import React from "react";
import "./listOfHours.scss";

type props = {
  arrayOfHours: { id: number; time: string }[];
  setTaskStartTime: React.Dispatch<React.SetStateAction<string>>;
  setArrayFiltered: React.Dispatch<React.SetStateAction<{ id: number; time: string }[]>>;
  setIsStartTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListOfHoursStart: React.FC<props> = ({
  arrayOfHours,
  setTaskStartTime,
  setArrayFiltered,
  setIsStartTimeOpen,
}) => {
  const filterArray = (hourChoosen: { id: number; time: string }) => {
    setArrayFiltered(arrayOfHours.filter((hour) => hourChoosen.id < hour.id));
  };
  return (
    <div id="listStartContainer" className="background">
      {arrayOfHours.map((hour) => {
        return (
          <p
            key={hour.id}
            onClick={() => {
              setTaskStartTime(hour.time);
              filterArray(hour);
              setIsStartTimeOpen(false)
            }}>
            {hour.time}
          </p>
        );
      })}
    </div>
  );
};

export default ListOfHoursStart;
