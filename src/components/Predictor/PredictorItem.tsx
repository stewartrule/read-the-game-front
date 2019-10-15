import * as React from "react";
import bem from "../../util/bem";

type Props = {
  active?: boolean;
  onChange?: () => void;
};

const PredictorItem: React.FC<Props> = ({
  children,
  onChange,
  active = false
}) => (
  <span
    role={onChange != null ? "button" : undefined}
    onPointerUp={onChange}
    className={bem({
      predictor__item: {
        "--active": active,
        "--interactive": onChange != null
      }
    })}
  >
    {children}
  </span>
);

export default PredictorItem;
