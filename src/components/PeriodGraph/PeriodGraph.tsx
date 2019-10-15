import * as React from "react";

import { BrandColor } from "../../util/skin";
import { Tuple } from "../../util/types";
import Donut from "../Donut/Donut";

type Segment = {
  fill: BrandColor;
  value: number;
};

export type ValueType = {
  inner: Segment;
  outer: Segment;
};

type Props = {
  range?: number;
  innerOffset?: number;
  centerOffset?: number;
  colors?: Tuple<BrandColor, 2>;
  values: Tuple<ValueType, 6> | Tuple<ValueType, 9> | Tuple<ValueType, 12>;
};

const PeriodGraph: React.FC<Props> = ({
  range = 50,
  innerOffset = 50,
  centerOffset = 50,
  colors = [BrandColor.primary, BrandColor.secondary],
  values
}) => {
  const centerLine = innerOffset + range;
  const radius = innerOffset + centerOffset + 2 * range; // 2 ???
  const size = radius * 2;
  const cx = size / 2;
  const cy = size / 2;
  const angle = 1 / ((values.length / 3) * 4);

  const inner = values.map(({ inner }, i) => (
    <Donut
      key={`inner_${i}`}
      cx={cx}
      cy={cy}
      radius={centerLine - centerOffset}
      innerRadius={centerLine - centerOffset - inner.value * range}
      segments={[
        { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
        { value: angle, fill: colors[i % colors.length] }
      ]}
    />
  ));

  const outer = values.map(({ outer }, i) => (
    <Donut
      key={`outer_${i}`}
      cx={cx}
      cy={cy}
      radius={centerLine + centerOffset + outer.value * range}
      innerRadius={centerLine + centerOffset}
      segments={[
        { value: i * angle, fill: "rgba(0, 0, 0, 0)" },
        { value: angle, fill: colors[(i + 1) % colors.length] }
      ]}
    />
  ));

  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={innerOffset} fill="#fff" />
      {inner}
      {outer}
    </svg>
  );
};

export default PeriodGraph;
