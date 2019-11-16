import * as React from "react";

import { Button } from "../components/ButtonGroup";
import Card, { CardSection } from "../components/Card";
import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import { useAddShotMutation, useGetScheduleQuery } from "../graph/game";
import {
  GetSchedule_games_awayTeam as AwayTeam,
  GetSchedule_games_homeTeam as HomeTeam,
  GetSchedule_games_awayTeam_players as Player,
  GetSchedule_games as RawGame,
  GetSchedule_shotTypes as ShotType
} from "../graph/types/GetSchedule";

const GameCardPlaceholder = () => (
  <Card>
    <CardSection padding={[5, 1]} />
  </Card>
);

const GameListView: React.FC = ({}) => {
  const { data, loading, error } = useGetScheduleQuery();

  if (error) {
    return (
      <ApolloErrorMessage
        error={error}
        file={__filename}
        message="Could not load schedule"
      />
    );
  }

  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <GameCardPlaceholder key={i} />
        ))}
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.games.map(game => (
        <GameControlCard game={game} shotTypes={data.shotTypes} key={game.id} />
      ))}
    </>
  );
};

const ShotButton: React.FC<{
  game: RawGame;
  team: HomeTeam | AwayTeam;
  player: Player;
  shotType: ShotType;
  hit: boolean;
}> = ({ game, team, shotType, player, hit, children }) => {
  const [addShot, { loading }] = useAddShotMutation();

  return (
    <Button
      compact
      disabled={loading}
      primary={hit}
      onClick={() => {
        addShot({
          variables: {
            gameId: Number(game.id),
            teamId: Number(team.id),
            playerId: Number(player.id),
            shotTypeId: Number(shotType.id),
            hit
          }
        });
      }}
    >
      {children}
    </Button>
  );
};

const TeamControl: React.FC<{
  game: RawGame;
  team: HomeTeam | AwayTeam;
  shotTypes: ShotType[];
}> = ({ game, team, shotTypes }) => {
  return (
    <table>
      <caption>{team.name}</caption>
      <tbody>
        {team.players.map(player => (
          <tr key={player.id}>
            <td>
              <span>{player.lastName}</span>
            </td>
            <td>
              <ShotButton
                game={game}
                team={team}
                player={player}
                shotType={shotTypes[0]}
                hit={false}
              >
                Shot
              </ShotButton>
            </td>
            <td>
              <ShotButton
                game={game}
                team={team}
                player={player}
                shotType={shotTypes[0]}
                hit={true}
              >
                Hit
              </ShotButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const GameControlCard: React.FC<{ game: RawGame; shotTypes: ShotType[] }> = ({
  game,
  shotTypes
}) => {
  return (
    <Card>
      <CardSection>
        <TeamControl game={game} team={game.homeTeam} shotTypes={shotTypes} />
        <TeamControl game={game} team={game.awayTeam} shotTypes={shotTypes} />
      </CardSection>
    </Card>
  );
};

export default GameListView;
