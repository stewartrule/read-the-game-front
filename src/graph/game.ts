import {
  useMutation,
  useQuery,
  useSubscription,
  useLazyQuery
} from "@apollo/react-hooks";

/** Mutation */
import AddShot from "./game/AddShot.gql";

/** Queries */
import GetGameActionCount from "./game/GetGameActionCount.gql";
import GetGames from "./game/GetGames.gql";
import GetSchedule from "./game/GetSchedule.gql";
import GetShotCountByPeriod from "./game/GetShotCountByPeriod.gql";

/** Subscription */
import ShotAdded from "./game/ShotAdded.gql";
import GameUpdated from "./game/GameUpdated.gql";

/** Types */
import { AddShot as AddShotType } from "./types/AddShot";
import { GameUpdated as GameUpdatedType } from "./types/GameUpdated";
import { GetGameActionCount as GetGameActionCountType } from "./types/GetGameActionCount";
import { GetGames as GetGamesType } from "./types/GetGames";
import { GetSchedule as GetScheduleType } from "./types/GetSchedule";
import { GetShotCountByPeriod as GetShotCountByPeriodType } from "./types/GetShotCountByPeriod";
import { ShotAdded as ShotAddedType } from "./types/ShotAdded";
import { AddShotVariables } from "./types/AddShot";

/** Queries */
export const useGetShotCountByPeriodQuery = () =>
  useQuery<GetShotCountByPeriodType>(GetShotCountByPeriod);

export const useGetShotCountByPeriodLazyQuery = () =>
  useLazyQuery<GetShotCountByPeriodType>(GetShotCountByPeriod);

export const useGetGamesQuery = () => useQuery<GetGamesType>(GetGames);

export const useGetGameActionCountQuery = () =>
  useQuery<GetGameActionCountType>(GetGameActionCount);

export const useGetScheduleQuery = () => useQuery<GetScheduleType>(GetSchedule);

/** Mutations */
export const useAddShotMutation = () =>
  useMutation<AddShotType, AddShotVariables>(AddShot);

/** Subscriptions */
export const useShotAddedSubscription = () =>
  useSubscription<ShotAddedType>(ShotAdded);

export const useGameUpdatedSubscription = () =>
  useSubscription<GameUpdatedType>(GameUpdated);
