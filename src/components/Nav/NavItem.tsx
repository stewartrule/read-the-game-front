import * as React from "react";

import bem from "../../util/bem";

type Props = {
  active?: boolean;
  to?: string;
};

const NavItem: React.FC<Props> = ({ active = false, children }) => (
  <span
    className={bem({
      nav__item: {
        "--active": active
      }
    })}
  >
    {children}
  </span>
);

export default NavItem;
