import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Button from "./Button";
import ButtonGroup from "./";

storiesOf("ButtonGroup", module)
  .add("Button Group", () => (
    <Section secondary>
      <ButtonGroup>
        <Button>Click me</Button>
        <Button>Click me</Button>
        <Button active>Click me</Button>
      </ButtonGroup>
    </Section>
  ))
  .add("Button Toggle", () => (
    <Section>
      <ButtonGroup>
        <Button>Bayern</Button>
        <Button active primary>
          Dortmund
        </Button>
      </ButtonGroup>
    </Section>
  ));

storiesOf("Button", module)
  .addDecorator(getStory => <Section secondary>{getStory()}</Section>)
  .add("Button", () => <Button>Click me</Button>)
  .add("Button Active", () => <Button active>Click me</Button>)
  .add("Button Inverted", () => <Button inverted>Click me</Button>)
  .add("Button Primary", () => <Button primary>Click me</Button>)
  .add("Button Compact", () => <Button compact>Click me</Button>);
