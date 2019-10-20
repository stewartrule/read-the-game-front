import * as React from "react";

import bem from "../../util/bem";
import { filterChildren } from "../../util/children";

type PaddingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Padding =
  | [PaddingValue]
  | [PaddingValue, PaddingValue]
  | [PaddingValue, PaddingValue, PaddingValue, PaddingValue];

type CellProps = {
  padding?: Padding;
  width?: number;
  right?: boolean;
  center?: boolean;
  top?: boolean;
  bottom?: boolean;
};

const getPadding = (padding: Padding) =>
  padding.map(value => `${value * 0.5}rem`).join(" ");

export const Cell: React.FC<CellProps> = ({
  children,
  padding,
  width,
  top = false,
  bottom = false,
  right = false,
  center = false
}) => (
  <div
    className={bem({
      row__cell: {
        "--right": right,
        "--center": center,
        "--top": top,
        "--bottom": bottom
      }
    })}
    style={{
      padding: padding ? getPadding(padding) : undefined,
      width: width ? `${width}rem` : undefined
    }}
  >
    {children}
  </div>
);

type RowProps = {
  padding?: Padding;
  light?: boolean;
  primary?: boolean;
  secondary?: boolean;
  dark?: boolean;
};

const Row: React.FC<RowProps> = ({
  children,
  padding,
  light = false,
  primary = false,
  secondary = false,
  dark = false
}) => (
  <div
    className={bem({
      row: {
        "--light": light,
        "--primary": primary,
        "--secondary": secondary,
        "--dark": dark
      }
    })}
    style={{ padding: padding ? getPadding(padding) : undefined }}
  >
    {filterChildren(children, [Cell])}
  </div>
);

export default Row;
