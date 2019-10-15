import * as React from "react";

import bem from "../../util/bem";

type Props = {
  active?: boolean;
  arrow?: boolean;
};

const Tab: React.FC<Props> = ({ active = false, arrow = false, children }) => (
  <button className={bem({ tab: true, "tab--active": active })}>
    <span>{children}</span>
    {arrow && <span className="icon-down-open"></span>}
  </button>
);

export default Tab;
