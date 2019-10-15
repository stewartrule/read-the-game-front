import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor, FontFamily } from "../../util/skin";
import RotaryKnob from "../RotaryKnob/RotaryKnob";
import Section from "../Section";
import Predictor from "./Predictor";
import { DurationItemType, PredictorItemType } from "./types";

const { useReducer, useState } = React;

type State = PredictorItemType[];

const initialState: State = [
  { type: "text", value: "Wenn" },
  { type: "text", value: "Bayern" },
  { type: "text", value: "den" },
  { type: "text", value: "Ball" },
  { type: "position", value: "zd" },
  { type: "text", value: "per" },
  { type: "text", value: "Zweikamp" },
  { type: "text", value: "erobert," },
  { type: "text", value: "die" },
  { type: "text", value: "Ballkontrolphase" },
  { type: "text", value: "ca." },
  { type: "duration", value: 10 },
  { type: "text", value: "dauert" },
  { type: "text", value: "und" },
  { type: "text", value: "an" },
  { type: "text", value: "der" },
  { type: "text", value: "Phase" },
  { type: "text", value: "4 spieler" },
  { type: "text", value: "beteiligt" },
  { type: "text", value: "sind" },
  { type: "text", value: "liegt" },
  { type: "text", value: "die" },
  { type: "text", value: "Torwahrscheinlichkeit" },
  { type: "text", value: "bei:" }
];

type DurationAction = {
  type: "duration";
  value: number;
  index: number;
};

type PositionAction = {
  type: "position";
  value: string;
  index: number;
};

type Action = DurationAction | PositionAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "duration":
      return state.map((item, i) =>
        i === action.index && item.type === "duration"
          ? { ...item, value: action.value }
          : item
      );

    default:
      return state;
  }
};

storiesOf("Predictor", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .add("Predictor", () => {
    const [index, setIndex] = useState<number | undefined>(undefined);

    const [values, dispatch] = useReducer(reducer, initialState);

    const duration = values.find(
      (value, i): value is DurationItemType =>
        value.type === "duration" && i === index
    );

    const range = 60;
    const factor = 1 / range;
    return (
      <div>
        <Predictor
          values={values}
          onChangeDuration={(item, index) => {
            setIndex(index);
          }}
          onChangePosition={(item, index) => {}}
        />

        {duration && (
          <RotaryKnob
            value={duration.value * factor}
            onStartDrag={() => {}}
            onDrag={val => {
              index != null &&
                dispatch({
                  type: "duration",
                  index: index,
                  value: Math.round(val * range)
                });
            }}
            onEndDrag={val => {
              index != null &&
                dispatch({
                  type: "duration",
                  index: index,
                  value: Math.round(val * range)
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
