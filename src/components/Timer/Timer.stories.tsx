import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Timer from "./Timer";

storiesOf("Timer", module)
  .addDecorator(getStory => <Section secondary>{getStory()}</Section>)
  .add("Timer", () => (
    <Timer radius={90} border={20} value={0.33}>
      {value => value * 60}
    </Timer>
  ));
