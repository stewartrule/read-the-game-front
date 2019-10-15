import * as React from "react";

import { filterChildren } from "../../util/children";
import MenuItem from "./MenuItem";

type Props = {
  head?: React.ReactNode;
};

const Menu: React.FC<Props> = ({ head, children }) => (
  <nav className="menu">
    {head && <h2 className="menu__head">{head}</h2>}

    {filterChildren(children, [MenuItem])}
  </nav>
);

export default Menu;
