import * as React from "react";

import { BrandColor } from "../../util/skin";
import { Tuple } from "../../util/types";
import { getPolarPoint, Point } from "../../util/geometry";
import Donut from "../Donut/Donut";

type Segment = {
  fill: BrandColor;
  value: number;
};

export type ValueType = {
  inner: Segment;
  outer: Segment;
};

type RGB = Tuple<number, 3>;
type Values = Tuple<ValueType, 6> | Tuple<ValueType, 9> | Tuple<ValueType, 12>;
type Props = {
  values: Values;
  radius?: number;
  innerRadius?: number;
  colors?: RGB[];
  borderWidth?: number;
  middleOffset?: number;
};

type Dot = [Point, string];
type DotLine = [string, string];

const rgba = (rgb: RGB, alpha = 0.15) => `rgba(${rgb.join(", ")}, ${alpha})`;

function getArcPath(
  center: Point,
  radius: number,
  startAngle: number,
  stopAngle: number
) {
  const start = getPolarPoint(center, radius, stopAngle);
  const stop = getPolarPoint(center, radius, startAngle);
  const largeArcFlag = stopAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    stop.x,
    stop.y
  ].join(" ");
}

const PeriodGraph: React.FC<Props> = ({
  values,
  radius = 240,
  innerRadius = 60,
  colors = [[66, 221, 132], [0, 118, 255]],
  borderWidth = 5,
  middleOffset = 16
}) => {
  const range = (radius - innerRadius) / 2;
  const valueRange = range - middleOffset;

  const middleRadius = innerRadius + range;
  const middleInnerRadius = middleRadius - middleOffset;
  const middleOuterRadius = middleRadius + middleOffset;

  const size = radius * 2;
  const angle = 1 / ((values.length / 3) * 4);
  const center = { x: radius, y: radius };

  const outer = values.map(({ outer }, i) => (
    <Donut
      key={`outer_${i}`}
      cx={radius}
      cy={radius}
      radius={middleOuterRadius + valueRange * outer.value}
      innerRadius={middleOuterRadius}
      segments={[
        { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
        { value: angle, fill: rgba(colors[(i + 1) % colors.length]) }
      ]}
    />
  ));

  const outerBorder = values.map(({ outer }, i) => {
    const donutRadius = middleOuterRadius + valueRange * outer.value;

    return (
      <Donut
        key={`outer_border_${i}`}
        cx={radius}
        cy={radius}
        radius={donutRadius}
        innerRadius={donutRadius - borderWidth}
        segments={[
          { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
          { value: angle, fill: rgba(colors[(i + 1) % colors.length], 1) }
        ]}
      />
    );
  });

  const inner = values.map(({ inner }, i) => (
    <Donut
      key={`inner_${i}`}
      cx={radius}
      cy={radius}
      radius={middleInnerRadius}
      innerRadius={middleInnerRadius - valueRange * inner.value}
      segments={[
        { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
        { value: angle, fill: rgba(colors[i % colors.length]) }
      ]}
    />
  ));

  const innerBorder = values.map(({ inner }, i) => {
    const donutRadius = middleInnerRadius - valueRange * inner.value;
    return (
      <Donut
        key={`inner_border_${i}`}
        cx={radius}
        cy={radius}
        radius={donutRadius + borderWidth}
        innerRadius={donutRadius}
        segments={[
          { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
          { value: angle, fill: rgba(colors[i % colors.length], 1) }
        ]}
      />
    );
  });

  const dots: Dot[] = [];
  const dotLines: DotLine[] = [];
  const quarters = [1, 2, 3];
  quarters.forEach((_, i) => {
    const offset = 10;
    const startAngle = (i - 1) * 90 + offset;
    const stopAngle = i * 90 - offset;
    const start = getPolarPoint(center, middleRadius, startAngle);
    const stop = getPolarPoint(center, middleRadius, stopAngle);

    const color = i % 2 === 0 ? BrandColor.primary : "#aaa";
    dots.push([start, color]);
    dots.push([stop, color]);

    const arcPath = getArcPath(center, middleRadius, startAngle, stopAngle);
    dotLines.push([arcPath, color]);
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="period_graph_shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {inner}
      {outer}

      {innerBorder}
      {outerBorder}

      <rect
        x={radius - borderWidth}
        y={0}
        width={borderWidth * 2}
        height={size}
        fill="#fff"
      />
      <rect
        x={0}
        y={radius - borderWidth}
        width={size}
        height={borderWidth * 2}
        fill="#fff"
      />

      <line
        x1={0}
        x2={size}
        y1={radius}
        y2={radius}
        strokeWidth={3}
        strokeDasharray="3, 3"
        stroke="#000"
      />
      <line
        x1={radius}
        x2={radius}
        y1={radius}
        y2={size}
        strokeWidth={3}
        strokeDasharray="3, 3"
        stroke="#000"
      />

      <circle
        cx={radius}
        cy={radius}
        r={innerRadius}
        fill="#fff"
        filter="url(#period_graph_shadow)"
      />

      <g filter="url(#period_graph_shadow)">
        <Donut
          cx={radius}
          cy={radius}
          radius={middleOuterRadius}
          innerRadius={middleInnerRadius}
          segments={[
            { value: 0, fill: "rgba(0, 0, 0, 0)" },
            { value: 0.79, fill: "#fff" }
          ]}
        />
      </g>

      {dots.map(([point, color]) => (
        <circle cx={point.x} cy={point.y} fill={color} r={3} />
      ))}

      {dotLines.map(([d, color]) => (
        <path d={d} stroke={color} fill="transparent" strokeDasharray="2, 2" />
      ))}
    </svg>
  );
};

export default PeriodGraph;
