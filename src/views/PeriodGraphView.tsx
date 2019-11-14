import * as React from "react";
import { useState, useEffect, useRef } from "react";

import ButtonGroup, { Button } from "../components/ButtonGroup";
import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import PeriodGraph, { PeriodGraphPeriod } from "../components/PeriodGraph";
import Row, { Cell } from "../components/Row";

import InView from "../components/InView";
import {
  useGetShotCountByPeriodQuery,
  useGetShotCountByPeriodLazyQuery
} from "../graph/game";
import {
  GetShotCountByPeriod_games as RawGame,
  GetShotCountByPeriod_games_shotCountByPeriod_homeTeam as RawPeriod
} from "../graph/types/GetShotCountByPeriod";
import { BrandColor } from "../util/skin";

const getMaxCount = (periods: RawPeriod[]) =>
  periods.reduce((max, period) => (period.count > max ? period.count : max), 0);

const parseGamePeriods = ({
  shotCountByPeriod: { awayTeam, homeTeam }
}: RawGame): PeriodGraphPeriod[] => {
  const homeMax = getMaxCount(homeTeam);
  const awayMax = getMaxCount(awayTeam);
  const max = Math.max(homeMax, awayMax);
  const factor = 1 / max;

  const homeValues = homeTeam.map(period => ({
    value: period.count * factor,
    fill: BrandColor.primary
  }));

  const awayValues = awayTeam.map(period => ({
    value: period.count * factor,
    fill: BrandColor.secondary
  }));

  return homeValues.map((_, i) => ({
    inner: i % 2 === 0 ? homeValues[i] : awayValues[i],
    outer: i % 2 === 0 ? awayValues[i] : homeValues[i]
  }));
};

const PeriodGraphSelect: React.FC<{ games: RawGame[] }> = ({ games }) => {
  const [gameId, setGameId] = useState(games.length ? games[0].id : "");
  const selectedGame = games.find(game => game.id === gameId);

  return (
    <>
      {selectedGame && (
        <PeriodGraph
          periods={parseGamePeriods(selectedGame)}
          shadow
        />
      )}
      <Row>
        <Cell padding={[2, 4]}>
          <ButtonGroup>
            {games.map(game => (
              <Button
                key={game.id}
                compact
                active={gameId === game.id}
                onClick={() => setGameId(game.id)}
              >
                {game.id}
              </Button>
            ))}
          </ButtonGroup>
        </Cell>
      </Row>
    </>
  );
};

const PeriodGraphView: React.FC<{}> = ({}) => {
  const { data, loading, error } = useGetShotCountByPeriodQuery();

  if (error) {
    return (
      <ApolloErrorMessage
        file={__filename}
        error={error}
        message="Could not load period graph"
      />
    );
  }

  if (data && data.games.length) {
    return (
      <>
        <IntroText />
        <PeriodGraphSelect games={data.games} />
      </>
    );
  }

  return <PlaceholderView />;
};

const PlaceholderView = () => (
  <>
    <IntroText />
    <PeriodGraph periods={[]} immediate />
    <Row>
      <Cell padding={[2, 4]}>
        <ButtonGroup>
          <Button compact active>
            &nbsp;
          </Button>
          <Button compact>&nbsp;</Button>
        </ButtonGroup>
      </Cell>
    </Row>
  </>
);

const IntroText = () => (
  <>
    <h2>Torzeitpunkt</h2>
    <p>Geschossene und gefangene Tore unterteilt in 15 minuten Abschnitte</p>
  </>
);

const Wrapper = () => (
  <InView>
    {({ seen, isIntersecting }) =>
      isIntersecting ? <PeriodGraphView /> : <PlaceholderView />
    }
  </InView>
);
export default Wrapper;

export function emptyGraph(): PeriodGraphPeriod[] {
  return Array.from({ length: 6 }, (_, i) => {
    return {
      inner: {
        fill: i % 2 === 0 ? BrandColor.primary : BrandColor.secondary,
        value: 0
      },
      outer: {
        fill: i % 2 === 0 ? BrandColor.secondary : BrandColor.primary,
        value: 0
      }
    };
  });
}
