import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import EpisodeTimeline from "./";
import { periods as fixture } from "./fixture";
import { Controlled, Uncontrolled } from "./types";
import { formatTime } from "./util";

const { useReducer } = React;

type ActivateAction = {
  type: "activate";
  period: Controlled;
};

type Action = ActivateAction;

const reducer = (state: Controlled[], action: Action): Controlled[] => {
  switch (action.type) {
    case "activate":
      return state.map(period =>
        period.start === action.period.start
          ? { ...period, active: true }
          : { ...period, active: false }
      );

    default:
      return state;
  }
};

storiesOf("EpisodeTimeline", module)
  .addDecorator(getStory => <Section padding={[1]}>{getStory()}</Section>)
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
