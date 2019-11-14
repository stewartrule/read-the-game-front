/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamCompare
// ====================================================

export interface TeamCompare_teams {
  __typename: "Team";
  id: string;
  name: string;
  shotCount: number;
  hitCount: number;
  passCount: number;
  interceptCount: number;
  involvedPlayerCount: number;
  averageStrength: number;
}

export interface TeamCompare {
  teams: TeamCompare_teams[];
}
