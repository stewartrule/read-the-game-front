import * as React from "react";

import Block from "../components/Block";
import EpisodeTimeline from "../components/EpisodeTimeline";
import { periods, reducer } from "../components/EpisodeTimeline/fixture";
import { Controlled, Uncontrolled } from "../components/EpisodeTimeline/types";
import ScoreBoard from "../components/ScoreBoard";
import { game } from "../components/ScoreBoard/fixture";
import Timer from "../components/Timer";
import { BrandColor } from "../util/skin";

const { useReducer } = React;

const padStart = (num: number) => num.toString().padStart(2, "0");

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${padStart(minutes)}:${padStart(seconds)}`;
};

const GameView: React.FC = ({}) => {
  const initialState = periods.filter(
    (period): period is Controlled => period.control
  );

  const uncontrolled = periods.filter(
    (period): period is Uncontrolled => period.control === false
  );

  const [controlled, dispatch] = useReducer(reducer, initialState);
  const active = controlled.find((period) => period.control && period.active);

  const max = 60;
  const f = 1 / max;

  return (
    <>
      <Block>
        <ScoreBoard game={game} />
        <EpisodeTimeline
          scale={1}
          controlled={controlled}
          uncontrolled={uncontrolled}
          onSelectPeriod={(period) => {
            dispatch({ type: "activate", period });
          }}
        />
        <Block padding={[1]}>
          {active && (
            <Timer
              radius={72}
              border={16}
              value={Math.min(active.duration, 60) * f}
              color={
                active.type === "home"
                  ? BrandColor.primary
                  : BrandColor.secondary
              }
            >
              {(value) => value * max}
            </Timer>
          )}
          {active && (
            <dl style={{ fontSize: 16 }}>
              <dt>Start</dt>
              <dd>{formatTime(active.start)}</dd>
              <dt>Duration</dt>
              <dd>{active.duration}</dd>
              <dt>Player</dt>
              <dd>{active.playerId}</dd>
            </dl>
          )}
        </Block>
      </Block>
    </>
  );
};

export default GameView;
