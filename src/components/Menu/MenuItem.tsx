import * as React from "react";

import bem from "../../util/bem";

type Props = {
  active?: boolean;
};

const MenuItem: React.FC<Props> = ({ active = false, children }) => (
  <span
    className={bem({
      menu__item: {
        "--active": active
      }
    })}
  >
    {children}
  </span>
);

export default MenuItem;
