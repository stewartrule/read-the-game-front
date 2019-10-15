import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Card, { CardColumn, CardSection } from "./Card";

storiesOf("Card", module)
  .addDecorator(getStory => (
    <Section secondary spacious>
      {getStory()}
    </Section>
  ))
  .add("Card", () => (
    <Card>
      <CardSection>
        <CardColumn>1</CardColumn>
      </CardSection>
      <CardSection soft>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
      </CardSection>
      <CardSection>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
        <CardColumn>3</CardColumn>
      </CardSection>
      <CardSection>
        <CardColumn>1</CardColumn>
        <CardColumn>2</CardColumn>
        <CardColumn>3</CardColumn>
        <CardColumn>4</CardColumn>
      </CardSection>
    </Card>
  ));
