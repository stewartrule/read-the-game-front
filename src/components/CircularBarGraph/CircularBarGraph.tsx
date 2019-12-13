import * as React from "react";

import { BrandColor } from "../../util/skin";
import AngledLines from "../AngledLines/AngledLines";
import { Point } from "../../util/geometry";

type CircleProps = {
  center: Point;
  radius?: number;
  stroke?: BrandColor;
  fill?: BrandColor;
  strokeWidth?: number;
};

const Circle: React.FC<CircleProps> = ({
  center,
  radius = 10,
  strokeWidth = 0,
  stroke = BrandColor.black,
  fill = BrandColor.light
}) => (
  <circle
    cx={center.x}
    cy={center.y}
    r={radius}
    stroke={stroke}
    strokeWidth={strokeWidth}
    fill={fill}
  />
);

type Value = {
  min: number;
  max: number;
};

type Props = {
  radius?: number;
  value?: number;
  growth?: number;
  borderSize?: number;
  values: Value[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  children: (opt: {
    center: Point;
    value: number;
    radius: number;
  }) => React.ReactNode;
};

const CircularBarGraph: React.FC<Props> = ({
  radius = 200,
  growth = 200,
  borderSize = 40,
  value = 0,
  values,
  selectedIndex,
  onSelect,
  children
}) => {
  const size = 2 * radius + 2 * growth;
  const viewBox = `0 0 ${size} ${size}`;
  const amount = values.length;
  const center: Point = {
    x: size / 2,
    y: size / 2
  };

  return (
    <svg width="100%" height="100%" viewBox={viewBox}>
      <Circle center={center} radius={radius} />
      <AngledLines
        center={center}
        amount={amount}
        stroke={i =>
          i === selectedIndex
            ? "rgba(66, 221, 132, 0.4)"
            : "rgba(0, 118, 255, 0.4)"
        }
        strokeWidth={24}
        innerRadius={() => radius}
        outerRadius={i => radius + values[i].max * growth}
        onSelect={onSelect}
      />
      <AngledLines
        center={center}
        amount={amount}
        stroke={i =>
          i === selectedIndex ? BrandColor.secondary : "rgba(0, 118, 255, 1)"
        }
        strokeWidth={24}
        innerRadius={() => radius}
        outerRadius={i => radius + (values[i].min / 2) * growth}
        onSelect={onSelect}
      />
      <AngledLines
        center={center}
        amount={amount}
        stroke={() => "rgba(0, 0, 0, 0.25)"}
        strokeWidth={2}
        innerRadius={() => radius - borderSize / 2}
        outerRadius={() => radius}
        filter={i => i % 4 !== 0}
      />
      <AngledLines
        center={center}
        amount={amount / 4}
        stroke={() => "rgba(0, 0, 0, 0.25)"}
        strokeWidth={5}
        innerRadius={() => radius - borderSize * 0.75}
        outerRadius={() => radius}
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={radius - borderSize}
        stroke="black"
        strokeWidth="0"
        fill="#fff"
      />
      {children({ center, value, radius: radius - 40 })}
    </svg>
  );
};

export default CircularBarGraph;
