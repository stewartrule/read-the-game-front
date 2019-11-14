import * as React from "react";
import { Spring } from "react-spring/renderprops";

import { Point, getPolarPoint } from "../../util/geometry";
import { BrandColor, FontFamily } from "../../util/skin";
import { getArcPath } from "../../util/svg";
import { Tuple } from "../../util/types";
import Donut from "../Donut/Donut";

export type PeriodGraphValue = {
  fill: BrandColor;
  value: number;
};

export type PeriodGraphPeriod = {
  inner: PeriodGraphValue;
  outer: PeriodGraphValue;
};

type RGB = Tuple<number, 3>;

type Props = {
  periods: PeriodGraphPeriod[];
  radius?: number;
  innerRadius?: number;
  colors?: RGB[];
  borderWidth?: number;
  middleOffset?: number;
  /** Prevents animation if true */
  immediate?: boolean;
  /** Enable shadows */
  shadow?: boolean;
};

type Dot = [Point, string];
type DotLine = [string, string];

const transparentFill = "rgba(0, 0, 0, 0)";
const MS_DELAY = 100;

const rgba = (rgb: RGB, alpha = 0.15) => `rgba(${rgb.join(", ")}, ${alpha})`;

const PeriodGraph: React.FC<Props> = ({
  periods,
  radius = 240,
  innerRadius = 60,
  colors = [
    [66, 221, 132],
    [0, 118, 255]
  ],
  borderWidth = 5,
  middleOffset = 16,
  immediate = false,
  shadow = false
}) => {
  const range = (radius - innerRadius) / 2;
  const valueRange = range - middleOffset;
  const valueRangeBorder = valueRange - borderWidth;

  const middleRadius = innerRadius + range;
  const middleInnerRadius = middleRadius - middleOffset;
  const middleOuterRadius = middleRadius + middleOffset;

  const size = radius * 2;
  const angle = 1 / ((periods.length / 3) * 4);
  const center = { x: radius, y: radius };

  const outer = periods.map(({ outer }, i) => (
    <Spring
      key={`outer_${i}`}
      from={{
        r: middleOuterRadius,
        ir: middleOuterRadius
      }}
      to={{
        r: middleOuterRadius + valueRange * outer.value,
        ir: middleOuterRadius
      }}
      delay={i * MS_DELAY}
      immediate={immediate}
    >
      {({ ir, r }) => (
        <Donut
          cx={radius}
          cy={radius}
          radius={r}
          innerRadius={ir}
          segments={[
            { value: i * angle, fill: transparentFill },
            { value: angle, fill: rgba(colors[(i + 1) % colors.length]) }
          ]}
        />
      )}
    </Spring>
  ));

  const outerBorder = periods.map(({ outer }, i) => {
    const donutRadius = middleOuterRadius + valueRangeBorder * outer.value;
    return (
      <Spring
        key={`outer_border_${i}`}
        from={{
          r: middleOuterRadius
        }}
        to={{
          r: donutRadius
        }}
        delay={i * MS_DELAY}
        immediate={immediate}
      >
        {({ r }) => (
          <Donut
            cx={radius}
            cy={radius}
            radius={r + borderWidth}
            innerRadius={r}
            segments={[
              { value: i * angle, fill: transparentFill },
              { value: angle, fill: rgba(colors[(i + 1) % colors.length], 1) }
            ]}
          />
        )}
      </Spring>
    );
  });

  const inner = periods.map(({ inner }, i) => (
    <Spring
      key={`inner_${i}`}
      from={{
        r: middleInnerRadius,
        ir: middleInnerRadius
      }}
      to={{
        r: middleInnerRadius,
        ir: middleInnerRadius - valueRange * inner.value
      }}
      delay={i * MS_DELAY}
      immediate={immediate}
    >
      {({ r, ir }) => (
        <Donut
          cx={radius}
          cy={radius}
          radius={r}
          innerRadius={ir}
          segments={[
            { value: i * angle, fill: transparentFill },
            { value: angle, fill: rgba(colors[i % colors.length]) }
          ]}
        />
      )}
    </Spring>
  ));

  const innerBorder = periods.map(({ inner }, i) => {
    const donutRadius = middleInnerRadius - valueRangeBorder * inner.value;

    return (
      <Spring
        key={`inner_border_${i}`}
        from={{
          r: middleInnerRadius
        }}
        to={{
          r: donutRadius
        }}
        delay={i * MS_DELAY}
        immediate={immediate}
      >
        {({ r }) => (
          <Donut
            cx={radius}
            cy={radius}
            radius={r}
            innerRadius={r - borderWidth}
            segments={[
              { value: i * angle, fill: transparentFill },
              { value: angle, fill: rgba(colors[i % colors.length], 1) }
            ]}
          />
        )}
      </Spring>
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

  const shadowId = "period_graph_shadow";
  const shadowUrl = shadow ? `url(#${shadowId})` : undefined;

  return (
    <div>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {shadow && (
          <defs>
            <filter id={shadowId}>
              <feDropShadow dx="1" dy="1" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>
        )}

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
          filter={shadowUrl}
        />

        <g filter={shadowUrl}>
          <Donut
            cx={radius}
            cy={radius}
            radius={middleOuterRadius}
            innerRadius={middleInnerRadius}
            segments={[
              { value: 0, fill: transparentFill },
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
    </div>
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
