/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GameUpdated
// ====================================================

export interface GameUpdated_gameUpdated_homeTeamShots_player {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GameUpdated_gameUpdated_homeTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  player: GameUpdated_gameUpdated_homeTeamShots_player;
}

export interface GameUpdated_gameUpdated_awayTeamShots_player {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GameUpdated_gameUpdated_awayTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  player: GameUpdated_gameUpdated_awayTeamShots_player;
}

export interface GameUpdated_gameUpdated_homeTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GameUpdated_gameUpdated_homeTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GameUpdated_gameUpdated_homeTeam_players[];
}

export interface GameUpdated_gameUpdated_awayTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GameUpdated_gameUpdated_awayTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GameUpdated_gameUpdated_awayTeam_players[];
}

export interface GameUpdated_gameUpdated {
  __typename: "Game";
  id: string;
  start: Date;
  stop: Date;
  homeTeamShots: GameUpdated_gameUpdated_homeTeamShots[];
  awayTeamShots: GameUpdated_gameUpdated_awayTeamShots[];
  homeTeam: GameUpdated_gameUpdated_homeTeam;
  awayTeam: GameUpdated_gameUpdated_awayTeam;
}

export interface GameUpdated {
  gameUpdated: GameUpdated_gameUpdated;
}
