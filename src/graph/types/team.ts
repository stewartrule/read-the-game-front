/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: team
// ====================================================

export interface team_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface team {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: team_players[];
}
