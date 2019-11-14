import "./styles.scss";

import * as React from "react";

import bem from "../../util/bem";

export type Props = {
  type?: "button" | "submit" | "reset";
  active?: boolean;
  disabled?: boolean;
  compact?: boolean;
  inverted?: boolean;
  primary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<Props> = ({
  compact = false,
  inverted = false,
  active = false,
  disabled = false,
  primary = false,
  type = "button",
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={bem({
      button: {
        "--disabled": disabled,
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
