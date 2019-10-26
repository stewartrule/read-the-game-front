import * as React from "react";

import { Controlled, Period, Shot, TeamPeriod, Uncontrolled } from "./types";

type Props = {
  periods: Period[];
  height: number;
  scale?: number;
};

const isHome = ({ team }: TeamPeriod) => team == "home";
const isAway = ({ team }: TeamPeriod) => team == "away";

const EpisodeOverview: React.FC<Props> = ({ periods, height = 240 }) => {
  const yCenter = height / 2;

  const controlled = periods.filter(
    (period): period is Controlled => period.type === "controlled"
  );

  const shots = periods.filter(
    (period): period is Shot => period.type === "shot"
  );

  const uncontrolled = periods.filter(
    (period): period is Uncontrolled => period.type === "uncontrolled"
  );

  const homeControl = controlled.filter(isHome);
  const awayControl = controlled.filter(isAway);

  const homeShots = shots.filter(isHome);
  const awayShots = shots.filter(isAway);

  const lastEpisode = periods[periods.length - 1];
  const duration = lastEpisode.time + lastEpisode.duration;
  const width = duration;

  const circleOffset = 30;
  const shotOffset = 100;
  const shotRadius = 5;
  const barHeight = 60;

  const drawControl = (
    controlled: Period[],
    key: string,
    fill: string,
    yOffset: number
  ) =>
    controlled.map(({ time, duration }) => (
      <circle
        key={`${key}_controlled_${time}`}
        cx={time - duration / 2}
        cy={yCenter + yOffset}
        r={duration}
        fill={fill}
      />
    ));

  return (
    <div className="episode-overview">
      <div className="episode-overview__inner" style={ { width }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
        >
          {homeShots.map(shot => [
            <line
              key={`home_shot_line_${shot.time}`}
              x1={shot.time}
              x2={shot.time}
              y1={yCenter - shotOffset}
              y2={yCenter}
              strokeWidth={1}
              strokeDasharray="2, 2"
              stroke="#000"
            />,
            <circle
              key={`home_shot_${shot.time}`}
              cx={shot.time}
              cy={yCenter - shotOffset}
              r={shotRadius}
              fill={shot.hit ? "#ffcc11" : "#fff"}
              strokeWidth={2}
              stroke={shot.hit ? "#ffcc11" : "#000"}
            />
          ])}

          {awayShots.map(shot => [
            <line
              key={`away_shot_line_${shot.time}`}
              x1={shot.time}
              x2={shot.time}
              y1={yCenter}
              y2={yCenter + shotOffset}
              strokeWidth={1}
              strokeDasharray="2, 2"
              stroke="#000"
            />,
            <circle
              key={`away_shot_${shot.time}`}
              cx={shot.time}
              cy={yCenter + shotOffset}
              r={shotRadius}
              fill={shot.hit ? "#ffcc11" : "#fff"}
              strokeWidth={2}
              stroke={shot.hit ? "#ffcc11" : "#000"}
            />
          ])}

          {drawControl(
            homeControl,
            "home",
            "rgba(0, 118, 255, 0.5)",
            -circleOffset
          )}

          {drawControl(
            awayControl,
            "away",
            "rgba(66, 221, 132, 0.5)",
            circleOffset
          )}

          <rect
            x={1}
            y={yCenter - barHeight / 2 - 1}
            width={width - 2}
            height={barHeight + 2}
            fill="rgba(0, 0, 0, 0.1)"
          />

          <rect
            x={2}
            y={yCenter - barHeight / 2}
            width={width - 4}
            height={barHeight}
            fill="#fff"
          />

          {drawControl(uncontrolled, "uncontrolled", "rgba(0, 0, 0, 0.1)", 0)}
        </svg>
      </div>
    </div>
  );
};

// {awayTeam.map(({ cx, startTime, gameId }, i) => (
//   <circle
//     key={`inert_${gameId}`}
//     cx={cx}
//     cy={yCenter}
//     r={5 + (i % 7) * 4}
//     fill="rgba(0, 0, 0, 0.1)"
//     stroke-width={0}
//     stroke="#eee"
//   />
// ))}

// {awayTeam.map(({ cx, startTime, gameId }, i) => (
//   <text
//     key={`time_${gameId}`}
//     x={cx}
//     y={yCenter}
//     text-anchor="middle"
//     alignment-baseline="middle"
//     font-family="Montserrat"
//     font-weight="bold"
//     style={{ textAlign: "center" }}
//     font-size="13px"
//     fill="#000"
//   >
//     {(startTime / 60).toFixed(2)}
//   </text>
// ))}

export default EpisodeOverview;
