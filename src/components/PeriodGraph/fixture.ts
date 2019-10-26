import { BrandColor } from "../../util/skin";
import { PeriodGraphPeriod } from "./PeriodGraph";

export const periodGraphPeriods: PeriodGraphPeriod[] = Array.from(
  { length: 6 },
  (_, i) => {
    return {
      inner: {
        fill: i % 2 === 0 ? BrandColor.primary : BrandColor.secondary,
        value: i * 0.12
      },
      outer: {
        fill: i % 2 === 0 ? BrandColor.secondary : BrandColor.primary,
        value: 1 - i * 0.12
      }
    };
  }
);
