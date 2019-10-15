import * as React from "react";

const { PI } = Math;

type Segment = {
  value: number;
  fill: string;
};

type Props = {
  segments: Segment[];
  radius: number;
  cx: number;
  cy: number;
  innerRadius: number;
};

type Path = (string | number)[];

const Donut: React.FC<Props> = ({
  segments = [],
  radius = 50,
  cx = 0,
  cy = 0,
  innerRadius = 30
}) => {
  const scale = (value: number, r: number) => {
    const radians = (value / 1) * PI * 2 - PI / 2;

    return [r * Math.cos(radians) + cx, r * Math.sin(radians) + cy];
  };

  let cumulative = 0;
  const paths = segments.map(({ value, fill }) => {
    const portion = value / 1;

    let d: Path = [];
    if (portion === 1) {
      if (innerRadius) {
        let x2 = cx - 0.01;
        let y1 = cy - radius;
        let y2 = cy - innerRadius;

        d = [
          "M",
          cx,
          y1,
          "A",
          radius,
          radius,
          0,
          1,
          1,
          x2,
          y1,
          "L",
          x2,
          y2,
          "A",
          innerRadius,
          innerRadius,
          0,
          1,
          0,
          cx,
          y2
        ];

        return <path d={d.join(" ")} key={d.join(" ")} fill={fill} />;
      }

      return <circle cx={cx} cy={cy} key={`${cx}_${cy}`} r={radius} />;
    }

    const cumulativeValue = cumulative + value;

    d = (["M"] as Path).concat(
      scale(cumulative, radius),
      "A",
      radius,
      radius,
      0,
      portion > 0.5 ? 1 : 0,
      1,
      scale(cumulativeValue, radius),
      "L"
    );

    if (innerRadius) {
      d = d.concat(
        scale(cumulativeValue, innerRadius),
        "A",
        innerRadius,
        innerRadius,
        0,
        portion > 0.5 ? 1 : 0,
        0,
        scale(cumulative, innerRadius)
      );
    } else {
      d.push(cx, cy);
    }

    cumulative += value;

    return <path d={d.join(" ")} key={d.join(" ")} fill={fill} />;
  });

  return <>{paths}</>;
};

export default Donut;
