import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import AreaSelect from "./";

const { useState } = React;

storiesOf("AreaSelect", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .add("AreaSelect", () => {
    const [index, setIndex] = useState<number | undefined>(undefined);

    return <AreaSelect onSelect={setIndex} selectedIndex={index} />;
  });
