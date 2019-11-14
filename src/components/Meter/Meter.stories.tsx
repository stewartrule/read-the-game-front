import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Block from "../Block";
import Meter from "./Meter";

storiesOf("Meter", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("Meter", () => (
    <Meter value={0.5} color={BrandColor.primary}>
      {value => value * 100}
    </Meter>
  ));
