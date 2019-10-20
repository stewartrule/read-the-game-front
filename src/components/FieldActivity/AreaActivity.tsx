import * as React from "react";
import { TeamActivity } from "./types";

type Props = {
  team: TeamActivity;
  width?: number;
  height?: number;
  r?: number;
  g?: number;
  b?: number;
  mask?: string;
};

const AreaActivity: React.FC<Props> = ({
  team,
  mask,
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
      {team.activity.map(({ x, y, value }) => [
        <circle
          key={`${team.id}_${y}_${x}`}
          cx={x * step + radius}
          cy={y * step + radius}
          r={value * (radius - 4)}
          stroke="black"
          strokeWidth="0"
          fill={`rgba(${r}, ${g}, ${b}, 0.33)`}
          mask={mask}
        />,
        <circle
          key={`inner_${team.id}_${y}_${x}`}
          cx={x * step + radius}
          cy={y * step + radius}
          r={(value / 3) * (radius - 4)}
          stroke="black"
          strokeWidth="0"
          fill={`rgba(${r}, ${g}, ${b}, 1)`}
          mask={mask}
        />
      ])}
    </>
  );
};

export default AreaActivity;
