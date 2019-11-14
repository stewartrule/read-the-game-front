import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
import RotaryKnob from "../RotaryKnob/RotaryKnob";
import Block from "../Block";
import Predictor from "./Predictor";
import {
  DurationItemType,
  PredictorItemState,
  PredictorItemType
} from "./types";

const { useReducer } = React;

type State = PredictorItemType[];

const initialState: State = [
  { id: 1, type: "text", value: "Wenn" },
  { id: 2, type: "text", value: "Bayern" },
  { id: 3, type: "text", value: "den" },
  { id: 4, type: "text", value: "Ball" },
  { id: 5, type: "position", value: "zd" },
  { id: 6, type: "text", value: "per" },
  { id: 7, type: "text", value: "Zweikamp" },
  { id: 8, type: "text", value: "erobert," },
  { id: 9, type: "text", value: "die" },
  { id: 10, type: "text", value: "Ballkontrolphase" },
  { id: 11, type: "text", value: "ca." },
  { id: 12, type: "duration", value: 10 },
  { id: 13, type: "text", value: "dauert" },
  { id: 14, type: "text", value: "und" },
  { id: 15, type: "text", value: "an" },
  { id: 16, type: "text", value: "der" },
  { id: 17, type: "text", value: "Phase" },
  { id: 18, type: "text", value: "4 spieler" },
  { id: 19, type: "text", value: "beteiligt" },
  { id: 20, type: "text", value: "sind" },
  { id: 21, type: "text", value: "liegt" },
  { id: 22, type: "text", value: "die" },
  { id: 23, type: "text", value: "Torwahrscheinlichkeit" },
  { id: 24, type: "text", value: "bei:" }
];

type DurationAction = {
  type: "duration";
  item: DurationItemType;
  value: number;
};

type ActivateAction = {
  type: "activate";
  item: PredictorItemType;
};

type Action = DurationAction | ActivateAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "duration":
      return state.map(item =>
        item.id === action.item.id && item.type === "duration"
          ? { ...item, value: action.value }
          : item
      );

    case "activate":
      return state.map(item =>
        item.id === action.item.id
          ? { ...item, state: PredictorItemState.active }
          : { ...item, state: PredictorItemState.disabled }
      );

    default:
      return state;
  }
};

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
