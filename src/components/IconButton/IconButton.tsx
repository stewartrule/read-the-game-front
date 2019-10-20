import * as React from "react";
import bem from "../../util/bem";
import "./styles.scss";

export type Icon =
  | "ok"
  | "cancel"
  | "down-open"
  | "up-open"
  | "right-open"
  | "left-open";

type Margin = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Props = {
  icon: Icon;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  success?: boolean;
  margin?: [Margin] | [Margin, Margin] | [Margin, Margin, Margin, Margin];
};

const IconButton: React.FC<Props> = ({
  icon,
  margin,
  primary = false,
  success = false,
  type = "button"
}) => (
  <button
    type={type}
    style={
      margin
        ? {
            margin: margin.map(value => `${value * 0.25}rem`).join(" ")
          }
        : undefined
    }
    className={bem({
      "icon-button": {
        "--primary": primary,
        "--success": success
      }
    })}
  >
    <span className={`icon-${icon}`}></span>
  </button>
);

export default IconButton;
