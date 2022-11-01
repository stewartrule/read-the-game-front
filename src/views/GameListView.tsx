import * as React from "react";

import Card, { CardSection } from "../components/Card";
import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import GameCard from "../components/GameCard";
import { useGameUpdatedSubscription, useGetGamesQuery } from "../graph/game";
import { GetGames_games as RawGame } from "../graph/types/GetGames";

const GameCardPlaceholder = () => (
  <Card>
    <CardSection padding={[5, 1]} />
    <CardSection padding={[5, 1]} soft />
    <CardSection padding={[2, 1]} />
  </Card>
);

const parseRawGame = (game: RawGame) => {
  const homeCount = game.homeTeamShots.length;
  const awayCount = game.awayTeamShots.length;
  const factor = 1 / (homeCount + awayCount);

  return {
    ...game,
    homeTeam: {
      ...game.homeTeam,
      control: homeCount * factor
    },
    awayTeam: {
      ...game.awayTeam,
      control: awayCount * factor
    }
  };
};

const GameListView: React.FC = ({}) => {
  const { data, loading, error } = useGetGamesQuery();

  useGameUpdatedSubscription();

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
        {Array.from({ length: 4 }, (_, i) => (
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
      {data.games.map(parseRawGame).map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </>
  );
};

export default GameListView;
