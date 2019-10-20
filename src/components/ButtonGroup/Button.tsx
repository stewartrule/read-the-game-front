import "./styles.scss";

import * as React from "react";

import bem from "../../util/bem";

export type Props = {
  type?: "button" | "submit" | "reset";
  active?: boolean;
  compact?: boolean;
  inverted?: boolean;
  primary?: boolean;
};

const Button: React.FC<Props> = ({
  compact = false,
  inverted = false,
  active = false,
  primary = false,
  type = "button",
  children
}) => (
  <button
    type={type}
    className={bem({
      button: {
        "--active": active,
        "--compact": compact,
        "--inverted": inverted,
        "--primary": primary
      }
    })}
  >
    {children}
  </button>
);

export default Button;
