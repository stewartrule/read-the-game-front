import * as React from "react";

import bem from "../../util/bem";

const grids = [
  "LO",
  "ZO",
  "RO",

  "LOM",
  "ZOM",
  "ROM",

  "LM",
  "ZM",
  "RM",

  "LDM",
  "ZDM",
  "RDM",

  "LD",
  "ZD",
  "RD"
];

type Props = {
  selectedIndex?: number;
  onSelect: (index: number) => void;
};

const AreaSelect: React.FC<Props> = ({ selectedIndex, onSelect }) => {
  return (
    <div className="area-select">
      {grids.map((abbr, index) => (
        <div
          key={abbr}
          role="button"
          onPointerUp={() => onSelect(index)}
          className={bem({
            "area-select__cell": true,
            "area-select__cell--active": index === selectedIndex
          })}
        >
          <div>
            <strong>{abbr}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AreaSelect;
