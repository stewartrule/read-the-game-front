import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import SimpleRadarGraph, { Stat } from "./SimpleRadarGraph";

const stats: Stat[] = [
  { label: "A", value: 1 },
  { label: "B", value: 0.6 },
  { label: "C", value: 1 },
  { label: "D", value: 1 },
  { label: "E", value: 0.85 },
  { label: "F", value: 1 }
];

storiesOf("SimpleRadarGraph", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .add("Background", () => (
    <>
      <Section theme="primary">
        <SimpleRadarGraph stats={stats} />
      </Section>
      <Section theme="dark">
        <SimpleRadarGraph stats={stats} />
      </Section>
      <Section theme="secondary">
        <SimpleRadarGraph stats={stats} />
      </Section>
    </>
  ));
