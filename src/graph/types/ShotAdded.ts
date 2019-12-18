/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ShotAdded
// ====================================================

export interface ShotAdded_shotAdded {
  __typename: "Shot";
  id: string;
  gameId: number;
  fromPlayerId: number;
  fromTeamId: number;
}

export interface ShotAdded {
  shotAdded: ShotAdded_shotAdded;
}
