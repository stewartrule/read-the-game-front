import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Section from "../Section";
import Meter from "./Meter";

storiesOf("Meter", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .add("Meter", () => (
    <Meter value={0.5} color={BrandColor.primary}>
      {value => value * 100}
    </Meter>
  ));
