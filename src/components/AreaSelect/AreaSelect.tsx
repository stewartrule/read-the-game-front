import * as React from "react";

import bem from "../../util/bem";

export type AreaCode =
  | "LO"
  | "ZO"
  | "RO"
  | "LOM"
  | "ZOM"
  | "ROM"
  | "LM"
  | "ZM"
  | "RM"
  | "LDM"
  | "ZDM"
  | "RDM"
  | "LD"
  | "ZD"
  | "RD";

const grids: AreaCode[] = [
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
  selectedArea?: AreaCode;
  onSelect: (code: AreaCode) => void;
};

const AreaSelect: React.FC<Props> = ({ selectedArea, onSelect }) => (
  <div className="area-select">
    {grids.map((code) => (
      <div
        key={code}
        role="button"
        onPointerUp={() => onSelect(code)}
        className={bem({
          "area-select__cell": true,
          "area-select__cell--active": code === selectedArea
        })}
      >
        <div>
          <strong>{code}</strong>
        </div>
      </div>
    ))}
  </div>
);

export default AreaSelect;
