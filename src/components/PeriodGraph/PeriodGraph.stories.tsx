import { withKnobs, boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { BrandColor } from "../../util/skin";
import Block from "../Block";
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

const Story = ({
  immediate,
  shadow
}: {
  immediate: boolean;
  shadow: boolean;
}) => {
  const [periods, setPeriods] = useState(createPeriods());

  return (
    <>
      <Button onClick={() => setPeriods(createPeriods())}>Randomize</Button>
      <PeriodGraph periods={periods} immediate={immediate} shadow={shadow} />
    </>
  );
};

storiesOf("PeriodGraph", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .addDecorator(withKnobs)
  .add("Fixed", () => {
    const periods = Array.from({ length: 6 }, (_, i) => {
      return {
        inner: {
          fill: i % 2 === 0 ? BrandColor.primary : BrandColor.secondary,
          value: i * (1 / 5)
        },
        outer: {
          fill: i % 2 === 0 ? BrandColor.secondary : BrandColor.primary,
          value: i * (1 / 5)
        }
      };
    });

    return <PeriodGraph periods={periods} immediate shadow />;
  })
  .add("Random", () => {
    const animate = boolean("Animate", true);
    const shadow = boolean("Shadow", true);

    return <Story immediate={!animate} shadow={shadow} />;
  });
