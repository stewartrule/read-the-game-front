import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import AreaSelect from "./";

const { useState } = React;

storiesOf("AreaSelect", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("AreaSelect", () => {
    const [index, setIndex] = useState<number | undefined>(undefined);

    return <AreaSelect onSelect={setIndex} selectedIndex={index} />;
  });
