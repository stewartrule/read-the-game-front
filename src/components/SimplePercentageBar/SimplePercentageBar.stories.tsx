import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import PercentageBar from "./SimplePercentageBar";

const fibonacci = [0.1, 0.2, 0.3, 0.5, 0.8];

storiesOf("SimplePercentageBar", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .add("Without gap", () => (
    <>
      {fibonacci.map(left => (
        <Section key={left}>
          <PercentageBar left={left} right={1 - left} />
        </Section>
      ))}
    </>
  ))
  .add("With Gap", () => (
    <>
      {fibonacci.map(left => (
        <Section key={left}>
          <PercentageBar left={left} right={(1 - left) / 2} />
        </Section>
      ))}
    </>
  ));
