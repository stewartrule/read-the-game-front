import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import EpisodeTimeline from "./";
import { periods as fixture, reducer } from "./fixture";
import { Controlled, Uncontrolled } from "./types";
import { formatTime } from "./util";

const { useReducer } = React;

storiesOf("EpisodeTimeline", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .addDecorator(withKnobs)
  .add("EpisodeTimeline", () => {
    const scale = number(
      "Scale",
      1,
      {
        range: true,
        min: 1,
        max: 5
      },
      "scale"
    );

    const initialState = fixture.filter(
      (period): period is Controlled => period.control
    );

    const uncontrolled = fixture.filter(
      (period): period is Uncontrolled => period.control === false
    );

    const [controlled, dispatch] = useReducer(reducer, initialState);
    const active = controlled.find(period => period.control && period.active);

    return (
      <>
        <EpisodeTimeline
          scale={scale}
          controlled={controlled}
          uncontrolled={uncontrolled}
          onSelectPeriod={period => {
            dispatch({ type: "activate", period });
          }}
        />
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
      </>
    );
  });
