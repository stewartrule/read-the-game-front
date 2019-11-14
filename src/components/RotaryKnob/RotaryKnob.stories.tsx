import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
import Block from "../Block";
import RotaryKnob, { RenderOptions } from "./RotaryKnob";

const { useState } = React;

storiesOf("RotaryKnob", module)
  .addDecorator(getStory => <Block>{getStory()}</Block>)
  .add("Render value", () => {
    const [value, setValue] = useState(0);

    return (
      <RotaryKnob
        value={value}
        onDrag={newValue => {
          setValue(newValue);
        }}
        render={props => <InsideText {...props} />}
      />
    );
  })
  .add("Render radius", () => {
    const [value, setValue] = useState(0);

    return (
      <RotaryKnob
        value={value}
        onDrag={newValue => {
          setValue(newValue);
        }}
        render={props => <InsideRadius {...props} />}
      />
    );
  });

const InsideText = ({ center, value, dragged }: RenderOptions) => (
  <text
    x={center.x}
    y={center.y}
    textAnchor="middle"
    alignmentBaseline="middle"
    fontFamily={FontFamily.Default}
    fontWeight="bold"
    style={{ textAlign: "center" }}
    fontSize="96px"
    fill={dragged ? BrandColor.secondary : BrandColor.primary}
  >
    {(value * 100).toFixed(1)}
  </text>
);

const InsideRadius = ({ center, value, radius, dragged }: RenderOptions) => (
  <circle
    cx={center.x}
    cy={center.y}
    r={value * radius}
    fill={dragged ? BrandColor.secondary : BrandColor.primary}
  />
);
