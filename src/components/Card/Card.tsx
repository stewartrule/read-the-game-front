import * as React from "react";

import bem from "../../util/bem";
import { filterChildren } from "../../util/children";

export const CardColumn: React.FC = ({ children }) => (
  <div className="card__column">{children}</div>
);

type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type CardSectionProps = {
  soft?: boolean;
  padding?:
    | [Padding]
    | [Padding, Padding]
    | [Padding, Padding, Padding, Padding];
};

export const CardSection: React.FC<CardSectionProps> = ({
  soft = false,
  children,
  padding
}) => (
  <div
    className={bem({
      card__section: true,
      "card__section--soft": soft
    })}
    style={
      padding
        ? {
            padding: padding.map(value => `${value * 0.5}rem`).join(" ")
          }
        : undefined
    }
  >
    {children}
  </div>
);

const Card: React.FC = ({ children }) => (
  <div className="card">{filterChildren(children, [CardSection])}</div>
);

export default Card;
