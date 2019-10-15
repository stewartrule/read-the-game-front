import * as React from "react";
import bem from "../../util/bem";
import "./styles.css";

type Icon =
  | "ok"
  | "cancel"
  | "down-open"
  | "up-open"
  | "right-open"
  | "left-open";

type Props = {
  icon: Icon;
  type?: "button" | "submit" | "reset";
  success?: boolean;
};

const IconButton: React.FC<Props> = ({
  icon,
  success = false,
  type = "button"
}) => (
  <button
    type={type}
    className={bem({
      "icon-button": {
        "--success": success
      }
    })}
  >
    <span className={`icon-${icon}`}></span>
  </button>
);

export default IconButton;
