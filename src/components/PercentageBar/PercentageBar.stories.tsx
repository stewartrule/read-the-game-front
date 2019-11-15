import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import PercentageBar from "./";

const ratio = [0.15, 0.2, 0.3, 0.5, 0.7];

storiesOf("PercentageBar", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .add("Without gap", () => (
    <>
      {ratio.map(left => (
        <Block key={left} padding={[4, 2, 0, 2]}>
          <PercentageBar left={left} right={1 - left} />
        </Block>
      ))}
    </>
  ))
  .add("With gap", () => (
    <>
      {ratio.map(left => (
        <Block key={left} padding={[4, 2, 0, 2]}>
          <PercentageBar left={left} right={(1 - left) / 2} />
        </Block>
      ))}
    </>
  ));
