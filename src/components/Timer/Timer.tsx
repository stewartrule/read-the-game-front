import * as React from "react";

import AngledLines from "../AngledLines/AngledLines";
import Arc from "../Arc";
import { BrandColor } from "../../util/skin";

type Props = {
  radius?: number;
  border?: number;
  value?: number;
  color?: BrandColor;
  children: (value: number) => React.ReactNode;
};

const Timer: React.FC<Props> = ({
  radius = 40,
  border = 8,
  value = 0,
  color = BrandColor.primary,
  children
}) => {
  const size = 2 * radius;
  const viewBox = `0 0 ${size} ${size}`;

  const center = {
    x: radius,
    y: radius
  };

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        stroke="black"
        strokeWidth="0"
        fill="#eee"
      />
      <Arc
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={radius}
        value={value}
        stroke={color}
      />
      <AngledLines
        amount={60}
        center={center}
        innerRadius={() => radius - border / 2}
        outerRadius={() => radius}
        stroke={() => "rgba(0, 0, 0, 0.15)"}
        strokeWidth={1}
        filter={i => i % 5 !== 0}
      />
      <AngledLines
        amount={12}
        center={center}
        innerRadius={() => radius - border * 0.75}
        outerRadius={() => radius}
        stroke={() => "rgba(0, 0, 0, 0.3)"}
        strokeWidth={2}
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={radius - border}
        stroke="black"
        strokeWidth="0"
        fill="#fff"
      />
      <text
        x={center.x}
        y={center.y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Montserrat"
        fontWeight="bold"
        style={{ textAlign: "center" }}
        fontSize="20px"
        fill={color}
      >
        {children(value)}
      </text>
    </svg>
  );
};

export default Timer;
