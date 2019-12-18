/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddShot
// ====================================================

export interface AddShot_addShot {
  __typename: "Shot";
  gameId: number;
  fromTeamId: number;
  fromPlayerId: number;
  shotTypeId: number;
  hit: boolean;
}

export interface AddShot {
  addShot: AddShot_addShot;
}

export interface AddShotVariables {
  gameId: number;
  fromTeamId: number;
  fromPlayerId: number;
  shotTypeId: number;
  hit: boolean;
}
