import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Button from "./Button";
import ButtonGroup from "./";

storiesOf("ButtonGroup", module)
  .add("Default", () => (
    <>
      <Block theme="secondary" padding={[2]}>
        <ButtonGroup>
          <Button>Click me</Button>
          <Button>Click me</Button>
          <Button active>Click me</Button>
        </ButtonGroup>
      </Block>
      <Block theme="primary" padding={[2]}>
        <ButtonGroup>
          <Button inverted>Click me</Button>
          <Button inverted>Click me</Button>
          <Button active>Click me</Button>
        </ButtonGroup>
      </Block>
    </>
  ))
  .add("Compact", () => (
    <Block theme="secondary" padding={[1]}>
      <ButtonGroup>
        <Button compact>Click me</Button>
        <Button compact>Click me</Button>
        <Button compact active>
          Click me
        </Button>
      </ButtonGroup>
    </Block>
  ))
  .add("Toggle", () => (
    <Block padding={[3]}>
      <ButtonGroup>
        <Button>Bayern</Button>
        <Button active primary>
          Dortmund
        </Button>
      </ButtonGroup>
    </Block>
  ));

storiesOf("Button", module)
  .addDecorator(getStory => (
    <Block padding={[1]} theme="secondary">
      {getStory()}
    </Block>
  ))
  .add("Button", () => <Button>Click me</Button>)
  .add("Button Active", () => <Button active>Click me</Button>)
  .add("Button Inverted", () => <Button inverted>Click me</Button>)
  .add("Button Primary", () => <Button primary>Click me</Button>)
  .add("Button Compact", () => <Button compact>Click me</Button>);
