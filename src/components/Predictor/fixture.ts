import { AreaCode } from "../AreaSelect";

import {
  DurationItemType,
  PositionItemType,
  PredictorItemState,
  PredictorItemType
} from "./types";

type State = PredictorItemType[];

export const initialState: State = [
  { id: 1, type: "text", value: "Wenn" },
  { id: 2, type: "text", value: "Bayern" },
  { id: 3, type: "text", value: "den" },
  { id: 4, type: "text", value: "Ball" },
  { id: 5, type: "position", value: "ZM" },
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

export type DurationAction = {
  type: "duration";
  item: DurationItemType;
  value: number;
};

export type PositionAction = {
  type: "position";
  item: PositionItemType;
  value: AreaCode;
};

export type ActivateAction = {
  type: "activate";
  item: PredictorItemType;
};

export type DeactivateAction = {
  type: "deactivate";
};

export type Action =
  | DurationAction
  | PositionAction
  | ActivateAction
  | DeactivateAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "duration":
      return state.map(item =>
        item.id === action.item.id && item.type === "duration"
          ? { ...item, value: action.value }
          : item
      );

    case "position":
      return state.map(item =>
        item.id === action.item.id && item.type === "position"
          ? { ...item, value: action.value }
          : item
      );

    case "activate":
      return state.map(item =>
        item.id === action.item.id
          ? { ...item, state: PredictorItemState.active }
          : { ...item, state: PredictorItemState.disabled }
      );

    case "deactivate":
      return state.map(item => ({
        ...item,
        state: undefined
      }));

    default:
      return state;
  }
};
