import * as React from "react";

import Donut from "../Donut/Donut";
import { FontFamily, BrandColor } from "../../util/skin";

type Props = {
  value: number;
  radius?: number;
  fontSize?: number;
  color?: BrandColor;
  border?: number;
  children: (value: number) => React.ReactNode;
};

const Meter: React.FC<Props> = ({
  value = 0,
  radius = 50,
  fontSize = 24,
  color = BrandColor.primary,
  border = 4,
  children
}) => {
  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle strokeWidth="0" cx={radius} cy={radius} r={radius} fill="#eee" />
      <Donut
        cx={radius}
        cy={radius}
        radius={radius}
        innerRadius={radius - 40}
        segments={[{ value, fill: color }]}
      />
      <circle
        strokeWidth="0"
        cx={radius}
        cy={radius}
        r={radius - border}
        fill="rgba(0, 0, 0, 0.2)"
      />
      <circle
        strokeWidth="0"
        cx={radius}
        cy={radius}
        r={radius - border * 2}
        fill="#fff"
      />
      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Montserrat"
        fontWeight="bold"
        style={{ textAlign: "center" }}
        fontSize={fontSize}
        fill={color}
      >
        {children(value)}
      </text>
    </svg>
  );
};

export default Meter;
