import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
import RotaryKnob from "../RotaryKnob/RotaryKnob";
import Block from "../Block";
import Predictor from "./Predictor";
import { PredictorItemState } from "./types";
import { reducer, initialState } from "./fixture";

const { useReducer } = React;

storiesOf("Predictor", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("Predictor", () => {
    const range = 60;
    const factor = 1 / range;

    const [items, dispatch] = useReducer(reducer, initialState);
    const active = items.find(item => item.state === PredictorItemState.active);

    return (
      <div>
        <Predictor
          items={items}
          onChangeDuration={item => {
            dispatch({
              type: "activate",
              item
            });
          }}
          onChangePosition={item => {}}
        />

        {active && active.type === "duration" && (
          <RotaryKnob
            value={active.value * factor}
            onStartDrag={() => {}}
            onDrag={value => {
              dispatch({
                item: active,
                type: "duration",
                value: Math.round(value * range)
              });
            }}
            onEndDrag={value => {
              dispatch({
                item: active,
                type: "duration",
                value: Math.round(value * range)
              });
            }}
            render={({ center, value }) => (
              <text
                x={center.x}
                y={center.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily={FontFamily.Default}
                fontWeight="bold"
                style={{ textAlign: "center" }}
                fontSize="96px"
                fill={BrandColor.primary}
              >
                {Math.round(value * range)}
              </text>
            )}
          />
        )}
      </div>
    );
  });
