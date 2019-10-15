import * as React from "react";
import Card, { CardColumn, CardSection } from "../Card";
import Time from "../Time";
import SimplePercentageBar from "../SimplePercentageBar";
import { Game, Team } from "./types";

const TeamScoreList = ({ team }: { team: Team }) => (
  <>
    {team.shots
      .filter(({ hit }) => hit)
      .sort((a, b) => a.time.valueOf() - b.time.valueOf())
      .map(shot => (
        <p key={shot.time.valueOf()}>
          <strong>
            {shot.time.getMinutes()}
            {`' `}
          </strong>
          {shot.player.lastname}
        </p>
      ))}
  </>
);

const calculateScore = (team: Team) =>
  team.shots.filter(({ hit }) => hit).length;

type Props = {
  game: Game;
};

const GameCard: React.FC<Props> = ({
  game: { homeTeam, awayTeam, start, stop }
}) => (
  <Card>
    <CardSection>
      <CardColumn>
        <div className="card__logo"></div>
        <h4>{homeTeam.name}</h4>
      </CardColumn>
      <CardColumn>
        <h1>
          {calculateScore(homeTeam)} {` : `}
          {calculateScore(awayTeam)}
        </h1>
        <p>
          <Time date={start} />
          {` - `}
          <Time date={stop} />
        </p>
      </CardColumn>
      <CardColumn>
        <div className="card__logo"></div>
        <h4>{awayTeam.name}</h4>
      </CardColumn>
    </CardSection>
    <CardSection soft>
      <CardColumn>
        <TeamScoreList team={homeTeam} />
      </CardColumn>
      <CardColumn></CardColumn>
      <CardColumn>
        <TeamScoreList team={awayTeam} />
      </CardColumn>
    </CardSection>
    <CardSection>
      <CardColumn>
        <h4>{Math.round(homeTeam.control * 100)}%</h4>
      </CardColumn>
      <CardColumn>
        <h4>Ballcontrol</h4>
      </CardColumn>
      <CardColumn>
        <h4>{Math.round(awayTeam.control * 100)}%</h4>
      </CardColumn>
    </CardSection>
    <SimplePercentageBar left={homeTeam.control} right={awayTeam.control} />
  </Card>
);

export default GameCard;
