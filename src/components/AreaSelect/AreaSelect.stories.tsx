import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import AreaSelect, { AreaCode } from "./AreaSelect";

const { useState } = React;

storiesOf("AreaSelect", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("AreaSelect", () => {
    const [areaCode, setAreaCode] = useState<AreaCode | undefined>(undefined);

    return (
      <AreaSelect
        onSelect={areaCode => setAreaCode(areaCode)}
        selectedArea={areaCode}
      />
    );
  });
