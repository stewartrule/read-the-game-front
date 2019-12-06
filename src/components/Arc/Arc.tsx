import * as React from "react";

type Props = {
  cx: number;
  cy: number;
  r: number;
  value: number;
  stroke: string;
  strokeWidth: number;
  fill?: string;
  startAngle?: number;
  strokeAlign?: "inside" | "middle" | "outside";
};

const Arc = ({
  cx,
  cy,
  r,
  value,
  stroke,
  strokeWidth,
  startAngle = -90,
  fill = "transparent",
  strokeAlign = "inside"
}: Props) => {
  const inversed = value - 1;
  const radius =
    strokeAlign === "inside"
      ? r - strokeWidth / 2
      : strokeAlign == "outside"
      ? r + strokeWidth / 2
      : r;

  const strokeDasharray = Math.PI * (radius * 2);
  const strokeDashoffset = inversed * strokeDasharray;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDashoffset={strokeDashoffset}
      strokeDasharray={strokeDasharray}
      style={{
        transformOrigin: "50% 50%",
        transform: `rotate(${startAngle + inversed * 360}deg)`
      }}
    />
  );
};

export default Arc;
