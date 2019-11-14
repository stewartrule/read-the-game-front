import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import PercentageBar from "./SimplePercentageBar";

const fibonacci = [0.1, 0.2, 0.3, 0.5, 0.8];

storiesOf("SimplePercentageBar", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("Without gap", () => (
    <>
      {fibonacci.map(left => (
        <Block padding={[1]} key={left}>
          <PercentageBar left={left} right={1 - left} />
        </Block>
      ))}
    </>
  ))
  .add("With Gap", () => (
    <>
      {fibonacci.map(left => (
        <Block padding={[1]} key={left}>
          <PercentageBar left={left} right={(1 - left) / 2} />
        </Block>
      ))}
    </>
  ));
