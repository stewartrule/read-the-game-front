export type TextItemType = {
  type: "text";
  value: string;
};

export type PositionItemType = {
  type: "position";
  value: string;
};

export type DurationItemType = {
  type: "duration";
  value: number;
};

export type PredictorItemType =
  | TextItemType
  | PositionItemType
  | DurationItemType;
