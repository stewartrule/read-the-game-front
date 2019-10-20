import * as React from "react";

import bem from "../../util/bem";

type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Props = {
  center?: boolean;
  dark?: boolean;
  primary?: boolean;
  secondary?: boolean;
  soft?: boolean;
  padding?:
    | [Padding]
    | [Padding, Padding]
    | [Padding, Padding, Padding, Padding];
};

const Section: React.FC<Props> = ({
  children,
  center = false,
  dark = false,
  primary = false,
  secondary = false,
  soft = false,
  padding
}) => (
  <div
    className={bem({
      section: {
        "--center": center,
        "--dark": dark,
        "--primary": primary,
        "--secondary": secondary,
        "--soft": soft
      }
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

export default Section;
