import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Button from "./Button";
import ButtonGroup from "./";

storiesOf("ButtonGroup", module)
  .add("Default", () => (
    <>
      <Section secondary padding={[2]}>
        <ButtonGroup>
          <Button>Click me</Button>
          <Button>Click me</Button>
          <Button active>Click me</Button>
        </ButtonGroup>
      </Section>
      <Section primary padding={[2]}>
        <ButtonGroup>
          <Button inverted>Click me</Button>
          <Button inverted>Click me</Button>
          <Button active>Click me</Button>
        </ButtonGroup>
      </Section>
    </>
  ))
  .add("Compact", () => (
    <Section secondary padding={[1]}>
      <ButtonGroup>
        <Button compact>Click me</Button>
        <Button compact>Click me</Button>
        <Button compact active>
          Click me
        </Button>
      </ButtonGroup>
    </Section>
  ))
  .add("Toggle", () => (
    <Section padding={[3]}>
      <ButtonGroup>
        <Button>Bayern</Button>
        <Button active primary>
          Dortmund
        </Button>
      </ButtonGroup>
    </Section>
  ));

storiesOf("Button", module)
  .addDecorator(getStory => (
    <Section padding={[1]} secondary>
      {getStory()}
    </Section>
  ))
  .add("Button", () => <Button>Click me</Button>)
  .add("Button Active", () => <Button active>Click me</Button>)
  .add("Button Inverted", () => <Button inverted>Click me</Button>)
  .add("Button Primary", () => <Button primary>Click me</Button>)
  .add("Button Compact", () => <Button compact>Click me</Button>);
