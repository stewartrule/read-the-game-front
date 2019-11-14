/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: TeamUpdated
// ====================================================

export interface TeamUpdated_teamUpdated {
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

export interface TeamUpdated {
  teamUpdated: TeamUpdated_teamUpdated;
}
