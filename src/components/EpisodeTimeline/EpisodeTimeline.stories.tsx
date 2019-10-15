import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import EpisodeTimeline from "./";
import { Period } from "./types";

const homePlayers = Array.from("abcdefghijk").map((name, i) => ({
  id: 1 + i,
  name
}));

const awayPlayers = Array.from("lmnopqrstuv").map((name, i) => ({
  id: 20 + i,
  name
}));

const duration = 60 * 45; // time.
const interval = 5;

const periods: Period[] = [];
for (let time = 0; time < duration; time += interval) {
  if (Math.random() > 0.9) {
    periods.push({
      time,
      control: false
    });
  } else if (Math.random() > 0.3) {
    const last = periods[periods.length - 1];

    if (last && last.control && last.type === "home" && Math.random() > 0.5) {
      periods.push({
        time,
        type: "home",
        control: true,
        playerId: last.playerId
      });
    } else {
      periods.push({
        time,
        type: "home",
        control: true,
        playerId: homePlayers[time % homePlayers.length].id
      });
    }
  } else {
    const last = periods[periods.length - 1];

    if (last && last.control && last.type === "away" && Math.random() > 0.5) {
      periods.push({
        time,
        type: "away",
        control: true,
        playerId: last.playerId
      });
    } else {
      periods.push({
        time,
        type: "away",
        control: true,
        playerId: awayPlayers[time % awayPlayers.length].id
      });
    }
  }
}

storiesOf("EpisodeTimeline", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .addDecorator(withKnobs)
  .add("EpisodeTimeline", () => {
    return <EpisodeTimeline periods={periods} interval={interval} />;
  });
