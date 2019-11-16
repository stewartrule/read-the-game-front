import * as React from "react";

import { Tuple } from "../../util/types";
import AreaActivity from "./AreaActivity";
import Lines from "./Lines";
import { TeamActivity } from "./types";

type RGB = Tuple<number, 3>;
type Offsets = number[];
type AreaConfig = [TeamActivity, Offsets, RGB];

type Props = {
  teams: TeamActivity[];
};

const width = 1000;
const height = 600;
const colors: RGB[] = [[0, 118, 255], [66, 221, 132]];

const FieldActivity: React.FC<Props> = ({ teams }) => {
  const teamCount = teams.length;
  const maskWidth = width / (teamCount * 5);

  const areas: AreaConfig[] = teams.map((team, i) => [
    team,
    [0, 0, 0, 0, 0].map((_, col) => col * teamCount + i),
    colors[i % 2]
  ]);

  return (
    <div>
      <svg width="100%" height="60%" viewBox={`0 0 ${width} ${height}`}>
        <Lines />
        {areas.length > 1 && (
          <defs>
            {areas.map(([{ id }, offsets]) => (
              <mask
                key={id}
                id={`mask_area_${id}`}
                x={0}
                y={0}
                width={width}
                height={height}
              >
                {offsets.map(offset => (
                  <rect
                    key={offset}
                    x={offset * maskWidth + 1}
                    y={0}
                    width={maskWidth - 2}
                    height={height}
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0"
                  />
                ))}
              </mask>
            ))}
          </defs>
        )}

        {areas.map(([team, _offset, [r, g, b]]) => (
          <AreaActivity
            key={team.id}
            team={team}
            mask={areas.length > 1 ? `url(#mask_area_${team.id})` : undefined}
            r={r}
            g={g}
            b={b}
            width={width}
            height={height}
          />
        ))}
      </svg>
    </div>
  );
};

export default FieldActivity;
