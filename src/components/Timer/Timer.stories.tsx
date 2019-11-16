import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Timer from "./Timer";

storiesOf("Timer", module)
  .addDecorator(getStory => <Block theme="secondary">{getStory()}</Block>)
  .add("Timer", () => (
    <Timer radius={90} border={20} value={0.33}>
      {value => value * 60}
    </Timer>
  ));
