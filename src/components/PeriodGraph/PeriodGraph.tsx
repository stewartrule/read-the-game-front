import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
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

  const getArcOffsets = (offset: number = 0) => {
    return [1, 2, 3].map((_, i) => {
      const startAngle = (i - 1) * 90 + offset;
      const stopAngle = i * 90 - offset;
      const start = getPolarPoint(center, middleRadius, startAngle);
      const stop = getPolarPoint(center, middleRadius, stopAngle);
      return { start, stop, startAngle, stopAngle };
    });
  };

  const dots: Dot[] = [];
  getArcOffsets(11).forEach(({ start, stop }, i) => {
    const color = i % 2 === 0 ? BrandColor.primary : "#aaa";
    dots.push([start, color]);
    dots.push([stop, color]);
  });

  const dotLines: DotLine[] = [];
  getArcOffsets(12).forEach(({ startAngle, stopAngle }, i) => {
    const color = i % 2 === 0 ? BrandColor.primary : "#aaa";
    const arcPath = getArcPath(center, middleRadius, startAngle, stopAngle);
    dotLines.push([arcPath, color]);
  });

  const labels: LabelProps[] = [];
  getArcOffsets(5).forEach(({ start, stop }, i) => {
    const color = i % 2 === 0 ? BrandColor.primary : "#aaa";
    labels.push({ color, center: start, value: i === 0 ? 0 : i * 15 + 1 });
    labels.push({ color, center: stop, value: (i + 1) * 15 });
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
        <circle
          cx={point.x}
          cy={point.y}
          key={`${point.x}_${point.y}`}
          fill={color}
          r={3}
        />
      ))}

      {dotLines.map(([d, color], i) => (
        <path
          d={d}
          key={i}
          stroke={color}
          fill="transparent"
          strokeDasharray="2, 2"
        />
      ))}

      {labels.map(({ center, value, color }) => (
        <Label
          key={`${center.x}_${center.y}`}
          center={center}
          value={value}
          color={color}
        />
      ))}
    </svg>
  );
};

type LabelProps = { center: Point; value: number; color: string };

const Label = ({ center, value, color }: LabelProps) => (
  <text
    x={center.x}
    y={center.y}
    textAnchor="middle"
    alignmentBaseline="central"
    fontFamily={FontFamily.Default}
    fontWeight="bold"
    style={{ textAlign: "center" }}
    fontSize="13px"
    fill={color}
  >
    {value}
  </text>
);

export default PeriodGraph;
