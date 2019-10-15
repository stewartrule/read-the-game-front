import * as React from "react";

import { filterChildren } from "../../util/children";
import NavItem from "./NavItem";

const Nav: React.FC = ({ children }) => (
  <nav className="nav">{filterChildren(children, [NavItem])}</nav>
);

export default Nav;
