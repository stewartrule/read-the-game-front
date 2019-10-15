import * as React from "react";

import bem from "../../util/bem";
import { filterChildren } from "../../util/children";

export const CardColumn: React.FC = ({ children }) => (
  <div className="card__column">{children}</div>
);

type CardSectionProps = {
  soft?: boolean;
};

export const CardSection: React.FC<CardSectionProps> = ({
  soft = false,
  children
}) => (
  <div
    className={bem({
      card__section: true,
      "card__section--soft": soft
    })}
  >
    {filterChildren(children, [CardColumn])}
  </div>
);

const Card: React.FC = ({ children }) => (
  <div className="card">{filterChildren(children, [CardSection])}</div>
);

export default Card;
