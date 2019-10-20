import "./styles.scss";

import * as React from "react";

import PredictorItem from "./PredictorItem";
import { DurationItemType, PositionItemType, PredictorItemType } from "./types";

type Props = {
  values: PredictorItemType[];
  onChangeDuration: (value: DurationItemType, index: number) => void;
  onChangePosition: (value: PositionItemType, index: number) => void;
};

const Predictor: React.FC<Props> = ({
  values,
  onChangePosition,
  onChangeDuration
}) => (
  <div className="predictor">
    {values.map((value, i) => {
      switch (value.type) {
        case "text":
          return <PredictorItem key={i}>{value.value}</PredictorItem>;

        case "position":
          return (
            <PredictorItem key={i} onChange={() => onChangePosition(value, i)}>
              {value.value}
            </PredictorItem>
          );

        case "duration":
          return (
            <PredictorItem key={i} onChange={() => onChangeDuration(value, i)}>
              {value.value}
            </PredictorItem>
          );
      }

      return unreachable(value);
    })}
  </div>
);

function unreachable(_: never): never {
  throw Error("Item type does not exist");
}

export default Predictor;
