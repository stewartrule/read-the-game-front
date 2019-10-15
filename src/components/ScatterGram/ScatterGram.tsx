import * as React from "react";

type Player = {
  id: number;
  x: number;
  y: number;
  avatar: string;
};

export type Team = {
  id: number;
  players: Player[];
  color: string;
};

type Props = {
  teams: Team[];
  size?: number;
  itemRadius?: number;
  borderWidth?: number;
};

const ScatterGram: React.FC<Props> = ({
  teams = [],
  size = 600,
  itemRadius = 12,
  borderWidth = 2
}) => {
  const outerRadius = itemRadius + borderWidth;
  const dashSize = 4;
  const dashArray = `${dashSize}, ${dashSize}`;
  const lineSize = 2;
  const halfLineSize = lineSize / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const innerOffset = 20;
  const dist = size - outerRadius * 2;

  return (
    <svg x="0" y="0" width={size} height={size} viewBox={viewBox}>
      <rect
        x={halfLineSize}
        y={halfLineSize}
        width={size - halfLineSize}
        height={size - halfLineSize}
        fill="none"
        stroke="#ddd"
        strokeWidth="0"
      />
      <polygon
        points={`0,0 ${size},0 0,${size}`}
        fill="#42dd84"
        opacity="0.2"
      />
      <line
        stroke="#42dd84"
        strokeWidth={lineSize}
        x1={size - lineSize}
        y1={lineSize}
        x2={lineSize}
        y2={size - lineSize}
      />
      <line
        stroke="#ddd"
        strokeWidth={lineSize}
        strokeDasharray={dashArray}
        x1={size / 2 - halfLineSize}
        y1={innerOffset}
        x2={size / 2 - halfLineSize}
        y2={size - innerOffset}
      />
      <line
        stroke="#ddd"
        strokeWidth={lineSize}
        strokeDasharray={dashArray}
        x1={innerOffset}
        y1={size / 2 - halfLineSize}
        x2={size - innerOffset}
        y2={size / 2 - halfLineSize}
      />
      <defs>
        {teams.map(team =>
          team.players.map(({ x, y, id }) => (
            <mask
              key={`${id}_${x}_${y}`}
              id={`scatter_${id}_${size}_${team.id}`}
              x="0"
              y="0"
              width={size}
              height={size}
            >
              <circle
                cx={x * dist + outerRadius}
                cy={y * dist + outerRadius}
                r={itemRadius}
                stroke="black"
                strokeWidth="0"
                fill="white"
              />
            </mask>
          ))
        )}
      </defs>
      {teams.map(team =>
        team.players.map(({ x, y, avatar, id }) => [
          <circle
            key={`circle_${x}_${y}`}
            cx={x * dist + outerRadius}
            cy={y * dist + outerRadius}
            r={outerRadius}
            strokeWidth="0"
            fill={team.color}
          />,
          <image
            key={`image_${x}_${y}`}
            href={avatar}
            x={x * dist + borderWidth}
            y={y * dist + borderWidth}
            height={itemRadius * 2}
            width={itemRadius * 2}
            mask={`url(#scatter_${id}_${size}_${team.id})`}
          />
        ])
      )}
    </svg>
  );
};

export default ScatterGram;
