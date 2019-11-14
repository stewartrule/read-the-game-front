import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Card, { CardColumn, CardSection } from "./Card";

storiesOf("Card", module)
  .addDecorator(getStory => (
    <Block theme="secondary" padding={[1]}>
      {getStory()}
    </Block>
  ))
  .add("Card", () => (
    <Card>
      <CardSection padding={[1]}>
        <CardColumn>1</CardColumn>
      </CardSection>
      <CardSection soft padding={[1]}>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
      </CardSection>
      <CardSection padding={[1]}>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
        <CardColumn>3</CardColumn>
      </CardSection>
      <CardSection padding={[1]}>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
        <CardColumn>3</CardColumn>
        <CardColumn>4</CardColumn>
      </CardSection>
    </Card>
  ));
