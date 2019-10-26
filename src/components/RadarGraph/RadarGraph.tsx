import * as React from "react";
import { getPolarPoint } from "../../util/geometry";

const range = (min = 0, max = 1) =>
  Array.from({ length: max - min }).map((_, i) => min + i);

export type Stat = {
  label: string;
  value: number;
};

export type Stats = {
  values: Stat[];
  fill: string;
  stroke: string;
}[];

type Props = {
  radius?: number;
  stats: Stats;
};

const RadarGraph: React.FC<Props> = ({ radius = 120, stats }) => {
  const size = radius * 2 + 10;
  const total = stats.length ? stats[0].values.length : 0;
  const step = 360 / total;
  const center = {
    x: size / 2,
    y: size / 2
  };

  const distanceSteps = 4;
  const distanceStep = radius / distanceSteps;

  const background = range(0, distanceSteps).map((_, d) =>
    range(0, total)
      .map((_, i) => getPolarPoint(center, radius - d * distanceStep, i * step))
      .map(({ x, y }) => `${x},${y}`)
  );

  const dots = range(0, total).map((_, i) => {
    const { x, y } = getPolarPoint(center, radius, i * step);

    return <circle cx={x} cy={y} key={i} r={2} fill="#000" />;
  });

  const offset = 10;
  const innerRadius = radius - offset;

  const polys = stats.map(({ values, fill, stroke }) => {
    return {
      fill,
      stroke,
      points: values
        .map((stat, i) =>
          getPolarPoint(center, stat.value * innerRadius, i * step)
        )
        .map(({ x, y }) => `${x},${y}`)
        .join(" ")
    };
  });

  return (
    <div className="radar-graph">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {background.map((poly, i) => (
          <polygon
            key={`bg_${i}`}
            points={poly.join(" ")}
            fill="#fff"
            stroke="#eee"
            strokeWidth={2}
            strokeDasharray={i === 0 ? undefined : "2, 2"}
            strokeLinejoin="round"
          />
        ))}
        {polys.map((poly, i) => (
          <polygon
            key={`stat_${i}`}
            points={poly.points}
            fill={poly.fill}
            stroke={poly.stroke}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ))}
        {dots}
      </svg>
    </div>
  );
};

export default RadarGraph;
