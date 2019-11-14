import * as React from "react";

import bem from "../../util/bem";

type Props = {
  active?: boolean;
  primary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Tab: React.FC<Props> = ({
  active = false,
  primary = false,
  children,
  onClick
}) => (
  <button
    onClick={onClick}
    className={bem({ tab: { "--active": active, "--primary": primary } })}
  >
    <span>{children}</span>
    <span className="icon icon-down-open"></span>
  </button>
);

export default Tab;
