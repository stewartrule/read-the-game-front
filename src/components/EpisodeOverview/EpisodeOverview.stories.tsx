import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import EpisodeOverview from "./";
import { getPeriods } from "./fixture";

const odds = [0.2, 0.5, 0.8];

const story = storiesOf("EpisodeOverview", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .addDecorator(withKnobs);

odds.forEach(value => {
  story.add(
    `${Math.round((1 - value) * 100)}% - ${Math.round(value * 100)}%`,
    () => <EpisodeOverview periods={getPeriods(value)} height={280} />
  );
});
