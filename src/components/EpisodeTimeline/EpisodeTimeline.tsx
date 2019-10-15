import "./styles.css";

import * as React from "react";

import { Controlled, Period, Uncontrolled } from "./types";

const px = (num: number) => `${num}px`;
const scale = 1; //fixme

const PeriodRange = ({
  periods,
  interval = 5
}: {
  periods: Period[];
  interval?: number;
}) => (
  <>
    {periods.map(({ time = 0 }) => (
      <div
        className="episode-timeline__period"
        key={`${time}_${interval}`}
        style={{ left: px(time * scale), width: px(interval * scale) }}
      />
    ))}
  </>
);

type Props = {
  periods: Period[];
  interval?: number;
};

const EpisodeTimeline: React.FC<Props> = ({ periods, interval = 5 }) => {
  const controlled = periods.filter(
    (period): period is Controlled => period.control
  );

  const uncontrolled = periods.filter(
    (period): period is Uncontrolled => !period.control
  );

  const home = controlled.filter(({ type }) => type == "home");
  const away = controlled.filter(({ type }) => type == "away");

  const duration = periods.length * interval;
  const width = scale * duration;

  return (
    <div className="episode-timeline">
      <div className="episode-timeline__inner" style={{ width: px(width) }}>
        <div className="episode-timeline__control episode-timeline__control--home">
          <PeriodRange periods={home} interval={interval} />
        </div>
        <div className="episode-timeline__inert">
          <PeriodRange periods={uncontrolled} interval={interval} />
        </div>
        <div className="episode-timeline__control episode-timeline__control--away">
          <PeriodRange periods={away} interval={interval} />
        </div>
      </div>
    </div>
  );
};

export default EpisodeTimeline;
