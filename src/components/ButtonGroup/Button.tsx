import "./styles.scss";

import * as React from "react";

import bem from "../../util/bem";

export type Icon =
  | "ok"
  | "cancel"
  | "down-open"
  | "up-open"
  | "right-open"
  | "left-open";

export type Props = {
  type?: "button" | "submit" | "reset";
  active?: boolean;
  disabled?: boolean;
  compact?: boolean;
  inverted?: boolean;
  primary?: boolean;
  icon?: Icon;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<Props> = ({
  compact = false,
  inverted = false,
  active = false,
  disabled = false,
  primary = false,
  type = "button",
  icon,
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

    {icon && <span className={`icon-${icon}`}></span>}
  </button>
);

export default Button;
