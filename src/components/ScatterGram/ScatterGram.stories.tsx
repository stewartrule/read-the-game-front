import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import ScatterGram from "./ScatterGram";
import { teamFixture } from "./fixture";

storiesOf("ScatterGram", module)
  .addDecorator(getStory => <div>{getStory()}</div>)
  .addDecorator(withKnobs)
  .add("ScatterGram", () => {
    return <ScatterGram team={teamFixture} />;
  });
