import "./styles.scss";

import * as React from "react";

import bem from "../../util/bem";
import { Controlled, Uncontrolled } from "./types";
import { formatTime } from "./util";

const px = (num: number) => `${num}px`;

type SelectPeriod = (period: Controlled) => void;

const ControlledPeriodRange = ({
  theme,
  periods,
  scale,
  onSelectPeriod
}: {
  theme: "home" | "away";
  periods: Controlled[];
  scale: number;
  onSelectPeriod: SelectPeriod;
}) => (
  <div className="episode__control">
    {periods.map(period => {
      const { start, duration = 0 } = period;

      return (
        <div
          key={`${start}_${duration}`}
          role="button"
          onClick={() => onSelectPeriod(period)}
          className={bem({
            [`episode__period-${theme}`]: {
              "--active": period.active
            }
          })}
          style={{ left: px(start * scale), width: px(duration * scale) }}
        />
      );
    })}
  </div>
);

const UncontrolledPeriodRange = ({
  periods,
  scale
}: {
  periods: Uncontrolled[];
  scale: number;
}) => (
  <div className="episode__uncontrolled">
    {periods.map(({ start, duration = 0 }) => (
      <div
        key={`${start}_${duration}`}
        className="episode__period"
        style={{ left: px(start * scale), width: px(duration * scale) }}
      />
    ))}
  </div>
);

const MarkerRange = ({
  markers,
  interval,
  scale
}: {
  markers: number[];
  interval: number;
  scale: number;
}) => {
  const width = interval * scale;

  return (
    <div className="episode__marker-bar">
      {markers.map(start => (
        <div
          key={start}
          className="episode__marker"
          style={{
            left: px(start * scale),
            width: px(width),
            transform: `translateX(-${width / 2}px)`
          }}
        >
          {formatTime(start)}
        </div>
      ))}
    </div>
  );
};

type Props = {
  scale?: number;
  controlled: Controlled[];
  uncontrolled: Uncontrolled[];
  onSelectPeriod: SelectPeriod;
};

const EpisodeTimeline: React.FC<Props> = ({
  scale = 1,
  controlled,
  uncontrolled,
  onSelectPeriod
}) => {
  if (controlled.length === 0) {
    return null;
  }

  const home = controlled.filter(({ type }) => type === "home");
  const away = controlled.filter(({ type }) => type === "away");

  const lastPeriod = controlled[controlled.length - 1];
  const duration = lastPeriod.start + lastPeriod.duration;
  const width = scale * duration;

  const interval = 60;
  const steps = Math.floor(duration / interval);
  const markers = Array.from(
    { length: steps - 1 },
    (_, i) => (i + 1) * interval
  );

  return (
    <div className="episode">
      <div className="episode__inner" style={{ width: px(width) }}>
        <ControlledPeriodRange
          theme="home"
          scale={scale}
          periods={home}
          onSelectPeriod={onSelectPeriod}
        />
        <UncontrolledPeriodRange periods={uncontrolled} scale={scale} />
        <MarkerRange markers={markers} interval={interval} scale={scale} />
        <ControlledPeriodRange
          theme="away"
          scale={scale}
          periods={away}
          onSelectPeriod={onSelectPeriod}
        />
      </div>
    </div>
  );
};

export default EpisodeTimeline;
