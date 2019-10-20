import "./styles.scss";

import * as React from "react";

const Segment = ({
  value,
  type
}: {
  value: number;
  type: "left" | "right";
}) => (
  <div
    style={{ width: `${value * 100}%` }}
    className={`simple-percentage-bar__segment simple-percentage-bar__segment--${type}`}
  ></div>
);

const PercentageBar = ({ left, right }: { left: number; right: number }) => (
  <div className="simple-percentage-bar">
    <Segment value={left} type="left" />
    <Segment value={right} type="right" />
  </div>
);

export default PercentageBar;
