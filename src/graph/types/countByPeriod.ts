/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: countByPeriod
// ====================================================

export interface countByPeriod_shots {
  __typename: "Shot";
  id: string;
  hit: boolean;
}

export interface countByPeriod {
  __typename: "TeamShotCountByPeriod";
  count: number;
  shots: countByPeriod_shots[];
}
