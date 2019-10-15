import "./styles.css";

import * as React from "react";

import Avatar from "../Avatar/Avatar";

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
};

const Player: React.FC<Props> = ({
  player,
  imageRadius = 20,
  imageBorder = 1,
  valueBorder = 3
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
      />
      <div>
        <h4>
          {player.firstname}
          {` `}
          {player.lastname}
        </h4>
        <p>{player.dob.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Player;
