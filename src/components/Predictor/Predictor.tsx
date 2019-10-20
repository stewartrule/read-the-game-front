import "./styles.scss";

import * as React from "react";

import PredictorItem from "./PredictorItem";
import { DurationItemType, PositionItemType, PredictorItemType } from "./types";

type Props = {
  items: PredictorItemType[];
  onChangeDuration: (value: DurationItemType) => void;
  onChangePosition: (value: PositionItemType) => void;
};

const Predictor: React.FC<Props> = ({
  items,
  onChangePosition,
  onChangeDuration
}) => (
  <div className="predictor">
    {items.map(item => {
      switch (item.type) {
        case "text":
          return (
            <PredictorItem state={item.state} key={item.id}>
              {item.value}
            </PredictorItem>
          );

        case "position":
          return (
            <PredictorItem
              key={item.id}
              state={item.state}
              onChange={() => onChangePosition(item)}
            >
              {item.value}
            </PredictorItem>
          );

        case "duration":
          return (
            <PredictorItem
              key={item.id}
              state={item.state}
              onChange={() => onChangeDuration(item)}
            >
              {item.value}
            </PredictorItem>
          );
      }

      return unreachable(item);
    })}
  </div>
);

function unreachable(_: never): never {
  throw Error("Item type does not exist");
}

export default Predictor;
