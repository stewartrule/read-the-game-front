import * as React from "react";

import Donut from "../Donut/Donut";
import { BrandColor } from "../../util/skin";

type Props = {
  value: number;
  image: string;
  border?: number;
  valueBorder?: number;
  radius?: number;
  outerBorder?: number;
  color?: BrandColor;
};

const Avatar: React.FC<Props> = ({
  value,
  image,
  radius = 20,
  border = 2,
  valueBorder = 4,
  outerBorder = 12,
  color = BrandColor.primary
}) => {
  const outerRadius = radius + border + Math.max(outerBorder, valueBorder);
  const pieRadius = radius + border + valueBorder;
  const size = outerRadius * 2;
  const imageSize = radius * 2;
  const maskId = `avatar_${radius}_${value}`;

  return (
    <div className="avatar">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <mask id={maskId} x={0} y={0} width={size} height={size}>
            <circle
              cx={outerRadius}
              cy={outerRadius}
              r={radius}
              stroke="black"
              strokeWidth={0}
              fill="white"
            />
          </mask>
        </defs>
        <circle
          cx={outerRadius}
          cy={outerRadius}
          r={outerRadius}
          opacity="0.2"
          strokeWidth={0}
          fill={color}
        />
        <circle
          cx={outerRadius}
          cy={outerRadius}
          r={radius + border}
          strokeWidth={0}
          fill="#ccc"
        />
        <Donut
          cx={outerRadius}
          cy={outerRadius}
          radius={pieRadius}
          innerRadius={5}
          segments={[{ value, fill: color }]}
        />
        <image
          href={image}
          x={border + outerBorder}
          y={border + outerBorder}
          height={imageSize}
          width={imageSize}
          mask={`url(#${maskId}`}
        />
      </svg>
    </div>
  );
};

export default Avatar;
