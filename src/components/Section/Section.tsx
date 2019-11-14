import * as React from "react";

import bem from "../../util/bem";

type PaddingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Padding =
  | [PaddingValue]
  | [PaddingValue, PaddingValue]
  | [PaddingValue, PaddingValue, PaddingValue, PaddingValue];

type Props = {
  fit?: boolean;
  center?: boolean;
  scrollable?: boolean;
  theme?: "dark" | "primary" | "secondary" | "soft";
  padding?: Padding;
};

const Section: React.FC<Props> = ({
  children,
  fit = false,
  center = false,
  scrollable = false,
  theme = "",
  padding
}) => (
  <div
    className={bem({
      section: {
        "--fit": fit,
        "--center": center,
        "--scrollable": scrollable,
        [`--${theme}`]: theme.length > 0
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
