import * as React from "react";

import { getPolarPoint, Point } from "../../util/geometry";

export type Stat = {
  label: string;
  value: number;
};

type RGB = [number, number, number];

type Props = {
  stats: Stat[];
  radius?: number;
  padding?: number;
  color?: RGB;
};

const rgba = (rgb: RGB, alpha = 0.15) => `rgba(${rgb.join(", ")}, ${alpha})`;

const SimpleRadarGraph: React.FC<Props> = ({
  radius = 60,
  padding = 12,
  stats = [],
  color = [255, 255, 255]
}) => {
  const total = stats.length;
  const step = 360 / total;
  const center: Point = {
    x: radius,
    y: radius
  };

  const outer = stats
    .map((_, i) => getPolarPoint(center, radius - 2, i * step))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");

  const innerRadius = radius - padding;
  const size = radius * 2;
  const inner = stats
    .map(({ value }, i) => getPolarPoint(center, value * innerRadius, i * step))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");

  return (
    <div>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <polygon
          points={outer}
          fill="rgba(0, 0, 0, 0)"
          stroke="rgba(0, 0, 0, 0.4)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={inner}
          fill={rgba(color, 0.2)}
          stroke={rgba(color, 1)}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SimpleRadarGraph;
