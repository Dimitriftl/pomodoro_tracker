import React, { FC } from "react";
import "./listOfHoursEnd.scss";

type arrayFilteredType = { id: number; time: string };

type ListOfHoursEndProps = {
  arrayFiltered: arrayFilteredType[];
  setTaskEndTime: React.Dispatch<React.SetStateAction<string>>;
  setIsEndTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListOfHoursENd: FC<ListOfHoursEndProps> = ({
  arrayFiltered,
  setTaskEndTime,
  setIsEndTimeOpen,
}) => {
  return (
    <div id="listEndContainer" className="background">
      {arrayFiltered.map((hour: arrayFilteredType) => {
        return (
          <p
            key={hour.id}
            onClick={() => {
              setTaskEndTime(hour.time);
              setIsEndTimeOpen(false);
            }}>
            {hour.time}
          </p>
        );
      })}
    </div>
  );
};

export default ListOfHoursENd;
