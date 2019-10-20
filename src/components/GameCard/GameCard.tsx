import * as React from "react";

import { BrandColor } from "../../util/skin";
import Card, { CardColumn, CardSection } from "../Card";
import SimplePercentageBar from "../SimplePercentageBar";
import Time from "../Time";
import { Game, Team } from "./types";

const TeamScoreList = ({ team }: { team: Team }) => (
  <>
    {team.shots
      .filter(({ hit }) => hit)
      .sort((a, b) => a.time.valueOf() - b.time.valueOf())
      .map(shot => (
        <p key={shot.id}>
          <strong>
            {shot.time.getMinutes()}
            {`' `}
          </strong>
          {shot.player.lastName}
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
    <CardSection padding={[1]}>
      <CardColumn>
        <div className="card__logo"></div>
      </CardColumn>
      <CardColumn>
        <h1>
          {calculateScore(homeTeam)} {` : `}
          {calculateScore(awayTeam)}
        </h1>
      </CardColumn>
      <CardColumn>
        <div className="card__logo"></div>
      </CardColumn>
    </CardSection>
    <CardSection padding={[0, 1, 1, 1]}>
      <CardColumn>
        <h4 style={{ color: BrandColor.primary }}>{homeTeam.name}</h4>
      </CardColumn>
      <CardColumn>
        <h4 style={{ color: "#999" }}>
          <Time date={start} />
          {` - `}
          <Time date={stop} />
        </h4>
      </CardColumn>
      <CardColumn>
        <h4 style={{ color: BrandColor.secondary }}>{awayTeam.name}</h4>
      </CardColumn>
    </CardSection>
    <CardSection soft padding={[1]}>
      <CardColumn>
        <TeamScoreList team={homeTeam} />
      </CardColumn>
      <CardColumn></CardColumn>
      <CardColumn>
        <TeamScoreList team={awayTeam} />
      </CardColumn>
    </CardSection>
    <CardSection padding={[1]}>
      <CardColumn>
        <h4 style={{ color: BrandColor.primary }}>
          {Math.round(homeTeam.control * 100)}%
        </h4>
      </CardColumn>
      <CardColumn>
        <h4>Ballkontrole</h4>
      </CardColumn>
      <CardColumn>
        <h4 style={{ color: BrandColor.secondary }}>
          {Math.round(awayTeam.control * 100)}%
        </h4>
      </CardColumn>
    </CardSection>
    <CardSection>
      <CardColumn>
        <SimplePercentageBar left={homeTeam.control} right={awayTeam.control} />
      </CardColumn>
    </CardSection>
  </Card>
);

export default GameCard;
