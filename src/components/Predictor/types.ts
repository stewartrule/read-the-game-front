import { AreaCode } from "../AreaSelect";

export enum PredictorItemState {
  active = "active",
  disabled = "disabled"
}

export type TextItemType = {
  id: number;
  type: "text";
  value: string;
  state?: PredictorItemState;
};

export type PositionItemType = {
  id: number;
  type: "position";
  value: AreaCode;
  state?: PredictorItemState;
};

export type DurationItemType = {
  id: number;
  type: "duration";
  value: number;
  state?: PredictorItemState;
};

export type PredictorItemType =
  | TextItemType
  | PositionItemType
  | DurationItemType;
