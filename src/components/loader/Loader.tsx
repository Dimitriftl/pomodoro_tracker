import { FC } from "react";
import "./loader.scss";

type LoaderProps = {
  svgWidth?: string;
  svgHeight?: string;
  color?: string;
  cx?: string;
  cy?: string;
  r?: string;
  strokeWidth?: string;
  strokeMiterlimit?: string;
};

// svg width and height must be double the size of the circle
const Loader: FC<LoaderProps> = ({
  svgWidth = "100",
  svgHeight = "100",
  color = "var(--color-blue)",
  cx = "50",
  cy = "50",
  r = "20",
  strokeWidth = "2",
  strokeMiterlimit = "10",
}) => {
  return (
    <svg id="spinnerContainer" width={svgWidth} height={svgHeight}>
      <circle
        id="spinner"
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        fill="none"
        strokeWidth={strokeWidth}
        strokeMiterlimit={strokeMiterlimit}
      />
    </svg>
  );
};

export default Loader;
