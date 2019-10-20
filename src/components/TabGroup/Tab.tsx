import * as React from "react";

import bem from "../../util/bem";

type Props = {
  active?: boolean;
  primary?: boolean;
};

const Tab: React.FC<Props> = ({
  active = false,
  primary = false,
  children
}) => (
  <button
    className={bem({ tab: { "--active": active, "--primary": primary } })}
  >
    <span>{children}</span>
    <span className="icon icon-down-open"></span>
  </button>
);

export default Tab;
