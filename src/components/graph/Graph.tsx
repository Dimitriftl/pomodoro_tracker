import React, { FC } from "react";
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
import { Line } from "react-chartjs-2";

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

type GraphProps = {
  graphOptions: any;
  data: any;
};

const Graph: FC<GraphProps> = ({ graphOptions, data }) => {
  return (
    <>
      <Line options={graphOptions} data={data} />
    </>
  );
};

export default Graph;
