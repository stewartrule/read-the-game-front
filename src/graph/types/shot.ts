/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: shot
// ====================================================

export interface shot_fromPlayer {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface shot {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  fromPlayer: shot_fromPlayer;
}
