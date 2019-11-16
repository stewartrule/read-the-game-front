import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
import Block from "../Block";
import CircularBarGraph from "./CircularBarGraph";

const { useState } = React;

storiesOf("CircularBarGraph", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .addDecorator(withKnobs)
  .add("CircularBarGraph", () => {
    const amount = number(
      "Points",
      32,
      {
        range: true,
        min: 16,
        max: 48,
        step: 16
      },
      "graph"
    );

    const values = Array.from({ length: amount }, (_, i) => {
      const max = (1 / amount) * i;
      const min = max / 2;

      return {
        min,
        max
      };
    });

    const radius = 200;
    const growth = 200;
    const value = 0;
    const fontFamily = FontFamily.Default;

    const [index, setIndex] = useState<number | undefined>(undefined);

    return (
      <CircularBarGraph
        radius={radius}
        growth={growth}
        value={value}
        values={values}
        onSelect={setIndex}
        selectedIndex={index}
      >
        {({ center, value }) => (
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily={fontFamily}
            fontWeight="bold"
            style={{ textAlign: "center" }}
            fontSize="96px"
            fill={BrandColor.primary}
          >
            {(value * 60).toFixed(1)}
          </text>
        )}
      </CircularBarGraph>
    );
  });
