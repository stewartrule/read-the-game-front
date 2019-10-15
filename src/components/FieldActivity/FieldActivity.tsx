import * as React from "react";

import { Tuple } from "../../util/types";
import AreaActivity from "./AreaActivity";
import Lines from "./Lines";
import { Area } from "./types";

type RGB = Tuple<number, 3>;
type Offsets = Tuple<number, 5>;
type AreaConfig = ["left" | "right", Offsets, Area, RGB];

type Props = {
  left: Area;
  right: Area;
};

const width = 1000;
const height = 600;
const maskWidth = width / 10;

const FieldActivity: React.FC<Props> = ({ left, right }) => {
  const areas: AreaConfig[] = [
    ["left", [0, 2, 4, 6, 8], left, [0, 118, 255]],
    ["right", [1, 3, 5, 7, 9], right, [66, 221, 132]]
  ];

  return (
    <svg width="100%" height="60%" viewBox={`0 0 ${width} ${height}`}>
      <Lines />
      <defs>
        {areas.map(([id, offsets]) => (
          <mask
            key={id}
            id={`mask_area_${id}`}
            x={0}
            y={0}
            width={width}
            height={height}
          >
            {offsets.map(i => (
              <rect
                key={i}
                x={i * maskWidth + 1}
                y={0}
                width={maskWidth - 2}
                height={height}
                fill="#fff"
                stroke="#fff"
                strokeWidth="0"
              />
            ))}
          </mask>
        ))}
      </defs>
      {areas.map(([id, _, area, [r, g, b]]) => (
        <AreaActivity
          stats={area}
          key={id}
          id={id}
          r={r}
          g={g}
          b={b}
          width={width}
          height={height}
        />
      ))}
    </svg>
  );
};

export default FieldActivity;
