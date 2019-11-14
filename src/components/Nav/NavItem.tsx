import * as React from "react";

import bem from "../../util/bem";

import { NavLink, NavLinkProps } from "react-router-dom";

type Props = {
  active?: boolean;
} & NavLinkProps;

const NavItem: React.FC<Props> = ({
  active = false,
  children,
  to,
  ...props
}) => (
  <NavLink
    {...props}
    to={to}
    exact
    activeClassName="nav__item--active"
    className={bem({
      nav__item: {
        "--active": active
      }
    })}
  >
    {children}
  </NavLink>
);

export default NavItem;
