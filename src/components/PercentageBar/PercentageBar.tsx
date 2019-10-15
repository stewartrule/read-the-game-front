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
    className={`percentage-bar__segment percentage-bar__segment--${type}`}
  >
    {Math.round(value * 100)}%
  </div>
);

type Props = {
  /** number between 0 and 1 */
  left: number;
  /** number between 0 and 1 */
  right: number
}

const PercentageBar = ({ left, right }: Props) => (
  <div className="percentage-bar">
    <Segment value={left} type="left" />
    <Segment value={right} type="right" />
  </div>
);

export default PercentageBar;
