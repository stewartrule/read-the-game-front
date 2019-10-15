import * as React from "react";

import { Point, getPolarPoint } from "../../util/geometry";

type Props = {
  center: Point;
  amount?: number;
  innerRadius?: (i: number) => number;
  outerRadius?: (i: number) => number;
  offset?: number;
  stroke?: (i: number) => string;
  strokeWidth?: number;
  filter?: (i: number) => boolean;
  onSelect?: (index: number) => void;
};

const AngledLines: React.FC<Props> = ({
  center,
  amount = 8,
  offset = 0,
  strokeWidth = 2,
  stroke = () => "black",
  innerRadius = () => 10,
  outerRadius = () => 20,
  filter = i => true,
  onSelect
}) => (
  <>
    {Array.from({ length: amount }, (_, i) => {
      const angle = (360 / amount) * i + offset;
      const inner = getPolarPoint(center, innerRadius(i), angle);
      const outer = getPolarPoint(center, outerRadius(i), angle);
      return (
        <line
          key={`${inner.x}_${inner.y}_${outer.x}_${outer.y}`}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke={stroke(i)}
          strokeWidth={strokeWidth}
          onPointerUp={onSelect ? () => onSelect(i) : undefined}
        />
      );
    }).filter((_, i) => filter(i))}
  </>
);

export default AngledLines;
