import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import { game } from "./fixture";
import ScoreBoard from "./ScoreBoard";

storiesOf("ScoreBoard", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .add("ScoreBoard", () => <ScoreBoard game={game} />);
