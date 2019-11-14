import * as React from "react";

import bem from "../../util/bem";
import { PredictorItemState } from "./types";

type Props = {
  onChange?: () => void;
  state?: PredictorItemState;
};

const PredictorItem: React.FC<Props> = ({ children, onChange, state }) => (
  <span
    role={onChange != null ? "button" : undefined}
    onPointerUp={onChange}
    className={bem({
      predictor__item: {
        "--active": state === PredictorItemState.active,
        "--disabled": state === PredictorItemState.disabled,
        "--interactive": onChange != null
      }
    })}
  >
    {children}
  </span>
);

export default PredictorItem;
