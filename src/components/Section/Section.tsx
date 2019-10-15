import * as React from "react";

import bem from "../../util/bem";

type Props = {
  center?: boolean;
  compact?: boolean;
  dark?: boolean;
  primary?: boolean;
  secondary?: boolean;
  soft?: boolean;
  spacious?: boolean;
};

const Section: React.FC<Props> = ({
  children,
  center = false,
  compact = false,
  dark = false,
  primary = false,
  secondary = false,
  soft = false,
  spacious = false
}) => (
  <div
    className={bem({
      section: {
        "--center": center,
        "--compact": compact,
        "--dark": dark,
        "--primary": primary,
        "--secondary": secondary,
        "--soft": soft,
        "--spacious": spacious
      }
    })}
  >
    {children}
  </div>
);

export default Section;
