import * as React from "react";
import { Area } from "./types";

type Props = {
  stats: Area;
  id: "left" | "right";
  width?: number;
  height?: number;
  r?: number;
  g?: number;
  b?: number;
};

const AreaActivity: React.FC<Props> = ({
  stats,
  id,
  width = 1000,
  height = 600,
  r = 0,
  g = 118,
  b = 255
}) => {
  const radius = height / 6;
  const step = width / 5;

  return (
    <>
      {stats.map(({ x, y, value }) => [
        <circle
          key={`${id}_${y}_${x}`}
          cx={x * step + radius}
          cy={y * step + radius}
          r={value * (radius - 4)}
          stroke="black"
          strokeWidth="0"
          fill={`rgba(${r}, ${g}, ${b}, 0.33)`}
          mask={`url(#mask_area_${id})`}
        />,
        <circle
          key={`inner_${id}_${y}_${x}`}
          cx={x * step + radius}
          cy={y * step + radius}
          r={(value / 3) * (radius - 4)}
          stroke="black"
          strokeWidth="0"
          fill={`rgba(${r}, ${g}, ${b}, 1)`}
          mask={`url(#mask_area_${id})`}
        />
      ])}
    </>
  );
};

export default AreaActivity;
