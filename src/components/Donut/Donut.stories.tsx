import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Block from "../Block";
import Donut from "./Donut";

storiesOf("Donut", module)
  .addDecorator(getStory => (
    <Block>
      <svg width={120} height={120}>
        {getStory()}
      </svg>
    </Block>
  ))
  .addDecorator(withKnobs)
  .add("Donut", () => {
    const intercepts = number("Intercepts", 10, {
      range: true,
      min: 1,
      max: 20,
      step: 1
    });

    const passes = number("Passes", 10, {
      range: true,
      min: 1,
      max: 20,
      step: 1
    });

    const offenses = number("Offenses", 10, {
      range: true,
      min: 1,
      max: 20,
      step: 1
    });

    const total = intercepts + passes + offenses;
    const factor = 1 / total;

    const segments = [
      { value: factor * intercepts, fill: BrandColor.primary },
      { value: factor * passes, fill: BrandColor.secondary },
      { value: factor * offenses, fill: BrandColor.black }
    ];

    return (
      <Donut cx={60} cy={60} innerRadius={30} radius={60} segments={segments} />
    );
  });
