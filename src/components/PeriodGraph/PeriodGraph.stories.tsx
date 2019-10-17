import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import { Tuple } from "../../util/types";
import Section from "../Section";
import Graph, { ValueType } from "./PeriodGraph";

storiesOf("PeriodGraph", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .addDecorator(withKnobs)
  .add("PeriodGraph", () => {
    const values: ValueType[] = Array.from({ length: 6 }, (_, i) => {
      const inner = number(
        `Inner`,
        Math.round(Math.random() * 10) / 10,
        {
          range: true,
          min: 0,
          max: 1,
          step: 0.1
        },
        `Quarter ${i + 1}`
      );

      const outer = number(
        `Outer`,
        Math.round(Math.random() * 10) / 10,
        {
          range: true,
          min: 0,
          max: 1,
          step: 0.1
        },
        `Quarter ${i + 1}`
      );

      return {
        inner: {
          fill: i % 2 === 0 ? BrandColor.primary : BrandColor.secondary,
          value: inner
        },
        outer: {
          fill: i % 2 === 0 ? BrandColor.secondary : BrandColor.primary,
          value: outer
        }
      };
    });

    return <Graph values={values as Tuple<ValueType, 6>} />;
  });
