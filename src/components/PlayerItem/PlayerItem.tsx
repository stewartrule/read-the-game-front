import "./styles.scss";

import * as React from "react";

import { BrandColor } from "../../util/skin";
import Avatar from "../Avatar";

type Shot = {
  hit: boolean;
  time: Date;
};

type Player = {
  id: number;
  firstname: string;
  lastname: string;
  dob: Date;
  shots: Shot[];
  avatar: string;
};

type Props = {
  player: Player;
  imageRadius?: number;
  imageBorder?: number;
  valueBorder?: number;
  outerBorder?: number;
  color?: BrandColor;
};

const Player: React.FC<Props> = ({
  player,
  imageRadius = 20,
  imageBorder = 1,
  valueBorder = 3,
  outerBorder = 12,
  color = BrandColor.primary
}) => {
  const uid = `player_item_${imageRadius}_${player.id}`;
  const shots = player.shots;
  const hits = shots.filter(({ hit }) => hit);

  return (
    <div className="player-item" key={uid}>
      <Avatar
        image={player.avatar}
        value={hits.length / shots.length}
        radius={imageRadius}
        border={imageBorder}
        valueBorder={valueBorder}
        outerBorder={outerBorder}
        color={color}
      />
      <div>
        <h4>{player.lastname}</h4>
        <p>{player.dob.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Player;
