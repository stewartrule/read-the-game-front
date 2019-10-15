import * as React from "react";

import { getPolarPoint, Point } from "../../util/geometry";

export type Stat = {
  label: string;
  value: number;
};

type Props = {
  stats: Stat[];
  radius?: number;
  padding?: number;
};

const SimpleRadarGraph: React.FC<Props> = ({
  radius = 60,
  padding = 12,
  stats = []
}) => {
  const total = stats.length;
  const step = 360 / total;
  const center: Point = {
    x: radius,
    y: radius
  };

  const outer = stats
    .map((_, i) => getPolarPoint(center, radius, i * step))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");

  const innerRadius = radius - padding;
  const size = radius * 2;
  const inner = stats
    .map(({ value }, i) => getPolarPoint(center, value * innerRadius, i * step))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={outer}
        fill="rgba(0, 0, 0, 0)"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points={inner}
        fill="rgba(255, 255, 255, 0.3)"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SimpleRadarGraph;
