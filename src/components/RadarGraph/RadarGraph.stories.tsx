import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import RadarGraph, { Stats } from "./RadarGraph";

storiesOf("RadarGraph", module)
  .addDecorator(getStory => <div>{getStory()}</div>)
  .addDecorator(withKnobs)
  .add("RadarGraph", () => {
    const value = number("Points", 6, {
      range: true,
      min: 3,
      max: 24,
      step: 3
    });

    const labels = Array.from("abcdefghijklmnopqrstuvwxyz").slice(0, value);

    const genStats = () =>
      labels.map(label => ({
        label,
        value: Math.random()
      }));

    const stats: Stats = [
      {
        values: genStats(),
        fill: "rgba(0, 118, 255, 0.05)",
        stroke: "rgb(0, 118, 255)"
      },
      {
        values: genStats(),
        fill: "rgba(66, 221, 132, 0.05)",
        stroke: "rgb(66, 221, 132)"
      }
    ];

    return <RadarGraph stats={stats} />;
  });
