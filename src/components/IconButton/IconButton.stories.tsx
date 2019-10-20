import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
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
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .add("IconButtons", () => (
    <>
      <Section padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} />
        ))}
      </Section>
      <Section padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} success />
        ))}
      </Section>
      <Section padding={[1]}>
        {icons.map(icon => (
          <IconButton key={icon} icon={icon} margin={[0, 1, 0, 0]} primary />
        ))}
      </Section>
    </>
  ));
