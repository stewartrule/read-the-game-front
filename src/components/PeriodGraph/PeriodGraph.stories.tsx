import { withKnobs, boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { BrandColor } from "../../util/skin";
import Section from "../Section";
import PeriodGraph, { PeriodGraphPeriod } from "./PeriodGraph";
import { Button } from "../ButtonGroup";

function createPeriods(): PeriodGraphPeriod[] {
  return Array.from({ length: 6 }, (_, i) => {
    return {
      inner: {
        fill: i % 2 === 0 ? BrandColor.primary : BrandColor.secondary,
        value: Math.random()
      },
      outer: {
        fill: i % 2 === 0 ? BrandColor.secondary : BrandColor.primary,
        value: Math.random()
      }
    };
  });
}

storiesOf("PeriodGraph", module)
  .addDecorator(getStory => <Section padding={[1]}>{getStory()}</Section>)
  .addDecorator(withKnobs)
  .add("PeriodGraph", () => {
    const [periods, setPeriods] = useState(createPeriods());
    const animate = boolean("Animate", true);

    return (
      <>
        <Button onClick={() => setPeriods(createPeriods())}>Randomize</Button>
        <PeriodGraph periods={periods} immediate={!animate} />
      </>
    );
  });
