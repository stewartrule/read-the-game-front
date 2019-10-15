import { select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import FieldActivity from "./FieldActivity";
import { Area } from "./types";

type TeamAreaStats = {
  x: number;
  y: number;
  passes: number;
  intercepts: number;
  offenses: number;
};

type TeamStats = TeamAreaStats[];

const getTeam = (): TeamStats => {
  const team: TeamAreaStats[] = [];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 3; y++) {
      team.push({
        x,
        y,
        passes: Math.round(Math.random() * 5),
        intercepts: Math.round(Math.random() * 3),
        offenses: Math.round(Math.random() * 3)
      });
    }
  }

  return team;
};

const getStats = (team: TeamStats, key: keyof TeamAreaStats): Area => {
  const values = team.map(area => area[key]);
  const max = Math.max.apply(Math, values);
  const factor = max > 0 ? 1 / max : 0;
  return team.map(area => ({
    x: area.x,
    y: area.y,
    value: factor * area[key]
  }));
};

storiesOf("FieldActivity", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .addDecorator(withKnobs)
  .add("FieldActivity", () => {
    const key = select(
      "Value",
      {
        passes: "passes",
        intercepts: "intercepts",
        offenses: "offenses"
      },
      "passes"
    );

    const homeTeam = getStats(getTeam(), key);
    const awayTeam = getStats(getTeam(), key);

    return <FieldActivity left={homeTeam} right={awayTeam} />;
  });
