import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Block from "../Block";
import Arc from "./";

storiesOf("Arc", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("strokeAlign", () => (
    <>
      {(["inside", "middle", "outside"] as const).map(strokeAlign => (
        <div>
          <h2>{strokeAlign}</h2>
          <svg width={100} height={100}>
            <rect x={0} y={0} width={100} height={100} fill="#eee" />
            <circle cx={50} cy={50} r={40} strokeWidth={0} fill="#ccc" />
            <Arc
              cx={50}
              cy={50}
              r={40}
              strokeWidth={10}
              value={0.5}
              stroke={BrandColor.primary}
              strokeAlign={strokeAlign}
            />
          </svg>
        </div>
      ))}
    </>
  ));
