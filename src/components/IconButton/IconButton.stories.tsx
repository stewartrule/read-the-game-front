import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import IconButton from "./";
import { Icon } from "./IconButton";

const icons: Icon[] = [
  "ok",
  "cancel",
  "down-open",
  "up-open",
  "right-open",
  "left-open"
];

storiesOf("IconButton", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .add("IconButtons", () => (
    <>
      <Block padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} />
        ))}
      </Block>
      <Block padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} success />
        ))}
      </Block>
      <Block padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} primary />
        ))}
      </Block>
    </>
  ));
