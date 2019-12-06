import * as React from "react";
import { FontFamily, BrandColor } from "../../util/skin";

type Player = {
  id: number;
  x: number;
  y: number;
  avatar: string;
  scored: boolean;
  substitution: boolean;
  offense: boolean;
};

export type Team = {
  id: number;
  players: Player[];
};

type Props = {
  team: Team;
  size?: number;
  itemRadius?: number;
  borderWidth?: number;
  dark?: boolean;
};

const ScatterGram: React.FC<Props> = ({
  team,
  size = 600,
  itemRadius = 16,
  borderWidth = 2,
  dark = false
}) => {
  const outerRadius = itemRadius + borderWidth;
  const dashSize = 4;
  const dashArray = `${dashSize}, ${dashSize}`;
  const lineSize = 2;
  const halfLineSize = lineSize / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const innerOffset = 20;
  const dist = size - outerRadius * 2 - innerOffset * 2;
  const radius = size / 2;

  const textProps = {
    fontFamily: FontFamily.Default,
    fontWeight: "bold",
    fontSize: "20px",
    fill: dark ? BrandColor.white : BrandColor.dark
  };

  return (
    <div>
      <svg width="100%" height="100%" viewBox={viewBox}>
        {dark && <rect width="100%" height="100%" fill="#111" />}

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
          fill={BrandColor.highlight}
          opacity="0.2"
        />
        <line
          stroke={BrandColor.highlight}
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
          x1={radius - halfLineSize}
          y1={innerOffset}
          x2={radius - halfLineSize}
          y2={size - innerOffset}
        />
        <line
          stroke="#ddd"
          strokeWidth={lineSize}
          strokeDasharray={dashArray}
          x1={innerOffset}
          y1={radius - halfLineSize}
          x2={size - innerOffset}
          y2={radius - halfLineSize}
        />

        <text
          x={innerOffset}
          y={radius - 8}
          textAnchor="left"
          alignmentBaseline="after-edge"
          style={{ textAlign: "left" }}
          {...textProps}
        >
          Gespielte Minuten
        </text>

        <text
          x={radius - 8}
          y={size - innerOffset}
          textAnchor="left"
          alignmentBaseline="after-edge"
          style={{ textAlign: "left" }}
          transform={`rotate(-90 ${radius - 8} ${size - innerOffset})`}
          {...textProps}
        >
          Torbeteiligungen
        </text>

        <text
          x={innerOffset}
          y={radius + 6}
          textAnchor="left"
          alignmentBaseline="before-edge"
          style={{ textAlign: "left" }}
          {...textProps}
        >
          0'
        </text>

        <text
          x={size - innerOffset}
          y={radius + 6}
          textAnchor="end"
          alignmentBaseline="before-edge"
          style={{ textAlign: "right" }}
          {...textProps}
        >
          90'
        </text>

        <defs>
          {team.players.map(({ x, y, id }) => (
            <mask
              key={id}
              id={`scatter_${id}`}
              x="0"
              y="0"
              width={size}
              height={size}
            >
              <circle
                cx={x * dist + outerRadius + innerOffset}
                cy={y * dist + outerRadius + innerOffset}
                r={itemRadius}
                stroke="black"
                strokeWidth="0"
                fill="white"
              />
            </mask>
          ))}
        </defs>
        {team.players.map(player => (
          <Item
            key={player.id}
            player={player}
            cx={player.x * dist + outerRadius + innerOffset}
            cy={player.y * dist + outerRadius + innerOffset}
            radius={itemRadius}
            border={2}
            dark={dark}
          />
        ))}
      </svg>
    </div>
  );
};

type ItemProps = {
  player: Player;
  cx: number;
  cy: number;
  radius: number;
  border: number;
  dark?: boolean;
};

const Item: React.FC<ItemProps> = ({
  cx,
  cy,
  radius,
  border,
  player: { avatar, id, scored, offense, substitution },
  dark = false
}) => {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={radius + border}
        strokeWidth="0"
        fill={
          scored
            ? BrandColor.highlight
            : offense
            ? BrandColor.warn
            : dark
            ? "#333"
            : "#eee"
        }
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        strokeWidth="0"
        fill={"#000"}
      />
      <image
        href={avatar}
        x={cx - radius}
        y={cy - radius}
        height={radius * 2}
        width={radius * 2}
        mask={`url(#scatter_${id})`}
        opacity={substitution && !scored && !offense ? 0.75 : 1}
      />
    </>
  );
};

export default ScatterGram;
