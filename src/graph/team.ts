import { useQuery, useSubscription, useLazyQuery } from "@apollo/react-hooks";

/** Queries */
import TeamCompare from "./team/TeamCompare.gql";

/** Mutation */

/** Subscription */
import TeamUpdated from "./team/TeamUpdated.gql";

/** Types */
import { TeamCompare as TeamCompareType } from "./types/TeamCompare";
import { TeamUpdated as TeamUpdatedType } from "./types/TeamUpdated";

export const useTeamCompareQuery = () => useQuery<TeamCompareType>(TeamCompare);
export const useTeamCompareLazyQuery = () => useLazyQuery<TeamCompareType>(TeamCompare);

export const useTeamUpdatedSubscription = () =>
  useSubscription<TeamUpdatedType>(TeamUpdated);
