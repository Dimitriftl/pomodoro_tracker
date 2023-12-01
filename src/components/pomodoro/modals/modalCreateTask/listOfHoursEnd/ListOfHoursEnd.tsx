import React from "react";

type arrayFilteredType = { id: number; time: string };

type props = {
  arrayFiltered: arrayFilteredType[];
  setTaskEndTime: React.Dispatch<React.SetStateAction<string>>;
};

const ListOfHoursENd = ({ arrayFiltered, setTaskEndTime }) => {
  return (
    <div id="listEndContainer" className="background">
      {arrayFiltered.map((hour: arrayFilteredType) => {
        return (
          <p
            key={hour.id}
            onClick={() => {
              setTaskEndTime(hour.time);
            }}>
            {hour.time}
          </p>
        );
      })}
    </div>
  );
};

export default ListOfHoursENd;
