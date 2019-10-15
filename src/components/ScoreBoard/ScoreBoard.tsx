import "./styles.css";

import * as React from "react";

import bem from "../../util/bem";
import { Game, Team } from "./types";
import PercentageBar from "../PercentageBar";

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
    <div
      className={bem({
        "score-board__team": {
          [`--${type}`]: true
        }
      })}
    >
      <h5>{team.name}</h5>
      {hits.map(({ player, time }) => (
        <p key={time.valueOf()}>
          <strong>{time.getMinutes()}'</strong> {player.lastname}
        </p>
      ))}
    </div>
  );
};

const ScoreBoard: React.FC<{ game: Game }> = ({ game }) => (
  <>
    <div className="score-board">
      <TeamScoreBoard type="home" team={game.homeTeam} game={game} />
      <div className="score-board__score">
        <h3>
          {calculateScore(game.homeTeam)} {` : `}
          {calculateScore(game.awayTeam)}
        </h3>
      </div>
      <TeamScoreBoard type="away" team={game.awayTeam} game={game} />
    </div>
    <PercentageBar left={game.homeTeam.control} right={game.awayTeam.control} />
  </>
);

export default ScoreBoard;
