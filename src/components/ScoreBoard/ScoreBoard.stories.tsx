import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import { game } from "./fixture";
import ScoreBoard from "./ScoreBoard";

storiesOf("ScoreBoard", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("ScoreBoard", () => <ScoreBoard game={game} />);
