import { select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import FieldActivity from "./FieldActivity";
import { getActivity } from "./fixture";

storiesOf("FieldActivity", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .addDecorator(withKnobs)
  .add("1 team", () => {
    const key = select(
      "Value",
      {
        passes: "passes",
        intercepts: "intercepts",
        offenses: "offenses"
      },
      "passes"
    );

    const team = getActivity(key);

    return <FieldActivity teams={[team]} />;
  })
  .add("2 teams", () => {
    const key = select(
      "Value",
      {
        passes: "passes",
        intercepts: "intercepts",
        offenses: "offenses"
      },
      "passes"
    );

    const homeTeam = getActivity(key);
    const awayTeam = getActivity(key);

    return <FieldActivity teams={[homeTeam, awayTeam]} />;
  });
