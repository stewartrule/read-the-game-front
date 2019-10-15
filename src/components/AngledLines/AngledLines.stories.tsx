import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Section from "../Section";
import AngledLines from "./AngledLines";

storiesOf("AngledLines", module)
  .addDecorator(getStory => <Section>{getStory()}</Section>)
  .addDecorator(withKnobs)
  .add("Interactive", () => {
    const amount = number(
      "Amount",
      10,
      {
        range: true,
        min: 5,
        max: 50,
        step: 1
      },
      "Angle"
    );

    const strokeWidth = number(
      "Stroke Width",
      5,
      {
        range: true,
        min: 5,
        max: 30,
        step: 1
      },
      "Angle"
    );

    const innerRadius = number(
      "Inner Radius",
      50,
      {
        range: true,
        min: 20,
        max: 100,
        step: 2
      },
      "Angle"
    );

    const outerRadius = number(
      "Outer Radius",
      50,
      {
        range: true,
        min: 20,
        max: 100,
        step: 2
      },
      "Angle"
    );

    const radius = innerRadius + outerRadius;
    const size = radius * 2;
    const viewBox = `0 0 ${size} ${size}`;
    const center = {
      x: radius,
      y: radius
    };

    return (
      <svg width={size} height={size} viewBox={viewBox}>
        <AngledLines
          center={center}
          amount={amount}
          stroke={i => BrandColor.primary}
          strokeWidth={strokeWidth}
          innerRadius={i => innerRadius}
          outerRadius={i => radius}
        />
      </svg>
    );
  });
