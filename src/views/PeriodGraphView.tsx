import { useQuery } from "@apollo/react-hooks";
import * as React from "react";

import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import PeriodGraph, { PeriodGraphPeriod } from "../components/PeriodGraph";
import { Game } from "../queries";
import {
  GetShotCountByPeriod,
  GetShotCountByPeriod_games as RawGame,
  GetShotCountByPeriod_games_shotCountByPeriod_homeTeam as RawPeriod
} from "../queries/types/GetShotCountByPeriod";
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

const PeriodGraphView: React.FC<{}> = ({}) => {
  const { data, loading, error } = useQuery<GetShotCountByPeriod>(
    Game.GetShotCountByPeriod
  );

  if (error) {
    return (
      <ApolloErrorMessage
        file={__filename}
        error={error}
        message="Could not load period graph"
      />
    );
  }

  if (loading || !data) {
    return <PeriodGraph periods={[]} />;
  }

  return (
    <>
      {data.games.map(game => (
        <PeriodGraph key={game.id} periods={parseGamePeriods(game)} />
      ))}
    </>
  );
};

export default PeriodGraphView;
