import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import PercentageBar from "./";

const ratio = [0.15, 0.2, 0.3, 0.5, 0.7];

storiesOf("PercentageBar", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .add("Without gap", () => (
    <>
      {ratio.map(left => (
        <Section key={left} padding={[2]}>
          <PercentageBar left={left} right={1 - left} />
        </Section>
      ))}
    </>
  ))
  .add("With gap", () => (
    <>
      {ratio.map(left => (
        <Section key={left} padding={[2]}>
          <PercentageBar left={left} right={(1 - left) / 2} />
        </Section>
      ))}
    </>
  ));
