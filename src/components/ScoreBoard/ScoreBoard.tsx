import * as React from "react";

import { BrandColor } from "../../util/skin";
import { Game, Team } from "./types";
import PercentageBar from "../PercentageBar";
import Row, { Cell } from "../Row";

type TeamScoreBoardProps = {
  game: Game;
  team: Team;
  type: "home" | "away";
};

const calculateScore = (team: Team) =>
  team.shots.filter(({ hit }) => hit).length;

const TeamScoreBoard: React.FC<TeamScoreBoardProps> = ({ team, type }) => {
  const hits = team.shots.filter(({ hit }) => hit);

  return (
    <div>
      {hits.map(({ player: { lastname }, time }) => (
        <p key={time.valueOf()}>
          {type === "away" && `${lastname} `}
          <strong>{time.getMinutes()}'</strong>
          {type === "home" && ` ${lastname}`}
        </p>
      ))}
    </div>
  );
};

const ScoreBoard: React.FC<{ game: Game }> = ({ game }) => (
  <>
    <Row padding={[2, 1]} theme="dark">
      <Cell right bottom>
        <h5 style={{ color: BrandColor.primary }}>{game.homeTeam.name}</h5>
      </Cell>
      <Cell center bottom width={14}>
        <h3 style={{ color: "#fff", lineHeight: "1.5rem" }}>
          {calculateScore(game.homeTeam)} {` : `}
          {calculateScore(game.awayTeam)}
        </h3>
      </Cell>
      <Cell bottom>
        <h5 style={{ color: BrandColor.secondary }}>{game.awayTeam.name}</h5>
      </Cell>
    </Row>
    <Row padding={[0, 0, 4, 0]} theme="dark">
      <Cell right>
        <TeamScoreBoard type="home" team={game.homeTeam} game={game} />
      </Cell>
      <Cell center width={14}></Cell>
      <Cell>
        <TeamScoreBoard type="away" team={game.awayTeam} game={game} />
      </Cell>
    </Row>
    <PercentageBar left={game.homeTeam.control} right={game.awayTeam.control} />
  </>
);

export default ScoreBoard;
