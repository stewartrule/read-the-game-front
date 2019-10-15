import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import ScatterGram, { Team } from "./ScatterGram";

const count = 7;
const factor = Math.PI / count;
const factor2 = Math.PI / (count * 2);

const cos = (index: number) => Math.cos(index * factor2 * Math.PI);
const sin = (index: number) => Math.sin(index * factor * Math.PI);

const avatar = "http://thetopforward.com/uploads/0/57134.jpg";
const teams: Team[] = [
  {
    id: 1,
    players: Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.abs(cos(i * Math.PI)) / 1.5,
      y: Math.abs(sin(i * Math.PI)) / 1.5,
      avatar
    })),
    color: BrandColor.primary
  },
  {
    id: 2,
    players: Array.from({ length: count }).map((_, i) => ({
      id: i + 20,
      x: Math.abs(sin(i * Math.PI)),
      y: Math.abs(cos(i * Math.PI)),
      avatar
    })),
    color: BrandColor.secondary
  }
];

storiesOf("ScatterGram", module)
  .addDecorator(getStory => <div>{getStory()}</div>)
  .addDecorator(withKnobs)
  .add("ScatterGram", () => {
    return <ScatterGram teams={teams} />;
  });
